const data = require('../data/data.json');
const axios = require('axios');

let animals = [];
for (let i = 0; i < 10; i ++){
  animals.push(data[i])
}

let fullDataAnimals = [];

//El arreglo de animales lo convierte en promesas
const animalsPromises = animals.map(() => {
    return new Promise((resolve, reject) => {
      axios.get('https://api.thecatapi.com/v1/images/search')
        //data es como el response
        .then(function ({ data}) {
          const [cat] = data;
          const { url } = cat;
          resolve(url);
        }).catch(function (error) {
          reject(error);
        });
    });
  });
  //Resuelve todas las promesas ejecutandose en paralelo
  Promise.all(animalsPromises)
    //las promesas regresan en el object de urls
    .then(function (urls) {
      const animalsWithImage = animals.map((animal, index) => ({ ...animal, image: urls[index], owner: ""}));
      fullDataAnimals.push(...animalsWithImage);
    })
    .catch(function(errors){
      console.log(errors)
    });


function get(id) {
    return fullDataAnimals.find(animal => animal.id == id)
}

function deleteA(id) {
    const animalToDelete = get(id)
    console.log(animalToDelete);
    fullDataAnimals.splice(fullDataAnimals.indexOf(animalToDelete),fullDataAnimals.indexOf(animalToDelete)+1 )
    console.log("Animal borrado")
    return animalToDelete
}

function updateA(id, animalsname, breedname, speciesname, animalage, basecolour) {
    const animal = get(id);
    animal.animalname = animalsname
    animal.breedname = breedname
    animal.speciesname = speciesname
    animal.animalage = animalage
    animal.basecolour = basecolour
    return animal;
}

function add(animalname, breedname, speciesname, animalage, basecolour) {
    fullDataAnimals.push({ id: fullDataAnimals.length + 1, animalname, breedname, speciesname, animalage, basecolour })
    return get(fullDataAnimals.length);
}

module.exports = {
    get: get,
    fullDataAnimals: fullDataAnimals,
    deleteA: deleteA,
    updateA: updateA,
    add: add
}