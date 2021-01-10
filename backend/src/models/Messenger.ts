import mongoose, { Schema, Document, model, Model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface IMessenager extends Document {
  topic: String,
  server: String
}

export let MessengerSchema: Schema<IMessenager> = new Schema({
  topic: {
    type: String,
    required: "Please provide a topic"
  },
  server: {
    type: String,
    required: "Please provide a Server"
  }
});

MessengerSchema.plugin(uniqueValidator);



interface MessengerSchemaDoc extends IMessenager, Document {}

const MessengerModel: Model<MessengerSchemaDoc> = model<MessengerSchemaDoc>(
  "Messenger",
  MessengerSchema
);

export default MessengerModel;
