// import app from "./app"
const app = require("./app")
import { Color } from "colors";
const { IoConnect } = require("./utils/socketio");
import httpServer from "http";

const http = httpServer.Server(app);
const port = process.env.PORT || 5000;

try {
  http.listen(port,() => {
    console.log(`server connected on port ${port}`.green.bold);
  });
  IoConnect(http)
} catch(error){
    console.log(error);
}

export default http;