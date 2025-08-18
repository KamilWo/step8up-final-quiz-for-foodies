import { Router } from "express";
import { register, login, updatePassword, logout } from "../../controllers/authController.mjs";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update-password", updatePassword);
router.post("/logout", logout);

export default router;
