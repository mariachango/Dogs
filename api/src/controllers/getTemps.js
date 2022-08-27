const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { YOUR_API_KEY } = process.env;
const { Dog, Temperament } = require("../db");

const apiData = async () => {
    const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
    const apiDt = await api.data.map(dg => {
        return {
            temperament: dg.temperament,
        }
    })

    const tempList = [];
    apiDt.forEach(dg => tempList.push(dg.temperament));
    console.log(tempList);
    const list = tempList.join(',').split(',').map(s => s.trim());
    console.log(list);
    list.map(async (temp) => {
        if (temp !== '') {
            await Temperament.findOrCreate({
                where: { name: temp },
            });
        }
    });
}

module.exports = {
    apiData
}