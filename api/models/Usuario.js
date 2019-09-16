"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require('crypto');
var jwt = require('jsonwebtoken');
const mongoose = __importStar(require("mongoose"));
exports.usuarioSchema = new mongoose.Schema({
    usu_nom: {
        type: String,
    },
    usu_ape: {
        type: String
    },
    usu_email: {
        type: String
    }, usu_hash: {
        type: String
    }, usu_salt: {
        type: String
    },
});
exports.usuarioSchema.methods.setSaltYHash = function (password) {
    this.usu_salt = crypto.randomBytes(16).toString('hex');
    this.usu_hash = crypto.pbkdf2Sync(password, this.usu_salt, 2000, 64, 'sha512').toString('hex');
};
exports.usuarioSchema.methods.validPassword = function (password) {
    let usu_hash_tmp = crypto.pbkdf2Sync(password, this.usu_salt, 2000, 64, 'sha512').toString('hex');
    return usu_hash_tmp === this.usu_hash;
};
exports.usuarioSchema.methods.generarJWT = function () {
    let payload = {
        usu_id: this.usu_id,
        usu_nom: `${this.usu_nom} ${this.usu_ape}`
    };
    let token = jwt.sign(payload, '0Pi90gcc', { expiresIn: '1h' }, { algorithm: 'RS256' });
    return token;
};
