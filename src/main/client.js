const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + '/../domain/protos/category.proto';

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


//CREATE CATEGORY
// client.createCategory({ name: "new_category_name" }, function (err, response) {
//   console.log(response);
// });


// LIST CATEGORIES
client.listCategories({}, function (err, response) {
  console.log(response);
});


// CREATE CATEGORY STREAM
// let call = client.createCategoryStream(function (error, response) {
//   console.log(response);
// });

// let categoryNamesList = ["cat1", "cat2", "cat3"];
// categoryNamesList.forEach(categoryName => {
//   call.write({ name: categoryName });
// })

// call.end();


// CREATE CATEGORY STREAM BIDIRECTIONAL
// let call = client.createCategoryStreamBidirectional();

// let categoryNamesList = ["cat1", "cat2", "cat3"];
// categoryNamesList.forEach(categoryName => {
//   call.write({ name: categoryName });
// })

// call.on('data', function (response) {
//   console.log(response);
// });

// call.end();