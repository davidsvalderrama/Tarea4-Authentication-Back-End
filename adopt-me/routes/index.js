const express = require('express');
const animalsAPI = require('./animalsAPI');
const router = express.Router();
const Joi = require('joi');

const usersAPI = require('./usersAPI');

//Validaciones del esquema
const schema = Joi.object({
  animalname: Joi.string().min(5).required(),
  breedname :Joi.string(),
  speciesname: Joi.string(),
  animalage: Joi.string().required(),
  basecolour: Joi.string()
});

let fullDataAnimals = animalsAPI.fullDataAnimals;
let usersData = usersAPI.usersData;

router.get('/database', (req, res ) => {
  res.send("usuarios registrados");
})

/* GET home page. */
router.get('/animals', async function (req, res, next) {
  res.render('index', { fullDataAnimals, isLoggedIn: Boolean(req.user)});
});

// Get Details page
router.get('/:id', (req, res) => {
  const {id, imageUrl} = req.params;
  const {url} = req.query;
  const animal = fullDataAnimals.find(animal => animal.id == id);
  res.render('details', {animal, isLoggedIn: Boolean(req.user)});
});

// Get adopt Page
router.get('/:id/adopt', (req, res) => {
  const {id} = req.params;
  const animal = fullDataAnimals.find(animal => animal.id == id);
  res.render('adopt', {animal, isLoggedIn: Boolean(req.user)});
  
});

//assign owner
router.post('/own/:id',function(req, res){
  const iduser = req.body.idtx;
  const animal = fullDataAnimals.find(animal => animal.id == req.params.id)
  animal.owner = usersData.find(user => user.id == iduser).fullname;
  //console.log(animal);
  res.render('index', { fullDataAnimals, isLoggedIn: Boolean(req.user) });
});

//Update cat
router.put('/animals/:id',function(req, res){
  const { id } = req.params;
  const { animalname, breedname, speciesname, animalage, basecolour} = req.body;
  const { animal, err } = animalsAPI.updateA(id, animalname, breedname, speciesname, animalage, basecolour );
  if (err) return next();
  console.log("Animal actualizado")
  res.send(animal);
});

//Delete cat
router.delete('/animals/:id',function(req, res){
  const {id} = req.params;
  const animal = animalsAPI.deleteA(id)
  res.send(animal);
})

//Create cat
router.post('/animals',function(req, res){
  const {animalname, breedname, speciesname, animalage, basecolour} = req.body;
  const result = schema.validate({ animalname, breedname, speciesname, animalage, basecolour });
  if (result.error) return res.status(400).send(result.error.details[0].message);
  const animal = animalsAPI.add(animalname, breedname, speciesname, animalage, basecolour);
  console.log("Animal añadido");
  res.send(animal);
});

module.exports = router;
