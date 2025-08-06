const express = require('express');
const router = express.Router();
const { getParticipants, createParticipant } = require('../controllers/participant.controller');

router.route('/')
  .get(getParticipants)
  .post(createParticipant);

module.exports = router;