import { Router } from "express";
import userRegisterDto from "../dto/user-dto.js";
import LoginRegisterDto from "../dto/user-login-dto.js";
import updateDataDto from "../dto/user-update-data-dto.js";
import unRegisterDto from "../dto/user-unregister-dto.js";
import userUpdateEmail from "../dto/user-update-email-dto.js";
import userUpdatePassword from "../dto/user-update-password-dto.js";
import userJWTDTO from "../dto/userJwt-dto.js";
import userRegisterController from "../controllers/user-register-controller.js";
import userLoginController from "../controllers/user-login-controller.js";
import userProfileController from "../controllers/user-profile.controller.js";
import userUpdateDataController from "../controllers/user-updateDta-controller.js";
import userEmailController from "../controllers/user-email-controller.js";
import userPasswordController from "../controllers/user-password-controller.js";
import userUnregisterController from "../controllers/user-delete-controller.js";

const userRouter = Router();

// Rutas
userRouter.post("/register", userRegisterDto, userRegisterController, (req, res) =>  {
    res.send();
})
userRouter.post("/login", LoginRegisterDto, userLoginController, (req, res)=>{
    res.send()
})
userRouter.get("/profile", userProfileController, (req, res)=>{
    res.send()
})
userRouter.patch("/update_data", userJWTDTO, userUpdateDataController, updateDataDto)
userRouter.patch("/update_email", userJWTDTO, userEmailController, userUpdateEmail)
userRouter.patch("/update_password", userJWTDTO, userPasswordController, userUpdatePassword)
userRouter.delete("/delete", userJWTDTO, userUnregisterController, unRegisterDto)

export default userRouter;