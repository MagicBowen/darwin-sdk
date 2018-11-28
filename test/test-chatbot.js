// const assert = require('assert')
// const config = require('./config')
// const Chatbot = require('../').Chatbot
// const Query = require('../').Query
// const OpenSkillEvent = require('../').OpenSkillEvent

// describe('test chatbot', function () {
//   describe('#should get reply from chatbot', function () {
//     it('should get reply success when dispose event', async function () {
//       const chatbot = new Chatbot(config.chatbot_url, config.agent)
//       const rsp = await chatbot.dispose(new OpenSkillEvent('test-darwin-user-1'))
//       rsp.hasInstructOfQuit().should.be.exactly(false);
//     });
//     it('should get reply success when dispose query', async function () {
//       const chatbot = new Chatbot(config.chatbot_url, config.agent)
//       const rsp = await chatbot.dispose(new Query('test-darwin-user-1', '退出'))
//       rsp.hasInstructOfQuit().should.be.exactly(true);
//     });
//   });
// });