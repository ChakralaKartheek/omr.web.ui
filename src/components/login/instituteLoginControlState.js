"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstitueLoginControlState = void 0;
var instituteLoginModels_1 = require("./instituteLoginModels");
var getInstitueLoginControlState = function (values) {
    var controlState = new instituteLoginModels_1.InstituteLoginControlState();
    controlState.userName.label.userName = 'User Name';
    controlState.passWord.label.passWord = 'Password';
    return controlState;
};
exports.getInstitueLoginControlState = getInstitueLoginControlState;
//# sourceMappingURL=instituteLoginControlState.js.map