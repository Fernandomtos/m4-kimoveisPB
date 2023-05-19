import { Router } from "express";
import loginController from "../controllers/login.controllers";

const loginRoutes: Router = Router();

loginRoutes.post("", loginController);

export default loginRoutes;
