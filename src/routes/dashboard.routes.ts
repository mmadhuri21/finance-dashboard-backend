import { Router } from "express";
import { Role } from "@prisma/client";
import { getSummary } from "../controllers/dashboard.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";

const router = Router();

router.get(
  "/summary",
  authMiddleware,
  authorizeRoles([Role.ADMIN, Role.ANALYST, Role.VIEWER]),
  getSummary
);

export default router;