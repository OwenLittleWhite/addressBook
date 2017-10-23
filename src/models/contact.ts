import * as mongoose from "./db";

export class ContactModel {
  _id: string;
  name: string;
  phone: string;
  address: string;
  owner: number;
  constructor(options: any) {
    this._id = options._id || "";
    this.name = options.name || "";
    this.phone = options.phone || "";
    this.address = options.address || "";
    this.owner = options.owner || 0;
  }
}

const init = (options: any) => {
  return new ContactModel(options);
};
const initArr = (options: any[]) => {
  const contactArr: ContactModel[] = [];
  options.forEach((option) => {
    contactArr.push(new ContactModel(option));
  });
  return contactArr;
};
const Schema = mongoose.Schema;
const schemaOptions = { autoIndex: false, collection: "contacts", discriminatorKey: "_type" };
const ContactSchema = new Schema({
  name: { type: String },
  phone: { type: String },
  address: { type: String },
  owner: { type: Number },
  active: { type: Boolean },
  _type: { type: String, default: "Contact" }
});

/*********************************************
 * Export as a module
**********************************************/

const ContactRepository = mongoose.model("Contact", ContactSchema);

export let findContactsByOwner = async (owner: number) => {
  const conditions = ContactRepository.find();
  conditions.where("owner").equals(owner);
  const contacts = await conditions.exec();
  return initArr(contacts);
};

export let createContact = (contact: ContactModel) => {
  const contactRepo = new ContactRepository(contact);
  const created = contactRepo.save();
  return init(created);
};
