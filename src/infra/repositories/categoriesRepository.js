class CategoriesRepository {
  constructor(db) {
    this.db = db;
    this.create = this.create.bind(this);
  }

  async create({ id, name }) {
    await this.db.run("INSERT INTO categories (id, name) VALUES (?, ?)", id, name);
    return { id, name };
  }

  async list() {
    return new Promise((resolve, reject) =>
      this.db.all("SELECT * FROM categories", (err, rows) => {
        if (err) {
          reject(err)
        }
        resolve(rows)
      }));
  }
}

module.exports = CategoriesRepository;