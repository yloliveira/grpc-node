const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + '/protos/helloworld.proto';

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

const Greater = grpc.loadPackageDefinition(packageDefinition).Greeter;

const client = new Greater(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

client.sayHello({}, function (err, response) {
  console.log('Greeting:', response.message);
});