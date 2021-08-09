import {DataLakeServiceClient, StorageSharedKeyCredential} from '@azure/storage-file-datalake';
import {
  fileSystemClientAsyncProvider,
  fileSystemClientProvider
} from '../../../src/providers/file-system-client.provider';
import {ADLS_OPTIONS, DATA_LAKE_FILE_SYSTEM_CLIENT, DATA_LAKE_SERVICE_CLIENT} from '../../../src/constants';

describe(`File System Client Provider unit tests`, () => {

  it('should return file system client provider with value', () => {
    const dataLakeServiceClient = new DataLakeServiceClient(
      'url',
      new StorageSharedKeyCredential(
        'name',
        'key'
      )
    );

    const provider = fileSystemClientProvider('fileSystem', dataLakeServiceClient);

    expect(provider).toBeDefined();
    expect(provider.provide).toEqual(DATA_LAKE_FILE_SYSTEM_CLIENT);
    expect(provider.useValue).toBeDefined();
    expect(provider.useValue).not.toBeNull();
  });

  it('should return file system client provider without value', () => {
    const dataLakeServiceClient = new DataLakeServiceClient(
      'url',
      new StorageSharedKeyCredential(
        'name',
        'key'
      )
    );

    const provider = fileSystemClientProvider(undefined, dataLakeServiceClient);

    expect(provider).toBeDefined();
    expect(provider.provide).toEqual(DATA_LAKE_FILE_SYSTEM_CLIENT);
    expect(provider.useValue).toBeNull();
  });

  it('should return file system client async provider', () => {
    const provider = fileSystemClientAsyncProvider();

    expect(provider).toBeDefined();
    expect(provider.inject).toStrictEqual([ADLS_OPTIONS, DATA_LAKE_SERVICE_CLIENT]);
    expect(provider.provide).toEqual(DATA_LAKE_FILE_SYSTEM_CLIENT);
    expect(provider.useFactory).toBeDefined();
  });

});
