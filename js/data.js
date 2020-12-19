var pages = {
  home: {
    id: 1,
    form: [
      {
        type: 'h1',
        value: 'Home',
      },
      {
        type: 'p',
        text: 'Hello, {user.name}!',
      },
      {
        type: 'img',
        src: 'https://media.giphy.com/media/kZoUOdij6vQJ41o4PK/giphy.gif',
        width: '100%',
      },
      {
        type: 'p',
        text: 'You have <b style="color: #4b4">{user.points} Xmas Points</b><br>',
      },
      {
        type: 'p',
        text: `{user.naughtyList ? '<b style="color: #b44">You Are on Naughty List!!!</b> 50 Xmas points required to bribe Santa (in shop)' : "You are on nice list"}`,
      },
      {
        type: 'button1',
        value: 'Get Xmas Points',
        action: 'page(2)',
      },
      {
        type: 'button1',
        value: 'Xmas Shop',
        action: 'page(3)',
      }
    ]
  },

  play: {
    id: 2,
    gen: () => {
      return `<h1>Earn Points</h1>
      <h2><b style="color: #4b4">{user.points}</b> Xmas Points</h2>
      <p>Click a link to answer question</p><br><br>
      <ul>
      ${questions.reduce((b, a, i) => {
        if(!a.show)return b;
        return b+`
          <li><a href="#" onclick="showQuestion(${i})">${a.title}</a></li>
        `
      }, '')}
      </ul>`;
    },
  },

  shop: {
    id: 3,
    gen: () => {
      return `<h1>Xmas Shop</h1>
      <h2><b style="color: #4b4">{user.points}</b> Xmas Points</h2>
      <img src="https://media.giphy.com/media/TiUfuk77BzjHFIEmP1/giphy.gif" width="50%"><img src="https://media.giphy.com/media/zEBirxWQGmoeNrXvON/giphy.gif" width="50%">
      <br><br>
      ${genStore()}`;
    },
  },

  login: {
    id: 4,
    form: [
      {
        type: 'h1',
        value: 'Login',
      },
      {
        type: 'interger',
        name: 'code',
        placeholder: '####',
        label: 'Login Code',
      },
      {
        type: 'submit2',
        value: 'Login',
        action: 'login(getFormData(\'#content\').code)',
      },
      {
        type: 'img',
        src: 'https://media.giphy.com/media/3ksOEZckWJ3TY0hJFy/giphy.gif',
        width: '100%',
      },
    ]
  },
};

var getURLCodes = () => ([269304, 349680, 206834])

var users = [
  {
    name: 'Bob',
    code: '1000',
    points: 100,
    giftPrice: 400,
    naughtyList: true,
    gifts: [
      654327,
      306483,
      239840,
    ],
    urlCodes: getURLCodes(),
  },
];




