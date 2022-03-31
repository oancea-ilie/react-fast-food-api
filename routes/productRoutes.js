import express from 'express'
import {errorHandler} from "../middleware/errorMiddleware.js"

import { getAllProducts , getProductById, createProduct, updateProduct, deleteProduct, purge} from '../controllers/productController.js';

const router = express.Router();

router.route("/")
.get(getAllProducts,errorHandler)
.post(createProduct,errorHandler);

router.route("/purge").delete(purge, errorHandler);

router.route("/:id")
.get(getProductById,errorHandler)
.put(updateProduct,errorHandler)
.delete(deleteProduct,errorHandler);

export default router