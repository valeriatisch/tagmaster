# Authorization API

## Overview

| url                | method        | description                     |
| -------------------|:-------------:| -------------------------------:|
| `/api/register`    | POST          | Create new user                 |
| `/api/login`       | POST          | Authorize and start new session |
| `/api/logout`      | GET           | Destroy current session         |
| `/api/reset`       | POST          | Get a new password via email    |
| `/api/account`     | GET           | See user profile                |
| `/api/account`     | PATCH         | Edit user account               |
| `/api/account`     | DELETE        | Delete user account             |

Success is indicated by the http status code `200`

Failure is indicated by a http status code `4xx` or `5xx`

Error descriptions:
* ```Bad request``` indicates that the JSON format body is incorrect or there're keys missing.
* ```Not found``` indicates that the link is incorrect.

## Register

#### Request
`POST /api/register`
```
{
  "email": "user@example.org",
  "first": "Max",
  "last": "Mustermann",
  "password": "secret"
}
```
```"first" and "last"``` have to be at least 2 and max 20 characters long.  
```"password"``` has to be at least 8 and max 20 characters long.

#### Success 
A new user has been created.
```
{
  "message": "ok"
}
```

#### Failure
```
{
  "error": "description"
}
```
Possible error descriptions:  
* ```"No credentials found"``` if there are missing credentials
* ```"Failed to create user"``` if the user already exists or used to be one and deleted theirs account

## Login

#### Request
`POST /api/login`
```
{
  "email": "user@example.org",
  "password": "secret"
}
```

#### Success
Sets the `session` cookie
```
{
  "message": "ok"
}
```

#### Failure
```
{
  "error": "description"
}
```
Possible error descriptions:  
* ```"Incorrect password"```
* ```"Email not registered"```
* ```"No credentials found"```

## Logout

#### Request
`GET /api/logout`

#### Success
Clears the `session` cookie
```
{
  "message": "ok"
}
```

#### Failure
```
{
  "error": "description"
}
```
Possible error descriptions:  
* ```"Not logged in"```

## Reset Password
#### Request
`POST /api/sendPassword`
```
{
 "email": "user@example.org"
}
```

#### Success 
Sends a new password to the user via email.
```
{
  "message": "ok"
}
```

#### Failure
```
{
  "error": "description"
}
```
Possible error descriptions:  
* ```"Email not registered"```

## User Profile

#### Request
`GET /api/account`

#### Success
```
{
  "email": "user@example.org",
  "first": "Max",
  "id": 1,
  "last": "Mustermann"
}
```

#### Failure
```
{
  "error": "description"
}
```
Possible error descriptions:
* ```"Unauthorized"``` if the user is not logged in

## Editing User Profile

#### Request
E.g. to modify email and firstname (it's possible to modify ```"last"``` and ```"password"``` as well):
`PATCH /api/account`
```
{
  "email": "user@example.org",
  "first": "Maria"
}
```
#### Success
User profile information has been updated.
```
{
  "message": "ok"
}
```

#### Failure
```
{
  "error": "description"
}
```
Possible error descriptions:
* ```"Unauthorized"``` if the user is not logged in
* ```"Internal server error"``` if there are problems with the database
* ```"Email address already in use"```

## Delete User Account

#### Request
`DELETE /api/account`

#### Success
Deletes user account and related projects.
```
{
  "message": "ok"
}
```

#### Failure
```
{
  "error": "description"
}
```

Possible error descriptions:
* ```"Unauthorized"``` if the user is not logged in
* ```"Internal server error"``` if there are problems with the database