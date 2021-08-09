import {AdlsCoreModule} from '../../src';
import {dataLakeClientAsyncProvider, dataLakeClientProvider} from '../../src/providers/data-lake-client.provider';
import {ADLS_OPTIONS} from '../../src/constants';

jest.mock('../../src/providers/data-lake-client.provider', () => ({
  dataLakeClientProvider: jest.fn().mockReturnValue({
    provide: 'dataLakeClientProvider',
    useValue: 'dataLakeClientProvider' as any
  }),
  dataLakeClientAsyncProvider: jest.fn().mockReturnValue({
    inject: ['options'],
    provide: 'dataLakeClientAsyncProvider',
    useFactory: 'dataLakeClientAsyncProvider' as any
  })
}));

jest.mock('../../src/providers/file-system-client.provider', () => ({
  fileSystemClientProvider: jest.fn().mockReturnValue({
    provide: 'fileSystemClientProvider',
    useValue: 'fileSystemClientProvider' as any
  }),
  fileSystemClientAsyncProvider: jest.fn().mockReturnValue({
    inject: ['options'],
    provide: 'fileSystemClientAsyncProvider',
    useFactory: 'fileSystemClientAsyncProvider' as any
  })
}));

describe('Adls Core Module unit tests', () => {
  it('should create module', () => {
    const module = AdlsCoreModule.forRoot({url: 'abc'});

    expect(module).toBeDefined();
    expect(module.exports).toStrictEqual([{
      provide: 'dataLakeClientProvider',
      useValue: 'dataLakeClientProvider'
    }, {
      provide: 'fileSystemClientProvider',
      useValue: 'fileSystemClientProvider'
    }]);
    expect(module.providers).toStrictEqual([{
      provide: 'dataLakeClientProvider',
      useValue: 'dataLakeClientProvider'
    }, {
      provide: 'fileSystemClientProvider',
      useValue: 'fileSystemClientProvider'
    }]);
    expect(module.module).toEqual(AdlsCoreModule);
  });

  it('should create module async', () => {
    const module = AdlsCoreModule.forRootAsync({
      inject: [],
      useFactory: {} as any,
      imports: []
    });

    expect(module).toBeDefined();
    expect(module.exports).toStrictEqual([{
      inject: ['options'],
      provide: 'dataLakeClientAsyncProvider',
      useFactory: 'dataLakeClientAsyncProvider'
    }, {
      inject: ['options'],
      provide: 'fileSystemClientAsyncProvider',
      useFactory: 'fileSystemClientAsyncProvider'
    }]);
    expect(module.providers).toStrictEqual([{
      inject: ['options'],
      provide: 'dataLakeClientAsyncProvider',
      useFactory: 'dataLakeClientAsyncProvider'
    }, {
      inject: ['options'],
      provide: 'fileSystemClientAsyncProvider',
      useFactory: 'fileSystemClientAsyncProvider'
    }, {
      inject: [],
      provide: ADLS_OPTIONS,
      useFactory: {} as any
    }]);
    expect(module.module).toEqual(AdlsCoreModule);
    expect(module.imports).toEqual([]);
  });

});
