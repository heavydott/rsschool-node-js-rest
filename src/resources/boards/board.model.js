const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Column = require('./column.model');

/*
Column = new Schema({
  title: String,
  order: Number
});
*/

const Board = new Schema(
  {
    title: String,
    columns: [
      {
        title: String,
        order: Number
      }
    ]
  },
  { collection: 'boards' }
);

const toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

module.exports = {
  Board: mongoose.model('boards', Board),
  toResponse
};
