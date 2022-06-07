
import { Router } from "express";
import { auhtorizationRoutes } from "./authorization.routes";

const router = Router();

router.use('/authorization', auhtorizationRoutes);

export { router };

