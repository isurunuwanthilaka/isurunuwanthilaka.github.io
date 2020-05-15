---
layout: post
title: Medium Connector for Ballerina
categories: engineering
author : Isuru Nuwanthilaka
---

<p align="center">
<img src="{{ site.url }}/assets/img/bal+medium.jpg"
     alt="Medium Ballerina Image"
     style="float: center;" />
</p>

# Motivation

I was thinking to learn Ballerina for a long time. So I thought to develop something and learn by doing. First I went through the list of modules developed by other ballerina developers. It is interesting that ballerina had already covered many areas, also I was reading some ballerina posts on Medium platform. So I got an idea what if I could write a connector for medium with ballerina. No one had tried for that. Therefore I started developing this `isurun/medium` module. There was a cool article about twitter module development in medium, so I refered it as the guide for this development.

# Ballerina Medium Connector

Medium is a blogging platform, with many writers and readers now. This module is created to connect medium platform with ballerina.

This medium connector helps you to retrive data related to user, his publications, publications' contributors , create posts, create posts in publications and also upload images to medium platform using medium REST APIs.

**Operations**

The `isurun/medium` module contains operations that work with user,publications,posts and images.

> Medium API Documentation: https://github.com/Medium/medium-api-docs


## Compatibility

|                    | Version                                                          |
|:------------------:|:----------------------------------------------------------------:|
| Ballerina Language | 1.2.3                                                            |
| Medium API         | v1                                                               |


## Getting Started

To work with Medium APIs first you need a `ACCESS_TOKEN`. You can go to settings and get the integration key.

You can now enter the credentials in the `ballerina.conf` file as follows:
```bash
ACCESS_TOKEN="<Your Access Token>"
```

## API Guide

First, import the `isurun/medium` module into the Ballerina project.

```ballerina
import isurun/medium;
```

Now, create the Medium client using the credentials entered into `ballerina.conf` file.

```ballerina
medium:Configuration mediumConfig = {
    accessToken: config:getAsString("ACCESS_TOKEN")
};

medium:Client mediumClient = new (mediumConfig);
```

The `myInfo` API provides the info of user athenticated with the integration key. It returns a `medium:User` object or a error.

```ballerina
var result1 = mediumClient->myInfo();
if (result1 is medium:User) {
    io:println("My user name : ", result1.username);
} else {
    io:println("Error: ", result1);
}
```

The `getMyPublications` API provides the authenticated user's publications. It returns a `medium:Publication[]` object if successful or an `error` if unsuccessful.

```ballerina
var result2 = mediumClient->getMyPublications();
if (result2 is medium:Publication[]) {
    io:println("My publication->first item name : ", result2[0].name);    //here only showing first publication, retrive as you want.
} else {
    io:println("Error: ", result2);
}
```

The `getUserPublications` API provides give `userID` publications. It returns a `medium:Publication[]` object if successful or an `error` if unsuccessful.

```ballerina
var result3 = mediumClient->getUserPublications("userID");
if (result3 is medium:Publication[]) {
    io:println("User publication->first item name : ", result3[0].name);    //here only showing first publication, retrive as you want.
} else {
    io:println("Error: ", result3);
}
```

The `getContributors` API returns list of contributer for the given `publicationID`. It returns a `medium:Contributor[]` object if successful or an `error` if unsuccessful.

```ballerina
var result4 = mediumClient->getContributors("336d898217ee");
if (result4 is medium:Contributor[]) {
    io:println("First contributor's role : ", result4[0].role);    //here only showing first publication, retrive as you want.
} else {
    io:println("Error: ", result4);
}
```

The `createPost` API creates a post.There are few options for parameters you can choose.Check with the API reference guide. It returns a `medium:PostResponse` object if successful or an `error` if unsuccessful.

```ballerina
medium:Post post = new ();
post.setTitle("Ballerina Medium Connector Alert!");
post.setPublishStatus("draft");
post.setContent("<h1>Ballerina Medium Connector</h1><p>You’ll never walk alone.</p>");
post.setLicense("all-rights-reserved");
post.setNotifyFollowers(false);
post.setContentFormat("html");
post.setCanonicalUrl("https://medium.com/");
post.setTags(["ballerina", "medium", "integration"]);

//publish the post
var result5 = mediumClient->createPost(post, "UserId");

if (result5 is medium:PostResponse) {
    io:println("Post Url : ", result5.url);
} else {
    io:println("Error: ", result5);
}    
```

The `createPostToPublication` API creates a post in publications for the provided `publicationId`. It returns a `medium:PostPublicationResponse` object if successful or an `error` if unsuccessful.

```ballerina
var result6 = mediumClient->createPostToPublication(post,"#publicationID#");
if (result6 is medium:PostPublicationResponse) {
    io:println("Publication Post Url : ",result6.url);
} else {
    io:println("Error: ", result6);
}
```

The `createImage` API creates Image and publish to medium platform. It returns a `medium:ImageResponse` object if successful or an `error` if unsuccessful.

```ballerina
medium:Image image = new ();
image.setFormat("jpg");//jpg,png,gif,tiff
image.setImageLocation("C:/Users/isurun/Downloads/download.jpg");

var result7 = mediumClient->createImage(image);

if (result7 is medium:ImageResponse) {
    io:println("Image Url : ", result7.url);
} else {
    io:println("Error: ", result7);
}
```

## Examples

```ballerina
import ballerina/config;
import ballerina/io;
import isurun/medium;

// Authentication
medium:Configuration mediumConfig = {
    accessToken: config:getAsString("ACCESS_TOKEN")
};

medium:Client mediumClient = new (mediumConfig);

public function main() {
    //1.User
    //get the root user info
    var result1 = mediumClient->myInfo();
    if (result1 is medium:User) {
        io:println("My user name : ", result1.username);
    } else {
        io:println("Error: ", result1);
    }
}
```

# The End

As a contribution to Open Source , developed Medium connector for Ballerina. V1.0.0 is Live!

Contribute to : https://github.com/isurunuwanthilaka/ballerina-medium-connector

Learn by examples : https://github.com/isurunuwanthilaka/ballerina-medium-connector-example

Get the package here : https://central.ballerina.io/isurun/medium

Happy Coding!