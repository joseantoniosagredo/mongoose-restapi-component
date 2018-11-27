"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_admin_1 = require("react-admin");
const API_URL = window.location.origin;
/**
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertDataProviderRequestToHTTP = (models, type, resource, params) => {
    const path = models.find(el => el.name === resource).route;
    switch (type) {
        case react_admin_1.GET_LIST: {
            /*
            const { page, perPage } = params.pagination
            const { field, order } = params.sort
            const query = {
              sort: JSON.stringify([field, order]),
              range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
              filter: JSON.stringify(params.filter)
            }
            */
            const search = new URLSearchParams();
            Object.keys(params.filter).forEach(key => {
                search.append(key, params.filter[key]);
            });
            return { url: `${API_URL}${path}?${search}` };
        }
        case react_admin_1.GET_ONE: {
            return { url: `${API_URL}${path}/${params.id}` };
        }
        case react_admin_1.GET_MANY: {
            const search = new URLSearchParams();
            const ids = params.ids.filter(id => JSON.stringify(id) !== '{}');
            if (ids.length === 0)
                return { invalid: true };
            ids.forEach(id => {
                search.append('_id', id);
            });
            return { url: `${API_URL}${path}?${search.toString()}` };
        }
        case react_admin_1.GET_MANY_REFERENCE: {
            /*
            const { page, perPage } = params.pagination
            const { field, order } = params.sort
            const query = {
              sort: JSON.stringify([field, order]),
              range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
              filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id
              })
            }
            */
            return { url: `${API_URL}${path}` };
        }
        case react_admin_1.UPDATE:
            return {
                url: `${API_URL}${path}/${params.id}`,
                options: { method: 'PUT', body: JSON.stringify(params.data) }
            };
        case react_admin_1.CREATE:
            return {
                url: `${API_URL}${path}`,
                options: { method: 'POST', body: JSON.stringify(params.data) }
            };
        case react_admin_1.DELETE:
            return {
                url: `${API_URL}${path}/${params.id}`,
                options: { method: 'DELETE' }
            };
        default:
            throw new Error(`Unsupported fetch action type ${type}`);
    }
};
/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} Data Provider response
 */
const convertHTTPResponseToDataProvider = (response, type, resource, params) => {
    const { json } = response;
    switch (type) {
        case react_admin_1.GET_LIST:
            return {
                data: json.map(x => {
                    const { _id } = x, other = __rest(x, ["_id"]);
                    return Object.assign({ id: _id }, other);
                }),
                total: json.length
            };
        case react_admin_1.GET_MANY:
            return {
                data: json.map(x => {
                    const { _id } = x, other = __rest(x, ["_id"]);
                    return Object.assign({ id: _id }, other);
                }),
                total: json.length
            };
        case react_admin_1.CREATE:
            return { data: Object.assign({}, params.data, { id: json.id }) };
        default:
            const { _id } = json, other = __rest(json, ["_id"]);
            return { data: Object.assign({ id: _id }, other) };
    }
};
/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for response
 */
exports.default = (models, headers) => (type, resource, params) => {
    const { fetchJson } = react_admin_1.fetchUtils;
    if (type === react_admin_1.DELETE_MANY) {
        const promises = params.ids.map(id => {
            const { url, options } = convertDataProviderRequestToHTTP(models, react_admin_1.DELETE, resource, { id });
            return fetchJson(url, Object.assign({}, options, { headers: new Headers(headers) })).then(response => convertHTTPResponseToDataProvider(response, react_admin_1.DELETE, resource, params));
        });
        return Promise.all(promises).then(() => {
            return { data: [] };
        });
    }
    const { url, options, invalid } = convertDataProviderRequestToHTTP(models, type, resource, params);
    if (invalid)
        return new Promise(resolve => resolve({ data: [] }));
    return fetchJson(url, Object.assign({}, options, { headers: new Headers(headers) })).then(response => convertHTTPResponseToDataProvider(response, type, resource, params));
};
