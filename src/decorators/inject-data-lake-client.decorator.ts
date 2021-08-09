import {Inject} from '@nestjs/common';
import {DATA_LAKE_SERVICE_CLIENT} from '../constants';

export function InjectDataLakeClient(): ParameterDecorator {
  return Inject(DATA_LAKE_SERVICE_CLIENT);
}
