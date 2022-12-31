import mongoose, { ConnectionStates, ConnectOptions } from "mongoose";
const connection: { isConnected: ConnectionStates } = { isConnected: 0 };

async function dbConnect() {
  if (connection.isConnected) {
    console.log("Already connected to DB");
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("Use previous connection to DB");
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(
    process.env.MONGODB_URI as string,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions
  );
  console.log("New connection to DB");
  connection.isConnected = db.connections[0].readyState;
}

async function dbDisconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = 0;
    } else {
      console.log(
        "Not disconnected from DB because NODE_ENV is not production"
      );
    }
  }
}

const database = { connect: dbConnect, disconnect: dbDisconnect };
export default database;
