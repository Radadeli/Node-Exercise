
function luckyDraw(player) {
    return new Promise((resolve, reject) => {
      const win = Boolean(Math.round(Math.random()));
  
      process.nextTick(() => {
        if (win) {
          resolve(`${player} won a prize in the draw!`);
        } else {
          reject(new Error(`${player} lost the draw.`));
        }
      });
    });
  }
  
  async function getResults() {
    try {
      const resultTina = await luckyDraw('Ramiro');
      console.log(resultTina);
  
      const resultJorge = await luckyDraw('David');
      console.log(resultJorge);
  
      const resultJulien = await luckyDraw('Sabrina');
      console.log(resultJulien);
  
    } catch (error) {

      console.error('Error en el sorteo:', error.message);
    }
  }
  

  getResults();
  