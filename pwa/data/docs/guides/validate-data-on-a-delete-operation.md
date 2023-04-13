---
slug: validate-data-on-a-delete-operation
name: Validate Data on a Delete Operation
position: 99
---

<a href="#section-1" id="section-1">§</a>

Let&#039;s add a [custom Constraint](https://symfony.com/doc/current/validation/custom_constraint.html).


```php
// src/App/Validator.php
namespace App\Validator;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
#[\Attribute]
class AssertCanDelete extends Constraint
{
    public string $message = 'The string "{{ string }}" contains an illegal character: it can only contain letters or numbers.';
    public string $mode = 'strict';
}
```

<a href="#section-2" id="section-2">§</a>

And a custom validator following Symfony&#039;s naming conventions.


```php
// src/App/Validator.php
namespace App\Validator;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Constraint;
class AssertCanDeleteValidator extends ConstraintValidator
{
    public function validate(mixed $value, Constraint $constraint)
    {
        /* TODO: Implement validate() method. */
    }
}
```

<a href="#section-3" id="section-3">§</a>

By default, validation is not triggered during a DELETE operation and we need to trigger validation manually.


```php
// src/App/ApiResource.php
namespace App\ApiResource;
use ApiPlatform\Metadata\Delete;
use App\State\BookRemoveProcessor;
use App\Validator\AssertCanDelete;
use Doctrine\ORM\Mapping as ORM;
#[ORM\Entity]
#[Delete(validationContext: ['groups' => ['deleteValidation']], processor: BookRemoveProcessor::class)]
```

<a href="#section-4" id="section-4">§</a>

Here we use the previously created constraint on the class directly.


```php
#[AssertCanDelete(groups: ['deleteValidation'])]
class Book
{
    #[ORM\Id, ORM\Column, ORM\GeneratedValue]
    private ?int $id = null;
    #[ORM\Column]
    public string $title = '';
}
```

<a href="#section-5" id="section-5">§</a>

Then, we will trigger the validation within a processor.
the removal into the Database.


```php
// src/App/State.php
namespace App\State;
use ApiPlatform\Doctrine\Common\State\RemoveProcessor as DoctrineRemoveProcessor;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use ApiPlatform\Validator\ValidatorInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
class BookRemoveProcessor implements ProcessorInterface
{
    public function __construct(
```

<a href="#section-6" id="section-6">§</a>

We&#039;re decorating API Platform&#039;s Doctrine processor to persist the removal.


```php
        #[Autowire(service: 'api_platform.doctrine.orm.state.remove_processor')]
        private DoctrineRemoveProcessor $doctrineProcessor,
        private ValidatorInterface $validator,
    ) {
    }
    public function process($data, Operation $operation, array $uriVariables = [], array $context = [])
    {
```

<a href="#section-7" id="section-7">§</a>

First step is to trigger Symfony&#039;s validation.


```php
        $this->validator->validate($data, ['groups' => ['deleteValidation']]);
```

<a href="#section-8" id="section-8">§</a>

Then we persist the data.


```php
        $this->doctrineProcessor->process($data, $operation, $uriVariables, $context);
    }
}
```

<a href="#section-9" id="section-9">§</a>

TODO move this to reference somehow
This operation uses a Callable as group so that you can vary the Validation according to your dataset
new Get(validationContext: [&#039;groups&#039; =&gt;])
## Sequential Validation Groups
If you need to specify the order in which your validation groups must be tested against, you can use a [group sequence](http://symfony.com/doc/current/validation/sequence_provider.html).


```php
```
