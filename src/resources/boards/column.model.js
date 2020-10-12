const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title = 'Board', order = 1 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = Column;
