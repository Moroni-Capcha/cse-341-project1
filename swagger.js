const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API for managing contacts in MongoDB - CSE 341'
  },
  host: 'cse-341-project1-xa4s.onrender.com',
  schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generar swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
