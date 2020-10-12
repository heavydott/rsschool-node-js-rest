const Column = require('./column.model');
const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'Board', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(column => new Column(column));
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }

  static fromRequest(body) {
    return new Board(body);
  }
}

module.exports = Board;
