
/*!
*
* from:
https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
* optimize by: Salam Xiyali
*
*/
let $ajax = (url) => {
  let initXMLHttpRequest = () =>
    window.XMLHttpRequest ?
    new XMLHttpRequest() : //code for IE7,firefox chrome and above
  new ActiveXObject("Microsoft.XMLHTTP"); //code for Internet Explorer

  const ajax = (method, url, args) => new Promise( function (resolve, reject) {
    let client = initXMLHttpRequest();
    let uri = url;

    console.log(method, url, args)

    if (args &&
        (method === 'GET' || method === 'POST' || method === 'PUT')) {

      uri += '?';
      let argcount = 0;
      for (var key in args) {
        if (args.hasOwnProperty(key)) {
          if (argcount++) {
            uri += '&';
          }
          uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
        }
      }
    }

    client.open(method, uri);
    // client.setRequestHeader("Content-type", "application/json");
    // client.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
    client.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    client.send();

    client.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        let data = JSON.parse(this.response)
        resolve(data);
      } else {
        reject(this.statusText);
      }
    }

    client.onerror = function () {
      reject(this.statusText);
    }
  })

  // Adapter pattern
  return {
    'get': (args) => ajax('GET', url, args),
    'post': (args) => ajax('POST', url, args),
    'put': (args) => ajax('PUT', url, args),
    'delete': (args) => ajax('DELETE', url, args)
  };
};

module.exports = {
  isExist: (s) => s !== null && s !== "" && s !== undefined,

  param: (obj) => {
    var str = [];
    for(var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  },

  extend: (obj) => JSON.parse(JSON.stringify(obj)),

  callbackParseData: (callback) => (_data) => {
    var data = JSON.parse(_data);
    callback(data);
  },

  ajax: $ajax
}

