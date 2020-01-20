const { Router } = require('express');
const axios = require('axios');
const Dev = require('./models/Dev');

const routes = Router();

/*
 *  Tipos de Parametros: 
 *  Query Params: (filtros, ordenação, paginação, ...)
 *  Route Params:  request.params (Identificar um recurso ou alteração ou remoção)
 *  Body: request.body (dados para criação ou alteração de um registro)
 */

routes.post('/devs', async (request, response) => {

    console.log(request.body);

    const { github_username, techs, latitude, longitude } = request.body;

    const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

    const {name = login, avatar_url, bio} = apiResponse.data;

    const techsArray = techs.split(',').map(tech => tech.trim());

    const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
    }

    const dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
    });

    // console.log(name, avatar_url, bio, github_username);

    return response.json(dev);

});



module.exports = routes;