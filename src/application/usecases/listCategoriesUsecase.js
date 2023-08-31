class ListCategoriesUsecase {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
    this.execute = this.execute.bind(this);
  }

  async execute() {
    return this.categoriesRepository.list();
  }
}

module.exports = ListCategoriesUsecase;