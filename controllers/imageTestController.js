import asyncHandler from "express-async-handler";
import db from "../config/db.js";

const getAll = asyncHandler(async(req,res)=>{

    let all = await db.models.ImageTest.findAll();

    let error = new Error("Nu exista Imagini in baza de date!");
    error.status = 501;

    if(all.length == 0){
        throw error;
    }

    res.status(200).json(all);

});


export {getAll}