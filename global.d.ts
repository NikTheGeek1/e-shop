// we extend the globalThis interface to include a property
// that will be used to store the mongo client promise
declare module globalThis {
    var _mongoClientPromise: Promise<MongoClient>;
}
