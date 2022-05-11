const mongoose = require("mongoose");

const seed = require("./seed");

// Immediately Invoked Function Expression (IIFE)
(async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb://127.0.0.1:27017/store",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(
      `Conectado ao banco de dados: ${connection.connections[0].name}`
    );

    seed();
  } catch (err) {
    console.error(`Erro ao conectar ao banco de dados!`);
    console.error(err);
  }
})();
