"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapError = void 0;
function mapError(errors) {
    return errors.split('. ').map((error) => {
        return error.replace(/['"]+/g, '');
    });
}
exports.mapError = mapError;
