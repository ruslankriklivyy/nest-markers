import { DataSource } from 'typeorm';

import { Marker } from '@/modules/marker/entities/marker.entity';

export const markerProviders = [
  {
    provide: 'MARKER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Marker),
    inject: ['DATA_SOURCE'],
  },
];
