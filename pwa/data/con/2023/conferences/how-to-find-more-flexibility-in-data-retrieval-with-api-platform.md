---
type: conference
speakers: -mathias-arlaud-2023
track: '1'
date: '2023-09-21'
start: '17:10'
end: '17:50'
short: Let's explore alternative solutions to access data in conjunction with API Platform
tag: archi
---

# How to find more flexibility in data retrieval with API Platform (🇺🇸)

Most of the time, when you develop an API application with Symfony, you create a resource using API Platform, and configure that resource as an entity using Doctrine.

This is great, because in a few lines of code, you can expose stored data through a REST API.

But this has some limits because it enforces your API to use Doctrine, with its pros and cons. In fact, Doctrine is sometimes unable to tackle special use cases (such as CTEs) and is often the performance bottleneck of the API.

Therefore, let's once again dive into API Platform, but this time **in synergy with other solutions to access data**.