var questions = JSON.parse(localStorage.getItem('questions')) || [
  {
    title: 'What santa do you like better?',
    show: true,
    form: [
      {
        type: 'h2',
        value: 'What santa do you like better?'
      },
      {
        type: 'img',
        src: 'https://media.giphy.com/media/dYj62sn3BLG4woM7Iw/giphy.gif',
        width: '100%',
      },
      {
        type: 'img',
        src: 'https://media.giphy.com/media/JqJM60q2ocmcak75Xb/giphy.gif',
        width: '100%',
      },
      {
        type: 'img',
        src: 'https://media.giphy.com/media/V4SGDlwwOYGvm/giphy.gif',
        width: '100%',
      },
      {
        type: 'radio',
        label: 'Pick an option',
        name: 'score',
        options: [
          {
            name: -50,
            text: 'A',
          },
          {
            name: -50,
            text: 'B',
          },
          {
            name: 150,
            text: 'C',
          },
        ],
      },
      {
        type: 'submit2',
        value: 'submit',
      }
    ]
  },
  {
    title: 'What is Christmas about?',
    show: true,
    form: [
      {
        type: 'h2',
        value: 'What christmas bout?'
      },
      {
        type: 'img',
        src: 'https://media.giphy.com/media/3E2ORcVHto9H8HMi2h/giphy.gif',
        width: '100%',
      },
      {
        type: 'img',
        src: 'https://media.giphy.com/media/vXjXyUJWLGgO4/giphy.gif',
        width: '100%',
      },
      {
        type: 'img',
        src: 'https://media.giphy.com/media/EDV30lQQ9VW5q/giphy.gif',
        width: '100%',
      },
      {
        type: 'radio',
        label: 'Pick an option',
        name: 'score',
        options: [
          {
            name: -100,
            text: 'A',
          },
          {
            name: 50,
            text: 'B',
          },
          {
            name: -100,
            text: 'C',
          },
        ],
      },
      {
        type: 'submit2',
        value: 'submit',
      }
    ]
  },
  {
    title: 'Your neighbor moves their fence two feet over into your property...',
    show: true,
    form: [
      {
        type: 'h2',
        value: 'Your neighbor moves their fence two feet over into your property. You do not contest this action. Over time, they can take over that two foot strip legally. What is this called? '
      },
      {
        type: 'radio',
        label: 'Pick an option',
        name: 'score',
        options: [
          {
            name: -100,
            text: 'Libel',
          },
          {
            name: -100,
            text: 'Slander',
          },
          {
            name: -100,
            text: 'Encroachment stoppage',
          },
          {
            name: 200,
            text: 'Squatters rights',
          },
        ],
      },
      {
        type: 'submit2',
        value: 'submit',
      }
    ]
  },
  {
    title: 'How would you properly deconstruct christmas?',
    show: true,
    form: [
      {
        type: 'h2',
        value: 'How would you properly deconstruct christmas?'
      },
      {
        type: 'radio',
        label: 'Pick an option',
        name: 'score',
        options: [
          {
            name: 200,
            text: 'Take out the construction of christmas because whatever is, hence is true',
          },
          {
            name: 30,
            text: 'Go to a christmas party and bring some tools and start to deconstruct the building',
          },
        ],
      },
      {
        type: 'submit2',
        value: 'submit',
      }
    ]
  },
  {
    title: 'What is art?',
    show: true,
    form: [
      {
        type: 'h2',
        value: 'What is art?'
      },
      {
        type: 'radio',
        label: 'Pick an option',
        name: 'score',
        options: [
          {
            name: 100,
            text: 'Art is anything that is not beautiful',
          },
          {
            name: 100,
            text: 'Art is simply a method of deconstruction',
          },
          {
            name: -50,
            text: 'colors and stuff idk',
          },
        ],
      },
      {
        type: 'submit2',
        value: 'submit',
      }
    ]
  },
  {
    title: 'Would you rather',
    show: true,
    form: [
      {
        type: 'h2',
        value: 'Would you rather'
      },
      {
        type: 'radio',
        label: 'Pick an option',
        name: 'score',
        options: [
          {
            name: -20,
            text: 'Not answer this question',
          },
          {
            name: 130,
            text: 'none of the below and none of the above but some of the below the below',
          },
          {
            name: -200,
            text: 'Not play this game',
          },
        ],
      },
      {
        type: 'submit2',
        value: 'submit',
      }
    ]
  },
  {
    title: 'How many points do you want?',
    show: true,
    form: [
      {
        type: 'h2',
        value: 'How many points u want?'
      },
      {
        type: 'radio',
        label: 'Pick an option',
        name: 'score',
        options: [
          {
            name: 400,
            text: 'You can take away all my points',
          },
          {
            name: 100,
            text: 'I want 100 points',
          },
          {
            name: -101,
            text: 'GIVE ME ALL THE POINTS!!!',
          },
        ],
      },
      {
        type: 'submit2',
        value: 'submit',
      }
    ]
  },
  {
    title: 'Math problem',
    show: true,
    form: [
      {
        type: 'h2',
        value: 'What is the log of -1'
      },
      {
        type: 'radio',
        label: 'Pick an option (i is imaginary number)',
        name: 'score',
        options: [
          {
            name: -50,
            text: 'i',
          },
          {
            name: -50,
            text: '-1.364376354',
          },
          {
            name: 336,
            text: '1.364376354i'
          },
          {
            name: -50,
            text: 'undefined',
          },
        ],
      },
      {
        type: 'submit2',
        value: 'submit',
      }
    ]
  },
  {
    title: 'What does Jaden prefer to be called?',
    show: true,
    form: [
      {
        type: 'h2',
        value: 'What does Jaden prefer to be called?'
      },
      {
        type: 'radio',
        label: 'Pick an option',
        name: 'score',
        options: [
          {
            name: -500,
            text: 'Jayden',
          },
          {
            name: 30,
            text: 'Sir',
          },
          {
            name: 336,
            text: 'Saint Jaden'
          },
          {
            name: -50,
            text: 'iawegwaehpawoegj',
          },
        ],
      },
      {
        type: 'submit2',
        value: 'submit',
      }
    ]
  },
  {
    title: 'Whats the official tredition after geting christmas tree?',
    show: true,
    form: [
      {
        type: 'h2',
        value: 'Whats the official tredition after decorating christmas tree?'
      },
      {
        type: 'radio',
        label: 'Pick an option',
        name: 'score',
        options: [
          {
            name: -10,
            text: 'Ice cream',
          },
          {
            name: -10,
            text: 'Pizza',
          },
          {
            name: 100,
            text: 'baskin robins'
          },
        ],
      },
      {
        type: 'submit2',
        value: 'submit',
      }
    ]
  },
  {
    title: 'What is Christmas in spanish?',
    show: true,
    form: [
      {
        type: 'h2',
        value: 'What is Christmas in spanish?'
      },
      {
        type: 'radio',
        label: 'Pick an option',
        name: 'score',
        options: [
          {
            name: -30,
            text: 'bueno navello',
          },
          {
            name: 100,
            text: 'feliz Navidad',
          },
          {
            name: -30,
            text: 'notiendo vanites'
          },
        ],
      },
      {
        type: 'submit2',
        value: 'submit',
      }
    ]
  },
  {
    title: 'What is your favorate search engine?',
    show: true,
    form: [
      {
        type: 'radio',
        label: 'What is your favorate search engine?',
        name: 'score',
        options: [
          {
            name: -300,
            text: 'Bing or MSN',
          },
          {
            name: -700,
            text: 'Google',
          },
          {
            name: 500,
            text: 'Duckduckgo!'
          },
        ],
      },
      {
        type: 'submit2',
        value: 'submit',
      }
    ]
  },
  {
    title: 'Who is the most evil?',
    show: true,
    form: [
      {
        type: 'radio',
        label: 'Who is the most evil?',
        name: 'score',
        options: [
          {
            name: -100,
            text: 'Joseph Stalin',
          },
          {
            name: -100,
            text: 'Joseph Brant',
          },
          {
            name: 200,
            text: 'Google'
          },
        ],
      },
      {
        type: 'submit2',
        value: 'submit',
      }
    ]
  },
  {
    title: 'What option would I pick?',
    show: true,
    form: [
      {
        type: 'radio',
        label: 'What option would I pick?',
        name: 'score',
        options: [
          {
            name: -50,
            text: 'Georgea',
          },
          {
            name: -50,
            text: 'Spring',
          },
          {
            name: 100,
            text: 'no'
          },
        ],
      },
      {
        type: 'submit2',
        value: 'submit',
      }
    ]
  },
  {
    title: 'What is your favorate color?',
    show: true,
    form: [
      {
        type: 'radio',
        label: 'What is your favorate color?',
        name: 'score',
        options: [
          {
            name: 100,
            text: 'dark red',
          },
          {
            name: -83,
            text: 'red',
          },
          {
            name: 20,
            text: 'very light red'
          },
        ],
      },
      {
        type: 'submit2',
        value: 'submit',
      }
    ]
  },
  {
    title: 'How many points do you want to loose?',
    show: true,
    form: [
      {
        type: 'radio',
        label: 'How many points do you want to loose?',
        name: 'score',
        options: [
          {
            name: -50,
            text: '50 points',
          },
          {
            name: -100,
            text: '100 points',
          },
          {
            name: -200,
            text: '200 points'
          },
        ],
      },
      {
        type: 'submit2',
        value: 'submit',
      }
    ]
  },
  {
    title: 'Free points how much u want?',
    show: true,
    form: [
      {
        type: 'radio',
        label: 'Free points how much u want?',
        name: 'score',
        options: [
          {
            name: 300,
            text: '10 points',
          },
          {
            name: -20,
            text: '100 points',
          },
          {
            name: -200,
            text: '1000 points'
          },
        ],
      },
      {
        type: 'submit2',
        value: 'submit',
      }
    ]
  },
  {
    title: 'How many blue stripes are there on the U.S. flag?',
    show: true,
    form: [
      {
        type: 'radio',
        label: 'How many blue stripes are there on the U.S. flag?',
        name: 'score',
        options: [
          {
            name: -10,
            text: '6',
          },
          {
            name: -10,
            text: '7',
          },
          {
            name: -10,
            text: '13'
          },
        ],
      },
      {
        type: 'submit2',
        value: 'submit',
      }
    ]
  },
  {
    title: 'Who was the only US president to resign?',
    show: true,
    form: [
      {
        type: 'radio',
        label: 'Who was the only US president to resign?',
        name: 'score',
        options: [
          {
            name: -100,
            text: 'Herbert Hoover',
          },
          {
            name: 200,
            text: 'Richard Nixon',
          },
          {
            name: -100,
            text: 'George W. Bush'
          },
        ],
      },
      {
        type: 'submit2',
        value: 'submit',
      }
    ]
  },
  {
    title: 'Im thinking about a random Hallmark movie, what is it about?',
    show: true,
    form: [
      {
        type: 'radio',
        label: 'Im thinking about a random Hallmark movie, what is it about?',
        name: 'score',
        options: [
          {
            name: -300,
            text: 'I dont know, what one are you refering to?',
          },
          {
            name: 100,
            text: 'Its about a girl that goes to an airport then the guy comes after talking to an old person... duh',
          },
        ],
      },
      {
        type: 'submit2',
        value: 'submit',
      }
    ]
  },
];


