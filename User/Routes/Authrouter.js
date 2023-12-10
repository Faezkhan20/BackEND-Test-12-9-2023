import { Router } from "express";
import { Create, Delete } from "../Controllers/Authcontroller.js";
import { checkadmin } from "../Middlewear/Authmiddlewear.js";

const router=Router()

router.post("/create",checkadmin,Create)
router.post("/delete",checkadmin,Delete)



export default router