import asyncHandler from "express-async-handler";
import db from "../config/db.js";

const getAll = asyncHandler(async(req,res)=>{

    let all = await db.models.Order.findAll();

    let error = new Error("Nu exista orders in baza de date!");
    error.status = 501;

    if(all.length == 0){
        throw error;
    }

    res.status(200).json(all);

});

const getById = asyncHandler(async(req,res)=>{

    let {id} = req.params;

    let obj = await db.models.Order.findByPk(id);


    if(!obj){
        throw new Error("Nu exista order cu acest id!");
    }

    res.status(200).json(obj);
    
});

const create = asyncHandler(async(req,res)=>{

    let newObj = req.body;

    if(newObj.ammount == null || newObj.order_address == null || newObj.order_date == null || newObj.customer_id == null){
        throw new Error("Propietati invalide!");
    }
    if(!newObj.ammount){
        throw new Error('Campul ammount este gol!');
    }
    else if(typeof newObj.ammount != 'number'){
        throw new Error('Campul ammount nu este numar!');
    }
    else if(!newObj.order_address){
        throw new Error('Campul order_address este gol!');
    }
    else if(!newObj.order_date){
        throw new Error('Campul order_date este gol!');
    }
    else if(!newObj.customer_id){
        throw new Error('Campul customer_id(fk) este gol!');
    }
    else{

        await db.models.Order.create(newObj);
        res.status(204).end();
    }


});

const update = asyncHandler(async(req,res)=>{

    let user = req.body;
    let {id} = req.params;

    let obj = await db.models.Order.findByPk(id);

    if(user.ammount == '' && user.order_address == '' && user.order_date == '' && user.customer_id == ''){
        throw new Error("Nu exista propietati pentru update!");
    }
    if(obj){

        if(user.ammount){
            obj.ammount = user.ammount;
        }
        if(user.order_address){
            obj.order_address = user.order_address;
        }
        if(user.order_date){
            obj.order_date = user.order_date;
        }
        if(user.customer_id){
            obj.customer_id = user.customer_id;
        }

        await obj.save();
        res.status(204).end();

    }else{
        throw new Error(`Nu s-a gasit order cu acest ID pentru a putea face Update!`);
    }


});

const distroy = asyncHandler(async(req,res)=>{

    let {id} = req.params;

    let obj = await db.models.Order.findByPk(id);
    
    if(obj){
        await obj.destroy();
        res.status(204).end();
    }else{
        throw new Error("Nu s-a gasit order cu acest ID pentru a putea fi sters!");
    }

});

const purge = asyncHandler(async(req, res)=>{

    let allObj = await db.models.Order.findAll();
    if(allObj){
        allObj.forEach((e)=>{e.destroy()});
        res.status(204).end();
    }else{
        throw new Error("Nu s-au gasit orders in baza de date!");
    }

})

export {getAll, getById ,create, update, distroy, purge}