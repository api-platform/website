---
slug: custom-controller
name: Custom controller
---


<a href="#section-1" id="section-1">§</a>

```php
First, let's create your custom operation:
```php
```

<a href="#section-2" id="section-2">§</a>

api/src/Controller/CreateBookPublication.php


```php
namespace App\Controller;
use App\Entity\Book;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
#[AsController]
class CreateBookPublication extends AbstractController
{
    private $bookPublishingHandler;
    public function __construct(BookPublishingHandler $bookPublishingHandler)
    {
        $this->bookPublishingHandler = $bookPublishingHandler;
    }
    public function __invoke(Book $book): Book
    {
        $this->bookPublishingHandler->handle($book);
        return $book;
    }
}
```
This custom operation behaves exactly like the built-in operation: it returns a JSON-LD document corresponding to the ID
passed in the URL.
Here we consider that [autowiring](https://symfony.com/doc/current/service_container/autowiring.html) is enabled for
controller classes (the default when using the API Platform distribution).
This action will be automatically registered as a service (the service name is the same as the class name:
`App\Controller\CreateBookPublication`).
API Platform automatically retrieves the appropriate PHP entity using the state provider then deserializes user data in it,
and for `POST`, `PUT` and `PATCH` requests updates the entity with state provided by the user.
The entity is retrieved in the `__invoke` method thanks to a dedicated argument resolver.
When using `GET`, the `__invoke()` method parameter will receive the identifier and should be called the same as the resource identifier.
So for the path `/user/{uuid}/bookmarks`, you must use `__invoke(string $uuid)`.
**Warning: the `__invoke()` method parameter [MUST be called `$data`](https://symfony.com/doc/current/components/http_kernel.html#4-getting-the-controller-arguments)**, otherwise, it will not be filled correctly!
Services (`$bookPublishingHandler` here) are automatically injected thanks to the autowiring feature. You can type-hint any service
you need and it will be autowired too.
The `__invoke` method of the action is called when the matching route is hit. It can return either an instance of
`Symfony\Component\HttpFoundation\Response` (that will be displayed to the client immediately by the Symfony kernel) or,
like in this example, an instance of an entity mapped as a resource (or a collection of instances for collection operations).
In this case, the entity will pass through [all built-in event listeners](events.md#built-in-event-listeners) of API Platform. It will be
automatically validated, persisted and serialized in JSON-LD. Then the Symfony kernel will send the resulting document to
the client.
The routing has not been configured yet because we will add it at the resource configuration level:
```php
```

<a href="#section-3" id="section-3">§</a>

api/src/Entity/Book.php

```php
namespace App\Entity;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use App\Controller\CreateBookPublication;
#[ApiResource(operations: [
    new Get(),
    new Post(
        name: 'publication', 
        uriTemplate: '/books/{id}/publication', 
        controller: CreateBookPublication::class
    )
])]
class Book
{
```

<a href="#section-4" id="section-4">§</a>

...

<div data-code-selector>

```php
}
```
```yaml
# api/config/api_platform/resources.yaml
App\Entity\Book:
    operations:
        ApiPlatform\Metadata\Get: ~
        post_publication:
            class: ApiPlatform\Metadata\Post
            method: POST
            uriTemplate: /books/{id}/publication
            controller: App\Controller\CreateBookPublication
```
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!-- api/config/api_platform/resources.xml -->
<resources
        xmlns="https://api-platform.com/schema/metadata/resources-3.0"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="https://api-platform.com/schema/metadata/resources-3.0
        https://api-platform.com/schema/metadata/resources-3.0.xsd">
    <resource class="App\Entity\Book">
        <operations>
            <operation class="ApiPlatform\Metadata\Get" />
            <operation class="ApiPlatform\Metadata\Post" name="post_publication" uriTemplate="/books/{id}/publication"
                       controller="App\Controller\CreateBookPublication" />
        </operations>
    </resource>
</resources>
```
</div>
It is mandatory to set the `method`, `uriTemplate` and `controller` attributes. They allow API Platform to configure the routing path and
the associated controller respectively.
