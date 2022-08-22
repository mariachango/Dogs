const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { YOUR_API_KEY } = process.env;
const { Dog, Temperament } = require('../db');
const { allData } = require('../controllers/getAll.js');
const { apiData } = require('../controllers/getTemps.js');
// ________________________________________________________________________
// Ruta principal: debe contener

// [ ] Input de búsqueda para encontrar razas de perros por nombre
// [ ] Área donde se verá el listado de razas de perros. Deberá mostrar su:
// Imagen
// Nombre
// Temperamento
// Peso
// [ ] Botones/Opciones para filtrar por:
// Temperamento
// Raza existente (es decir las que vienen de la API) o agregada por nosotros (creadas mediante el form)
// [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente las razas de perro por:
// Orden alfabético
// Peso
// [ ] Paginado para ir buscando y mostrando las siguientes razas, mostrando 8 razas por página.

router.get('/', async (req, res) => {
    const getAllData = await allData();
    let name = req.query.name;
    let foundDog
    if (name) foundDog = getAllData.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
    try {
        if (foundDog) {
            res.status(200).send(foundDog);
        } else {
            res.status(200).send(getAllData);
        }
    } catch (err) {
        console.log('GET DOGS ERROR--->', err);
        res.status(404);
    }
});

// ___________________________________________________
// Ruta de detalle de raza de perro: debe contener

// [ ] Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
// [ ] Altura
// [ ] Peso
// [ ] Años de vida

router.get('/:id', async (req, res) => {
    const getAllData = await allData();
    let { id } = req.params;
    try {
        let foundDog = await getAllData.filter(dog => dog.id == id);
        if (foundDog.length !== 0) {
            res.status(200).send(foundDog);
        } else {
            res.status(400).send('not found');
        }
    } catch (err) {
        console.log('GET DOGS BY ID ERROR--->', err);
    }
});

// ______________________________________________________________________
// Ruta de creación de raza de perro: debe contener

// [ ] Un formulario controlado con JavaScript con los siguientes campos:
// Nombre
// Altura (Diferenciar entre altura mínima y máxima)
// Peso (Diferenciar entre peso mínimo y máximo)
// Años de vida
// [ ] Posibilidad de seleccionar/agregar uno o más temperamentos
// [ ] Botón/Opción para crear una nueva raza de perro

router.post('/', async (req, res) => {
    const {
        name,
        min_weight,
        max_weight,
        min_height,
        max_height,
        min_life_span,
        max_life_span,
        temperament,
    } = req.body;

    const weight = `${min_weight} - ${max_weight}`;
    const height = `${min_height} - ${max_height}`;
    const life_span = `${min_life_span} - ${max_life_span} years`;
    
    try {
        if (name && weight && height) {
            const createdDog = await Dog.create({
                name,
                weight,
                height,
                life_span,
            })

            if (temperament) {
                
                await apiData();
                
                temperament.forEach( async t  => {
                    const temp = await Temperament.findOne({
                    where: { name: t },
                });

                await createdDog.addTemperaments(temp);
                }); 
                
            }
            res.status(200).send(createdDog);
        } else {
            res.status(400).send('MISSING FIELDS');
        }
    } catch (err) {
        console.log('POST DOGS ERROR--->', err);
    }
});

module.exports = router;