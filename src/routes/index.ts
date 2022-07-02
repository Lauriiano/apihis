
import { Router } from "express";
import { auhtorizationRoutes } from "./authorization.routes";
import { pdfSignedRouter } from "./pdfsigned.routes";

const router = Router();

router.use('/authorization', auhtorizationRoutes);
router.use('/pdfsigned', pdfSignedRouter);

export { router };

