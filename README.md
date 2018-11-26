# React component for Mongoose API UI

Simplest admin usage! You can control safely your data with an admin panel.

Usage:
```
import Admin from 'mongoose-restapi-ui-component'


export default (props) => <Admin tree='your/path/to/tree' />

```

Posible props:
- `tree`: The tree path published by [mongoose-restapi-ui](https://www.npmjs.com/package/mongoose-restapi-ui)
- `headers`: Custom headers (Example: {Authorization: 'Basic token'})
- `theme`: Theme from [@material-ui/core](https://material-ui.com/customization/themes/)

Enjoy!