---
layout: post
title: PySpark - Let's count products 
categories: Software-Engineering
author : Isuru Nuwanthilaka
last_modified_at: 2021-04-23 21:05:20
tags: [Big Data]
---

Big Data field is growing day by day so as the technologies which supports big data. Spark is another interesting platform to
do distribute computing. Spark came in to the picture to improve the drawbacks of Hadoop MapReduce. In this quick article we are going
to solve a simple big data problem with pyspark.

<figure>
  <img src="{{ site.url }}/assets/img/pyspark.png" alt="pyspark" class="fig-img"/>
</figure>

#### Problem

We have a dataset of sales in Jan 2009 of a company, and we need to count product sales country-wise. Data set is available at [here.](https://github.com/isurunuwanthilaka/pyspark-product-count/blob/main/SalesJan2009.csv)

Head of the data set as follows.

<script src="https://gist.github.com/isurunuwanthilaka/ed3f8b6c98ea9f96aec1b4750036cb7d.js?file=SalesJan2009.csv"></script>

Notice that we have country in the 8th column.

#### Solution

We are going to create a mapreduce job to solve this problem with spark. Complete code 👇

<script src="https://gist.github.com/isurunuwanthilaka/ed3f8b6c98ea9f96aec1b4750036cb7d.js?file=spark-job.py"></script>

**Let's talk about the code line-by-line.**

`L0` says line 0.

L11 creates a SparkSession

L16 stores the output path, here the s3 bucket location.

L17 reads the file and put data into RDD, here we have parsed a S3 bucket location where our data set is uploaded.

L19-L21 defines the mapper function. Here we split the line and get the country and parse `(K,V)` as `(Country,1)` i.e. `(US,1)`.

L23 is the actual mapreduce job runner. It will reduce by the key. `add` function is taken from the operator package.

In the mapper we return `(K,V)` and at the reducer we have `(K, list(V))`. Therefore `add` function will reduce `list(v)`. For an example,
if we get `key:US` and `values:1,1,1,1,...,1` then firstly 1,1 will be parsed to `add` and resulting 2 will be the first value of next iteration. Therefore,
2,1 will be again parsed to `add` and `3,1`,`4,1`,`5,1` and finally `sum` will be returned as `(US,sum)`.

L26 creates a schema to form a dataframe to save results to file. Here we have two columns with type `StringType()`.

L30 write the dataframe to s3 bucket location as a CSV.

This is a very small pyspark job to demonstrate the workflow of how we simply solve a bigdata problem. There are lots of resources out there. I have created a
video guide on youtube. Check that out if you are interested.

[![AWS EMR Spark : Hands-on](https://img.youtube.com/vi/Jdy1L7g8N94/0.jpg)](https://www.youtube.com/watch?v=Jdy1L7g8N94)

Be safe and away from Covid-19,Happy Coding!




