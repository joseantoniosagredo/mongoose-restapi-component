var a = [{ "name": "Customer", "paths": [{ "name": "name", "required": true }, { "name": "comment", "required": false }, { "name": "_id", "required": false }, { "name": "__v", "required": false }] }, { "name": "Provider", "paths": [{ "name": "name.hola", "required": true }, { "name": "name.adios", "required": true }, { "name": "comment", "required": false }, { "name": "_id", "required": false }, { "name": "__v", "required": false }] }]
const transformPaths = (paths) => {
    let pathsWithObject = paths.filter(el => el.name.indexOf('.') >= 0)
    let pathsWithoutObject = paths.filter(el => el.name.indexOf('.') < 0)
    let newObjects = []
    const visited = []
    pathsWithObject.forEach((el, key) => {
        if (visited.indexOf(el) < 0) {
            const base = el.name.split('.').shift()
            let newObject = {
                [base]: [{
                    ...el,
                    name: el.name.split('.').slice(1).join('.')
                }].concat(transformPaths(pathsWithObject.slice(key + 1).filter(el => el.name.startsWith(base + '.')).map(el => ({
                    ...el,
                    name: el.name.slice(base.length + 1)
                }))))
            }
            pathsWithObject.slice(1).filter(el => el.name.startsWith(base + '.')).forEach(el => {
                visited.push(el)
            })
            newObjects.push(newObject)
        }
    })
    return pathsWithoutObject.concat(newObjects)
}
console.log(JSON.stringify(transformPaths(a[1].paths), null, 2))