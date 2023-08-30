const CategoriesController = require('../controllers/categoriesController');
const CreateCategoryUsecase = require('../usecases/createCategoryUsecase');
const CategoriesRepository = require('../repositories/categoriesRepository');

function makeCategoriesController(db) {
  const categoriesRepository = new CategoriesRepository(db);
  const createCategoryUsecase = new CreateCategoryUsecase(categoriesRepository);
  const categoriesController = new CategoriesController(createCategoryUsecase);

  return categoriesController
}

module.exports = makeCategoriesController