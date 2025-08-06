const Participant = require('../models/participant.model');

exports.getParticipants = async (req, res) => {
  try {
    const participants = await Participant.find();
    res.status(200).json(participants);
  } catch (error) {
    console.error('ERRO AO BUSCAR PARTICIPANTES:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createParticipant = async (req, res) => {
  console.log('--- [CONTROLLER] Requisição para criar participante recebida ---');
  
  console.log('[CONTROLLER] Dados recebidos no req.body:', req.body);

  const { firstName, lastName, participation } = req.body;

  if (!firstName || !lastName || participation === undefined) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (typeof participation !== 'number' || participation <= 0) {
    return res.status(400).json({ message: 'Participation must be a positive number.' });
  }

  try {
    console.log('[CONTROLLER] Entrou no bloco try...');

    const allParticipants = await Participant.find({});
    console.log('[CONTROLLER] Buscou participantes existentes.');

    const totalParticipation = allParticipants.reduce((sum, p) => sum + p.participation, 0);
    console.log(`[CONTROLLER] Participação total atual: ${totalParticipation}%`);

    if (totalParticipation + participation > 100) {
      console.log('[CONTROLLER] ERRO DE VALIDAÇÃO: Participação excederia 100%');
      return res.status(400).json({ message: `Não é possível adicionar participantes. A participação total excederia 100%. Total atual: ${totalParticipation}%` });
    }

    const newParticipant = await Participant.create({
      firstName,
      lastName,
      participation
    });
    console.log('[CONTROLLER] Participante criado com sucesso no banco.');

    res.status(201).json(newParticipant);

  } catch (error) {
    console.error('--- [CONTROLLER] ERRO CAPTURADO NO BLOCO CATCH! ---');
    console.error(error);
    
    res.status(500).json({ message: 'Server error' });
  }
};