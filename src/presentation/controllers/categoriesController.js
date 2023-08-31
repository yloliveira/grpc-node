class CategoriesController {
  constructor(createCategoryUsecase, listCategoriesUsecase) {
    this.createCategoryUsecase = createCategoryUsecase;
    this.listCategoriesUsecase = listCategoriesUsecase;
    this.createCategory = this.createCategory.bind(this);
    this.listCategories = this.listCategories.bind(this);
    this.createCategoryStream = this.createCategoryStream.bind(this);
    this.createCategoryStreamBidirectional = this.createCategoryStreamBidirectional.bind(this);
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

  async createCategoryStream(call, callback) {
    try {
      let created = [];
      let failed = [];
      call.on('data', async (categoryStream) => {
        const category = await this.createCategoryUsecase.execute({ name: categoryStream.name });
        if (category !== null) {
          created.push(category);
        } else {
          failed.push({ name: categoryStream.name })
        }
      });
      call.on('end', function () {
        callback(null, {
          categoriesCreated: created,
          categoriesNotCreated: failed,
        })
      })
    } catch (error) {
      console.log('CategoriesController.createCategoryStream: Unexpected Error');
    }
  }

  async createCategoryStreamBidirectional(call) {
    try {
      call.on('data', async (categoryStream) => {
        const category = await this.createCategoryUsecase.execute({ name: categoryStream.name });
        if (category !== null) {
          call.write(category);
        }
      });
      call.on('end', function () {
        call.end();
      })
    } catch (error) {
      console.log('CategoriesController.createCategoryStreamBidirectional: Unexpected Error');
    }
  }
}

module.exports = CategoriesController