import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../user/schemas/user.schema';

export type LayerDocument = Layer & mongoose.Document;

export type LayerType = 'public' | 'private';

export interface CustomField {
  id: string;
  name: string;
  type: string;
  is_important: boolean;
}

@Schema()
export class Layer {
  @Prop({ isRequired: true })
  name: string;

  @Prop({ isRequired: true })
  type: 'public' | 'private';

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop()
  custom_fields?: CustomField[];
}

export const LayerSchema = SchemaFactory.createForClass(Layer);
