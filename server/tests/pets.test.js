const request = require('supertest');
import app from "../index.js"
import mongoose from "mongoose";

const test_pet = "674e019ad9f88e637f644c7f";

describe(`GET /pets/${test_pet}`, () => {
    it('should return your pet', async () => {
        const response = await request(app).get(`/pets/${test_pet}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('awesome pet');
        expect(response.body.type).toBe('Sharkie');
    });
});
