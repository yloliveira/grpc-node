const { v4: uuidv4 } = require('uuid');

class UuidGenerator {
  execute() {
    return uuidv4();
  }
}

module.exports = UuidGenerator;