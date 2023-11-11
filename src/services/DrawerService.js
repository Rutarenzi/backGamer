import referalUtils from "../utils/referalUtils";
const {drawer} =require('../database/models');
import { io } from "../utils/socketio";

class DrawerService{
    static DrawerGen=async()=>{
        await drawer.destroy({
            where: {}, // This empty object acts as a condition to delete all records
            truncate: true, // Truncate the table (remove all data and reset auto-incrementing IDs)
            cascade: true,
        });
        for(let i=0; i<=6;i++){
           let obj={};
           obj.name=referalUtils();
           obj.amount=Math.floor(Math.random() * (9999999 - 100 + 1)) + 100;
           obj.rates=Math.floor(Math.random() * (9999 - 100 + 1)) + 100;
           
            const drawer1 =await drawer.create(obj);
            await drawer1.save()

        }
        const allDrawers = await drawer.findAll({
            attributes:[
                'name',
                'amount',
                'rates'
            ]
        });
        
        if(allDrawers.length>0){
         io.emit('drawer',allDrawers)
        }
        return 1
    }

}

export default DrawerService