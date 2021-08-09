import {ModuleMetadata, Type} from '@nestjs/common';
import {AdlsOptionsFactory} from './adls-options-factory';
import {AdlsOptions} from './adls-options';

export interface AdlsAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<AdlsOptionsFactory>;
  useExisting?: Type<AdlsOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<AdlsOptions> | AdlsOptions;
}
