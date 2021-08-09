import {Inject} from '@nestjs/common';
import {DATA_LAKE_FILE_SYSTEM_CLIENT} from '../constants';

export function InjectFileSystemClient(): ParameterDecorator {
  return Inject(DATA_LAKE_FILE_SYSTEM_CLIENT);
}
