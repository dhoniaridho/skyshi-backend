"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
function bootstrap() {
    const app = (0, express_1.default)();
    app.listen(3000, '0.0.0.0', () => {
        console.log('Server is started at port 3000');
    });
    app.use(express_1.default.json());
    routes_1.Routes.forEach((route) => {
        app.use(route);
    });
}
bootstrap();
