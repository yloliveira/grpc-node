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
  });

const hello_proto = grpc.loadPackageDefinition(packageDefinition);

/**
 * Implements the SayHello RPC method.
 */
function sayHello(_, callback) {
  callback(null, { message: 'Hello World' });
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
const server = new grpc.Server();
server.addService(hello_proto.Greeter.service, { sayHello: sayHello });
server.bindAsync('localhost:50051', grpc.ServerCredentials.createInsecure(), () => {
  server.start();
});
