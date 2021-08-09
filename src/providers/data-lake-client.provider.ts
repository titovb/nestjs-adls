import {FactoryProvider, ValueProvider} from '@nestjs/common';
import {DataLakeServiceClient} from '@azure/storage-file-datalake';
import {ADLS_OPTIONS, DATA_LAKE_SERVICE_CLIENT} from '../constants';
import {AdlsOptions} from '../interfaces';

export function dataLakeClientProvider(dataLakeClient: DataLakeServiceClient): ValueProvider<DataLakeServiceClient> {
  return {
    provide: DATA_LAKE_SERVICE_CLIENT,
    useValue: dataLakeClient
  };
}

export function dataLakeClientAsyncProvider(): FactoryProvider<DataLakeServiceClient> {
  return {
    inject: [ADLS_OPTIONS],
    provide: DATA_LAKE_SERVICE_CLIENT,
    useFactory: (options: AdlsOptions) =>
      new DataLakeServiceClient(
        options.url,
        options.credential,
        options.options
      )
  };
}
