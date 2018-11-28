# Darwin NodeJs SDK

[NodeJS SDK of Darwin Conversational AI Platform](http://www.xiaoda.ai).

## server

- PROTOCOL : HTTPS
- METHOD : POST
- URL : contact with [darwin@xiaoda.ai](mailto:darwin@xiaoda.ai) to apply URL and tocken

## request

request分为`query`和`event`两类。
- `query` : 用户正常的对话请求；
- `event` : 用于客户端事件，例如用户登录、退出、超时未响应等。

### query

```json
{
    "query"   : { "query": "你好啊", 
                  "confidence":1.0
                }, 
    "userContext"  : { "source" : "huawei" },
    "session" : "userId", 
    "agent"   : "indentifyCode"
} 
```

- `query.query` : 用户的对话内容，ASR的结果，为utf-8格式的字符串；
- `query.confidence` : 如果用户的对话内容是经过ASR处理后得到，该项为ASR的信心概率。浮点数，范围`0 ~ 1.0`。如果无法获得则默认填写`1.0`；
- `userContext.source` : 用于标识用户来源。一般为音箱类型，协商取值；
- `session` : session id，用于区分不同session。此处暂时填写用户的ID（不超过32位的字符串，只可包含字母、数字和下滑线并以字母开头）；
- `agent`   : 接收对话的skill agent的名字；幸运数字填写“indentifyCode”；

### event

```json
{
    "event"   : { "name"     : "open-skill-indentifyCode", 
                },
    "userContext"  : { "source" : "huawei" },                
    "session" : "userId", 
    "agent"   : "indentifyCode"
}
```

- `event.name`    : 事件名；对于幸运数字技能有以下取值：
    - `open-skill-indentifyCode` : 技能被打开；
    - `quit-skill-indentifyCode` : 技能退出；
    - `no-response-indentifyCode` : 用户在技能内一定时间内没有响应；
- `userContext.source` : 用于标识用户来源。一般为音箱类型，协商取值；
- `session` : session id，用于区分不同session。此处暂时填写用户的ID（不超过32位的字符串，只可包含字母、数字和下滑线并以字母开头）；
- `agent`   : 接收对话的skill agent的名字；幸运数字填写“indentifyCode”；

## response

Robot返回的消息格式如下：

```json
{
    "intents": [ 
        {
            "name": "say-hi",
            "confidence": 1
        }
    ],
    "reply": [
        "你好啊，欢迎使用幸运数字",
        "你的幸运数字是 12345",
    ],
    "data" : [
    ]
}
```

- `intent` : 数组；用户的对话被识别的意图以及对应的信心概率指数，一般可以不用处理；
- `reply`  : 数组；返回给用户的对话，可以一次回复多句。端侧根据需要可以将所有回复合并成后单句后播报给用户；
- `data`   : 指令；具体如下
    - `{"type" : "play-audio", "audio-url" : "http://www.xiaodamp.cn/audio/5.mp3"}` : 指示播放指定的音频文件；
    - `{"type" : "text", "reply" : "听完音频后请回答"}` : 指示播放对应文字的tts；
    - `{"type" : "quit-skill"}` : 指示音箱技能退出，关闭麦克风；
- **注意**  : 如果`response`里面包含了`reply`字段，则`reply`优先于`data`。也就是音箱优先播放`response.reply`，然后再按照`response.data`里面的指令顺序播放。

```js
// 例：听音乐猜歌手的response结构可以如下：

{
    "intents": [
        {
            "name": "guess-song-player",
            "confidence": 1
        }
    ],
    "reply": [
        "猜猜下面歌曲的歌手，请听音乐："
    ],
    "data" : [
        {"type" : "play-audio", "audio-url" : "http://www.xiaodamp.cn/audio/5.mp3"},
        {"type" : "text", "reply" : "音乐播放完成，请说出对应的歌手吧"}
    ]
}

```