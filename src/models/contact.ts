import * as mongoose from "./db";

export class ContactModel {
  _id: string;
  name: string;
  phone: string;
  address: string;
  owner: number;
  constructor(options: any) {
    this._id = options._id;
    this.name = options.name || "";
    this.phone = options.phone || "";
    this.address = options.address || "";
    this.owner = options.owner;
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
  return new Promise((resolve, reject) => {
    contactRepo.save(function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(init(data));
      }
    });
  });
};
export let remove = async (id: any) => {
  const conditions = ContactRepository.find();
  conditions.where("_id").equals(id);
  const contacts = await conditions.exec();
  if (contacts.length == 0) {
    throw ({ code: 404, message: "not found" });
  } else {
    return new Promise((resolve, reject) => {
      contacts[0].remove((err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

  }
};