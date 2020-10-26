const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Column = new Schema(
  {
    title: String,
    order: Number
  },
  { collection: 'columns' }
);

module.exports = mongoose.model('columns', Column);
