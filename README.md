# SAjax
A simple javascript ajax (ES6 and some utils)

1. Ajax (get / post / put / _delete)
2. Cookie (get / set / _delete)
3. Other (isExist / param / parse / extend ...)

# Usage
```javascript
import Utils from './Utils.js'

// same way to post, put, _delete
Utils.ajax('/api/getsome')
.get({
  page: 1,
  size: 15
})
.then(function(res){
  let { data, status } = res;
  console.info(data, status)
})
.catch(function(err){
  let { statusText, status } = err;
  console.warn(err, statusText, status) // before your code running perfect, don't remove this.
})

...

let a_cookie = Utils.cookie('cookie_name').get() // get cookie
Utils.cookie('cookie_name').set(action.data) // set cookie
Utils.cookie('cookie_name')._delete() // delete cookie

...

Utils.isExist(null || undefined || '') // => false
Utils.parse('?a=2&b=3') // => {a:2, b:3}
Utils.param({a:2, b:3}) // => 'a=2&b=3'
Utils.extend(a) // simple deep copy
```
