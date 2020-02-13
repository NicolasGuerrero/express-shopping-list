process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app")
let items = require("./fakeDB")

let banana = {"name": "banana", "price": 0.99};
let apple = {}

beforeEach(function() {
  items.push(banana);
});

afterEach(function() {
  items.length = 0;
});

describe("GET /items", function() {
  it("Retrieves list of items", async function() {
    const resp = await request(app).get("/items");
    
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(items)
  });
});

describe("POST /items", function() {
  it("Creates a new shopping list item", async function() {
    const resp = await request(app)
      .post("/items")
      .send({
        name: "apple",
        price: 1.25
      });
    
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      added: { name: "apple", price: 1.25 }
    });

    const appleResp = await request(app).get("/items/apple");
    
    expect(appleResp.statusCode).toBe(200);
  });
});

describe("GET /items/:name", function() {
  it("Retrieves a single item", async function() {
    const resp = await request(app).get(`/items/${banana.name}`);
    
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(banana)
  });
});

describe("PATCH /items/:name", function() {
  it("Updates a shopping list item", async function() {
    const resp = await request(app)
      .patch(`/items/${banana.name}`)
      .send({
        name: "new banana",
        price: 2.50
      });
    
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      updated: { name: "new banana", price: 2.50 }
    });
  });
});

describe("Delete /items/:name", function() {
  it("Deletes a shopping list item", async function() {
    const resp = await request(app)
      .delete(`/items/${banana.name}`);
    
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      message: "Deleted"
    });

    const secondResp = await request(app).get(`/items/${banana.name}`);
    
    expect(secondResp.statusCode).toBe(400);
  });
});