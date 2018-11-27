"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_admin_1 = require("react-admin");
const react_admin_2 = require("react-admin");
const parsePath = models => (el, key) => {
    if (el.type === 'String') {
        return React.createElement(react_admin_1.TextField, { key: key, source: el.name });
    }
    if (el.type === 'Date') {
        return React.createElement(react_admin_1.TextField, { key: key, source: el.name });
    }
    if (el.type === 'ObjectId') {
        return React.createElement(react_admin_1.TextField, { key: key, source: el.name });
    }
    if (el.type === 'Number') {
        return React.createElement(react_admin_1.TextField, { key: key, source: el.name });
    }
    if (el.type === 'Ref') {
        return (React.createElement(react_admin_1.ReferenceField, { key: key, source: el.name, reference: el.to },
            React.createElement(react_admin_1.TextField, { source: models.find(model => model.name === el.to).label })));
    }
    if (el.type === 'Array') {
        return (React.createElement(react_admin_1.ArrayField, { key: key, source: el.name },
            React.createElement(react_admin_1.SingleFieldList, null,
                React.createElement(react_admin_1.ChipField, { source: el.label }))));
    }
    if (el.type === 'ArrayRef') {
        return (React.createElement(react_admin_1.ReferenceArrayField, { label: el.name, key: key, source: el.name, reference: el.to },
            React.createElement(react_admin_1.SingleFieldList, null,
                React.createElement(react_admin_1.ChipField, { source: models.find(model => model.name === el.to).label }))));
    }
    if (el.type && el.type.startsWith('Array')) {
        const CursorComponent = ({ record }) => {
            return (React.createElement("ul", null, record[el.name] &&
                record[el.name].map(child => (React.createElement("li", { key: child }, child.toString())))));
        };
        CursorComponent.defaultProps = { addLabel: true };
        return React.createElement(CursorComponent, { key: key });
    }
    if (!el.complex) {
        return (React.createElement(react_admin_1.FunctionField, { key: key, label: el.name, render: record => (record[el.name] ? record[el.name].toString() : '') }));
    }
};
const ListFilter = props => (React.createElement(react_admin_2.Filter, Object.assign({}, props),
    React.createElement(react_admin_2.TextInput, { label: 'Search', source: '$any', alwaysOn: true })));
function PostCreate(models, model) {
    const ListForm = props => (React.createElement(react_admin_1.List, Object.assign({}, props, { filters: React.createElement(ListFilter, null) }),
        React.createElement(react_admin_1.Datagrid, null,
            model.paths
                .filter(path => {
                return path.name !== '_id' && path.name !== '__v';
            })
                .map(parsePath(models)),
            React.createElement(react_admin_1.EditButton, null))));
    return ListForm;
}
exports.default = PostCreate;
