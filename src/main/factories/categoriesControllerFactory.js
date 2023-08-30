const CategoriesController = require('../../presentation/controllers/categoriesController');
const CreateCategoryUsecase = require('../../application/usecases/createCategoryUsecase');
const CategoriesRepository = require('../../infra/repositories/categoriesRepository');
const UuidGenerator = require('../../infra/helpers/uuidGenerator');

function makeCategoriesController(db) {
  const categoriesRepository = new CategoriesRepository(db);
  const uuidGenerator = new UuidGenerator();
  const createCategoryUsecase = new CreateCategoryUsecase(uuidGenerator, categoriesRepository);
  const categoriesController = new CategoriesController(createCategoryUsecase);

  return categoriesController;
}

module.exports = makeCategoriesController;