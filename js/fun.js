






function $(query) {
  var element = document.querySelector(query);
  if(!element){
    console.error('$: query "'+query+'" does not exist');
    return undefined;
  }
  element.hide = (disp="none", t=0) => setTimeout(() => element.style.display = disp, t);
  element.show = (disp="", t=0) => setTimeout(() => element.style.display = disp, t);
  element.styles = (styles) => {
    for (var style in styles) {
      element.style[style] = styles[style];
    }
  };
  element.css = (prop, value) => element.style[prop] = value;
  element.remove = () => element.parentNode.removeChild(element);
  element.getAttr = (att) => element.getAttribute(att);
  element.addClass = (name) => element.classList.add(name);
  element.removeClass = (name) => element.classList.remove(name);
  element.parent = () => element.parentNode;
  element.toggle = (display = '') => {
    if(window.getComputedStyle(element, null).getPropertyValue('display') == 'none')
      element.style.display = display;
    else element.style.display = 'none';
  }
  return element;
}





Object.prototype.each = function (func, start=null) {
  var result = start;
  for(var key in this){
    if(key != 'each' && typeof this[key] != 'function')
    result += func(this[key], key)
  }
  return result;
}

Object.prototype.reduce = function (func, start=null) {
  var result = start;
  for(var key in this){
    if(key != 'each' && typeof this[key] != 'function')
    result = func(this[key], key, result)
  }
  return result;
}

Object.prototype.keys = function () {
  return Object.keys(this);
}

Object.prototype.values = function () {
  return Object.values(this);
}

Array.prototype.get = function (att, value) {
  var result;
  this.forEach((a, i) => {
    if(a[att] == value){
      result = a;
      return;
    }
  });
  return result;
}

// allready in js
// Array.prototype.find = function (att, value) {
//   var result;
//   this.forEach((a, i) => {
//     if(a[att] == value){
//       result = i;
//       return;
//     }
//   });
//   return result;
// }




// function $(query) {
//   var result = document.querySelector(query);
//
//   result.styles = function(styles) {
//     for (var style in styles) {
//       result.style[style] = styles[style];
//     }
//   };
//
//   return result;
// }
//
// function $$(query) {
//   var result = document.querySelectorAll(query);
//
//   result.styles = function(styles) {
//     for (var el = 0; el < result.length; el++) {
//       for (var style in styles) {
//         result[el].style[style] = styles[style];
//       }
//     }
//   };
//
//   return result;
// }





























function get(url, func, init = false) {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      if (init)
        func(init(this.responseText));
      else
        func(this.responseText);
      }
    };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function getJSON(url, func) {
  get(url, func, JSON.parse);
}









// Auto refresh

var currentReload;

if(true)
get('../reload.txt', (result) => {
  currentReload = result;

  setInterval(() => {
    get('../reload.txt', (result) => {
      if(currentReload != result)window.location.reload();
    })
  }, 500)
})
