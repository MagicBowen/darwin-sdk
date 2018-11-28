const postJson = require('./post-json');
const Response = require('./response');
const debug  = require('debug')('darwin:Chatbot');

class Chatbot {
    constructor(uri, agent) {
        this.agent = agent
        this.uri = uri
    }

    async dispose(request) {
        request.setAgent(this.agent)
        return new Response(await postJson(this.uri, request.body))
    }
}

module.exports = Chatbot;