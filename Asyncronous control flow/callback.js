
const fs = require('fs');

const content = 'Realizando un ejemplo de fs.writeFile con callback ';

// Ruta del archivo en el que se escribirá el contenido
const filePath = 'respuesta.txt';

// Utilizar fs.writeFile() con un callback para escribir en el archivo
fs.writeFile(filePath, content, (err) => {
  if (err) {
    // Manejar el error por si ocurre
    console.error('Error al escribir en el archivo:', err);
  } else {
    // Si no hay errores, muestra un mensaje de éxito
    console.log(`Contenido escrito en ${filePath} exitosamente.`);
  }
});
