const mongoose = require("mongoose");

const Sensor = mongoose.model("Sensor", {
  nome: String,
  descricao: String,
  id: String,
  x: Number,
  y: Number,
  area: String,
  status: String,
  tipo: String
});

module.exports = Sensor;
