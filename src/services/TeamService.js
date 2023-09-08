const { Account,User } = require("../database/models");


class TeamService{
  static getTeam=async (data)=> {
    const {referal_code } = data;
    const team = await User.findAll(
        { 
        where: {referrer: referal_code},
        attributes: [
            'username','fullname','phone',
            "referal_code"
          ],
          include: [{
            model: Account,
            as: 'account',
            attributes: [
                "amount",
                "worknumber",
                "withdraw",
                "level_id"
          ]
          }]

    })
    console.log(team.length)

        return team
    
  }
}

export default TeamService