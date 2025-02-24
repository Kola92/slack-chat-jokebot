const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
  token: 'xoxb-748176759076-737203398787-NtIKlvKdZcMWbymXXpXe9tSU',
  name: 'jokechatbot'
});

// Start Handler
bot.on('start', () => {
  const params = {
    icon_emoji: ':blush:'
  };

  bot.postMessageToChannel('general', 'Get Ready To Laugh Out Loud', params);
});

// Error Handler
bot.on('error', (err) => console.log(err));

// Message Handler
bot.on('message', (data) => {
  if (data.type !== 'message') {
    return;
  }

  handleMessage(data.text);
});

// Response to Data
function handleMessage(message) {
  if (message.includes(' chucknorris')) {
    chuckJoke();
  } else if (message.includes(' yomama')) {
    yoMamaJoke();
  } else if (message.includes(' random')) {
    randomJoke();
  }
}

// Tell a chuck joke
function chuckJoke() {
  axios.get('http://api.icndb.com/jokes/random').then(res => {
    const joke = res.data.value.joke;

    const params = {
      icon_emoji: ':laughing:'
    };

    bot.postMessageToChannel('general', `Chuck Norris: ${joke}`, params);
  });
}

// Tell a Yomama joke
function yoMamaJoke() {
  axios.get('http://api.yomomma.info').then(res => {
    const joke = res.data.joke;

    const params = {
      icon_emoji: ':laughing:'
    };

    bot.postMessageToChannel('general', `Yo Mama: ${joke}`, params);
  });
}

//Tell a Random Joke
function randomJoke() {
  const rand = Math.floor(Math.random() * 2) + 1;
  if (rand === 1) {
    chuckJoke();
  } else if (rand === 2) {
    yoMamaJoke();
  }
}
