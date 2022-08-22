const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { YOUR_API_KEY } = process.env;
const { Temperament } = require('../db');
const { apiData } = require('../controllers/getTemps.js');

router.get('/', async (req, res) => {
    try {
        await apiData();
        const temps = await Temperament.findAll();
        res.status(200).send(temps);;
    }
    catch (err) {
        console.log('GET TEMPERAMENTS ERROR--->', err);
        res.status(400).send('not found');
    }
});


module.exports = router;