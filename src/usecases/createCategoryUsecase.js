class CreateCategoryUsecase {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository
    this.execute = this.execute.bind(this)
  }

  async execute({ name }) {
    const id = "1"
    return this.categoriesRepository.create({ id, name })
  }
}

module.exports = CreateCategoryUsecase