"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_admin_1 = require("react-admin");
const parsePath = models => el => {
    if (el.type === 'String') {
        return (React.createElement(react_admin_1.TextInput, { label: el.label, source: el.name, required: el.required }));
    }
    if (el.type === 'Date') {
        return (React.createElement(react_admin_1.TextInput, { label: el.label, source: el.name, required: el.required }));
    }
    if (el.type === 'ObjectId') {
        return (React.createElement(react_admin_1.DisabledInput, { label: el.label, source: el.name, required: el.required }));
    }
    if (el.type === 'Number') {
        return (React.createElement(react_admin_1.TextInput, { label: el.label, source: el.name, required: el.required }));
    }
    if (el.type === 'Ref') {
        return (React.createElement(react_admin_1.ReferenceInput, { label: el.label, source: el.name, reference: el.to },
            React.createElement(react_admin_1.SelectInput, { optionText: models.find(model => model.name === el.to).label })));
    }
    if (el.type === 'Array') {
        return (React.createElement(react_admin_1.ArrayInput, { label: el.label, source: el.name },
            React.createElement(react_admin_1.SimpleFormIterator, null, el.children.map(parsePath(models)))));
    }
    if (el.type === 'ArrayRef') {
        return (React.createElement(react_admin_1.ArrayInput, { label: el.label, source: el.name, defaultValue: '' },
            React.createElement(react_admin_1.SimpleFormIterator, null,
                React.createElement(react_admin_1.ReferenceInput, { reference: el.to },
                    React.createElement(react_admin_1.SelectInput, { optionText: models.find(model => model.name === el.to).label })))));
    }
    if (el.type.startsWith('Array')) {
        return (React.createElement(react_admin_1.ArrayInput, { label: el.label, source: el.name, required: el.required, defaultValue: { hey: 3 } },
            React.createElement(react_admin_1.SimpleFormIterator, null,
                React.createElement(react_admin_1.TextInput, null))));
    }
    return null;
};
const parsePathPrefix = (models, prefix) => (el, key) => {
    return parsePath(models)(Object.assign({}, el, { name: `${prefix}.${el.name}`, label: el.name }));
};
function parseComplex(models, name, children, isArray = false) {
    if (name !== 'General') {
        return (React.createElement(react_admin_1.FormTab, { key: name, label: name }, children.map(parsePathPrefix(models, name))));
    }
    return (React.createElement(react_admin_1.FormTab, { key: 0, label: name }, children.map(parsePath(models))));
}
function PostCreate(models, model, showId = false) {
    return (React.createElement(react_admin_1.TabbedForm, null,
        parseComplex(models, 'General', model.paths.filter(path => !(path.hasOwnProperty('children') &&
            path.type !== 'Array' &&
            (!showId || path.name !== '_id')))),
        model.paths
            .filter(path => path.hasOwnProperty('children') && path.type !== 'Array')
            .map(el => parseComplex(models, el.name, el.children, el.type === 'Array'))));
}
exports.default = PostCreate;
