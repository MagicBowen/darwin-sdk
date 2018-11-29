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
        debug(`Send to chatbot: ${JSON.stringify(request.body)}`)
        const response = new Response(await postJson(this.uri, request.body))
        debug(`Receive from chatbot: ${JSON.stringify(response.body)}`)
        return response
    }
}

module.exports = Chatbot;