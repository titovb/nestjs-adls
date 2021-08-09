import {
  AnonymousCredential,
  StoragePipelineOptions,
  StorageSharedKeyCredential
} from '@azure/storage-file-datalake';

export interface AdlsOptions {
  url: string;
  fileSystemName?: string;
  credential?: StorageSharedKeyCredential | AnonymousCredential;
  options?: StoragePipelineOptions;
}
