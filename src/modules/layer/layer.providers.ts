import { DataSource } from 'typeorm';

import { Layer } from '@/modules/layer/entities/layer.entity';

export const layerProviders = [
  {
    provide: 'LAYER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Layer),
    inject: ['DATA_SOURCE'],
  },
];