function genStore(){
  var result = [];

  user.gifts.forEach((a,i) => {
    result+=`
      <br><br><h3 class="h-border">${i+1} Gift cost ${user.giftPrice} Points</h3>
      <button class="b1" onclick="buyGift(${i})">Buy ${user.giftPrice} Xmas Points</button>
    `
  });

  return result;
}


function buyGift(i){
  if(user.points < user.giftPrice){
    msgPopup.show([{
      type: 'h2',
      value: 'Not enough points'
    }]);
  }
  else{
    user.points -= user.giftPrice;
    user.giftPrice *= 1.2
    user.giftPrice += user.giftPrice/4
    user.giftPrice = Math.floor(user.giftPrice);
    var giftCode = user.gifts[i];
    user.gifts.splice(i, 1);
    page(1)
    msgPopup.show([{
      type: 'h2',
      value: 'Redeem your code:'
    },{
      type: 'code',
      value: giftCode,
    }], () => page(1));

    backup();

  }
}


function badGif(){
  return [
      "https://media.giphy.com/media/3otPoq5NxDmzAFYebK/giphy.gif",
      "https://media.giphy.com/media/14x6fKcnN2uD9a3UnZ/giphy.gif",
      "https://media.giphy.com/media/76nhk8KE5UWoU/giphy.gif",
      "https://media.giphy.com/media/3o6wrGqm3FOmUcGn2U/giphy.gif",
      "https://media.giphy.com/media/3otPoFFesyuzdyCkaQ/giphy.gif",
      "https://media.giphy.com/media/5zQVnliKItfji/giphy.gif",
      "https://media.giphy.com/media/xUPOq9FQCjqh87B69O/giphy.gif",
      "https://media.giphy.com/media/xUPOq9FQCjqh87B69O/giphy.gif",
      "https://media.giphy.com/media/xUPOqsXSwYuui8Kl5C/giphy.gif",
      "https://media.giphy.com/media/l2YWl620FrxrhASR2/giphy.gif",
      "https://media.giphy.com/media/xUPOqDLqRg45Hgtrvq/giphy.gif",
      "https://media.giphy.com/media/xUySTGBwJTL6tmZITC/giphy.gif",
      "https://media.giphy.com/media/xUySTLeqduzoEQCwwM/giphy.gif",
  ][rand(0,13)];
}
function goodGif(){
  return [
      "https://media.giphy.com/media/l2YWob2t0kONyKH5e/giphy.gif",
      "https://media.giphy.com/media/3o6wrwMfn28GlYaEFy/giphy.gif",
      "https://media.giphy.com/media/xUySTEK7ooB40W3XJC/giphy.gif",
      "https://media.giphy.com/media/3o6wrkHhbYsTCzEQCc/giphy.gif",
  ][rand(0,3)];
}

function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
