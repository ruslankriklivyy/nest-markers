import dataSource from '@/modules/database/database.config';
import { Layer } from '@/modules/layer/entities/layer.entity';
import { LAYER_TYPE } from '@/consts/LAYER_TYPE_PUBLIC';

export default async function LayerSeed() {
  const layerRepository = dataSource.getRepository(Layer);

  const layerPublic = new Layer();
  layerPublic.name = 'Public layer';
  layerPublic.type = LAYER_TYPE.Public;
  layerPublic.author_id = 2;

  const layerPrivate = new Layer();
  layerPrivate.name = 'Private layer';
  layerPrivate.type = LAYER_TYPE.Private;
  layerPrivate.author_id = 1;

  await layerRepository.insert([layerPublic, layerPrivate]);
}
