import { prop, getModelForClass } from "@typegoose/typegoose";

export class Community {
  @prop({ required: true })
  public name?: string;

  @prop()
  public logo?: string;
}

export const CommunityModel = getModelForClass(Community);
