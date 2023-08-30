class CategoriesRepository {
  constructor(db) {
    this.db = db;
    this.create = this.create.bind(this);
  }

  async create({ id, name }) {
    await this.db.run("INSERT INTO categories (id, name) VALUES (?, ?)", id, name);
    return { id, name };
  }
}

module.exports = CategoriesRepository;