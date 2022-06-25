---
layout: post
title: Jenkins - Zero to Somewhere
---

We are software engineers. Nowadays, the definition of SE is not limited to just writing codes. Sometimes, we have to set the applications up and running and give it to QA for testing. Doing continuous deployments (CD) being in the agile environment is tough and time consuming. What if there is a way to automate the deployments ??? and pay less supervision to CI/CD/CD. So we can save time to write codes while a bot handling devops. It is good for at least setting up the testing environment.

<p align="center">
<img src="{{ site.url }}/assets/img/jenkins-docker.png"
     alt="Jenkins"
     style="float: center;" />
</p>

Jenkins enters here to the development tool kit.Buckle up.

# Configuration

There are many ways to use Jenkins. I am not going to talk about all the scenarios. I am just trying to give you a simple idea and give a push to get going. So I take the easy path - a happy path.

# Set up with Docker

1. Jenkins can be set up with Docker DinD (docker in docker), so docker images can be build and push to registry without the support of docker machine in the host machine.

2. There is an otherway also for setting up jenkings with host machine docker engine. I prefer this method, so I can build images and spin up the containers.Lets try this jenkins pipeline.

# Installing Jenkins

If you want to do with docker dind , follow : https://www.jenkins.io/doc/book/installing

Or create `docker-compose.yml` with following content and just `docker-compose -d up`

```bash
version: "3"
services:
  jenkins:
    image: jenkinsci/blueocean
    user: root
    ports:
      - "8081:8080"
      - "8443:8443"
      - "50000:50000"
    volumes:
      - ./jenkins_data:/var/jenkins_home
      ##### Mac OS X and Linux ONLY #####
      - /var/run/docker.sock:/var/run/docker.sock
```

And after setting up create a user in the jenkins UI at :8081 (according to this configuration)

# Jenkins Pipeline

Next crete a jenkins pipeling project and include following pipeline script.

```bash
pipeline {
    agent any

    stages {
        stage('frontend') {
            agent any
            steps {
                git([url: 'https://#/frontend.git', branch: 'dev', credentialsId: 'BitbucketID'])
                script{
                    docker.build("appweb")
                    sh """
                        docker rm -f appweb
                        docker run -p 80:80 --restart=unless-stopped --network backend_default  --link app --name appweb -d appweb:latest
                       """

                }
            }
            post{
                success{
                    slackSend message:"Build status(appweb) : success "
                }
                failure{
                    slackSend message:"Build status(appweb) : failure "
                }
            }
        }
        stage('backend') {
            agent any
            steps {
                git([url: 'https://#/backend.git', branch: 'dev', credentialsId: 'BitbucketID'])
                script{
                    docker.build("app")
                    sh """
                        docker rm -f app
                        docker run -p 8080:8080 --expose 8080 --restart=unless-stopped --env SPRING_PROFILES_ACTIVE=qa --network backend_default  --link postgres --name app -d app:latest
                       """
                }
            }
            post{
                success{
                    slackSend message:"Build status(app) : success "
                }
                failure{
                    slackSend message:"Build status(app) : failure "
                }
            }
        }

    }
}
```

Store github or bitbucket creadentils in jenkins.

Best way to maintain another repository to version `jenkins.groovy` files, but here we just include only the script.

# Slack notification

If there is a failure we want to know about those build fails. So we have set up slack integration also to this pipeling.

Follow : https://www.jenkins.io/doc/pipeline/steps/slack

# Build configuration

There are different ways to trigger building this pipeline.

1. Base on the commit/merge triggers with support of webhooks by bitbucket or github

2. Otherwise, we can simply use Pull triggers like time scheduled triggers or @daily,@hourly,@midnight builds so all the changes will be pulled and get deployed.(This is what we have used)

# The End

This is very simple , but, will ease your life a lot. Hope you enjoyed.

Happy Coding!
