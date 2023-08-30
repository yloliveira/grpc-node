const CreateCategoryUsecase = require('../usecases/createCategoryUsecase')

function createCategory(call, callback) {
  const createCategoryUsecase = new CreateCategoryUsecase();
  callback(null, createCategoryUsecase.execute({ name: call.request.name }));
}

module.exports = { createCategory }