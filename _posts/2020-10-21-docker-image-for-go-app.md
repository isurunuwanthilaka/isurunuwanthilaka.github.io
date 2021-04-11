---
layout: post
title: Building Docker image for GO application  
categories: engineering
author : Isuru Nuwanthilaka
last_modified_at: '2021-04-11 21:05:20'
tags: [CI&CD]
---

In a [previous article](https://isurunuwanthilaka.github.io/engineering/2020/10/19/docker-zero-to-hero) we discussed how to build a docker image and deploy to server — a java application — a hello world program in spring boot. In this article we are going to build a docker image for a small-scale GO application. And this is going to be very short and straight to the point. Lets start.

<p align="center">
<img src="{{ site.url }}/assets/img/docker-go.jpeg"
     alt="docker-go-app"
     style="float: center;" />
</p>

Lets work on the `Dockerfile` ; this is the starting point for building docker image.

```docker
FROM golang:latest
LABEL maintainer="Isuru Nuwanthilaka <isuru@isumalab.io>"
LABEL version="1.0"
LABEL project="Web-GO-Backend"
LABEL description="This docker image is for handling web server requests."
ENV GOPATH /go
RUN mkdir -p "$GOPATH/src/bitbucket.org/isumalab/web-go-backend" "$GOPATH/bin" && chmod -R 777 "$GOPATH"
ADD . ${GOPATH}/src/bitbucket.org/isumalab/web-go-backend/
WORKDIR ${GOPATH}/src/bitbucket.org/isumalab/web-go-backend
RUN apt-get update && \
apt-get install -y build-essential && \
apt-get install -y software-properties-common && \
apt-get install -y curl git vim wget
RUN go get -v -u github.com/lib/pq
RUN go get -v -u github.com/go-chi/chi
RUN go install .
RUN go build -o web-go-backend .
ENV PATH $GOPATH/bin
CMD ["/go/src/bitbucket.org/isumalab/web-go-backend/web-go-backend","/bin/bash"]
```

Okay, lets breakdown everything into manageable pieces.

We are using golang:latest as the base image for this docker image. There are few more images that can be used as the base image , check here. We proceed with the latest one but later we can discuss how to reduce the image size.

Labels are used to add some useful information to the image. Next set the `GOPATH` to `/go` . In our local machine we can see src,bin and pkg directories so even in this image I am going to make the folder structure as same as my local workspace, `RUN mkdir` for making directories and give the right permission. Then use `ADD` command to add all the files from your working machine. After that perform some very useful commands `RUN apt-get update` is for updating the base image tools and `RUN apt-get install -y curl git vim wget` for adding some programs like git,curl,vim. When your docker container is up and running you might need to get into the container and look for logs etc so I find bash is somewhat important.

Now we move to the build process, first we need to get the third-party packages we have used for our project. In my project I have used logurus and chi router therefore I need to go get them like `RUN go get -v -u github.com/go-chi/chi` Next, we install our packages so that we can use them in our other packages safely.

After all add `RUN go build -o web-go-backend .` for building a object file that can be run safely inside the container and the file path to entrypoint of the application.

We have discussed some facts, basics ,so you can start and deploy the containers across the servers.

Note : There are many things to learn on how to reduce the image size,port configurations etc. So better to explore them once you get off from the ground.

Happy Coding!!!