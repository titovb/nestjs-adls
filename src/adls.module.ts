import {DynamicModule, Module} from '@nestjs/common';
import {AdlsOptions} from './interfaces';
import {AdlsAsyncOptions} from './interfaces';
import {AdlsCoreModule} from './adls-core.module';

@Module({})
export class AdlsModule {
  public static forRoot(options: AdlsOptions): DynamicModule {
    return {
      module: AdlsModule,
      imports: [AdlsCoreModule.forRoot(options)]
    }
  }

  public static forRootAsync(options: AdlsAsyncOptions): DynamicModule {
    return {
      module: AdlsModule,
      imports: [AdlsCoreModule.forRootAsync(options)]
    }
  }
}
