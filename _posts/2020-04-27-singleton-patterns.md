---
layout: post
title: Singleton Pattern|2
categories: engineering
author : Isuru Nuwanthilaka
---

<p align="center">
<img src="{{ site.url }}/assets/img/singleton.png"
     alt="Patterns Image"
     style="float: center;" />
</p>

<h4>Definition</h4>
<br/>
<div align='justify' style = "font-style:italic;">
The singleton pattern ensures a class has only one instance, and provides global point of access to it.
Let’s discuss.
</div>
<br/>
<div align='justify'>
Singleton is a creational design pattern. It is simple but very powerful design pattern. Why we need this pattern? Let us say, you need a class object is created only once and reuse it in entire application. This way you can give global access to the object. This helps to prevent memory leakages. If you are the only programmer working in the project, then you can have a rule in the mind not to create two objects of that same class within the application. But what about there are many programmers? you can have a comment and mention that not to instantiate two objects of that same class. Do you think this works when the application is growing and becoming complex? No, it is obvious some may forget this rule. So, we need to limit this behavior in the implementation level. 
Let’s consider a java public class with a public constructor.
</div>
<br/>
<pre>
public class NotSingleton {
//public constructor
    public NotSingleton() {
    }
}
</pre>
<br/>
<div align='justify'>
So, you can instantiate the class objects as many as you want just with the new keyword. First, we need to limit this behavior. By making constructor private and exposing a public method, we prohibit creating objects with new keyword.
</div>
<br/>
<pre>
public class Singleton {
    private Singleton() {
    }
    public static Singleton getInstance(){
        return new Singleton();
    }
}
</pre>
<br/>
<div align='justify'>
Still this does not assure a singleton object but now we cannot create new instances with new key word. Instead we want to use Singleton.getInsance() method to create a new instance. Let’s look at how we can make sure we are referring to a singleton object.
</div>
<br/>
<pre>
public class Singleton {
     private static Singleton uniqueInstance;
     private Singleton() {}
     public static Singleton getInstance(){
        if (uniqueInstance == null) {
            uniqueInstance =  new Singleton();
        }
        return uniqueInstance;
     }
}
</pre>
<br/>
<div align='justify'>
Now this ensures a singleton object, vallah! When we call Sigleton.getInstance() firstly it checks whether there is an already created object if yes returns that object or if not create a new object, save for future and return. Simple.
</div>
<br>
<div align='justify'>
NOTED: This is called lazy creation. Object is only created when it is needed. This will improve the performance of the program, like when the object is large.
</div>
<br>
<div align='justify'>
Now we have basic understanding of the singleton pattern, but this implementation is not thread safe. We are going to tackle that problem now. But you can leave the post if you are not interested in this advanced topic. It’s up to you.
</div>
<br>
<h4>Advanced Topic : Dealing with multithreading</h4>
<br>
<div align='justify'>
Lets say thread 1 and thread 2 evaluating the if(uniqueInstance==null) instruction one thread after the other before executing next instruction. Now both threads evaluate it as true and create two new instances. This is an issue right, got it ? So we need thread 1 to enter the method while thread 2 is waiting until the thread 1 is finished with method. We can realize it with synchronized key word. Look at the following code snippet.
</div>
<br/>
<pre>
public class SafeSingleton {
    private static SafeSingleton uniqueInstance;
    private SafeSingleton() {
    }
    public static synchronized SafeSingleton getInstance(){
        if (uniqueInstance == null) {
            uniqueInstance =  new SafeSingleton();
        }
        return uniqueInstance;
    }
}
</pre>
<br/>
<div align='justify'>
Now singleton is thread safe, but remember synchronization is expensive. Therefore we have to first consider whether we really need these behaviors to our application.
</div>
<br/>
<div align='justify'>
Next we are going to discuss another thread safe method called eagerly creation (we talked lazy creation earliar). We can create a Singleton object in a static initializer so it is guaranteed to be thread safe.
</div>
<br/>
<pre>
public class Singleton {
    private static Singleton uniqueInstance = new Singleton();
    private Singleton() { }
    public static Singleton getInstance(){
        return uniqueInstance;
    }
}
</pre>
<br/>
<div align='justify'>
Now we have a deep understanding about singleton pattern. Lets apply it to your applications.
</div>
<br/>
<p>Happy Coding.</p>

Reference : GOF

