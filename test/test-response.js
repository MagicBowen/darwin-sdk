const should = require('should')
const equal = require('deep-equal')
const Response = require('../').Response

describe('test response', function () {
  describe('#test response attributes', function () {
    it('should get all attibutes correct', function () {
        const rsp = new Response({
            "intents": [ 
                {
                    "name": "say-hi",
                    "confidence": 1
                }
            ],
            "reply": [
                "hello",
                "world",
            ]
        })
        rsp.getReply().should.be.exactly('helloworld')
        equal(rsp.getReplies(), ['hello', 'world']).should.be.exactly(true)
        equal(rsp.getIntents(), ['say-hi']).should.be.exactly(true)
        rsp.hasInstructOfQuit().should.be.exactly(false)
    });
    it('should get all instructs correct', function () {
        const rsp = new Response({
            "intents": [ 
                {
                    "name": "say-hi", "confidence": 1
                }
            ],
            "data" : [
                {"type" : "quit-skill"},
                {"type" : "text", "reply" : "welcome"},
                {"type" : "audio", "url" : "https://www.xiaodamp.com/audio/1.mp3"},
                {"type" : "start-record"},
                {"type" : "play-record", "media-id" : "xxxxxxxx"},
            ]
        })
        rsp.hasInstructOfQuit().should.be.exactly(true)
        rsp.getInstructs().filter((instruct) => {return instruct.type == 'text'}).length.should.be.exactly(1)
        rsp.getInstructs().filter((instruct) => {return instruct.type == 'audio'}).length.should.be.exactly(1)
        rsp.getInstructs().filter((instruct) => {return instruct.type == 'video'}).length.should.be.exactly(0)
    });
  });
});