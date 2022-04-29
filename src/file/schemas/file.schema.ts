import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../user/schemas/user.schema';

export type FileDocument = File & mongoose.Document;

@Schema()
export class File {
  @Prop()
  filename: string;

  @Prop()
  size: number;

  @Prop()
  ext: string;

  @Prop()
  url: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const FileSchema = SchemaFactory.createForClass(File);
