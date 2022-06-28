"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const authorization_routes_1 = require("./authorization.routes");
const router = (0, express_1.Router)();
exports.router = router;
router.use('/authorization', authorization_routes_1.auhtorizationRoutes);
