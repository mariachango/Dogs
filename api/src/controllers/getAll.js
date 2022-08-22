const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { YOUR_API_KEY } = process.env;
const { Dog, Temperament } = require("../db");

const apiData = async () => {
    const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
    const apiDt = await api.data.map(dg => {
        return {
            id: dg.id,
            name: dg.name,
            height: dg.height.metric,
            weight: dg.weight.metric,
            life_span: dg.life_span,
            temperament: dg.temperament,
            image: dg.image.url,
        }
    })
    return apiDt;
}

const dbData = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
};

const allData = async () => {
    let apiDt = await apiData();
    let dbDt = await dbData();

    return apiDt.concat(dbDt);
}

module.exports = {
    allData
}