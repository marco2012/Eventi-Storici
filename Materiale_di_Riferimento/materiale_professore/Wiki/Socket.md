All you need to kn ow on sockets and communication can be found in the Java Tutorial on 
[What Is a Socket?](https://docs.oracle.com/javase/tutorial/networking/sockets/definition.html)

In a sentence: 

> A socket is one endpoint of a two-way communication link between two programs running on the network. A socket is bound to a port number so that the TCP layer can identify the application that data is destined to be sent to. An endpoint is a combination of an IP address and a port number. Every TCP connection can be uniquely identified by its two endpoints. That way you can have multiple connections between your host and the server.

We explore sockets using the JAVA language. Our first goal is to implement a basic Web Server over sockets capable to interact with a state-of-the-art Web Browser (e.g. Chrome or Firefox). Next, we will implement a Web Client capable to interact with a state-of-the-art Web Server.

As a Web server we use [NGINX](https://www.nginx.com/resources/wiki/), a free, open-source, high-performance HTTP server, supporting the [PHP](http://php.net/) server scripting language.

To setup a convenient experimental environment we use [docker](https://www.docker.com/)

![](img/docker.jpg)

[NGINX PHP on DOCKER](https://hub.docker.com/r/richarvey/nginx-php-fpm/)

```
sudo docker run -v '/home/andrea/Documents/Didattica/RC 2017/experiments':/var/www/html -d richarvey/nginx-php-fpm
```


```
docker ps
docker inspect fac0e279e9a4
```

```
sudo docker exec -i -t fac0e279e9a4 /bin/bash
```

1. http://172.17.0.2/index.html
2. http://172.17.0.2/index.html 
3. ```mv index.html index1.html``` http://172.17.0.2/index.html 
4. http://172.17.0.2/index.php
5. http://172.17.0.2/index.php
6. http://172.17.0.2/post_form.html
7. http://172.17.0.2/get.php?name=pippo&email=pluto

```
telnet 172.17.0.2 80

GET /index.html HTTP/1.1 \r\n
Host: 172.17.0.2 \r\n
\r\n
```

