require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const participantRoutes = require('./src/routes/participant.routes.js');

const app = express();

const PORT = process.env.PORT || 5000; 

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API do Desafio Técnico está no ar!');
});
app.use('/api/participants', participantRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {

    console.log('Conectado ao MongoDB com sucesso!');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log('CORS está habilitado para todas as origens.');
    });
  })
  .catch((err) => {
    console.error('Erro fatal ao conectar ao MongoDB:', err);
    process.exit(1);
  });