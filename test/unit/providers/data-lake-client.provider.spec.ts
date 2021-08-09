import {DataLakeServiceClient, StorageSharedKeyCredential} from '@azure/storage-file-datalake';
import {dataLakeClientAsyncProvider, dataLakeClientProvider} from '../../../src/providers/data-lake-client.provider';
import {ADLS_OPTIONS, DATA_LAKE_SERVICE_CLIENT} from '../../../src/constants';

describe(`Data Lake Client Provider unit tests`, () => {

  it('should return data lake client provider', () => {
    const dataLakeServiceClient = new DataLakeServiceClient(
      'url',
      new StorageSharedKeyCredential(
        'name',
        'key'
      )
    );

    const provider = dataLakeClientProvider(dataLakeServiceClient);

    expect(provider).toBeDefined();
    expect(provider).toStrictEqual({
      provide: DATA_LAKE_SERVICE_CLIENT,
      useValue: dataLakeServiceClient
    });
  });

  it('should return data lake client async provider', () => {
    const provider = dataLakeClientAsyncProvider();

    expect(provider).toBeDefined();
    expect(provider.inject).toStrictEqual([ADLS_OPTIONS]);
    expect(provider.provide).toEqual(DATA_LAKE_SERVICE_CLIENT);
    expect(provider.useFactory).toBeDefined();
  });

});
