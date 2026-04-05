import { Router } from "express";
import { Role } from "@prisma/client";
import { getAllUsers, updateUser } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";

const router = Router();

router.get("/", authMiddleware, authorizeRoles([Role.ADMIN]), getAllUsers);

router.patch(
  "/:id",
  authMiddleware,
  authorizeRoles([Role.ADMIN]),
  updateUser
);

export default router;