---
layout: post
title: Lets play with Apache POI  
categories: engineering
author : Isuru Nuwanthilaka
---

Hey guys, hope everyone is safe and happy in this Covid-19 pandemic situation. After few months of silence, I am back with you for tackling some interesting issues we face in reporting software applications. Lets walk through!

# What is my problem ?

I was developing a reporting module for an application , but this time it was challenging, why?

1. I needed to fill report template given in `docx` format.

2. Also, there were some tables needed to be filled with data over multiple pages.

3. Format the document after filling.

4. Finally , I needed to export `docx` to `pdf` and save or return through an API without saving the physical file. 

So I am going to talk about those issues and how I could handle them with code. If you are not interested you can drop the article here, but if you are facing these now or have some time for hacking lets have some fun ;) .

<p align="center">
<img src="{{ site.url }}/assets/img/apache-poi.png"
     alt="Apache POI Logo"
     style="float: center;" />
</p>