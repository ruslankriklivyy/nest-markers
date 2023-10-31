import {
  AbstractPolymorphicRepository,
  PolymorphicRepository,
} from 'typeorm-polymorphic';
import { File } from '@/modules/file/entities/file.entity';

@PolymorphicRepository(File)
export class FileRepository extends AbstractPolymorphicRepository<File> {}
