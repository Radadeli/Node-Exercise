// módulo crypto
const crypto = require('crypto');


const bytesAleatorios = crypto.randomBytes(8);
const idAleatorio = bytesAleatorios.toString('hex'); 
console.log(`ID Aleatorio: ${idAleatorio}`);
