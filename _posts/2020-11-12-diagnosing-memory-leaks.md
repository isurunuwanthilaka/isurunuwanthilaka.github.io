---
layout: post
title: Identification of Memory Leaks
categories: engineering
author : Isuru Nuwanthilaka
---
<p align="center">
<img src="{{ site.url }}/assets/img/memory-leaks.jpeg"
     alt="memory-leaks"
     style="float: center;" />
</p>

Memory leaks are real headaches. As long as product is in development, everything is cool and smooth. Once we roll it to production we see the real face of the devil. Most of the time, the applications without proper testing- i.e. load testing , system-wide integration testing might suffer a lot. So here I am going to talk about how to find memory leaks in `Spring Boot` applications - might be deployed in a VM or docker container.

Most of the time if there is a memory leak we get OutOfMemoryError (OOM). There are different kinds of OOM. Lets [read](https://docs.oracle.com/javase/8/docs/technotes/guides/troubleshoot/memleaks002.html#:~:text=OutOfMemoryError%20exception.,object%20in%20the%20Java%20heap.&text=In%20a%20rare%20instance%2C%20a,little%20memory%20is%20being%20freed.) on them. But most of the time we get OOM as `Exception in thread thread_name: java.lang.OutOfMemoryError: Java heap space`. This is most probably because of a memory leak.

### Tunnelling to JVM

So to observe the behavior of the application , we have to monitor the JVM behavior - heap memory,live threads, cpu usage etc.  
