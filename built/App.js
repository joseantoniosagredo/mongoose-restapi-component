"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("react");
const react_admin_1 = require("react-admin");
const data_provider_1 = require("./data_provider");
const CreateForm_1 = require("./CreateForm");
const EditForm_1 = require("./EditForm");
const ListForm_1 = require("./ListForm");
class App extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            menu: null,
            tree: null,
            headers: {},
            init: false
        };
    }
    componentDidMount() {
        fetch(this.props.tree, { headers: this.props.headers })
            .then(res => res.json().then(tree => {
            this.setState({ tree });
        }))
            .catch(err => {
            console.log(err);
        });
    }
    render() {
        return (React.createElement("div", null, this.state.tree &&
            React.createElement(react_admin_1.Admin, { theme: this.props.theme, dataProvider: data_provider_1.default(this.state.tree, this.props.headers) }, this.state.tree.map(model => (React.createElement(react_admin_1.Resource, { key: model.route, name: model.name, list: ListForm_1.default(this.state.tree, model), edit: EditForm_1.default(this.state.tree, model), create: CreateForm_1.default(this.state.tree, model) }))))));
    }
}
exports.default = App;
