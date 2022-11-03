"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
function response(req, res, next) {
    return {
        json: (data, status = 200, message = "Success") => {
            return res.status(status).json({
                data,
                message,
                status,
            });
        },
    };
}
exports.response = response;
