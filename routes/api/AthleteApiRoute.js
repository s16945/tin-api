const express = require('express');
const router = express.Router();

const athleteApiController = require('../../api/AthleteAPI');

router.get('/', athleteApiController.getAthletes);
router.get('/:athleteId', athleteApiController.getAthleteById);
router.post('/', athleteApiController.createAthlete);
router.put('/:athleteId', athleteApiController.updateAthlete);
router.delete('/:athleteId', athleteApiController.deleteAthlete);

module.exports = router;

