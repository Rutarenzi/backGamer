const { survey } =require("../database/models")

class SurveyService{
 
    static createSurvey  = async(data)=> {
        const { title, description } = data.body;
        const Survey = await survey.create({
            title,
            image: data.file.path,
            rate: 134,
            descritpion:description
        });
        await Survey.save()
        return "added"
    }
    static getSurvey = async(data) => {
        const numbers = await survey.findAll()
        const surveyId = numbers.map(item => item.id) 
        const surveyOne = surveyId[Math.floor(Math.random() * surveyId.length)]
        const Survey = await survey.findOne({
            where:{ id: surveyOne}
        })
        await survey.update({rate: Survey.rate+1},{where:{id: surveyOne}})
        return Survey
    }
}

export default SurveyService;