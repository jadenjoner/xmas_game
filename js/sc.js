// Simple Components

var ComponentList = [];
var RenderThis = {};
var NullFun = () => {return};

class Component{
  constructor(element, template, local={}){
    this.attach(element);

    this.id = ComponentList.length;
    this.cache = '';
    this.local = local;
    this.template = template || '';
    ComponentList[this.id] = this;

    template && this.update();
  }
  update(template=this.template, local=this.local){
    var result = RenderComponent(template, local, true)
    this.local = {...this.local, ...local};
    this.cache = result;
    this.template = template;
    this.write(result);
  }
  write(result){
    if(this.query)this.element = document.querySelector(this.query);
    if(this.element)this.element.innerHTML = result;
  }
  autoUpdate(delay=100){
    if(delay <= 0)clearInterval(this.interval);
    else this.interval = setInterval(() => {
      var result = RenderComponent(this.template, this.local);
      if(result != this.cache){
        this.write(result)
        this.cache = result;
      };
    }, delay)
  }
  attach(element){
    if(typeof element == 'string'){
      this.query = element;
      element = document.querySelector(element) || console.warn('Warning: component query element not found: '+element+' does not exist yet. Specify correct query or use Component.attach(query)')
    }
    this.element = element;
  }
  async getTemplate(url, ok=NullFun, error=NullFun, method="GET", body){
    var res = await fetch(url, {
      method: method,
      headers: {
        'Accept': 'text/plain',
        'Content-Type': typeof(body) == 'object' ? 'application/json' : 'text/plain',
      },
      body: typeof(body) == 'object' ? JSON.stringify(body) : body || undefined,
    })

    var text;
    await res.text().then(a => {text = a})

    if(res.ok){
      UpdateComponent(this.id, text)
      ok(text);
    }
    else{
      error(res.status, 'Request Rejected')
    }
    return res;
  }
  async getProperties(url, ok=NullFun, error=NullFun, method="GET", body){
    function canParse(text){
      try{
        JSON.parse(text);
      }
      catch (e){
        console.error(e);
        return false;
      }
      return true;
    }
    var res = await fetch(url, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': typeof(body) == 'object' ? 'application/json' : 'text/plain',
      },
      body: typeof(body) == 'object' ? JSON.stringify(body) : body || undefined,
    })
    var text;
    var json;
    await res.text().then(a => {text = a})
    if(canParse(text))json = JSON.parse(text);
    else return error(418, 'JSON parse error');


    if(res.ok){
      ok(json);
      UpdateComponent(this.id, undefined, json)
    }
    else{
      error(res.status, 'Request Rejected')
    }
    return res;
  }
}

var UpdateComponent = (id) => ComponentList[id].update();
var GetComponent = (id) => ComponentList[id];
var GetComponentText = (id) => ComponentList[id].cache;
var UpdateComponent = (id, a, b) => ComponentList[id].update(a, b);

function RenderComponent(input, custom={}, showError=false){
  var safety = 0;
  while(input.match(/\{(.+?)\}/) && safety < 10000){
    safety += 1;
    var match = input.match(/\{(.+?)\}/);
    RenderThis = custom;
    var result;
    try{
      result = eval(`(({${Object.keys(RenderThis).toString()}})=>{return ${match[1]}})(RenderThis)`) || '';
    }
    catch (e){
      result = '';
      if(showError)console.error('Component render error: '+e+', for evaluation of "'+match[1]+'"')
    }
    input = input.replace(match[0], result);
  }
  return input;
}
