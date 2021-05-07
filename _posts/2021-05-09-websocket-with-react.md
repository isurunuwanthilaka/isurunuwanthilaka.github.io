---
layout: post
title: Learn to learn
categories: Software-Engineering
author : Isuru Nuwanthilaka
last_modified_at: 2021-05-06 00:00:00
tags: [Misc]
---

In this post we are going to talk about how to implement `websocket` with `react` client. REST is mostly used nowadays.
But, how websocket differs from REST?. Websocket is stateful connections which means both client and server keeps the 
connection alive until one party initiate the termination whereas REST is stateless communication. Both has the HTTP initiation but 
websocket later upgrade to WS or WSS connection.

<figure>
  <img src="{{ site.url }}/assets/img/spring-react.jpg" alt="websocket" class="fig-img"/>
</figure>

Here we are going to implement two ways to communicate with websocket. One is to communicate purely on websocket both send and receive, and another
is sending messages to websocket through rest api. Booth can be useful in different scenarios like sending notifications to users.

Find the full code at [https://github.com/isurunuwanthilaka/springboot-websocket-react](https://github.com/isurunuwanthilaka/springboot-websocket-react).

First we need to configure Message broker and Stomp endpoint.

```java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // with sockjs
        registry.addEndpoint("/notification").setAllowedOriginPatterns("*").withSockJS();
        // without sockjs
        //registry.addEndpoint("/socket").setAllowedOriginPatterns("*");
    }
}
```

The websocket connection is at `ws://localhost:8080/notification` whereas `/app` is the path prefix for sending messages and `/topic` for subscribing 
messages on relevant topic.

Lets communicate on duplex websocket.
```java
@MessageMapping("/general") //STOPM client uses this path to send messages to relevant topic
@SendTo(Topic.GENERAL_MESSAGE)// topic is /topic/general
public TextMessageDto broadcastGeneralMessage(@Payload TextMessageDto textMessageDto) {
    return textMessageDto;
}
```
 To send a message to `/app/general` we need a websocket client. For javascript implementation, there is a folder `client`. You can read `Help.md`
and up the react frontend client to send and receive messages.

Next we need to send messages over rest api to websocket.

```java
@PostMapping("/send/general")
public ResponseEntity sendGeneralMessage(@RequestBody TextMessageDto textMessageDto) {
    template.convertAndSend(Topic.GENERAL_MESSAGE, textMessageDto);
    return ResponseEntity.ok().body(textMessageDto);
}
```

SimpleMessagingTemplate instance (i.e template) will convert the message and send to websocket. Run `curl --location --request POST http://localhost:8080/send --header "Content-Type: application/json" --data-raw "{"""message""":"""Test"""}"` in cmd (on Windows) to send message to topic as REST.


 
