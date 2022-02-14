import mongoose from "mongoose";

let connectionStatus = 0;

const database = async (req, res, next) => {
  if (connectionStatus) return next();
  const conn = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  connectionStatus = conn.connection.readyState;
  next();
};

export default database;
