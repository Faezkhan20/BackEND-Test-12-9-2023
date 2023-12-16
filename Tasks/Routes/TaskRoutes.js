import { Router } from "express";
import { AssignTasks, Completion, FetchAndSort, Update, userFetch } from "../Controller/Taskcontroller.js";
import { checkAdmin } from "../Middlewears/Allmiddlewears.js";


const router = Router();

router.post("/assign", checkAdmin ,AssignTasks);
router.post("/userfetch",userFetch)
router.post("/update",checkAdmin,Update)
router.post("/completion",Completion)
router.post("/fetchandsort",checkAdmin,FetchAndSort)


export default router;