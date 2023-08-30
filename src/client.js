const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + '/protos/category.proto';

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
);

const CategoryService = grpc.loadPackageDefinition(packageDefinition).CategoryService;

const client = new CategoryService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

client.createCategory({ name: "new_category_name" }, function (err, response) {
  console.log(response);
});