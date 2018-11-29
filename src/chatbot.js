const postJson = require('./post-json');
const Response = require('./response');
const debug  = require('debug')('darwin:Chatbot');

class Chatbot {
    constructor(uri, agent, source) {
        this.agent = agent
        this.uri = uri
        this.source = source
    }

    async dispose(request) {
        request.setAgent(this.agent)
        if (this.source) {
            request.setSource(this.source)
        }
        return new Response(await postJson(this.uri, request.body))
    }
}

module.exports = Chatbot;