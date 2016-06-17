# SAjax
A simple javascript ajax (ES6 and some utils)

# Usage
```javascript
import Utils from './Utils.js'

Utils.ajax('/api/getsome')
.get({
  page: 1,
  size: 15
})
.then(function(data){
  console.info(data)
})
.catch(function(err){
  console.warn(err)
})
```
