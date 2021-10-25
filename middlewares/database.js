import mongoose from "mongoose";

let connectionStatus = 0;

const database = async (req, res, next) => {
  console.log("hit database middleware");
  if (connectionStatus) return next();
  const conn = await mongoose.connect(
    `mongodb+srv://admin:admin@cluster0.mztev.mongodb.net/MOJ_HR_system?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  );
  connectionStatus = conn.connection.readyState;
  next();
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

export default database