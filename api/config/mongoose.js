"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const Curso_1 = require("./../models/Curso");
const Usuario_1 = require("../models/Usuario");
exports.Curso = mongoose.model('curso', Curso_1.cursoSchema);
exports.Usuario = mongoose.model('usuario', Usuario_1.usuarioSchema);
