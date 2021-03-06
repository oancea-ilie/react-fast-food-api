import asyncHandler from "express-async-handler";
import db from "../config/db.js";
import bcrypt from 'bcrypt';
import generateToken from "../utils/utilities.js";

const getAll = asyncHandler(async(req,res)=>{

    let all = await db.models.Customer.findAll();

    let error = new Error("Nu exista customers in baza de date!");
    error.status = 501;

    if(all.length == 0){
        throw error;
    }

    res.status(200).json(all);

});

const getById = asyncHandler(async(req,res)=>{

    let {id} = req.params;

    let obj = await db.models.Customer.findByPk(id);


    if(!obj){
        throw new Error("Nu exista customer cu acest id!");
    }

    res.status(200).json(obj);
    
});

const create = asyncHandler(async(req,res)=>{

    let newObj = req.body;

    let allObj = await db.models.Customer.findAll();

    if(newObj.name == null || newObj.email == null || newObj.password == null|| newObj.confirmedPassword == null || newObj.billing_address == null || newObj.phone == null || newObj.createdIn == null){
        throw new Error("Propietati invalide!");
    }
    if(!newObj.name){
        throw new Error('Campul name este gol!');
    }
    else if(!newObj.email){
        throw new Error('Campul email este gol!');
    }
    else if(!newObj.password){
        throw new Error('Campul password este gol!');
    }
    else if(!newObj.confirmedPassword){
        throw new Error('Campul confirmedPassword este gol!');
    }
    else if(!newObj.billing_address){
        throw new Error('Campul billing_address este gol!');
    }
    else if(!newObj.phone){
        throw new Error('Campul phone este gol!');
    }
    else if(typeof newObj.phone != 'number'){
        throw new Error('Campul phone nu este numar!');
    }
    else if(!newObj.createdIn){
        throw new Error('Campul createdIn este gol!');
    }
    else{

        if(allObj){
            for(let p of allObj){
                if(p.name == newObj.name){
                    throw new Error("Acest utlizator exista deja!");
                }
            }
        }

        let user = await db.models.Customer.create(newObj);

        if(user){

            res.status(201).json({
                id: user.id,
                username: user.name,
                token: generateToken(user.id)
            });
        }
    }



});

const update = asyncHandler(async(req,res)=>{

    let user = req.body;
    let {id} = req.params;

    let obj = await db.models.Customer.findByPk(id);

    if(user.name == '' && user.email == '' && user.password == '' && user.confirmedPassword == '' && user.billing_address  == '' && user.phone  == '' && user.createdIn == ''){
        throw new Error("Nu exista propietati pentru update!");
    }
    if(obj){
        if(user.name){
            obj.name = user.name;
        }
        if(user.email){
            obj.email = user.email;
        }
        if(user.password){
            obj.password = user.password;
        }
        if(user.confirmedPassword){
            obj.confirmedPassword = user.confirmedPassword;
        }
        if(user.billing_address){
            obj.billing_address = user.billing_address;
        }
        if(user.phone){
            obj.phone = user.phone;
        }
        if(user.createdIn){
            obj.createdIn = user.createdIn;
        }

        let rez = await obj.save();
        res.status(204).json(rez);

    }else{
        throw new Error(`Nu s-a gasit Customer cu acest ID pentru a putea face Update!`);
    }


});

const distroy = asyncHandler(async(req,res)=>{

    let {id} = req.params;

    let obj = await db.models.Customer.findByPk(id);
    
    if(obj){
        await obj.destroy();
        res.status(204).end();
    }else{
        throw new Error("Nu s-a gasit Customer cu acest ID pentru a putea fi sters!");
    }

});

const purge = asyncHandler(async(req, res)=>{

    let allObj = await db.models.Customer.findAll();
    if(allObj){
        allObj.forEach((e)=>{e.destroy()});
        res.status(204).end();
    }else{
        throw new Error("Nu s-au gasit Customers in baza de date!");
    }

})

const login = asyncHandler(async(req, res)=>{
    let obj  = req.body;
    
    let user = await db.models.Customer.findOne({ where: { email: `${obj.email}`} });

    if(user){
        let authentificate = bcrypt.compareSync(obj.password, user.confirmedPassword);
        if(authentificate){
            res.status(200).json({
                id: user.id,
                name: user.name,
                email : user.email,
                token : generateToken(user.id)
            });
        }else{
            res.status(401);
            throw new Error("Parola gresita!");
        }
    }else{
        res.status(401);
        throw new Error("Nu exista acest nume!");
    }
});

export {getAll, getById ,create, update, distroy, purge,login}