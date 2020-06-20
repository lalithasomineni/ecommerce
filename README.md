
# Milestone-8: E-commerce

## Learning Competencies

At the end of this milestone you will learn

### Backend

##### How to retain the session information as HTTP is stateless
  - stateful and stateless
  - stateful ,assume having a client and two servers and eah having a database we will have a load balancer in b/w in the server and the client this load balancer will send the clients data data to a randomly picked server among those and it will be stored i the db of that server.so when the user tries viewing his profile next time then if the load balancer is directed to the server in which he haven't stored his  data then it will be a error ,This is stateful.
  - statelessness, here the server in when stores the data sends a token to the user wherever the data is storeed we can access that data using that particular JWT token.
- How to authorize third party applications like Google, facebook, github etc.
- Understanding the usage and functions of Cache memory
- How do you run a script in background in the browser using Service workers

### Frontend

- Creating Single page applications using React
- Handling DOM using React
- Handling Events in React
- Understanding the data flow in ReactJS


## Problem Statement

Let's build a fully functional e-commerce site on MERN stack!! You will be building a replica of one of your favourite e-commerce website.

### What's an e-commerce website?

[Wiki](https://en.wikipedia.org/wiki/E-commerce) says

> E-commerce is the activity of buying or selling online. Electronic commerce draws on technologies such as mobile commerce, electronic funds transfer, supply chain management, Internet marketing, online transaction processing, electronic data interchange (EDI), inventory management systems, and automated data collection systems.

