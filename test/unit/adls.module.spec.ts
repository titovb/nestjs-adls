import {AdlsCoreModule} from '../../src';
import {AdlsModule} from '../../src';

describe('Adls Module unit test', () => {

  it('should create module', () => {
    jest.spyOn(AdlsCoreModule, 'forRoot').mockReturnValue({
      exports: [],
      providers: [],
      module: AdlsCoreModule
    });

    const module = AdlsModule.forRoot({url: 'url'});

    expect(module).toBeDefined();
    expect(module).toStrictEqual({
      module: AdlsModule,
      imports: [{
        exports: [],
        providers: [],
        module: AdlsCoreModule
      }]
    });
  });

  it('should create module async', () => {
    jest.spyOn(AdlsCoreModule, 'forRootAsync').mockReturnValue({
      exports: [],
      providers: [],
      module: AdlsCoreModule
    });

    const module = AdlsModule.forRootAsync({inject: [], imports: [], useFactory: () => ({url: 'url'})});

    expect(module).toBeDefined();
    expect(module).toStrictEqual({
      module: AdlsModule,
      imports: [{
        exports: [],
        providers: [],
        module: AdlsCoreModule
      }]
    });
  });

});
