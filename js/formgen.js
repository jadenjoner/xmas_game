// Changing this file changes the global script

var formSubmitButton;
var prompterAfter = {};


function generateForm(data, id=0){
  return data.reduce((b, a) => {
    if(a.type == 'text'){
      return b+`<label class="form-label">${a.label}</label>
      <input type="text" value="${a.value || ''}" name="${a.name}" placeholder="${a.placeholder}"/>`
    }
    else if(a.type == 'interger'){
      return b+`<label class="form-label">${a.label}</label>
      <input onkeyup="this.value = parseInt(this.value) || 0" style="width: 100px" type="text" value="${a.value || ''}" name="${a.name}" placeholder="${a.placeholder}"/>`
    }
    else if(a.type == 'number'){
      return b+`<label class="form-label">${a.label}</label>
      <input type="text" style="width: 100px" value="${a.value || ''}" name="${a.name}" placeholder="${a.placeholder}"/>`
    }
    else if(a.type == 'date'){
      return b+`<label class="form-label">${a.label}</label>
      <input type="date" value="${a.value || ''}" name="${a.name}"/>`
    }
    else if(a.type == 'time'){
      return b+`<label class="form-label">${a.label}</label>
      <input type="time" value="${a.value || ''}" name="${a.name}"/>`
    }
    else if(a.type == 'color'){
      return b+`<label class="form-label">${a.label}</label><div class="color-wrap">
      <input class="reset-input" name="${a.name}" id="colorInput_${a.name}" placeholder="#XXXXXX"
      value="${a.value}" type="text" onkeyup="$('#colorInput_${a.name}-inputbox').value = this.value">
      <input id="colorInput_${a.name}-inputbox" value="${a.value}" type="color" onchange="$('#colorInput_${a.name}').value = this.value">
    </div>`
    }
    else if(a.type == 'h1'){
      return b+`<h1 class="${a.border ? 'h-border' : ''}">${a.value}</h1>`;
    }
    else if(a.type == 'h2'){
      return b+`<h2 class="${a.border ? 'h-border' : ''}">${a.value}</h2>`;
    }
    else if(a.type == 'h3'){
      return b+`<h3 class="${a.border ? 'h-border' : ''}">${a.value}</h3>`;
    }
    else if(a.type == 'range'){
      return b+`<label class="form-label">${a.label}</label>
      <input type="range" name="${a.name}" value="${a.value}">`
    }
    else if(a.type=='code'){
      return b+`<code>${a.value}</code>`
    }
    else if(a.type=='img'){
      return b+`<img src="${a.src}" width="${a.width || 'auto'}" height="${a.height || 'auto'}">`
    }
    else if(a.type=='select'){
      return b+`<label class="form-label">${a.label}</label>
    <select name="${a.name}">
        ${a.options.reduce((d, c) => {
          return d+`<option value="${c.name}" ${c.default ? 'selected' : ''} ${c.disabled ? 'disabled' : ''}>${c.text}</option>`;
        }, '')}
      </select>`;
    }
    else if(a.type=='switch'){
      return b+`<br><label class="switch">
      <input type="checkbox" name="${a.name}" id="switch-${a.name}" ${a.checked ? 'checked' : ''}>
      <span class="slider"></span>
    </label><label for="switch-${a.name}" class="switch-label">${a.label}</label>`
    }
    else if(a.type=='checkbox'){
      return b+`<label class="checkbox">${a.label}
        <input type="checkbox" name="${a.name}" ${a.checked ? 'checked' : ''}>
        <span class="checkmark"></span>
      </label>`;
    }
    else if(a.type=='radio'){
      return b+`<br><label class="form-label">${a.label}</label>
      ${a.options.reduce((d, c) => {
        return d+`<label class="radio">${c.text}
                    <input type="radio" value="${c.name}" name="${a.name}" ${c.default ? 'checked' : ''}>
                    <span class="checkmark"></span>
                  </label>`;
      }, '')}`;
    }
    else if(a.type=='textarea'){
      return b+`<label class="form-label">${a.label}</label>
      <textarea name="${a.name}" style="height: ${a.height}px" placeholder="${a.placeholder || ''}">${a.value || ''}</textarea>`
    }
    else if(a.type=='button1'){
      return b+`<br><br><button class="b1" onclick="${a.action}">${a.value}</button>`;
    }
    else if(a.type=='button2'){
      return b+`<br><br><button class="b2" onclick="${a.action}">${a.value}</button>`;
    }
    else if(a.type=='submit1'){
      return b+`<br><br><button class="b1" onclick="${a.action}; formSubmitButton = '${a.value}'; ${id ? "afterSubmit('"+id+"')" : ""}">${a.value}</button>`;
    }
    else if(a.type=='submit2'){
      return b+`<br><br><button class="b2" onclick="${a.action}; formSubmitButton = '${a.value}'; ${id ? "afterSubmit('"+id+"')" : ""}">${a.value}</button>`;
    }
    else if(a.type=='hr'){
      return b+'<hr>';
    }
    else if(a.type=='html'){
      return b+a.html;
    }
    else if(a.type=='link'){
      return b+`<a onclick="${a.action || ''}" href="${a.href || ''}" target="${a.newTab ? '_blank' : ''}">${a.text}</a>`;
    }
    else if(a.type=='padding'){
      return b+`<div style="height: ${a.height || 8}px"></div>`;
    }
    else if(a.type=='p'){
      return b+`<p>${a.text}</p>`;
    }
    else{
      return b;
    }
  }, '');
}

function getFormData(container){
  if(typeof container == 'string')container = document.querySelector(container)
  var result = {};
  container.childNodes.forEach(a => {
    if(a.tagName == "INPUT" || a.tagName == "TEXTAREA"){
      result[a.name] = a.value;
    }
    else if(a.tagName == "SELECT"){
      result[a.name] = a.options[a.selectedIndex].value;
    }
    else if(a.classList && (a.classList.contains('checkbox') || a.classList.contains('switch'))){
      result[a.children[0].name] = a.children[0].checked;
    }
    else if(a.classList && a.classList.contains('radio')){
      if(a.children[0].checked)
        result[a.children[0].name] = a.children[0].value;
    }
    else if(a.classList && a.classList.contains('color-wrap')){
      result[a.children[0].name] = a.children[0].value;
    }

    result.submitButton = formSubmitButton;
  })
  return result;
}

class prompter {
  constructor(id){
    this.id = id;
    document.body.innerHTML = document.body.innerHTML+`<div onclick="closePopup('${id}', event)" class="prompter" id="${id}" style="display: none"><section></section></div>`;
  }
  show(form, func){
    prompterAfter[this.id] = {
      func: func,
    }
    var el = document.querySelector('#'+this.id+' > section')
    var popup = document.querySelector('#'+this.id)
    el.innerHTML = generateForm(form, this.id);
    func = prompterAfter[this.id];
    popup.style.display = '';
  }
}

function afterSubmit(id){
  var data = getFormData(document.querySelector('#'+id+' section'));
  prompterAfter[id].func(data);
  closePopup(id)
}


function closePopup(id, e) {
  if(!e || e && e.target.classList.contains('prompter'))
  document.querySelector("#"+id).style.display = 'none';
}
