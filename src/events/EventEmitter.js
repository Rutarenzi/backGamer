import EventEmitter from "events";
import schedule from "node-schedule";
import "dotenv/config";
const { Account,User } = require("../database/models");


class AccountEmitter extends EventEmitter{
    setSurvey=async()=>{
   schedule.scheduleJob(process.env.SURVEY_SCHEDULE,
    async () =>{
        const accounts = await Account.findAll();
        accounts.forEach((data)=> {
         const  { user_id } = data.dataValues;
         if(user_id){
            this.emit("updateSurvey", { user_id})
         }
        });
      
    })
    };

    setDrawer=async()=>{
      schedule.scheduleJob(process.env.DRAWER_SCHEDULE,
          async()=>{
            this.emit('drawer',{})
          }   
        )
    }

    setCommission= async()=> {
        schedule.scheduleJob(process.env.ACCOUNT_SCHEDULE,
            async () => {
                const accounts = await Account.findAll();
                let AccData ={}
                accounts.forEach((data)=>{
                    const { user_id, commission } = data.dataValues;
                    if(user_id && commission != 0){
                        AccData={user_id,commission}
                        this.emit("updateAccount", AccData)
                    }
                });
            }
            )
    }
    setLevel = async() => {
        schedule.scheduleJob(process.env.LEVEL_SCHEDULE,
            async () =>{
                const accounts = await Account.findAll();
                let AccDetails = {};
                accounts.forEach((data)=>{
                    const {user_id,amount, level_id } =data.dataValues;
                    let level = level_id
                    if(user_id && amount >=50){
                        AccDetails ={user_id,amount, level};
                        this.emit("updateLevel", AccDetails)
                    }
                });
            }  
            )

    }
}

export default AccountEmitter