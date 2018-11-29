const should = require('should')
const equal = require('deep-equal')
const Query = require('../').Query
const Event = require('../').Event
const OpenSkillEvent = require('../').OpenSkillEvent
const QuitSkillEvent = require('../').QuitSkillEvent
const NoResponseEvent = require('../').NoResponseEvent

describe('test request', function () {
  describe('#test query', function () {
    it('should construct query correct', function () {
        const query = new Query('user1', 'hello')
        const expect = { query   : { query : 'hello', confidence : 1.0 }, session : 'user1'}
        equal(query.body, expect).should.be.exactly(true);
    });
    it('should construct user context and agent correct', function () {
        const query = new Query('user1', 'hello')
        query.setAgent('luckNumber').setUserContext({source : 'xiaoai'})
        const expect = { query   : { query : 'hello', confidence : 1.0 }, session : 'user1', agent : 'luckNumber', userContext : {source : 'xiaoai'}}
        equal(query.body, expect).should.be.exactly(true);
    });
  });
  describe('#test event', function () {
    it('should construct event correct', function () {
        const event = new Event('user1', 'playFinish')
        event.addContent('audio', 'audio1.mp3').setAgent('luckNumber')
        const expect = { event   : { name : 'playFinish', content : {audio : 'audio1.mp3'} }, session : 'user1', agent : 'luckNumber'}
        equal(event.body, expect).should.be.exactly(true);
    });
    it('should construct open skill event correct', function () {
        const event = new OpenSkillEvent('user1')
        event.setAgent('luckNumber').setSource('xiaoai')
        const expect = { event :  { name : 'open-skill'} , session : 'user1', agent : 'luckNumber', userContext : {source : 'xiaoai'}}
        equal(event.body, expect).should.be.exactly(true);
    });
    it('should construct quit skill event correct', function () {
        const event = new QuitSkillEvent('user1')
        event.setAgent('luckNumber')
        const expect = { event :  { name : 'quit-skill'} , session : 'user1', agent : 'luckNumber'}
        equal(event.body, expect).should.be.exactly(true);
    });
    it('should construct on response event correct', function () {
        const event = new NoResponseEvent('user1')
        event.setAgent('luckNumber')
        const expect = { event :  { name : 'no-response'} , session : 'user1', agent : 'luckNumber'}
        equal(event.body, expect).should.be.exactly(true);
    });
  });
});