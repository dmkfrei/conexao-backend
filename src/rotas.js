import loginController from './controller/loginController.js';
import matrizController from './controller/matrizController.js';
import filialController from './controller/filialController.js';
import resposanvelController from './controller/responsavelController.js';
import loginAdmController from './controller/loginAdmController.js';

export default function Rotas(server) {
    server.use(loginController);
    server.use(matrizController);
    server.use(filialController);
    server.use(resposanvelController);
    server.use(loginAdmController);
}