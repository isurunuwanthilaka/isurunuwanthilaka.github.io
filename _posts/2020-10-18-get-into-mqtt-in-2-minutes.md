---
layout: post
title: Get into MQTT in 3 minutes (Python+Docker)  
categories: Software-Engineering
author : Isuru Nuwanthilaka
last_modified_at: '2021-04-11 21:05:20'
tags: [Misc]
---

In my second week of internship, I got a chance to involve in a IoT project. There, I had to quickly go through some concepts before writing codes for the application.So I thought to share some knowledge here, about MQTT by building a example app.

## What is MQTT?

Firstly, we have to understand what actually MQTT is. MQTT is an `ISO standard (ISO/IEC PRF 20922) `publish-subscribe-based messaging protocol. Message Queuing Telemetry Transport (MQTT) was designed by Andy Stanford-Clark (IBM) and Arlen Nipper in 1999 for connecting Oil Pipeline telemetry systems over satellite. Initially it came out as a proprietary protocol but in 2010 was released free and became OASIS standard in 2014. It is designed for connections with remote locations where a “small code footprint” is required or the network bandwidth is limited.

Here is the simple publisher/subscriber message broker pattern used in mqtt.

<p align="center">
<img src="{{ site.url }}/assets/img/pub-sub.png"
     alt="pub/sub pattern"
     style="float: center;" />
</p>


## Publish telemetry to the MQTT server

Next, we are going to build a client to publish data to the mqtt message broker. (Later in this tutorial, we create the mqtt server and connect the clients… )

First we need to run (in cmd) ,

```cmd
pip install paho-mqtt
```

then, create pub_client_1.py with following simple code snippet.

```python
#simulator device 1 for mqtt message publishing
import paho.mqtt.client as paho
import time
import random
#hostname
broker="localhost"
#port
port=1883
def on_publish(client,userdata,result):
    print("Device 1 : Data published.")
    pass
client= paho.Client("admin")
client.on_publish = on_publish
client.connect(broker,port)
for i in range(20):
    d=random.randint(1,5)
    
 #telemetry to send 
    message="Device 1 : Data " + str(i)
time.sleep(d)
    
 #publish message
    ret= client.publish("/data",message)
print("Stopped...")
```

easy ??? create another client pub_client_2.py

## Subscribe telemetry from the MQTT server

Now, create subscriber.py with following code.

```python
import paho.mqtt.client as mqtt

# This is the Subscriber
#hostname
broker="localhost"
#port
port=1883
#time to live
timelive=60
def on_connect(client, userdata, flags, rc):
  print("Connected with result code "+str(rc))
  client.subscribe("/data")
def on_message(client, userdata, msg):
    print(msg.payload.decode())
    
client = mqtt.Client()
client.connect(broker,port,timelive)
client.on_connect = on_connect
client.on_message = on_message
client.loop_forever()
```

Okay, now we have created publishers and subscribers. We are going to create mqtt service using docker.

Simply create a folder and save the following code to docker-compose.yml file.

```docker-compose
version: "3"
services:
 mqtt:
      image: toke/mosquitto
      network_mode: bridge
      container_name: mqtt
      expose:
        - 1883
      ports:
        - 1883:1883
      restart: unless-stopped
```

Open powershell and cd into the folder and run,

```cmd
docker-compose up
```

After hosting the mqtt server you can run clients. Increase delay times if the scripts crash. We can get see clients connecting and disconnecting to the Mosquitto MQTT server.

Check running docker containers.

```cmd
docker container list -a
```

Stop MQTT service.

```cmd
docker container stop mqtt
```

Start Again.

```cmd
docker container start mqtt
```

To remove container, first stop the container and then remove,

```cmd
docker container rm mqtt
docker image rm toke/mosquitto
```

We can connect IoT devices easily like this. This enables Machine-to-machine(M2M) communication in the industry level IoT solutions.

# The End

This is very simple , but, will ease your life a lot. Hope you enjoyed.

Happy Coding!