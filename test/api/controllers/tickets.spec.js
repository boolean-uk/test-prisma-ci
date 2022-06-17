const supertest = require("supertest");
const app = require("../../../src/server.js");
const { createMovie } = require("../../helpers/create-movie.js");
const { createScreen } = require("../../helpers/create-screen.js");
const { createCustomer } = require("../../helpers/create-customer.js");

describe("Tickets endpoint", () => {
  describe("POST /tickets", () => {
    it("will create a new ticket", async () => {
      const screen = await createScreen(1);
      const movie = await createMovie("The Matrix", 136, screen);
      const customer = await createCustomer("John", "123456", "john@test.com");
      const request = {
        screeningId: movie.screenings[0].id,
        customerId: customer.id,
      };

      const response = await supertest(app).post("/tickets").send(request);
      expect(response.status).toEqual(200);
      expect(response.body.data).not.toEqual(undefined);
      expect(response.body.data.customerId).toEqual(request.customerId);
      expect(response.body.data.screeningId).toEqual(request.screeningId);
    });
    it("will return bad request if screenId or customerID is not provided", async () => {
      const request = {};

      const response = await supertest(app).post("/tickets").send(request);
      expect(response.status).toEqual(400);
      expect(response.body.error).toEqual('both screeningId and customerId are required and should point to existing resources');
    });
    it("will return bad request if screenId or customerID point to a non-existing resource", async () => {
        const request = {
            screeningId: 10000,
            customerId: 10000
        };
  
        const response = await supertest(app).post("/tickets").send(request);
        expect(response.status).toEqual(400);
        expect(response.body.error).toEqual('both screeningId and customerId are required and should point to existing resources');
      });
  });
});
