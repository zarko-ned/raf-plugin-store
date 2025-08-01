// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Comic API',
        version: '1.0.0',
        description: 'Dokumentacija za Comic API aplikaciju',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Lokalni server',
        },
        {
            url: 'https://comics-hub.onrender.com',
            description: 'Dev Test',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
};


const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js'], // Komentari u fajlovima sa rutama
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
