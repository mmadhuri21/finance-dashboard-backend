import { Router } from "express";
import { Role } from "@prisma/client";
import {
  createFinancialRecord,
  getFinancialRecords,
  updateFinancialRecord,
} from "../controllers/record.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  authorizeRoles([Role.ADMIN]),
  createFinancialRecord
);

router.get(
  "/",
  authMiddleware,
  authorizeRoles([Role.ADMIN, Role.ANALYST]),
  getFinancialRecords
);

router.patch(
  "/:id",
  authMiddleware,
  authorizeRoles([Role.ADMIN]),
  updateFinancialRecord
);

export default router;