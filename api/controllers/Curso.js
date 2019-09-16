"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("./../config/mongoose");
exports.curso_controller = {
    getCursos: (req, res) => {
        mongoose_1.Curso.find({}, (err, cursos) => {
            if (err) {
                res.status(500).json({
                    message: 'error',
                    contenido: err
                });
                return;
            }
            res.status(200).json({
                message: 'ok',
                contenido: cursos
            });
        });
    },
    createCurso: (req, res) => {
    }
};
