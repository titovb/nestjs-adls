# NestJS Azure Data Lake Storage
## Overview
[Azure Data Lake Storage(ADLS)](https://docs.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-introduction) module for [NestJS](https://nestjs.com/) framework.

## Before installation
* Create Azure Data Lake Storage resource ([read more](https://docs.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-introduction)).
* Get credentials from Azure Data Lake Storage using [Azure Portal](https://portal.azure.com/).

## Installation
* `npm i --save @azure/storage-file-datalake nestjs-adls`

## Usage

1. Import AdlsModule to your AppModule:
```typescript
import {Module} from '@nestjs/common';
import {StorageSharedKeyCredential} from '@azure/storage-file-datalake';
import {AdlsModule} from 'nestjs-adls';

@Module({
  imports: [
    AdlsModule.forRoot({
      url: 'ADLS_URL',
      fileSystemName: 'ADLS_FILE_SYSTEM_NAME',
      credential: new StorageSharedKeyCredential(
        'ADLS_ACCOUNT_NAME',
        'ADLS_ACCOUNT_KEY'
      )
    })
  ],
  providers: [AppService]
})
export class AppModule {
}
```

Or async:

```typescript
import {Module} from '@nestjs/common';
import {StorageSharedKeyCredential} from '@azure/storage-file-datalake';
import {AdlsModule} from 'nestjs-adls';

@Module({
  imports: [
    AdlsModule.forRootAsync({
      useFactory: () => ({
        url: 'ADLS_URL',
        fileSystemName: 'ADLS_FILE_SYSTEM_NAME',
        credential: new StorageSharedKeyCredential(
          'ADLS_ACCOUNT_NAME',
          'ADLS_ACCOUNT_KEY'
        )
      })
    })
  ],
  providers: [AppService]
})
export class AppModule {
}
```

2. Use `@InjectFileSystemClient()` decorator to inject `DataLakeFileSystemClient`. (will be used fileSystemName from AdlsModule options).

```typescript
import {Injectable} from '@nestjs/common';
import {DataLakeFileSystemClient} from '@azure/storage-file-datalake';
import {InjectFileSystemClient} from 'nestjs-adls';

@Injectable()
export class AppService {
  constructor(@InjectFileSystemClient() private readonly adlsClient: DataLakeFileSystemClient) {
  }
}
```

Or use `@InjectDataLakeClient()` decorator to inject `DataLakeServiceClient`.

```typescript
import {Injectable} from '@nestjs/common';
import {DataLakeServiceClient} from '@azure/storage-file-datalake';
import {InjectDataLakeClient} from 'nestjs-adls';

@Injectable()
export class AppService {
  constructor(@InjectDataLakeClient() private readonly adlsClient: DataLakeServiceClient) {
  }
}
```
