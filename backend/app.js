const express = require('express');
const cors = require('cors');
const participantRoutes = require('./src/routes/participant.routes.js');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API do Desafio Técnico está no ar!');
});
app.use('/api/participants', participantRoutes);

module.exports = app;