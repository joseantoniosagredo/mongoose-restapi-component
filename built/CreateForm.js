"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ModelForm_1 = require("./ModelForm");
const react_admin_1 = require("react-admin");
function PostCreate(models, model) {
    const CreateForm = props => (React.createElement(react_admin_1.Create, Object.assign({}, props), ModelForm_1.default(models, model)));
    return CreateForm;
}
exports.default = PostCreate;
