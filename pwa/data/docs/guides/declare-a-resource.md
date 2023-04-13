--- 
slug: declare-a-resource
name: Declare a Resource
position: 1
executable: true
tags: design
homepage: true
---

# Declare a Resource


<a href="#section-1" id="section-1">§</a>
This class represents an API resource


```php
namespace App\ApiResource;
```

<a href="#section-2" id="section-2">§</a>

The `#[ApiResource]` attribute registers this class as an HTTP resource.


```php
use ApiPlatform\Metadata\ApiResource;
```

<a href="#section-3" id="section-3">§</a>

These are the list of HTTP operations we use to declare a &quot;CRUD&quot; (Create, Read, Update, Delete).


```php
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Validator\Exception\ValidationException;
```

<a href="#section-4" id="section-4">§</a>

Each resource has its set of Operations.
Note that the uriTemplate may use the `id` variable which is our unique
identifier on this `Book`.


```php
#[ApiResource(
    operations: [
        new Get(uriTemplate: '/books/{id}'),
```

<a href="#section-5" id="section-5">§</a>

The GetCollection operation returns a list of Books.


```php
        new GetCollection(uriTemplate: '/books'),
        new Post(uriTemplate: '/books'),
        new Patch(uriTemplate: '/books/{id}'),
        new Delete(uriTemplate: '/books/{id}'),
    ],
```

<a href="#section-6" id="section-6">§</a>

This is a configuration that is shared accross every operations. More details are available at [ApiResource::exceptionToStatus](/reference/Metadata/ApiResource#exceptionToStatus).


```php
    exceptionToStatus: [
        ValidationException::class => 422
    ]
)]
```

<a href="#section-7" id="section-7">§</a>

If a property named `id` is found it is the property used in your URI template
we recommend to use public properties to declare API resources.


```php
class Book
{
    public string $id;
}
```

<a href="#section-8" id="section-8">§</a>

Select the [next example](./hook-a-persistence-layer-with-a-processor) to see how to hook a persistence layer.


```php
```
