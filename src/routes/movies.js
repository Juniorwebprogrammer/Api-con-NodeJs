const {Router} = require ('express');
const router = Router();
const underscore = require('underscore');
const movies = require('../sample.json');

// Router get para cuando entre a la ruta le muestre un listado de las películas almacenadas en formato json

router.get('/', (req,res) =>{
    res.json(movies);
});

// Router post se va a encargar de permitir añadir películas al array además de garantizar con el condicional que se cumplan los campos mínimos añadiendo el id correspondiente y push al array

router.post('/',(req,res)=>{
    const { title, director, year, rating } = req.body;
    if (title && director && year && rating) {
        const id = movies.length + 1;
        const newMovie = {id,...req.body};
        movies.push(newMovie);
        res.json(movies);
    } else {
        res.send('ERROR');
    }
    console.log(req.body);
    res.send('received');
});

// Router put, nos permite actualizar los datos del objeto ya definido mezcla lógica del método post y delete buscando un id dentro del json, confirmando que los datos a cambiar y cambiando los datos en cuestión dentro del objeto.

router.put('/:id', (req,res) =>{
    const {id} = req.params;
    const { title, director, year, rating } = req.body;
    if ( title && director && year && rating ) {
        underscore.each(movies, (movie,i) => {
            if ( movie.id == id ) {
                movie.title = title;
                movie.director = director;
                movie.year = year;
                movie.rating = rating;
            }
        });
        res.json(movies);
    } else {
        res.status(500).json({error: 'There was an error'});
    }
});

// Router delete, nos permite poder remover el objeto del json, en este caso, a través de id 
// Con el condicional y underscore vamos a poder recorrer el array de películas y siempre que el id que queremos eliminar sea igual al id de la película del array la eliminamos

router.delete('/:id', (req,res) => {
    const {id} = req.params;
    underscore.each(movies, (movie,i) => {
        if (movie.id == id){
            movies.splice(i,1);
        }
    })
    res.send(movies);
});

module.exports = router;