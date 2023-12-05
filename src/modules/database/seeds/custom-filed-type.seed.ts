import dataSource from '@/modules/database/database.config';
import { CustomFieldType } from '@/modules/custom-field-type/entities/custom-field-type.entity';

export default async function CustomFieldTypeSeed() {
  const customFieldTypeRepository = dataSource.getRepository(CustomFieldType);

  const customFieldTypeInput = new CustomFieldType();
  customFieldTypeInput.name = 'Input';
  customFieldTypeInput.slug = 'input';

  const customFieldTypeTextarea = new CustomFieldType();
  customFieldTypeTextarea.name = 'Textarea';
  customFieldTypeTextarea.slug = 'textarea';

  await customFieldTypeRepository.insert([
    customFieldTypeInput,
    customFieldTypeTextarea,
  ]);
}
