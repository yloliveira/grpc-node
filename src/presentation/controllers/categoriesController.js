class CategoriesController {
  constructor(createCategoryUsecase) {
    this.createCategoryUsecase = createCategoryUsecase;
    this.createCategory = this.createCategory.bind(this);
  }

  async createCategory(call, callback) {
    try {
      const response = await this.createCategoryUsecase.execute({ name: call.request.name });
      callback(null, response);
    } catch (error) {
      console.log('CategoriesController.createCategory: Unexpected Error');
    }
  }
}

module.exports = CategoriesController