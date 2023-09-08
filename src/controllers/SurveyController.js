import SurveyService from "../services/surveyService"


class SurveyController {
    static createSurvey = async (req,res)=>{
        try{
            const response = await SurveyService.createSurvey(req);
            return res.status(201).json({status: 201, message:response})
        }catch(error){
            return res.status(500).json({status: 500, error: error.message})
        }
    }
    static getSurvey= async (req,res) => {
        try{
          const response = await SurveyService.getSurvey();
          return res.status(200).json({ status: 200, response});
        }catch(error){
           return  res.status(500).json({ status: 500, error: error.message})
        }
    }

}

export default SurveyController