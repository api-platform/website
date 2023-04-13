--- 
slug: secure-a-resource-access
name: Secure a Resource Access
position: 4
executable: true
---

<a href="#section-1" id="section-1">§</a>

```php
namespace App\ApiResource;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use App\Security\User;
```

<a href="#section-2" id="section-2">§</a>

We start by securing access to this resource to logged in users. 


```php
#[ApiResource(security: "is_granted('ROLE_USER')")]
#[Get]
```

<a href="#section-3" id="section-3">§</a>

To create a new resource using the Post operation, a user has to belong to the `ROLE_ADMIN` role.
We also customize the &quot;Access Denied.&quot; message with the `securityMessage` property. 


```php
#[Post(security: "is_granted('ROLE_ADMIN')", securityMessage: "Only an admin has access to that operation.")]
```

<a href="#section-4" id="section-4">§</a>

If a user **owns** the Book or has the `ROLE_ADMIN` role, he can update the object using the Put operation. Here we&#039;re
using the `object`&#039;s owner. The supported variables within the access control expression are:
  - user: the current logged in object, if any
  - object: contains the value submitted by the user 
  - request: the current Request object


```php
#[Put(security: "is_granted('ROLE_ADMIN') or object.owner == user")]
#[GetCollection]
#[ORM\Entity]
class Book
{
    #[ORM\Id, ORM\Column, ORM\GeneratedValue]
    public ?int $id = null;
    #[ORM\Column]
    #[Assert\NotBlank]
    public string $title;
    #[ORM\ManyToOne]
    public User $owner;
```

<a href="#section-5" id="section-5">§</a>

The security attribute is also available on [ApiProperty::security](/reference/Metadata/ApiProperty#security).
Access control checks in the security attribute are always executed before the denormalization step. 
If you want the object after denormalization, use `securityPostDenormalize`. Using this access control variables have:
  - object: the object after denormalization
  - previous_object: a clone of the object before modifications were made


```php
    /**
     * @var string Property viewable and writable only by users with ROLE_ADMIN
     */
    #[ApiProperty(security: "is_granted('ROLE_ADMIN')", securityPostDenormalize: "is_granted('UPDATE', object)")]
    public string $adminOnlyProperty;
}
```
