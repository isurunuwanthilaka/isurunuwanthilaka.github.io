---
layout: post
title: MapReduce - Let's average numbers
---

In the big data context, MapReduce plays a significant role. It is the underlying techniques for most of the big data
frameworks- like apache hadoop, spark + many more platforms. In this article we are not going to learn [MapReduce](https://en.wikipedia.org/wiki/MapReduce)
but solving a big data problem.

Recently I wanted to average numbers in huge data set. For an example lets say I have numbers like,

<script src="https://gist.github.com/isurunuwanthilaka/08c3cd029ee6fa67e11238c17a1462ca.js?file=dataset-example.txt"></script>

So this might be a big data set with TBs of data, and we can't process it in a single machine. So how we solve this big data
problem as simple as possible?

#### The dumbest solution (but working!)

The simplest way is to map each number to a single key like `(1,x)` here x represents the numbers in the data set. So all
the numbers will be loaded to one key and reducer will reduce them all. This approach is not really using the benefits of
the MapReduce framework. This is more like an overhead to the simple looping averaging algorithm.
So we have to find a trick to distribute the data set across multiple keys.

#### A better solution

Here we are going to ~~distribute~~ map the dataset across multiple keys and reduce with multiple
reducers.

Here is the flow diagram.

<figure>
  <img src="{{ site.url }}/assets/img/mapreduce.png" alt="mapreduce" class="fig-img"/>
  <figcaption>Fig.1 - MapReduce Averaging using two stages</figcaption>
</figure>

This way going to use two MapReducers by chaining.

Let's go to implementation. [Find the full code here](https://github.com/isurunuwanthilaka/map-reduce-average-java)

#### Phase 1 Mapper

<script src="https://gist.github.com/isurunuwanthilaka/08c3cd029ee6fa67e11238c17a1462ca.js?file=PrimaryMap.java"></script>

In this case we get `(line no, number)` as the `(K,V)` but number is the only thing important to us. To distribute these numbers
we randomly assign those numbers into buckets (here we have 4 buckets). In other words, bucket no means the key for that data point.
So in this example we have 4 keys. Therefore, `(K1,list(numbers)),...,(K4,list(numbers))` will be received at reducer phase.

#### Phase 1 Reducer

<script src="https://gist.github.com/isurunuwanthilaka/08c3cd029ee6fa67e11238c17a1462ca.js?file=PrimaryReduce.java"></script>

Here we accumulate the numbers and find the sum and count. So the `PrimaryReduce` will return `(count,sum)` as (K,V). These
results will be saved to the file system temporarily and that is a disadvantage with multiple job chaining.

#### Phase 2 Mapper

<script src="https://gist.github.com/isurunuwanthilaka/08c3cd029ee6fa67e11238c17a1462ca.js?file=SecondaryMap.java"></script>

Now we need to get all the data to one single key, so we can average easily. Simple. Just look at the code.

#### Phase 2 Reducer

<script src="https://gist.github.com/isurunuwanthilaka/08c3cd029ee6fa67e11238c17a1462ca.js?file=SecondaryReduce.java"></script>

Now `key="one"` will get all the `sum,count` so we run averaging function adding total and count to get the final total and final count.
Average is simply `sum/count` and we output as `("output",average)` so this result will be saved again in the HDFS.

Now chain all the functions as in [Average.java](https://github.com/isurunuwanthilaka/map-reduce-average-java/blob/master/java-code/src/main/java/com/isuru/Average.java)

#### Let's test on AWS EMR cluster.

<figure>
  <img src="{{ site.url }}/assets/img/mr4.JPG" alt="mapreduce" class="fig-img"/>
  <figcaption>Fig.1 - Creating an EMR cluster on AWS</figcaption>
</figure>

<figure>
  <img src="{{ site.url }}/assets/img/mr3.JPG" alt="mapreduce" class="fig-img"/>
  <figcaption>Fig.2 - Add JAR and dataset to AWS S3 bucket</figcaption>
</figure>

<figure>
  <img src="{{ site.url }}/assets/img/mr1.JPG" alt="mapreduce" class="fig-img"/>
  <figcaption>Fig.3 - Add a step to run custom jar on Hadoop</figcaption>
</figure>

<figure>
  <img src="{{ site.url }}/assets/img/mr2.JPG" alt="mapreduce" class="fig-img"/>
  <figcaption>Fig.4 - Step is completed</figcaption>
</figure>

Once the step is completed successfully check the `/output` folder in S3 for results.

Happy Coding!
