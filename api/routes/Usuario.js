"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Usuario_1 = require("./../controllers/Usuario");
exports.usuario_router = express_1.Router();
exports.usuario_router.post('/usuario', Usuario_1.crearUsuario);
