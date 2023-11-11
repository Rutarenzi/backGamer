import AccountEmitter from "./EventEmitter";
import AccountService from "../services/AccountService";
import DrawerService from "../services/DrawerService";
const SurveyObj = new AccountEmitter();

SurveyObj.on("updateSurvey",async(data) => {
    try{
       await AccountService.updateAccount(data.user_id);
    }catch(error){
        console.log(error)
    }
});
SurveyObj.setSurvey();

SurveyObj.on('drawer',async()=>{
    try{
     await DrawerService.DrawerGen()
    }catch(error){
        console.log(error)
    }
})
SurveyObj.setDrawer()
SurveyObj.on("updateAccount",async(data) => {
    try{
       await AccountService.updateCommission(data);
    }catch(error){
        console.log(error)
    }
});

SurveyObj.setCommission()

SurveyObj.on("updateLevel", async(data)=>{
    try{
        await AccountService.updateLevel(data);
    }catch(error){
        console.log(error)
    }
});

SurveyObj.setLevel();
