const request = require('supertest');
const app = require('../src/index'); // Ajuste o caminho conforme necessário
const mongoose = require('mongoose');
const Donation = require('../src/models/donation.model');

describe('Donation API', () => {
  beforeAll(async () => {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/test'; // Use um banco de dados de teste
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await Donation.deleteMany(); // Limpa a coleção de doações após os testes
    await mongoose.connection.close();
  });

  it('should create a donation', async () => {
    const response = await request(app)
      .post('/donations')
      .send({ nome: 'John Doe', cpf: '12345678901', anonimato: false });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.nome).toBe('John Doe');
  });

  it('should get all donations', async () => {
    const response = await request(app).get('/donations');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should delete a donation', async () => {
    const donation = await Donation.create({ nome: 'Jane Doe', cpf: '10987654321', anonimato: false });

    const response = await request(app).delete(`/donations/${donation._id}`);

    expect(response.status).toBe(204);
  });

  it('should return 404 for non-existing donation', async () => {
    const response = await request(app).delete('/donations/60d5ec49f1b2c8b1f8e4e4e4'); // ID inválido

    expect(response.status).toBe(404);
  });
});