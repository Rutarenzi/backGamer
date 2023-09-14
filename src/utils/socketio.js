import socketio from "socket.io";
import Jwtutils from "./JwtUtils";
const { Account,User } = require("../database/models");

const userDetail= {};

const userExist = (token, next) =>{
  try{
    const  { data } = Jwtutils.verify(token);
    User.findOne({
        where: {
            id: data.id
        },
    }).then((res)=>{
        if(res){
            userDetail.id = res.dataValues.id;
            userDetail.username = res.dataValues.username;
            next();
        } else {
            next(new Error("User Not Found!!"));
        }
    });

  }catch(error){
    console.log(error)
  }
};

let io;

const IoConnect = (http) => {
  io = socketio(http, { cors: {origin: [
    {
        origin: [
            `${process.env.FRONT_URL}`
        ],
        credentials: true
    }
  ]}});
  io.use((socket,next )=> {
    
     if(socket.handshake.headers.token !== "null"){
          userExist(socket.handshake.headers.token, next)               
     } else {
        console.log("No valid credition!")
     }
  });
  const users = {};
  io.on("connection", (socket) => {
     socket.join(`user_${userDetail.id}`);
     Account.findOne({ 
        where :{user_id : userDetail.id},
        include: [{
          model: User,
          as: 'owner',
          attributes: [
          'id','username','fullname','phone',"whatsapp",
          "referrer","referal_code", "role", "profilePic",
          "createdAt"
        ]
        }]
      }).then((resp)=>{
         if(resp){
            const account = resp.dataValues;
            socket.emit("accountDetails", account);
         }
      }).catch((error)=> {
        console.error(error)
      });

      socket.emit("username", userDetail.username);

      socket.on("new_user", () =>{
        users[socket.id] = userDetail.username;
        socket.broadcast.emit("connect", userDetail.username);

      });
      socket.on("disconnected", () => {
        socket.broadcast.emit("user_disconnected", users[socket.id]);
        delete users[socket.id];
      });
  });
};

export { IoConnect, userExist,io};