"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ApiPlantilla = __importStar(require("./../docs/swagger_template.json"));
const ApiDocumentacion = __importStar(require("./../docs/swagger_doc.json"));
const Curso_1 = require("./../routes/Curso");
const Usuario_js_1 = require("../routes/Usuario.js");
var mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
var bodyParser = require("body-parser");
class Server {
    constructor() {
        this.app = express_1.default();
        this.puerto = process.env.PORT || 5000;
        this.configurarBodyParser();
        this.habilitarCORS();
        this.configurarRutas();
    }
    habilitarCORS() {
        this.app.use((req, res, next) => {
            // configurar CORS
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Content-type, Authorization");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            next();
        });
    }
    configurarRutas() {
        this.app.get("/", (req, res) => {
            res.status(200).send("Servidor OK!");
        });
        this.app.use(Curso_1.curso_router);
        this.app.use(Usuario_js_1.usuario_router);
        this.app.use("/rutasplantilla", swaggerUi.serve, swaggerUi.setup(ApiPlantilla));
        this.app.use("/rutas", swaggerUi.serve, swaggerUi.setup(ApiDocumentacion));
    }
    start() {
        this.app.listen(this.puerto, () => {
            console.log("Servidor Iniciado correctamente en el puerto " + this.puerto);
            mongoose
                .connect("mongodb+srv://frankandia:Eh5falqz-@cluster-codigo-mlqug.mongodb.net/codigo", { useNewUrlParser: true })
                .then(() => {
                console.log("Conectado a la base de datos en Mongo correctamente =)");
            });
        });
    }
    configurarBodyParser() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    }
}
exports.Server = Server;
