import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
  DELETE_MANY,
  fetchUtils
} from 'react-admin'

const API_URL = window.location.origin

/**
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertDataProviderRequestToHTTP = (models, type, resource, params) => {
  const path = models.find(el => el.name === resource).route
  switch (type) {
    case GET_LIST: {
      /*
      const { page, perPage } = params.pagination
      const { field, order } = params.sort
      const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify(params.filter)
      }
      */
      const search = new URLSearchParams()
      Object.keys(params.filter).forEach(key => {
        search.append(key, params.filter[key])
      })
      return { url: `${API_URL}${path}?${search}` }
    }
    case GET_ONE: {
      return { url: `${API_URL}${path}/${params.id}` }
    }
    case GET_MANY: {
      const search = new URLSearchParams()
      const ids = params.ids.filter(id=>JSON.stringify(id) !== '{}')
      if(ids.length===0) return {invalid: true}
      ids.forEach(id => {
        search.append('_id', id)
      })
      return { url: `${API_URL}${path}?${search.toString()}` }
    }
    case GET_MANY_REFERENCE: {
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

      return { url: `${API_URL}${path}` }
    }
    case UPDATE:
      return {
        url: `${API_URL}${path}/${params.id}`,
        options: { method: 'PUT', body: JSON.stringify(params.data) }
      }
    case CREATE:
      return {
        url: `${API_URL}${path}`,
        options: { method: 'POST', body: JSON.stringify(params.data) }
      }
    case DELETE:
      return {
        url: `${API_URL}${path}/${params.id}`,
        options: { method: 'DELETE' }
      }
    default:
      throw new Error(`Unsupported fetch action type ${type}`)
  }
}

/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} Data Provider response
 */
const convertHTTPResponseToDataProvider = (
  response,
  type,
  resource,
  params
) => {
  const { json } = response
  switch (type) {
    case GET_LIST:
      return {
        data: json.map(x => {
          const { _id, ...other } = x
          return { id: _id, ...other }
        }),
        total: json.length
      }
    case GET_MANY:
      return {
        data: json.map(x => {
          const { _id, ...other } = x
          return { id: _id, ...other }
        }),
        total: json.length
      }
    case CREATE:
      return { data: { ...params.data, id: json.id } }
    default:
      const { _id, ...other } = json
      return { data: { id: _id, ...other } }
  }
}

/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for response
 */
export default (models, headers) => (type, resource, params) => {
  const { fetchJson } = fetchUtils
  if (type === DELETE_MANY) {
    return Promise.all(
      params.ids.map(id => {
        const {
          url,
          options
        } = convertDataProviderRequestToHTTP(models, DELETE, resource, { id })
        return fetchJson(url, {
          ...options,
          headers: new Headers(headers)
        }).then(response =>
          convertHTTPResponseToDataProvider(response, DELETE, resource, params)
        )
      })
    ).then(() => {
      return { data: [] }
    })
  }
  const { url, options, invalid } = convertDataProviderRequestToHTTP(
    models,
    type,
    resource,
    params
  )
  if(invalid) return new Promise(resolve=>resolve({data:[]}))
  return fetchJson(url, {
    ...options,
    headers: new Headers(headers)
  }).then(response =>
    convertHTTPResponseToDataProvider(response, type, resource, params)
  )
}
