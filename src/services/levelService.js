const { Level } = require("../database/models");

class LevelService {
    static async levelCreate(data){
        const {
           name,
           minimum,
           commission_rate  
        } = data.body;
        const images = data.file
        const levelImage =images.path
        const level = await Level.create({
            name,
            image: levelImage,
            minimum,
            commission_rate 

        });
        await level.save();

        return "Level created!"

    }
    static getLevel = async () =>{
        return await Level.findAll();
    }

    static oneLevel = async(req)=>{
        const { id } = req.params;
        return await Level.findOne({where:{id}});
    }
    static editLevel = async(req)=>{
        const level = await Level.findOne({ where: {id: req.params.id}});
        const images = req.file
        const levelImage =images.path
        const {
            name,
            minimum,
            commission_rate  
         } = req.body;
        await Level.update({name,  image: levelImage, minimum, commission_rate},{ where: { id:level.id}})
        return "updated successfully";
    }
    static deleteLevel= async(id) =>{
        await Level.destroy({ where: { id } });
        return "deleted Successfully"
    }
}

export default LevelService;