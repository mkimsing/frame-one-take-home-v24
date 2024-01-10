import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { Community } from "./Community";
class User {
  @prop({ required: true })
  public email?: string;

  @prop({ required: true, select: false })
  public passwordHash?: string;

  @prop()
  public profilePicture?: string;

  @prop({ required: true, select: false, default: [] })
  public experiencePoints?: { points: number; timestamp: Date }[];

  @prop({ ref: "Community" })
  public community?: Ref<Community>;
}

export const UserModel = getModelForClass(User);
