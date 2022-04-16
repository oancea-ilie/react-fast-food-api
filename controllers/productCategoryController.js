import asyncHandler from "express-async-handler";
import db from "../config/db.js";


const joinAll = asyncHandler(async(req,res)=>{

    let {id} = req.params;
    let rez = await db.models.ProductCategory.findAll({
        include:{
            all:true
        },
    });

    if(rez){
        if(id){
            let filtrat = rez.filter(e=> e.fk_category_id.name == id);
            console.log(filtrat);
            if(filtrat.length != 0){

                res.status(200).json(filtrat);
            }else{
                
                throw new Error("Nu se poate face filtrare cu aced ID!");
            }
        }else{
            throw new Error("Nu exista id pentru filtrare !");
        }
    }else{
        throw new Error("Nu s-a putut face join-ul!");
    }
});

const getAll = asyncHandler(async(req,res)=>{

    let all = await db.models.ProductCategory.findAll();

    let error = new Error("Nu exista product categories in baza de date!");
    error.status = 501;

    if(all.length == 0){
        throw error;
    }

    res.status(200).json(all);

});

const getById = asyncHandler(async(req,res)=>{

    let {id} = req.params;

    let obj = await db.models.ProductCategory.findByPk(id);

    if(!obj){
        throw new Error("Nu exista product category cu acest id!");
    }

    res.status(200).json(obj);
    
});

const create = asyncHandler(async(req,res)=>{

    let newObj = req.body;

    if(newObj.product_id == null || newObj.category_id == null){
        throw new Error("Propietati invalide!");
    }

    if(!newObj.product_id){
        throw new Error('Campul product_id este gol!');
    }
    else if(typeof newObj.product_id != 'number'){
        throw new Error('Campul product_id nu este numar!');
    }
    else if(!newObj.category_id){
        throw new Error('Campul category_id este gol!');
    }
    else if(typeof newObj.category_id != 'number'){
        throw new Error('Campul category_id nu este numar!');
    }
    else{

        await db.models.ProductCategory.create(newObj);
        res.status(204).end();
    }


});

const update = asyncHandler(async(req,res)=>{

    let user = req.body;

    let {id} = req.params;

    let obj = await db.models.ProductCategory.findByPk(id);

    if(user.product_id == '' && user.category_id == ''){
        throw new Error("Nu exista propietati pentru update!");
    }

    if(obj){
        if(user.product_id){
            if(typeof user.product_id !='number'){
                throw new Error('Campul product_id nu este numar pentru update!');
            }
            obj.product_id = user.product_id;
        }
        if(user.category_id){
            if(typeof user.category_id !='number'){
                throw new Error('Campul category_id nu este numar pentru update!');
            }
            obj.category_id = user.category_id;
        }

        await obj.save();
        res.status(204).end();

    }else{
        throw new Error(`Nu s-a gasit product category cu acest ID pentru a putea face Update!`);
    }

});

const distroy = asyncHandler(async(req,res)=>{

    let {id} = req.params;

    let obj = await db.models.ProductCategory.findByPk(id);
    
    if(obj){
        await obj.destroy();
        res.status(204).end();
    }else{
        throw new Error("Nu s-a gasit product category cu acest ID pentru a putea fi sters!");
    }

});

const purge = asyncHandler(async(req, res)=>{

    let allObj = await db.models.ProductCategory.findAll();
    if(allObj){
        allObj.forEach((e)=>{e.destroy()});
        res.status(204).end();
    }else{
        throw new Error("Nu s-au gasit product category in baza de date!");
    }

})

export {getAll, getById ,create, update, distroy, purge, joinAll}