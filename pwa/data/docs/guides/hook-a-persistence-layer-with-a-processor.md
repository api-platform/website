--- 
slug: hook-a-persistence-layer-with-a-processor
name: Hook a Persistence Layer with a Processor
position: 2
tags: design, state
---

<a href="#section-1" id="section-1">§</a>

```php
// src/App/ApiResource.php
namespace App\ApiResource;
use ApiPlatform\Metadata\ApiResource;
use App\State\BookProcessor;
```

<a href="#section-2" id="section-2">§</a>

We use a `BookProcessor` as the [ApiResource::processor](http://localhost:3000/reference/Metadata/ApiResource#processor) option. 


```php
#[ApiResource(processor: BookProcessor::class)]
class Book
{
    public string $id;
}

// src/App/State.php
namespace App\State;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\ApiResource\Book;
```

<a href="#section-3" id="section-3">§</a>

The BookProcessor is where we can handle a persistence layer.
In this processor we&#039;re storing the JSON representation of the book in a file.


```php
final class BookProcessor implements ProcessorInterface
{
    /**
     * @param Book $data
     */
    public function process($data, Operation $operation, array $uriVariables = [], array $context = [])
    {
        file_put_contents(sprintf('book-%s.json', $uriVariables['id']), json_encode($data));
        return $data;
    }
}
```
