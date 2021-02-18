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

3. Create a generic service deployment pipeline

4. Create a generic service build pipeline

5. Create a parameterized pipeline to clean environments

### Tools we need to setup

* Jenkins server [Installation guide](https://www.jenkins.io/doc/book/installing/linux/#red-hat-centos) - Only on master node

* Ansible server [Installation guide](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html#installing-ansible-on-rhel-centos-or-fedora) - Only on master node

* Docker Engine [Installation guide](https://docs.docker.com/engine/install/centos/) - All nodes (With ansible, we can install docker but here I am having docker pre-installed to all slave nodes)

* Docker private registry [Installation guide](https://docs.docker.com/registry/deploying/) and make it insecure repository for testing purposes [Installation guide]( https://www.linuxtechi.com/setup-docker-private-registry-centos-7-rhel-7/) - Only on master node

* Git/Maven/Java with yum or otherwise and find the paths only on master node

### Evaluation on tools

1. Jenkins - Powerful CI/CD tool used to automate build pipelines

2. Ansible - Powerful IT automation tool which is heavily used to configuration management, automate deployments, consumes pull configurations
	
     * Similar products - chef, puppet, saltstack (mostly push configurations)
	
3. Jenkins vs Ansible : https://www.javatpoint.com/jenkins-vs-ansible

### Basic tutorials

* [Tutorial 1](https://www.youtube.com/watch?v=13FpCxCClLY)

* [Tutorial 2](https://www.youtube.com/watch?v=65XXE0DMxcU)

### Step 0 - Configuring SSH connection b/w master and slaves

There are several methods to create a secure connection between master and the remote slave nodes. There are no person to enter username/password therefore best way is to create SSH connection with username + private key.

We need to create public/private keys in master.

Run `ssh-keygen` on master and `cat /root/.ssh/id_rsa` to get the private key which we need to add to ansible-playbook script as mentioned in tutorial[1]  

Next we need to push public keys to slave nodes, run `ssh-copy-id <slave-ip>`. Do this for all the node group you need to access with this certificate. You can have multiple certificates for group-wise ; app-servers, db-servers etc.

In tutorial[2] , other few SSH configuration methods have been mentioned but here we are going with `SSH username with private key method`

If successful `ansible -i hosts -m ping` should give success response. Here `hosts` file is the ansible inventory.

### Step 0.1 - Add following plugins to jenkins server

* Parameterized build trigger plugin

* Bitbucket plugin

* Ansible plugin

### Step 0.2 - Create a simple webservice to deploy

I have created simple hello world springboot project (https://github.com/isurunuwanthilaka/hello-world), Once we deploy to slave node we should be able to get the response at `http://<ip>:8082/hello`
