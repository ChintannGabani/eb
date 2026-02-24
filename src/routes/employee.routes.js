import { Router } from "express";
import {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    getMyEmployeeDetails
} from "../controllers/employee.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/my-details").get(getMyEmployeeDetails);

router.route("/")
    .get(getAllEmployees)
    .post(authorizeRoles("admin"), createEmployee);

router.route("/:id")
    .get(getEmployeeById)
    .patch(authorizeRoles("admin"), updateEmployee)
    .delete(authorizeRoles("admin"), deleteEmployee);

export default router;
