--- 
slug: use-validation-groups
name: Use Validation Groups
position: 3 
tags: validation
---
# Validing incoming data

<a href="#section-1" id="section-1">§</a>

When processing the incoming request, when creating or updating content, API-Platform will validate the
incoming content. It will use the [Symfony&#039;s validator](https://symfony.com/doc/current/validation.html).
API Platform takes care of validating the data sent to the API by the client (usually user data entered through forms). 
By default, the framework relies on the powerful [Symfony Validator Component](http://symfony.com/doc/current/validation.html) for this task, but you can replace it with your preferred validation library such as the [PHP filter extension](https://www.php.net/manual/en/intro.filter.php) if you want to.
Validation is called when handling a POST, PATCH, PUT request as follows :


```php
//graph LR
//Request --> Deserialization
//Deserialization --> Validation
//Validation --> Persister
//Persister --> Serialization
//Serialization --> Response
```

<a href="#section-2" id="section-2">§</a>

In this guide we&#039;re going to use [Symfony&#039;s built-in constraints](http://symfony.com/doc/current/reference/constraints.html) and a [custom constraint](http://symfony.com/doc/current/validation/custom_constraint.html). Let&#039;s start by shaping our to-be-validated resource:


```php
// src/App/Entity.php
namespace App\Entity;
use ApiPlatform\Metadata\ApiResource;
```

<a href="#section-3" id="section-3">§</a>

A custom constraint.


```php
use App\Validator\Constraints\MinimalProperties;
use Doctrine\ORM\Mapping as ORM;
```

<a href="#section-4" id="section-4">§</a>

Symfony&#039;s built-in constraints


```php
use Symfony\Component\Validator\Constraints as Assert;
/**
 * A product.
 */
#[ORM\Entity] 
#[ApiResource]
class Product
{
    #[ORM\Id, ORM\Column, ORM\GeneratedValue]
    private ?int $id = null;
    #[ORM\Column]
    #[Assert\NotBlank]
    public string $name;
    /**
     * @var string[] Describe the product
     */
    #[MinimalProperties]
    #[ORM\Column(type: 'json')] 
    public $properties;
}
```

<a href="#section-5" id="section-5">§</a>

The `MinimalProperties` constraint will check that the `properties` data holds at least two values: description and price.
We start by creating the constraint:


```php
// src/App/Validator/Constraints.php
namespace App\Validator\Constraints;
use Symfony\Component\Validator\Constraint;
#[\Attribute]
class MinimalProperties extends Constraint
{
    public $message = 'The product must have the minimal properties required ("description", "price")';
}
```

<a href="#section-6" id="section-6">§</a>

Then the validator following [Symfony&#039;s naming conventions](https://symfony.com/doc/current/validation/custom_constraint.html#creating-the-validator-itself)


```php
// src/App/Validator/Constraints.php
namespace App\Validator\Constraints;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
final class MinimalPropertiesValidator extends ConstraintValidator
{
    public function validate($value, Constraint $constraint): void
    {
        if (!array_diff(['description', 'price'], $value)) {
            $this->context->buildViolation($constraint->message)->addViolation();
        }
    }
}
//If the data submitted by the client is invalid, the HTTP status code will be set to 422 Unprocessable Entity and the response's body will contain the list of violations serialized in a format compliant with the requested one. For instance, a validation error will look like the following if the requested format is JSON-LD (the default):
```

<a href="#section-7" id="section-7">§</a>

```json
{
  &quot;@context&quot;: &quot;/contexts/ConstraintViolationList&quot;,
  &quot;@type&quot;: &quot;ConstraintViolationList&quot;,
  &quot;hydra:title&quot;: &quot;An error occurred&quot;,
  &quot;hydra:description&quot;: &quot;properties: The product must have the minimal properties required (\&quot;description\&quot;, \&quot;price\&quot;)&quot;,
  &quot;violations&quot;: [
    {
      &quot;propertyPath&quot;: &quot;properties&quot;,
      &quot;message&quot;: &quot;The product must have the minimal properties required (\&quot;description\&quot;, \&quot;price\&quot;)&quot;
    }
  ]
 }
```
Take a look at the [Errors Handling guide](errors.md) to learn how API Platform converts PHP exceptions like validation
errors to HTTP errors.


```php
```
