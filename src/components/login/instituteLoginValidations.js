"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInistitutionLoginFormValidations = void 0;
var Yup = require("yup");
var getInistitutionLoginFormValidations = function (values) {
    var schema = Yup.object()
        .shape({
        userName: Yup.string().required("UserName is Required"),
        passWord: Yup.string().required("Password is required").min(5, "Password must be longer than 6 characters.")
    })
        .defined();
    return schema;
};
exports.getInistitutionLoginFormValidations = getInistitutionLoginFormValidations;
//# sourceMappingURL=instituteLoginValidations.js.map