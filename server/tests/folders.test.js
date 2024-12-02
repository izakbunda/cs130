const request = require('supertest');
import app from "../index.js"
import mongoose from "mongoose";

const test_user = "674d8bc2f443dedf4529ec55";

describe(`GET /folders/${test_user}`, () => {
    it('should return a list of folders', async () => {
        const response = await request(app).get(`/folders/${test_user}`);
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(2);
    });
});

describe(`POST, PATCH, and DELETE /folders/${test_user}`, () => {
    let folder_id;

    it('should create a new folder', async () => {
        const response = await request(app).post(`/folders/${test_user}`).send({ name: 'folder #1' });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe('folder #1');

        folder_id = response.body._id;
    });

    it('should return 400 if name is missing', async () => {
        const response = await request(app).post(`/folders/${test_user}`).send({});
        expect(response.status).toBe(400);
    });

    it('should update the created folder', async () => {
        const response = await request(app).patch(`/folders/${folder_id}`).send({ name: 'updated folder #1' });
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(folder_id);
        expect(response.body.name).toBe('updated folder #1');
    });

    it('should delete the created folder', async () => {
        const response = await request(app).delete(`/folders/${folder_id}`);
        expect(response.status).toBe(200); 
    });

    it('should return 404 for a non-existent item', async () => {
        const response = await request(app).delete(`/folders/674d8bc2f443dedf4529ec54`);
        expect(response.status).toBe(404); 
    }); 
});

afterAll(() => mongoose.connection.close())