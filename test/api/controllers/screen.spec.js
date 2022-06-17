const supertest = require("supertest");
const app = require("../../../src/server.js");

describe("Screen endpoint", () => {
  describe("POST /screens", () => {
    it("will create a new screen", async () => {
      const request = {
        number: 1,
      };
      const response = await supertest(app).post("/screens").send(request);
      expect(response.status).toEqual(200);
      expect(response.body.data).not.toEqual(undefined);
      expect(response.body.data.number).toEqual(request.number);
    });
    it("will return 400 if number is not provided", async () => {
      const request = {};
      const response = await supertest(app).post("/screens").send(request);
      expect(response.status).toEqual(400);
      expect(response.body.error).toEqual('number is required');
    });
  });
});
