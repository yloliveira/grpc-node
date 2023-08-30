class CreateCategoryUsecase {
  constructor(uuidGenerator, categoriesRepository) {
    this.uuidGenerator = uuidGenerator;
    this.categoriesRepository = categoriesRepository;
    this.execute = this.execute.bind(this);
  }

  async execute({ name }) {
    const id = this.uuidGenerator.execute();
    return this.categoriesRepository.create({ id, name });
  }
}

module.exports = CreateCategoryUsecase;