class Response {
    constructor(rsp) {
        this._body = rsp;
    }

    get body() {
        return this._body
    }

    getReplies() {
        return this._body.reply
    }

    getReply() {
        return this._body.reply.reduce((acc, item, _1, _2) => {return acc + item})
    }

    getInstructs() {
        return this._body.data
    }

    getIntents() {
        return this._body.intents.map((item) => {return item.name})
    }

    hasInstructOfQuit() {
        if (!this._body.data) return false
        return this._body.data.filter((data) => {return data.type === 'quit-skill'}).length > 0
    }    
}

module.exports = Response