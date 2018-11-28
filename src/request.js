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

class SkillEvent extends Event {
    constructor(userId, eventType) {
        super(userId, eventType)
        this.eventType = eventType
    }

    setAgent(agent) {
        this._body.agent = agent
        this._body.event.name = this.eventType + '-' + agent
        return this
    }

    setSource(source) {
        if (! this._body.userContext) this._body.userContext = {}
        this._body.userContext.source = source
        return this
    }

    setDisplay(enable) {
        if (! this._body.userContext) this._body.userContext = {}
        this._body.userContext.support_display = enable
        return this
    }
}

class OpenSkillEvent extends SkillEvent {
    constructor(userId) {
        super(userId, "open-skill")
    }
}

class QuitSkillEvent extends SkillEvent {
    constructor(userId) {
        super(userId, "quit-skill")
    }
}

class NoResponseEvent extends SkillEvent {
    constructor(userId) {
        super(userId, "no-response")
    }
}

class PlayFinishEvent extends SkillEvent {
    constructor(userId, url) {
        super(userId, "play-finish")
        this.addContent('url', url)
    }
}

class RecordFinishEvent extends SkillEvent {
    constructor(userId, mediaId) {
        super(userId, "record-finish")
        this.addContent('media_id', mediaId)
    }
}

class RecordFailEvent extends SkillEvent {
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