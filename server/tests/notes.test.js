const request = require('supertest');
import app from "../index.js"
import mongoose from "mongoose";

const test_folder = "674ddb19b8f13e0d30a5919d";

describe(`GET /notes/${test_folder}`, () => {
    it('should return a list of notes', async () => {
        const response = await request(app).get(`/notes/${test_folder}`);
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(2);
    });
});

describe(`POST, PATCH, and DELETE /notes/${test_folder}`, () => {
    let note_id;

    it('should create a new note', async () => {
        const response = await request(app).post(`/notes/${test_folder}`).send({ name: "new note" });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe('new note');

        note_id = response.body._id;
    });

    it('should update the created note', async () => {
        const response = await request(app).patch(`/notes/${note_id}`).send({ name: 'updated note' });
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(note_id);
        expect(response.body.name).toBe('updated note');
    });

    it('should delete the created task', async () => {
        const response = await request(app).delete(`/notes/${note_id}`);
        expect(response.status).toBe(200); 
    });
});
