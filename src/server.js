const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const CATEGORY_PROTO_PATH = __dirname + '/protos/category.proto';
const { createCategory } = require('./controllers/categoryController')

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

server.addService(category_proto.CategoryService.service, { createCategory });

server.bindAsync('localhost:50051', grpc.ServerCredentials.createInsecure(), () => {
  server.start();
});
