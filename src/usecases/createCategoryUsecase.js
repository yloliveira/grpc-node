class CreateCategoryUsecase {
  execute({ name }) {
    return {
      id: '1',
      name,
    }
  }
}

module.exports = CreateCategoryUsecase