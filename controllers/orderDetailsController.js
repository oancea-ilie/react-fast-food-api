import asyncHandler from "express-async-handler";
import db from "../config/db.js";

const getAll = asyncHandler(async(req,res)=>{

    let all = await db.models.OrderDetails.findAll();

    let error = new Error("Nu exista order details in baza de date!");
    error.status = 501;

    if(all.length == 0){
        throw error;
    }

    res.status(200).json(all);

});

const getById = asyncHandler(async(req,res)=>{

    let {id} = req.params;

    let obj = await db.models.OrderDetails.findByPk(id);


    if(!obj){
        throw new Error("Nu exista order details cu acest id!");
    }

    res.status(200).json(obj);
    
});

const create = asyncHandler(async(req,res)=>{

    let newObj = req.body;

    if(newObj.price == null || newObj.quantity == null || newObj.order_id == null|| newObj.product_id == null){
        throw new Error("Propietati invalide!");
    }
    if(!newObj.price){
        throw new Error('Campul price este gol!');
    }
    else if(typeof newObj.price != 'number'){
        throw new Error('Campul price nu este numar!');
    }
    else if(!newObj.quantity){
        throw new Error('Campul quantity este gol!');
    }
    else if(typeof newObj.quantity != 'number'){
        throw new Error('Campul quantity nu este numar!');
    }
    else if(!newObj.order_id){
        throw new Error('Campul order_id este gol!');
    }
    else if(typeof newObj.order_id != 'number'){
        throw new Error('Campul order_id nu este numar!');
    }
    else if(!newObj.product_id){
        throw new Error('Campul product_id este gol!');
    }
    else if(typeof newObj.product_id != 'number'){
        throw new Error('Campul product_id nu este numar!');
    }
    else{

        await db.models.OrderDetails.create(newObj);
        res.status(204).end();
    }


});

const update = asyncHandler(async(req,res)=>{

    let user = req.body;
    let {id} = req.params;

    let obj = await db.models.OrderDetails.findByPk(id);

    if(user.price == '' && user.quantity == '' && user.order_id == '' && user.product_id){
        throw new Error("Nu exista propietati pentru update!");
    }
    if(obj){
        if(user.price){
            if(typeof user.price !='number'){
                throw new Error('Campul price nu este numar pentru update!');
            }
            obj.price = user.price;
        }
        if(user.quantity){
            if(typeof user.quantity !='number'){
                throw new Error('Campul quantity nu este numar pentru update!');
            }
            obj.quantity = user.quantity;
        }
        if(user.order_id){
            if(typeof user.order_id !='number'){
                throw new Error('Campul order_id nu este numar pentru update!');
            }
            obj.order_id = user.order_id;
        }
        if(user.product_id){
            if(typeof user.product_id !='number'){
                throw new Error('Campul product_id nu este numar pentru update!');
            }
            obj.product_id = user.product_id;
        }

        await obj.save();
        res.status(204).end();

    }else{
        throw new Error(`Nu s-a gasit order details cu acest ID pentru a putea face Update!`);
    }

});

const distroy = asyncHandler(async(req,res)=>{

    let {id} = req.params;

    let obj = await db.models.OrderDetails.findByPk(id);
    
    if(obj){
        await obj.destroy();
        res.status(204).end();
    }else{
        throw new Error("Nu s-a gasit order details cu acest ID pentru a putea fi sters!");
    }

});

const purge = asyncHandler(async(req, res)=>{

    let allObj = await db.models.OrderDetails.findAll();
    if(allObj){
        allObj.forEach((e)=>{e.destroy()});
        res.status(204).end();
    }else{
        throw new Error("Nu s-au gasit order details in baza de date!");
    }

})

export {getAll, getById ,create, update, distroy, purge}