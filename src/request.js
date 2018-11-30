class Request {
    constructor(userId) {
        this._body = {
            session : userId, 
        }
    }

    get body() {
        return this._body
    }

    setAgent(agent) {
        this._body.agent = agent
        return this
    }

    setUserContext(userContext) {
        this._body.userContext = userContext
        return this
    }

    addUserContext(key, value) {
        if (! this._body.userContext) this._body.userContext = {}
        this._body.userContext[key] = value
        return this
    }

    setAccessTocken(tocken) {
        return this.addUserContext('accessTocken', tocken)
    }

    setSource(source) {
        return this.addUserContext('source', source)
    }

    setDisplay(enable) {
        return this.addUserContext('supportDisplay', enable)
    }    
}

class Query extends Request {
    constructor(userId, text) {
        super(userId)
        this._body.query =  {query : text, confidence : 1.0}
    }
}

class Event extends Request {
    constructor(userId, eventName) {
        super(userId)
        this._body.event = {name : eventName}
    }

    addContent(key, value) {
        if (!this._body.event.content) this._body.event.content = {}
        this._body.event.content[key] = value
        return this
    }
}

class OpenSkillEvent extends Event {
    constructor(userId) {
        super(userId, "open-skill")
    }
}

class QuitSkillEvent extends Event {
    constructor(userId) {
        super(userId, "quit-skill")
    }
}

class NoResponseEvent extends Event {
    constructor(userId) {
        super(userId, "no-response")
    }
}

class PlayFinishEvent extends Event {
    constructor(userId, url) {
        super(userId, "play-finish")
        this.addContent('url', url)
    }
}

class RecordFinishEvent extends Event {
    constructor(userId, mediaId, asrText) {
        super(userId, "record-finish")
        if (mediaId) this.addContent('mediaId', mediaId)
        if (asrText) this.addContent('asrText', asrText)
    }
}

class RecordFailEvent extends Event {
    constructor(userId) {
        super(userId, "record-fail")
    }
}

module.exports.Query = Query
module.exports.Event = Event
module.exports.OpenSkillEvent = OpenSkillEvent
module.exports.QuitSkillEvent = QuitSkillEvent
module.exports.NoResponseEvent = NoResponseEvent
module.exports.PlayFinishEvent = PlayFinishEvent
module.exports.RecordFinishEvent = RecordFinishEvent
module.exports.RecordFailEvent = RecordFailEvent