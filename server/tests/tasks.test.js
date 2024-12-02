const request = require('supertest');
import app from "../index.js"
import mongoose from "mongoose";

const test_note = "674dddfafeda77b61390aea9";

describe(`GET /tasks/${test_note}`, () => {
    it('should return a list of tasks', async () => {
        const response = await request(app).get(`/tasks/${test_note}`);
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(4);
    });
});

describe(`POST, PATCH, and DELETE /tasks/${test_note}`, () => {
    let task_id;

    it('should create a new task', async () => {
        const response = await request(app).post(`/tasks/${test_note}`).send({ name: "new task" });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe('new task');

        task_id = response.body._id;
    });

    it('should update the created task', async () => {
        const response = await request(app).patch(`/tasks/${task_id}`).send({ category: 'medium' });
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(task_id);
        expect(response.body.category).toBe('medium');
    });

    it('should delete the created task', async () => {
        const response = await request(app).delete(`/tasks/${task_id}`);
        expect(response.status).toBe(200); 
    });
});
