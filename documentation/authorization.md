# Authorization API

## Overview

| url              | method        | description                     |
| ---------------- |:-------------:| -------------------------------:|
| `/api/register`  | POST          | Create new user                 |
| `/api/login`     | POST          | Authorize and start new session |
| `/api/logout`    | GET           | Destroy current session         |

Success is indicated by the http status code `200`

Failure is indicated by a http status code `4xx` or `5xx`

## Register

#### Request
`POST /api/register`
```
{
  "email": "user@example.org",
  "password": "secret"
}
```

#### Success 
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