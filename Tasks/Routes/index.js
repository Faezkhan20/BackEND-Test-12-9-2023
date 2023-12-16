import { Router } from "express";
import TaskRouter from "./TaskRoutes.js"

const router = Router();

router.use("/task" , TaskRouter)

export default router