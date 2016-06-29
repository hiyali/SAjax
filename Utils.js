/*!
*
* from: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
* optimize by: Salam Xiyali
* Maxcrit Inc.
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

    console.log('Methoh:', method, ' Url:', url, ' Args:', args || '')

    if (args){
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

    switch(method){
      case 'GET':
        client.open(method, uri);
        client.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        client.send();
        break;
      case 'POST':
        client.open(method, url);
        client.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        client.send(JSON.stringify(args));
        break;
      case 'POST_FILE':
        client.open(method, url);
        client.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
        client.send(args);
        break;
      case 'DELETE':
        client.open(method, url);
        client.send();
        break;
    }
    // client.setRequestHeader("Content-type", "application/json");

    client.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        let { status, response } = this;
        let data = {};
        if(this.status === 204){
          data = {success: true}
        }else{
          data = JSON.parse(response);
        }
        resolve({data, status});
      } else {
        let { statusText, status } = this;
        reject({statusText, status});
      }
    }

    client.onerror = function () {
      let { statusText, status } = this;
      reject({statusText, status});
    }
  })

  // Adapter pattern
  return {
    'get': (args) => ajax('GET', url, args),
    'post': (args) => ajax('POST', url, args),
    'put': (args) => ajax('PUT', url, args),
    '_delete': (args) => ajax('DELETE', url, args)
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

  parse: (queryStr) => {
    var query = {};
    var a = queryStr.substr(1).split('&');
    for (var i = 0; i < a.length; i++) {
      var b = a[i].split('=');
      query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
    }
    return query;
  },

  extend: (obj) => JSON.parse(JSON.stringify(obj)),

  ajax: $ajax
}

