"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("./../config/mongoose");
exports.crearUsuario = (req, res) => {
    //crea una instancia de la clase Usuario 
    //sin guardarlo en la base de datos
    let objUsuario = new mongoose_1.Usuario(req.body.usuario);
    objUsuario.setSaltYHash(req.body.usuario.usu_pass);
    //save() => promesa que guarda el registro enla base de datos
    objUsuario.save((error) => {
        if (error) {
            let content = {
                msg: 'Error al crear el usuario.',
                content: error
            };
            res.status(501).json(content);
        }
        else {
            let token = objUsuario.generarJWT();
            let content = {
                msg: 'Usuario creado correctamente.',
                contenido: {
                    objUsuario,
                    token
                }
            };
            res.status(201).json(content);
        }
    });
};
// export let iniciarSesion = (req:Request, res:Response) =>{
//     //usu_pass llega encriptado en base64
//     let { b_usu_email, b_usu_pass } = req.body;
//     //desencriptando password
//     let buff = new Buffer(b_usu_pass, 'base64');
//     let pass_dec = buff.toString('ascii');
//     Usuario.findOne({
//         where: {
//             usu_email: b_usu_email
//         }
//     }).then((objUsuario:any) =>{
//         if(objUsuario){
//             //cuando el usuario existe en la bd
//             //se debe verificar si el password es correcto
//             //se envia la contraseña desencriptada
//             let valido = objUsuario.validPassword(pass_dec);
//             if(valido){
//                 //generar JWT
//                 let token = objUsuario.generarJWT();
//                 res.status(200).json(
//                     {
//                         message: "Ok",
//                         token: token
//                     }
//                 );
//             }else{
//                 //cuando la contraseña es incorrecta
//                 let rpta = {
//                     msg: "Error",
//                     content:"El usuario o la contraseña son incorrectos"
//                 };
//                 res.status(500).json(rpta);
//             }
//         }else{
//             //cuando el usuario no existe en la bd
//             let rpta = {
//                 msg: "Error",
//                 content:"El usuario o la contraseña son incorrectos"
//             };
//             res.status(500).json(rpta);
//         }
//     })
// }
