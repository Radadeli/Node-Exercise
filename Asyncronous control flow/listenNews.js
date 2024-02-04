const { EventEmitter } = require("events");

function createNewsFeed() {
  const emitter = new EventEmitter();


  setInterval(() => {
    emitter.emit("newsEvent", "Noticias: Nuevo hecho delictivo en la ciudad.");
  }, 1000);


  setInterval(() => {
    emitter.emit("breakingNews", "¡Última hora! ¡Algo imprevisto sucedió!");
  }, 4000);


  setTimeout(() => {
    emitter.emit("error", new Error("Error de conexión en las noticias"));
  }, 5000);

  return emitter;
}

const newsFeed = createNewsFeed();


newsFeed.on("newsEvent", (data) => {
  console.log("Evento de noticias:", data);
});

newsFeed.on("breakingNews", (data) => {
  console.log("Última hora:", data);
});

newsFeed.on("error", (error) => {
  console.error("Error en la conexión de noticias:", error.message);
});
