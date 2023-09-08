import TeamService from "../services/TeamService"


class TeamController{
    static getTeam= async (req,res) => {
    try{
      const response =  await TeamService.getTeam(req.user);
      return res.status(200).json({ status: 200, response});
    }catch(error){
        return res.status(500).json({ status: 500, error: error.message})
    }
    }

}

export default TeamController