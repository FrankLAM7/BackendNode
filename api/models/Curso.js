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
var comentarioSchema = new mongoose.Schema({
    com_desc: {
        type: String,
    },
    com_fecha: {
        type: Date
    },
    com_usu: {
        type: String
    }
});
var videoSchema = new mongoose.Schema({
    vid_titulo: {
        type: String
    },
    vid_url: {
        type: String
    },
    vid_comentarios: [comentarioSchema]
});
exports.cursoSchema = new mongoose.Schema({
    cur_titulo: {
        type: String,
    },
    cur_desc: {
        type: String
    },
    cur_videos: [videoSchema]
});
