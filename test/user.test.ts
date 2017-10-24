import { } from "jest";
import * as supertest from "supertest";
import app from "../src/server";
// const request = supertest.agent(app);
const request = supertest("http://127.0.0.1:3000");
describe("get /users", () => {
  it("should return 200 OK", async () => {
   await request.get("/users").expect(200).end()

  });
});
describe("create /users", () => {
  it("should return 400 ", async () => {
    await request.post("/users").send({}).expect(400).end();
  });
  it("should return 200 OK", async() => {
   await request.post("/users").send({ name: "test", password: "test" }).expect(200).end();
  });
});

