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
  
  const players = ['Ramiro', 'David', 'Sabrina'];

  const drawPromises = players.map(player => {
    return luckyDraw(player)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.error(error.message); 
      });
  });

  Promise.all(drawPromises)
  .then(() => {
    console.log('¡The draws were completed successfully');
  })
  .catch(error => {
    console.error('At least one draw failed:', error.message);
  });