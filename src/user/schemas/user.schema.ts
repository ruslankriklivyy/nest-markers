import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop(
    raw({
      _id: { type: String },
      url: { type: String },
    }),
  )
  avatar: { _id?: string; url: string };

  @Prop({ required: true })
  full_name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  password?: string;

  @Prop({ required: true })
  is_activated: boolean;

  @Prop({ required: true })
  activation_link: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
