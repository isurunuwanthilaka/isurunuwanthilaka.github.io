---
layout: post
title: Docker container deployment with Jenkins and Ansible
categories: engineering
author : Isuru Nuwanthilaka
---

We are software engineers, we write code. Surely (if you are in a small scale company without DevOps engineers) we have to setup the applications and release for Dev,QA and UAT environments. That is lots of work, out of scope. So how about having all those automated and we don't need to worry about CI/CD at all? Ehhhh interesting! 

### Why we need this setup?

* Single point of deployment

* Less time to deployments and focus more on development

* No need to SSH to different servers time to time (loosely couple slave nodes from master)

* Easy replication of environments i.e. identical nodes

* Binding multiple phases i.e. testing phase

* Flexible configuration of pipelines

### Deployment Architecture

<p align="center">
<img src="{{ site.url }}/assets/img/deployment-arch.png"
     alt="deployment-architecture"
     style="float: center;" />
</p>

### What we are going to do ?

1. Create a simple pipeline to deploy `Hello Service`

2. Create a parameterized pipeline to deploy `Hello Service`

3. Create a generic service build pipeline

4. Create a generic service deployment pipeline

5. Create a parameterized pipeline to clean environments

