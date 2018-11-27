"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ModelForm_1 = require("./ModelForm");
const react_admin_1 = require("react-admin");
function PostCreate(models, model) {
    const CreateForm = props => (React.createElement(react_admin_1.Edit, Object.assign({}, props), ModelForm_1.default(models, model, true)));
    return CreateForm;
}
exports.default = PostCreate;
