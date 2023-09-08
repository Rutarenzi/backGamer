import { createClient } from "redis";
import dotenv from 'dotenv';

dotenv.config();
const redisClient = createClient({
  url: process.env.REDIS_URL,
  connect_timeout: 30000,
});

redisClient.on('error', (error)=>{
  console.log(error)
});
redisClient.connect();
redisClient.on('connect',()=>{
  console.log("redis Connected!");
})

export default redisClient;












// const  redis = require("redis");
// import { execFile } from "child_process";
// import { createClient } from 'redis';



// export const redisClient = redis.createClient(process.env.REDIS_URL);
// redisClient.connect();
// redisClient.on('error', (err) => err);

// redisClient.on("connect",()=>{
//     console.log("connected");
// });

// export default redisClient;
// (async () =>{
    
//     redisClient.on('ready',()=>{
//         console.log("Reids client connected")
//     });
//     redisClient.on('error', (error)=>{
//         console.log("redis not Connected",error)
//     });
//     await redisClient.connect();
// })();
// redisClient.quit()

// import dotenv from 'dotenv';

// dotenv.config();
// const redisClient = createClient({
//   url: process.env.REDIS_URL,
//   connect_timeout: 30000
// });