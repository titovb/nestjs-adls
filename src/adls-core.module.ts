import {DynamicModule, Global, Module, Provider} from '@nestjs/common';
import {AdlsOptions} from './interfaces';
import {DataLakeServiceClient} from '@azure/storage-file-datalake';
import {AdlsAsyncOptions} from './interfaces';
import {AdlsOptionsFactory} from './interfaces';
import {fileSystemClientAsyncProvider, fileSystemClientProvider} from './providers/file-system-client.provider';
import {dataLakeClientAsyncProvider, dataLakeClientProvider} from './providers/data-lake-client.provider';
import {ADLS_OPTIONS} from './constants';

@Global()
@Module({})
export class AdlsCoreModule {

  public static forRoot(options: AdlsOptions): DynamicModule {
    const dataLakeClient = new DataLakeServiceClient(
      options.url,
      options.credential,
      options.options
    );

    return {
      exports: [
        dataLakeClientProvider(dataLakeClient),
        fileSystemClientProvider(options.fileSystemName, dataLakeClient)
      ],
      module: AdlsCoreModule,
      providers: [
        dataLakeClientProvider(dataLakeClient),
        fileSystemClientProvider(options.fileSystemName, dataLakeClient)
      ],
    }
  }

  public static forRootAsync(asyncOptions: AdlsAsyncOptions): DynamicModule {
    return {
      exports: [
        dataLakeClientAsyncProvider(),
        fileSystemClientAsyncProvider()
      ],
      imports: asyncOptions.imports,
      module: AdlsCoreModule,
      providers: [
        dataLakeClientAsyncProvider(),
        fileSystemClientAsyncProvider(),
        ...AdlsCoreModule.createAsyncProviders(asyncOptions)
      ]
    }
  }

  private static createAsyncProviders(options: AdlsAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [AdlsCoreModule.createAsyncOptionsProvider(options)];
    }

    return [
      AdlsCoreModule.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: AdlsAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        inject: options.inject || [],
        provide: ADLS_OPTIONS,
        useFactory: options.useFactory,
      };
    }

    return {
      inject: [options.useExisting || options.useClass],
      provide: ADLS_OPTIONS,
      useFactory: (optionsFactory: AdlsOptionsFactory) =>
        optionsFactory.createAdlsOptions()
    };
  }
}
