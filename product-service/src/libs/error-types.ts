export class CamelObjectError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class SnakeObjectError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}
