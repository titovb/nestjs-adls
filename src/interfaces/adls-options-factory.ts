import {AdlsOptions} from './adls-options';

export interface AdlsOptionsFactory {
  createAdlsOptions(): Promise<AdlsOptions> | AdlsOptions;
}
