---
type: conference
speakers: -ryan-weaver
track: '1'
date: '2023-09-22'
start: '09:00'
end: '09:50'
short: Let's explore a new feature of API Platform
tag: good-practices
---

# Create the DTO System of your Dreams: stateOptions + entityClass (🇺🇸) 

One of the best features of API Platform is the ability to add #[ApiResource] above an entity and... bam! You have a fully-functional API! Though, if you want to have full control and peak clarity, nothing beats creating a dedicated DTO class.

But, creating a DTO class - especially when the data comes from Doctrine - feelslike reinventing the wheel! Suddenly you need to create a state provider, stateprocessor and filters... which all do the same thing that API Platform does automatically for entities. 

No more! In this talk, we'll explore a new feature called "state options" that gives you **the flexibility of a DTO class, but the convenience of an entity**. We'll explore how this works & exactly what you need (e.g. a mapper system) to create a DTO class and have it "just work".
