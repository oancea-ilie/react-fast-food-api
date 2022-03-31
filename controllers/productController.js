import asyncHandler from "express-async-handler";
import db from "../config/db.js";

const getAllProducts = asyncHandler(async(req,res)=>{
    let all = await db.models.Product.findAll();

    let error = new Error("Nu exista produse in baza de date!");
    error.status = 501;

    if(all.length == 0){
        throw error;
    }

    res.status(200).json(all);
});

const getProductById= asyncHandler(async(req,res)=>{
    let {id} = req.params;

    let obj = await db.models.Product.findByPk(id);


    if(!obj){
        throw new Error("Nu exista product cu acest id!");
    }

    res.status(200).json(obj);
    
});

const createProduct = asyncHandler(async(req,res)=>{

    let newObj = req.body;

    let allObj = await db.models.Product.findAll();

    if(newObj.name == null || newObj.price == null || newObj.description == null|| newObj.image == null || newObj.stock  == null){
        throw new Error("Propietati invalide!");
    }
    if(!newObj.name){
        throw new Error('Campul name este gol!');
    }
    else if(!newObj.price){
        throw new Error('Campul price este gol!');
    }
    else if(typeof newObj.price != 'number'){
        throw new Error('Campul price nu este numar!');
    }
    else if(!newObj.image){
        throw new Error('Campul image este gol!');
    }
    else if(!newObj.description){
        throw new Error('Campul description este gol!');
    }
    else if(!newObj.stock){
        throw new Error('Campul stock este gol!');
    }
    else if(typeof newObj.stock != 'number'){
        throw new Error('Campul stock nu este numar!');
    }
    else{

        if(allObj){
            for(let p of allObj){
                if(p.name == newObj.name){
                    throw new Error("Acest Produs exista deja in baza de date!");
                }
            }
        }

        await db.models.Product.create(newObj);
        res.status(204).end();
    }


});

const updateProduct = asyncHandler(async(req,res)=>{

    let user = req.body;
    let {id} = req.params;

    let obj = await db.models.Product.findByPk(id);

    if(user.name == '' && user.price == '' && user.description == '' && user.image == '' && user.stock  == '' ){
        throw new Error("Nu exista propietati pentru update!");
    }
    if(typeof user.price != 'number'){
        throw new Error("Campul price nu este numar!");
    }
    if(typeof user.stock != 'number'){
        throw new Error('Campul stock nu este numar!');
    }
    if(obj){
        if(user.name){
            obj.name = user.name;
        }
        if(user.price){
            obj.price = user.price;
        }
        if(user.description){
            obj.description = user.description;
        }
        if(user.image){
            obj.image = user.image;
        }
        if(user.stock){
            obj.stock = user.stock;
        }

        await obj.save();
        res.status(204).end();

    }else{
        throw new Error(`Nu s-a gasit Product cu acest ID pentru a putea face Update!`);
    }


});

const deleteProduct = asyncHandler(async(req,res)=>{

    let {id} = req.params;

    let obj = await  db.models.Product.findByPk(id);
    
    if(obj){
        await obj.destroy();
        res.status(204).end();
    }else{
        throw new Error("Nu s-a gasit Product cu acest ID pentru a putea fi sters!");
    }

});

const purge = asyncHandler(async(req, res)=>{

    let allObj = await db.models.Product.findAll();
    if(allObj){
        allObj.forEach((e)=>{e.destroy()});
        res.status(204).end();
    }else{
        throw new Error("Nu s-au gasit Produse in baza de date!");
    }

})

export {getAllProducts, getProductById ,createProduct, updateProduct, deleteProduct, purge}