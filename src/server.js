const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const CATEGORY_PROTO_PATH = __dirname + '/protos/category.proto';
const DATABASE_FILE_NAME = __dirname + '/../data.db';
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(DATABASE_FILE_NAME);
const makeCategoriesController = require('./factories/categoriesControllerFactory');

const categoryPackageDefinition = protoLoader.loadSync(
  CATEGORY_PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });

const category_proto = grpc.loadPackageDefinition(categoryPackageDefinition);

const server = new grpc.Server();

const categoriesController = makeCategoriesController(db);

server.addService(category_proto.CategoryService.service, {
  createCategory: categoriesController.createCategory
});

server.bindAsync('localhost:50051', grpc.ServerCredentials.createInsecure(), () => {
  server.start();
});
