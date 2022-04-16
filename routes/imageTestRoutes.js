import express from 'express'
import {errorHandler} from "../middleware/errorMiddleware.js"

import { getAll } from '../controllers/imageTestController.js';

const router = express.Router();

router.route("/")
.get(getAll, errorHandler);

export default router