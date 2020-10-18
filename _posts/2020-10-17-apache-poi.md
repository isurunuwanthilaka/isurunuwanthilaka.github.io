---
layout: post
title: Lets play with Apache POI  
categories: engineering
author : Isuru Nuwanthilaka
---

Hey guys, hope everyone is safe and happy in this Covid-19 pandemic situation. After few months of silence, I am back with you for tackling some interesting issues we face in reporting software applications. Lets walk through!

<p align="center">
<img src="{{ site.url }}/assets/img/apache-poi.png"
     alt="Apache POI Logo"
     style="float: center;" />
</p>

# What is my problem ?

I was developing a reporting module for an application , but this time it was challenging, why?

1. I needed to fill report template given in `docx` format.

2. Also, there were some tables needed to be filled with data over multiple pages.

3. Format the document after filling.

4. Finally , I needed to export `docx` to `pdf` and save or return through an API without saving the physical file. 

So I am going to talk about those issues and how I could handle them with code. If you are not interested you can drop the article here, but if you are facing these now or have some time for hacking lets have some fun ;) .


### Lets discuss

First of all , I asked myself why I need form filling rather than creating a new document object programmatically. Because most of my document has static data and only needed several field texts inserted. Lets say 80% is fixed and 20% needed to be filled, so having a template is easy, also I will show easy to format the document this way.

At the beginning, I was no idea what approach I should follow, I have worked with jasper reporting before so I thought it would help me. But it is a huge burden of work because to create a jasper report I have to create `.jrxml` for each report, in my case I have ~15 report types to be implemented. So it is OBVIOUS I would not going to do that.

<p align="center">
<img src="{{ site.url }}/assets/img/we-dont-do-that-here.gif"
     alt="we-dont-do-that-here"
     style="float: center;" />
</p>