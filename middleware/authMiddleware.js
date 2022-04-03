import auth from "basic-auth";
import bcrypt from 'bcrypt';
import db from "../config/db.js";

const authentificate = async (req,res,next)=>{

    let message = "";

    const credentials = auth(req);

    if(credentials){

        let all = await db.models.Customer.findAll();
        let user;
        if(all){
            all.forEach(e=>{
                if(e.dataValues.email == credentials.name){
                    user = e;
                }
            })
        }

        if(user){
            const authentificate = bcrypt.compareSync(credentials.pass, user.confirmedPassword);

            if(authentificate){
                req.currentUser = user;
            }else{
                message = "Credentiale gresite! Acces Respins!";
            }

        }else{
            message ="Nu s-a gasit customer cu acest Email! Acces Respins!";
        }
    }else{
        message ="Nu exista credentiale! Acces Respins!";
    }


    if(message){
        console.warn(message);
        res.status(401).json({error:{message}});
    }else{
        next();
    }

}

export default authentificate;