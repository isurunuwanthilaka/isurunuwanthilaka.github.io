---
layout: post
title: Art of Code
categories: Software-Engineering
author : Isuru Nuwanthilaka
discussion_id: 14
tags: [Misc]
---

TLDR : **CODE is a POEM** written with passion and loads of love. Friends, If you don't agree, this post is for you and better to read.
Or else, we both are in the same page.

Early days of programming was composing 1s and 0s somehow to tell the machines a computational task. But now it has evolved
to a point that it is no longer a 1s and 0s solo dance. Now project teams are huge and lots of programmers working on same code base.
*So these days what matters most is how to write a code readable and surely someone would fix it to work on a machine.* Therefore,
coding has become an art.

<figure>
  <img src="{{ site.url }}/assets/img/codeisart.png" alt="codeisart" class="fig-img"/>
  <figcaption>image <a href="https://jeshield.com/code-is-poetry">source</a></figcaption>
</figure>

What is an art in a general way?

**Poetry is a peace of art.**
: *It is written with care*
: *well thought*
: *elegant language used*
: *idea is clear*
: *readers feel cared,loved while reading*
: *no unnecessary words, not even a single one*
: *written with passion*

So as code.

We all have worked in *messy code bases* and always feel like this code is not cared or loved. Good code should be written for
readers not for machines. How we identify whether the code is well cared? it can be measured with the *number of wtf moments* 
while trying to understand the code. Or we might need to go here and there in the code to grab what it is doing. Readers get
exhausted by just few lines of code.

So how we care for a code?

* Use appropriate naming convention for all the variables/classes/interfaces/methods

* Classes named as Nouns and methods named as Verbs

* Method is responsible for a well-defined single task

* Keep the consistency across names. You might name person object as PersonEntity so better to name employee object as EmployeeEntity but not as
EmployeeObject
  
* Method name should describe the single task it is doing. Lets say we have a method for getting user given the user id. So
it is better to name the method as getUserById(int id). Therefore reader does not need to read the content to understand the behaviour.
  
If we carefully observe a poetry, we can see there is no clutter - only the things needed to convey the idea clearly. With code also,
we don't need unnecessary clutter. In our old days we are told to use comments as much as possible. But is it really worthy?
Having lots of comments may distract reader. Also comments are never cleaned (most of people - other than the original author
scared to touch comments.) When we go through a poem then we don't need any comment to enjoy it so should be the code. Unless it is
really needed we should avoid comments. Code itself should act as a comment. How?

Let's see this code snippet.
```java
public Integer calculation(Integer var1,Integer var2){
    //adding given two numbers
    Integer temp = var1 + var2;
    return temp;
  }
```

In the above code we had to use a comment to inform the reader that this method adds two given numbers. But can't we spread the comment
on code. Let's try.

```java
public Integer add(Integer numOne,Integer numTwo){
    Integer total = numOne + numTwo;
    return total;
  }
```

Now do you think we need a comment? No right. Code is itself a comment. Method signature is all enough.

Art is well thought. Poet has decided where to have sarcasm, where to have climax, when to say what. All is organized and
written for a reason. So as the code. It should be well-designed. Classes,interfaces should be extracted appropriately making code
simple (... yes it is KISS).

Poems are not written in a single run. May be 1 week for writing but few weeks for editing and fine-tuning. Mastering the art is
tiresome. That's why great art works are rare. It takes time and sweat. Nothing special with code also. It also needs lots of rework.
Hours of refactoring, war of opinions are truly behind the good code. No surprise. So once you write a code and executes, you are not yet done.
You need to revisit, refactor and clean the mess, polish few more rounds and then you can make it to *done*.

Again, **CODE is a POEM** written with passion and loads of love. You might still have different thoughts. We have a discussion 
at the end of this post. Love to hear your ideas.Shoot.

As always, be safe. Happy Coding!.
