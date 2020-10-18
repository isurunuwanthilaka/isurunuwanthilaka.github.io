---
layout: post
title: Deploying docker images from Bitbucket to Docker Hub  
categories: engineering
author : Isuru Nuwanthilaka
---
<p align="center">
<img src="{{ site.url }}/assets/img/docker-image-to-docker-hub.png"
     alt="docker-image-to-docker-hub"
     style="float: center;" />
</p>

Well, now a days, the programmers’ life is getting easier with the improvement of the services available in the software industry. Normally we use github or bitbucket to maintain our code base. In bitbucket we can use pipelines to auto build images and deploy to a docker container registry where we can pull back from anywhere in the world, anytime. Cool right? 

It saves lots of time for improving code.

This is going to be very short tutorial for testing our applications on docker.

### Step 1

Develop your application.Then build it and package to .jar file.
I use a simple spring boot demo application with few lines of code.

<p align="center">
<img src="{{ site.url }}/assets/img/docker-image-to-docker-hub-1.png"
     alt="docker-image-to-docker-hub"
     style="float: center;" />
</p>


### Step 2

Add Dockerfile to the project.
```docker
FROM openjdk:8-jdk-alpine
VOLUME /tmp
EXPOSE 8080
ADD target/demo-0.0.1-SNAPSHOT.jar /app/app.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-Dspring.profiles.active=container", "-jar", "/app/app.jar"]
```

### Step 3

Add `bitbucket-pipelines.yml` file. This is the entry point for building and deploying docker images.
```docker
image: openjdk:8-jdk-alpine
pipelines:
  default:
    - step:
        script:
          - docker login -u <DOCKER_HUB_ID> -p <DOCKER_HUB_PASSWORD>
          - docker build -t isurunuwanthilaka/say-hello:latest .
          - docker push isurunuwanthilaka/say-hello:latest
options:
  docker: true
```

### Explanation 

```cmd
docker build -t isurunuwanthilaka/say-hello:latest .
```

This line looks for the Dockerfile and build image with tag `<repository_name>/<image_name>:<version_number>`
then push to the docker container registry.

### Step 4

Create Bitbucket repository and push codes and enable pipeline for auto build.

<p align="center">
<img src="{{ site.url }}/assets/img/docker-image-to-docker-hub-2.png"
     alt="docker-image-to-docker-hub"
     style="float: center;" />
</p>

### Step 5

Create `docker-compose.yml` and up the containers with it. It will pull images from the docker hub to the local machine.
```docker
version: "3"
services:
  say-hello:
    image: isurunuwanthilaka/say-hello:latest
    container_name: say-hello
    expose:
      - 8080
    ports:
      - 8080:8080
    restart: unless-stopped
```

<p align="center">
<img src="{{ site.url }}/assets/img/docker-image-to-docker-hub-3.png"
     alt="docker-image-to-docker-hub"
     style="float: center;" />
</p>

Easy right? Now you can use that image on any machine, just need to `docker pull isurunuwanthilaka/say-hello:latest`

Enjoy your Application.

<p align="center">
<img src="{{ site.url }}/assets/img/docker-image-to-docker-hub-4.png"
     alt="docker-image-to-docker-hub"
     style="float: center;" />
</p>

[Code Base](https://bitbucket.org/isurunuwanthilaka/say-hello)