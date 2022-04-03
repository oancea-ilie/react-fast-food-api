import asyncHandler from "express-async-handler";
import db from "../config/db.js";
import auth from "basic-auth";
import bcrypt from 'bcrypt';

const getAll = asyncHandler(async(req,res)=>{

    let all = await db.models.Category.findAll();

    let error = new Error("Nu exista categori in baza de date!");
    error.status = 501;

    if(all.length == 0){
        throw error;
    }

    res.status(200).json(all);

});

const getById = asyncHandler(async(req,res)=>{

    let {id} = req.params;

    let obj = await db.models.Category.findByPk(id);


    if(!obj){
        throw new Error("Nu exista category cu acest id!");
    }

    res.status(200).json(obj);
    
});

const create = asyncHandler(async(req,res)=>{

    let newObj = req.body;

    let allObj = await db.models.Category.findAll();

    if(newObj.name == null || newObj.img == null || newObj.description == null){
        throw new Error("Propietati invalide!");
    }
    if(!newObj.name){
        throw new Error('Campul name este gol!');
    }
    else if(!newObj.img){
        throw new Error('Campul img este gol!');
    }
    else if(!newObj.description){
        throw new Error('Campul description este gol!');
    }
    else{

        if(allObj){
            for(let p of allObj){
                if(p.name == newObj.name){
                    throw new Error("Acest Categorie exista deja in baza de date!");
                }
            }
        }

        await db.models.Category.create(newObj);
        res.status(204).end();
    }


});

const update = asyncHandler(async(req,res)=>{

    let user = req.body;
    let {id} = req.params;

    let obj = await db.models.Category.findByPk(id);

    if(user.name == '' && user.img == '' && user.description == ''){
        throw new Error("Nu exista propietati pentru update!");
    }
    if(obj){

        if(user.name){
            obj.name = user.name;
        }
        if(user.img){
            obj.img = user.img;
        }
        if(user.description){
            obj.description = user.description;
        }

        await obj.save();
        res.status(204).end();

    }else{
        throw new Error(`Nu s-a gasit Category cu acest ID pentru a putea face Update!`);
    }


});

const distroy = asyncHandler(async(req,res)=>{

    let {id} = req.params;

    let obj = await db.models.Category.findByPk(id);
    
    if(obj){
        await obj.destroy();
        res.status(204).end();
    }else{
        throw new Error("Nu s-a gasit Category cu acest ID pentru a putea fi sters!");
    }

});

const purge = asyncHandler(async(req, res)=>{

    let allObj = await db.models.Category.findAll();
    if(allObj){
        allObj.forEach((e)=>{e.destroy()});
        res.status(204).end();
    }else{
        throw new Error("Nu s-au gasit Category in baza de date!");
    }

});

export {getAll, getById ,create, update, distroy, purge}