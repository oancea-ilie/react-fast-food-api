import express from 'express'
import {errorHandler} from "../middleware/errorMiddleware.js"

import { getAll , getById, create, update, distroy, purge} from '../controllers/categoryController.js';
import authentificate from '../middleware/authMiddleware.js';

const router = express.Router();

router.route("/")
.get(authentificate, getAll, errorHandler)
.post(create, errorHandler);

router.route("/purge").delete(purge, errorHandler);

router.route("/:id")
.get(getById, errorHandler)
.put(update, errorHandler)
.delete(distroy, errorHandler);

export default router