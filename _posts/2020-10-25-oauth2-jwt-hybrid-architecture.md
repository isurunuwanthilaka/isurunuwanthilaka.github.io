---
layout: post
title: OAuth2 + JWT Hybrid Architecture  
categories: engineering
author : Isuru Nuwanthilaka
---

<p align="center">
<img src="{{ site.url }}/assets/img/oauth2.png"
     alt="oauth2-logo"
     style="float: center;" />
</p>

*This is a design overview not a how-to guide!*

When it comes to software engineering , one of the greatest nightmares is `Authentication and Authorization`. It is a huge area of knowledge and hard time on implementation. Also it is evolving, even making it is more complex!

For the past few weeks , I have been working with AA solution for Spring Boot application. After reading lots of documentations, finally I came up with this [OAuth2.0](https://oauth.net/2/) JWT Hybrid solution which is a merger of standard OAuth2.0 Authentication and JWT Authentication.

### Understanding Problem

I need to implement Single Sign-On (SSO) to my application with remote OAuth2.0 supported authorization server hosted by our client. It is not possible to configure authorization information there, so we need secondary authorization system to have authorization information within our system. Therefore SSO is implemented with OAuth2.0 and authorization information for our system handled by JWT solution.

The recommended way is `authorization code flow` in OAuth2.0. FYI, some of other flows (like implicit flow) are deprecated in OAuth2.1 Specification. So I am going to use `auth-code flow`. Lets have a [look](https://auth0.com/docs/flows/authorization-code-flow).

<p align="center">
<img src="{{ site.url }}/assets/img/auth-sequence-auth-code.png"
     alt="auth-sequence-auth-code"
     style="float: center;" />
</p>

So now we need to adapt this flow into our system. Lets design the sequence diagram for the flow.

<p align="center">
<img src="{{ site.url }}/assets/img/authentication-process.png"
     alt="authentication-process"
     style="float: center;" />
</p>

To test this system , clone following repositories and up the applications.

[OAuth2.0 Custom Authorization Server (AS)](https://github.com/isurunuwanthilaka/oauth-AS-v2)

[OAuth2.0 Client Application (CA)](https://github.com/isurunuwanthilaka/oauth-CA-v2)

[OAuth2.0 Resource Server (RS)](https://github.com/isurunuwanthilaka/oauth-RS-v2)

[JWT Resource Server (RS)](https://github.com/isurunuwanthilaka/oauth-RS-Secondary-v2)

Happy Coding!!!