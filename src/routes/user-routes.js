import { Router } from "express";

const userRouter = Router();

//Rutas
userRouter.post("/register")
userRouter.post("/login")
userRouter.get("/profile")
userRouter.patch("/update_data")
userRouter.patch("/update_email")
userRouter.patch("/update_password")
userRouter.delete("/delete")

export default userRouter;