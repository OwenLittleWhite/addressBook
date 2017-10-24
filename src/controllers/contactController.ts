import * as Contact from "../models/contact";
import * as User from "../models/user";
import * as Router from "koa-router";
const ContactModel = Contact.ContactModel;
export let create = async (ctx: any, next: any) => {
  const body = ctx.request.body;
  const owner = ctx.params.userId;
  body.owner = owner;
  try {
    if (!body.name) {
      throw ({ code: 400, message: "bad request!" });
    }
    const newContact = new ContactModel(body);
    const result = await Contact.createContact(newContact);
    ctx.body = JSON.stringify(result);

  } catch (err) {
    console.log(err);
    ctx.response.status = err.code;
    ctx.response.message = err.message;
  }
};

export let getAll = async (ctx: any, next: any) => {
  try {
    const owner = ctx.params.userId;
    const result = await Contact.findContactsByOwner(owner);
    ctx.body = JSON.stringify(result);
  } catch (err) {
    ctx.response.status = err.code;
    ctx.response.message = err.message;
  }
};

export let isAuth = async (ctx: any, next: any) => {
  const owner = ctx.params.userId;
  if (!ctx.isAuthenticated() || owner != ctx.state.user.id) {
    ctx.response.status = 401;
    ctx.response.message = "unauthorized";
  } else {
    await next();
  }
};

export let remove = async (ctx: any, next: any) => {
  try {
    const owner = ctx.params.userId;
    const contactId = ctx.params.contactId;
    const result = await Contact.remove(contactId);
    ctx.body = JSON.stringify(result);
  } catch (err) {
    ctx.response.status = err.code;
    ctx.response.message = err.message;
  }
};

