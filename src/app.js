require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
//Permite que la aplicacion reconozca datos tipo JSON
app.use(bodyParser.json() );

//Permite reconocer datos tipo formData
app.use(bodyParser.urlencoded( {extended: true}));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`
        <h1>Curso Express.js</h1>
        <p>Esto es una aplicación node.js con express.js</p>
        <p>Corre en el puerto: ${PORT}</p>
        `);
})

//Ruta dinamica, los ':' indica que ese parametro es dinamico
app.get('/users/:id', (req, res) => {
    //Params permite ejecutar la url con get y poder usarla
    const userId = req.params.id;
    res.send(`Mostrar información del usuario con ID: ${userId}`)
})

//Busca por paramtros enviados a la URL: http://localhost:3005/search?termino=expressjs&categoria=nodejs
app.get('/search', (req, res) => {
    const terms = req.query.termino || 'No especificado';
    const category = req.query.categoria || 'Todas';
    res.send(`
        <h2>Resultados de Busqueda:</h2>
        <p>Término: ${terms}</p>
        <p>Categoria: ${category}</p>
        `)
})

//Recepcion de datos de formulario con post
app.post('/form',(req, res) => {
    const name = req.body.nombre || 'Anonimo';
    const email = req.body.email || 'No proporcionado';
    res.json({
        message: 'Datos recibidos',
        data:{
            name,
            email
        }
    })
})

//Responder con codigos de http (api rest)
app.post('/api/data', (req, res) => {
    const data = req.body;
    
    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({error: 'No se recibieron datos'});
    }
    res.status(201).json({
        message: 'Datos JSON recibidos',
        data
    })
})

app.listen(PORT, () => {
    console.log(`Servidor: http://localhost:${PORT}`);
})
