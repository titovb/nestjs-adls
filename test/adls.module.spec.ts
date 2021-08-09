import {Injectable, Module} from '@nestjs/common';
import {AdlsModule} from '../src';
import {InjectDataLakeClient} from '../src';
import {DataLakeFileSystemClient, DataLakeServiceClient} from '@azure/storage-file-datalake';
import {InjectFileSystemClient} from '../src';
import {Test} from '@nestjs/testing';

@Injectable()
class AppService {
  constructor(@InjectDataLakeClient() public dataLakeClient: DataLakeServiceClient,
              @InjectFileSystemClient() public fileSystemClient: DataLakeFileSystemClient) {
  }
}

@Module({
  imports: [
    AdlsModule.forRoot({
      url: 'url',
      fileSystemName: 'test'
    })
  ],
  providers: [AppService]
})
class AppModule {
}

@Module({
  imports: [
    AdlsModule.forRoot({
      url: 'url'
    })
  ],
  providers: [AppService]
})
class AppModule2 {
}

@Module({
  imports: [
    AdlsModule.forRootAsync({
      inject: [],
      useFactory: () => ({
        url: 'url',
        fileSystemName: 'test'
      }),
      imports: []
    })
  ],
  providers: [AppService]
})
class AppModule3 {
}

describe('Adls Module tests', () => {
  it('should inject dataLakeClient & fileSystemClient when import', async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    const service = module.get<AppService>(AppService);
    expect(service.dataLakeClient).toBeDefined();
    expect(service.dataLakeClient).not.toBeNull();
    expect(service.fileSystemClient).toBeDefined();
    expect(service.fileSystemClient).not.toBeNull();
  });

  it('should fileSystemClient be null', async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule2]
    }).compile();

    const service = module.get<AppService>(AppService);
    expect(service.dataLakeClient).toBeDefined();
    expect(service.dataLakeClient).not.toBeNull();
    expect(service.fileSystemClient).toBeNull();
  });

  it('should inject dataLakeClient & fileSystemClient when import async', async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule3]
    }).compile();

    const service = module.get<AppService>(AppService);
    expect(service.dataLakeClient).toBeDefined();
    expect(service.dataLakeClient).not.toBeNull();
    expect(service.fileSystemClient).toBeDefined();
    expect(service.fileSystemClient).not.toBeNull();
  });
});
