const supertest = require("supertest");
const app = require("../../../src/server.js");

describe("Movies Endpoint", () => {
  describe("GET /movies", () => {
    it("returns a list of movies", async () => {
      const response = await supertest(app).get("/movies");
      expect(response.status).toEqual(200);
      expect(response.body.data).not.toEqual(undefined);
      expect(response.body.data.length).toEqual(2);

      const [movie1, movie2] = response.body.data;
      expect(movie1.title).toEqual("The Matrix");
      expect(movie2.title).toEqual("Dodgeball");
    });
  });
  describe("POST /movies",  () => {
    it("will create a new movie", async () => {
      const request = {
        title: "Top Gun",
        runtimeMins: 110,
      };
      const response = await supertest(app).post("/movies").send(request);
      expect(response.status).toEqual(200);
      expect(response.body.data).not.toEqual(undefined);
      expect(response.body.data.title).toEqual(request.title);
      expect(response.body.data.runtimeMins).toEqual(request.runtimeMins);
      expect(response.body.data.createdAt).not.toEqual(undefined);
      expect(response.body.data.updatedAt).not.toEqual(undefined);
    });
    it("will return 400 if required request fields are missing", async () => {
      const request = {};
      const response = await supertest(app).post("/movies").send(request);
      expect(response.status).toEqual(400);
      expect(response.body.error).toEqual("both title and runtimeMins are required properties")
    });
  });
  describe('GET /movies/{movieId}', () => {
    it('will return the correct movie', async () => {
      const {matrixID} = process.env
      const response = await supertest(app).get(`/movies/${matrixID}`);
      expect(response.status).toEqual(200);
      expect(response.body.data).not.toEqual(undefined);
      expect(response.body.data.title).toEqual('The Matrix')
    })
    it('will 404 if the movie with the provided ID does not exist', async () => {
      const id = 10000
      const response = await supertest(app).get(`/movies/${id}`);
      expect(response.status).toEqual(404);
      expect(response.body.error).toEqual(`sorry movie id: ${id} not found`)
    })
  })
});
