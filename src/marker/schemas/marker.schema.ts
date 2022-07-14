import * as mongoose from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomField, Layer } from '../../layer/schemas/layer.schema';
import { User } from '../../user/schemas/user.schema';

export type MarkerDocument = Marker & mongoose.Document;

export interface MarkerCustomField extends CustomField {
  value: string | File;
}

@Schema()
export class Marker {
  @Prop({ isRequired: true })
  marker_color: string;

  @Prop({ isRequired: true })
  title: string;

  @Prop({ isRequired: true })
  description: string;

  @Prop(
    raw({
      _id: { type: String },
      url: { type: String },
    }),
  )
  preview: { type: Object };

  @Prop(
    raw({
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    }),
  )
  location: { type: Object; required: true };

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Layer' })
  layer: Layer;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  custom_fields: MarkerCustomField[];
}

export const MarkerSchema = SchemaFactory.createForClass(Marker);
