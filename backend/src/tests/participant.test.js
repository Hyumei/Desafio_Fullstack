const request = require('supertest');
const app = require('../../server'); // Supondo que seu server.js exporte o app
const mongoose = require('mongoose');
const Participant = require('../models/participant.model');

beforeAll(async () => {
  const url = 'mongodb://127.0.0.1/test_db';
  await mongoose.connect(url, { useNewUrlParser: true });
});

afterEach(async () => {
  await Participant.deleteMany();
});

describe('Participants API', () => {

  it('Deve criar um participante com sucesso', async () => {
    const res = await request(app)
      .post('/api/participants')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        participation: 10
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('firstName', 'John');
  });

  it('Não deve criar um participante se um campo estiver faltando (erro 400)', async () => {
    const res = await request(app)
      .post('/api/participants')
      .send({
        firstName: 'Jane',
        lastName: 'Doe'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('mensagem:', 'Todos os campos são obrigatórios.');
  });
  
  it('Deve falhar se a participação total exceder 100 (erro 400)', async () => {
    await Participant.create([
        { firstName: 'User', lastName: 'A', participation: 50 },
        { firstName: 'User', lastName: 'B', participation: 40 }
    ]);

    const res = await request(app)
      .post('/api/participants')
      .send({
        firstName: 'User',
        lastName: 'C',
        participation: 20
      });
      
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toContain('exceed 100%');
  });

  it('should fetch all participants', async () => {
    await Participant.create({ firstName: 'Test', lastName: 'User', participation: 5 });
    
    const res = await request(app).get('/api/participants');
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].firstName).toBe('Test');
  });
});