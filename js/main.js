
var content = new Component('#content');
var loginCode = false;
var user;
var msgPopup = new prompter('msg');
var pop2 = new prompter('popper');



function page(a){
  if(!user && (a != 4 & a.id != 4))return;

  document.querySelectorAll('nav i').forEach((a) => a.classList.remove('active'))
  var current;

  if(typeof a == 'object'){
    $('.i-'+a.id).addClass('active')
    current = a;
  }
  else if(typeof a == 'number'){
    $('.i-'+a).addClass('active')
    current = pages.values().get('id', a)
  }
  if(current.form)content.update(generateForm( current.form ) );
  else if(current.gen)content.update(current.gen())
}




page(pages.login)


var initialLogin = true;
function login(code, no=true){
  var tUser;
  if(typeof code != 'object'){
    tUser = users.get('code', code);
  }
  else {
    tUser = code;
  }

  if(tUser){
    if(localStorage.getItem('user') && no){
      msgPopup.show([{type:'h2', value: 'Are you sure?'}, {type:'p', text: 'Logging in will reset your account'}, {type: 'submit1', value: 'Reset and Login'}, {type: 'submit2', value: 'Cancel'}, ],
      (result) => {
        if(result.submitButton == 'Reset and Login'){
          user = tUser;
          loginCode = code;
          page(pages.home);
          backup();
        }
        else{
          return;
        }
      })
    }
    else{
      user = tUser;
      loginCode = code;
      page(pages.home);
      backup();
    }
    if(initialLogin){
      var URLCode = new URLSearchParams(window.location.search).get('a');
      user.urlCodes.forEach((a, i) => {
        console.log(a);
        if(a == URLCode){
          user.points += 200;
          user.urlCodes.splice(i, 1);
          backup();
          alert('You got 200 points. Please close this tab');
        }
      })

      page(1);
      backup();
    }
    initialLogin = false;
  }else if(no) {
    msgPopup.show([{type:'h2', value: 'Ah Ah Ah You didnt say the magic word!'}, {type: 'img', src: 'https://thumbs.gfycat.com/BlissfulDisguisedKangaroo-size_restricted.gif', width: '100%'}])
    return;
  }else return;

}

function backup(){
  if(user.points < 0)user.points = 0;
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('questions', JSON.stringify(questions));
}


function restore(){
  if(localStorage.getItem('user')){
    login(JSON.parse(localStorage.getItem('user')), false);
  }
}


function showQuestion(i){
  msgPopup.show(questions[i].form, (a) => {
    var change = Number(a.score)
    user.points += change;
    if(change != undefined)questions[i].show = false;
    backup();
    if(change > 0){
      pop2.show([
        {
          type: 'h2',
          value: 'Correct! +'+change+' points'
        },
        {
          type: 'img',
          src: goodGif(),
          width: '100%',
        },
      ])
      page(1)
    }
    else{
      pop2.show([
        {
          type: 'h2',
          value: 'Wrong! '+change+' points'
        },
        {
          type: 'img',
          src: badGif(),
          width: '100%',
        },
      ])
      page(1)
    }
  })
}

restore();


setInterval(backup, 3000);
