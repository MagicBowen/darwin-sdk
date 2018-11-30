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
        if (!this._body.reply || this._body.reply.length == 0) {
            if (!this._body.data || this._body.data.length == 0) return ''
            let result = ''
            for (let instruct of this._body.data) {
                if (instruct.type == 'text') result += instruct.reply
            }
            return result
        }
        return this._body.reply.reduce((acc, item, _1, _2) => {return acc + item})
    }

    getInstructs() {
        return this._body.data
    }

    getIntents() {
        return this._body.intents.map((item) => {return item.name})
    }

    hasTts() {
        if (!this._body.data) return false
        return this._body.data.filter((data) => {return data.type === 'text'}).length > 0        
    }

    hasInstructOfQuit() {
        if (!this._body.data) return false
        return this._body.data.filter((data) => {return data.type === 'quit-skill'}).length > 0
    }    
}

module.exports = Response