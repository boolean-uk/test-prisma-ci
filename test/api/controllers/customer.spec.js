const supertest = require("supertest");
const app = require("../../../src/server.js");
const { createCustomer } = require("../../helpers/create-customer.js");

describe("Customer Endpoint", () => {
  describe("POST /customer/register", () => {
    it("will create a new customer", async () => {
      const request = {
        name: "john",
        phone: "123456",
        email: "john@test.com",
      };

      const response = await supertest(app)
        .post("/customer/register")
        .send(request);

      expect(response.status).toEqual(200);
      expect(response.body.data).not.toEqual(undefined);
      expect(response.body.data.id).not.toEqual(undefined);
      expect(response.body.data.name).toEqual(request.name);
      expect(response.body.data.contact.phone).toEqual(request.phone);
      expect(response.body.data.contact.email).toEqual(request.email);
    });
    it("will return 400 if one of the required fields is missing", async () => {
      const response = await supertest(app).post("/customer/register").send({});

      expect(response.status).toEqual(400);
      expect(response.body.error).toEqual(
        "one or more of the required fields are missing or invalid"
      );
    });
    it("will return 409 when attemping to register a customer with an in-use email address", async () => {
      const request = {
        name: "john",
        phone: "123456",
        email: "john@test.com",
      };
      await createCustomer(request.name, request.phone, request.email);
      const response = await supertest(app)
        .post("/customer/register")
        .send(request);

      expect(response.status).toEqual(409);
      expect(response.body.error).toEqual(
        "the email provided is already in use"
      );
    });
  });
  describe("PATCH /customer/:id", () => {
    it("can update a customers name", async () => {
      const customer = await createCustomer("John", "123456", "john@test.com");
      const request = {
        name: "Jane",
      };

      const response = await supertest(app)
        .patch(`/customer/${customer.id}`)
        .send(request);
      expect(response.status).toEqual(200);
      expect(response.body.data).not.toEqual(undefined);
      expect(response.body.data.name).toEqual(request.name);
    });
    it('will return 404 if the customer is not found', async () => {
      const request = {
        name: "Jane",
      };

      const response = await supertest(app)
        .patch(`/customer/10000`)
        .send(request);
      expect(response.status).toEqual(404);
      expect(response.body.error).toEqual('customer not found');
    })
  });
});
