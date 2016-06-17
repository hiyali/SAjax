# SAjax
A simple javascript ajax (ES6 and some utils)

# Usage
```javascript
Utils.ajax( '/api/getsome' )
.get( param )
.then( function(data){
  console.info(data)
}.bind(this) )
.catch( function(err){
  console.warn(err)
}.bind(this) )
```
