import AccountEmitter from "./EventEmitter";
import AccountService from "../services/AccountService";


const SurveyObj = new AccountEmitter();

SurveyObj.on("updateSurvey",async(data) => {
    try{
       await AccountService.updateAccount(data.user_id);
    }catch(error){
        console.log(error)
    }
});
SurveyObj.setSurvey();

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
