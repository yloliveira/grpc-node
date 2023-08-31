class CategoriesController {
  constructor(createCategoryUsecase, listCategoriesUsecase) {
    this.createCategoryUsecase = createCategoryUsecase;
    this.listCategoriesUsecase = listCategoriesUsecase;
    this.createCategory = this.createCategory.bind(this);
    this.listCategories = this.listCategories.bind(this);
  }

  async createCategory(call, callback) {
    try {
      const response = await this.createCategoryUsecase.execute({ name: call.request.name });
      callback(null, response);
    } catch (error) {
      console.log('CategoriesController.createCategory: Unexpected Error');
    }
  }

  async listCategories(_, callback) {
    try {
      const categories = await this.listCategoriesUsecase.execute();
      callback(null, { categories });
    } catch (error) {
      console.log('CategoriesController.listCategories: Unexpected Error');
    }
  }
}

module.exports = CategoriesController