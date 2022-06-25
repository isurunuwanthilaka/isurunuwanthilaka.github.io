---
layout: post
title: Why Design Patterns?
---

<div align='justify'>
Software engineer is no other than civil engineer, but with a different context. Both build structures may be small scale and large scale. Therefore, software engineers need careful design both conceptual and technical before jumping into coding phase. Over the course of software engineering career, we can see same engineering problem patterns appearing again and again. So how about we implementing a template for solving that particular issue re-occurring. That is how the design patterns enter to the software world. So, with design patterns we can come up with flexible, re-usable and easy to maintain solutions to our software problems.
</div>

<p align="center">
<img src="{{ site.url }}/assets/img/post-2.png"
     alt="Patterns Image"
     style="float: center;" />
</p>

<br/>
<div align='justify'>
There are many design patterns exist. And there is not a obvious guide line to what to use and when to use. It all comes with experience you gather during the journey. There are 23 design patterns discussed in Gang Of Four (GOF) famous book Design Patterns: Elements of Reusable Object-Oriented Software. All patterns are categorized into three main areas; creational, structural and behavioral. We use this GOF design pattern catalog as a guide to produce this blog series. And this series will cover all the design patterns with UML, example implementations and the concepts (SOLID etc.) behind.
</div>
<br/>
<div>Let us start learning basic things first. Buckle up!</div>
<br/>
<h3>Pattern Language</h3>
<br/>
<div align='justify' style = "font-style:italic;">
A pattern language is an organized and coherent set of patterns, each of which describes a problem and the core of a solution that can be used in many ways within a specific field of expertise. The term was coined by architect Christopher Alexander and popularized by his 1977 book A Pattern Language. 
– Wikipedia
</div>
<br/>
<div align='justify'>
Pattern language differ from one set of problems to another set. First you understand the context of your problem. Pattern language consists of set of design patterns used in that specific domain. For an example you may designing an accounting software, game or tracking application. In accounting application, you talk about accounting, book-keeping, or taxing. In a game you talk about composition of quests, players plus items. In a weather tracking app, you talk about subscribing data, publishing data or flowing data through component real-time. So first we have to understand what the domain is we are going to operate and so as the pattern language.
</div>
<br/>
<div align='justify'>
Then we are going to have an idea about three design pattern categories.
</div>
<h3>Creational Patterns</h3>
<br/>
<div align='justify'>
Creational patterns deal with creating and cloning new objects. This will vary with the language you use to program your application. We are using Java, so here we create objects using specific classes. Cloning is creating an object similar to an existing one. Cloning is done sometimes rather than instantiating a new object. Sometimes you need global access to one object and also need to instantiate only once. Let’s say you are developing a box counting application for a production line. So you need to use one single counter object to count all box; preventing counting a box twice or missing one. Creational patterns help to solve this kind of issues. Also, if you want to add a new product object to the systems, how you add changes to system avoiding ripple of changes in other modules. That’s why we give responsibility to creational patterns to organize object creation. Singleton pattern, simple factory pattern, factory method pattern are examples for creational patterns.
</div>
<h3>Structural Patterns</h3>
<br/>
<div align='justify'>
This pattern category describes how the objects are connected to each other and what are the relationship they are having. Principles related to composition, generalization, inheritance and polymorphism are occupied in these patterns. These structures define how data flows in the application. To implement this pattern classes and interfaces are used greatly. In the coming blog posts, you can learn how the classes, sub-classing used to realize these patterns. One great idea behind these patterns is code to interface not to implementations. Decoupling is very helpful when we maintain code and extend. For examples proxy, adapter, façade, decorator etc. can be taken.
</div>
<h3>Behavioral Patterns</h3>
<br/>
<div align='justify'>
Behavioral patterns focus on how objects distribute work and describe how each object does a single cohesive function. Also, it focuses on how independent objects work towards a common goal.
</div>
<br/>
<div align='justify'>
Behavioral patterns focus on how objects distribute work and describe how each object does a single cohesive function. Also, it focuses on how independent objects work towards a common goal.
</div>
<br/>
<div align='justify'>
A good metaphor for considering behavioral patterns is that of a race car pit crew at a track. Every member of the crew has a role, but together they work as a team to achieve a common goal. Similarly, a behavioral pattern lays out the overall goal and purpose for each object. For another example think about different spaghetti recipes. All have a common work flow like boiling water, adding sauce, adding chilies and bla b la. So we can see a common behavior among all these things.
</div>
<br/>
<p>So with this knowledge we are ready to dive into patterns one by one.</p>
<br/>
<p>Happy Coding!</p>
