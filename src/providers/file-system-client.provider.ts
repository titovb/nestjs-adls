import {DataLakeFileSystemClient, DataLakeServiceClient} from '@azure/storage-file-datalake';
import {FactoryProvider, ValueProvider} from '@nestjs/common';
import {AdlsOptions} from '../interfaces';
import {
  ADLS_OPTIONS,
  DATA_LAKE_FILE_SYSTEM_CLIENT,
  DATA_LAKE_SERVICE_CLIENT
} from '../constants';

export function fileSystemClientProvider(fileSystemName: string, dataLakeClient: DataLakeServiceClient): ValueProvider<DataLakeFileSystemClient> {
  return {
    provide: DATA_LAKE_FILE_SYSTEM_CLIENT,
    useValue: fileSystemName ? dataLakeClient.getFileSystemClient(fileSystemName) : null
  }
}

export function fileSystemClientAsyncProvider(): FactoryProvider<DataLakeFileSystemClient> {
  return {
    inject: [ADLS_OPTIONS, DATA_LAKE_SERVICE_CLIENT],
    provide: DATA_LAKE_FILE_SYSTEM_CLIENT,
    useFactory: (options: AdlsOptions, dataLakeServiceClient: DataLakeServiceClient) =>
      options.fileSystemName ? dataLakeServiceClient.getFileSystemClient(options.fileSystemName) : null
  };
}
