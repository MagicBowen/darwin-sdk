const assert = require('assert')
const config = require('./config')
const Chatbot = require('../').Chatbot

describe('test chatbot', function () {
  describe('#should get reply from chatbot', function () {
    it('should get reply success when query to chatbot', async function () {
      const chatbot = new Chatbot(config.chatbot_url, config.agent)
      const reply = await chatbot.replyToText('darwin-sdk-test-user', '你好')
      console.log(JSON.stringify(reply))
    });
  });
});