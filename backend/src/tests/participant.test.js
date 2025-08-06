const request = require('supertest');
const app = require('../../app');
const Participant = require('../models/participant.model');

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
    expect(res.body).toHaveProperty('message', 'All fields are required.');
  });

  it('Deve falhar se a participação total exceder 100 (erro 400)', async () => {
    await Participant.create({ firstName: 'User', lastName: 'A', participation: 95 });

    const res = await request(app)
      .post('/api/participants')
      .send({
        firstName: 'User',
        lastName: 'C',
        participation: 10
      });
      
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toContain('excederia 100%');
  });

  it('Deve buscar todos os participantes', async () => {
    await Participant.create({ firstName: 'Test', lastName: 'User', participation: 5 });
    
    const res = await request(app).get('/api/participants');
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].firstName).toBe('Test');
  });
});