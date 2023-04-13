--- 
slug: provide-the-resource-state
name: Provide the Resource State
position: 2
executable: true
tags: design, state
---

# Provide the Resource State

<a href="#section-1" id="section-1">§</a>

Our model is the same then in the previous guide ([Declare a Resource](./declare-a-resource). API Platform will declare
CRUD operations if we don&#039;t declare them. 


```php
// src/App/ApiResource.php
namespace App\ApiResource;
use ApiPlatform\Metadata\ApiResource;
use App\State\BookProvider;
```

<a href="#section-2" id="section-2">§</a>

We use a `BookProvider` as the [ApiResource::provider](/reference/Metadata/ApiResource#provider) option. 


```php
#[ApiResource(provider: BookProvider::class)]
class Book
{
    public string $id;
}

// src/App/State.php
namespace App\State;
use ApiPlatform\Metadata\CollectionOperationInterface;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\ApiResource\Book;
```

<a href="#section-3" id="section-3">§</a>

The BookProvider is where we retrieve the data in our persistence layer. 
In this provider we choose to handle the retrieval of a single Book but also a list of Books.


```php
final class BookProvider implements ProviderInterface
{
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): iterable|object|null
    {
        if ($operation instanceof CollectionOperationInterface) {
            $book = new Book();
            $book->id = '1';
```

<a href="#section-4" id="section-4">§</a>

As an exercise you can edit the code and add a second book in the collection.


```php
            return [$book];
        }
        $book = new Book();
```

<a href="#section-5" id="section-5">§</a>

The value at `$uriVariables[&#039;id&#039;]` is the one that matches the `{id}` variable of the **[URI template](/explanation/uri#uri-template)**.


```php
        $book->id = $uriVariables['id'];
        return $book;
    }
}
```
