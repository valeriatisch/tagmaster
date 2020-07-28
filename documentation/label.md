# Images API

## Overview

| url                       | method        | description                       |
| --------------------------|:-------------:| ---------------------------------:|
| `/api/images/id/label`    | POST          | Save label coordinates of an image|
| `/api/images/id/label`    | GET           | See images label coordinates      |

Success is indicated by the http status code `200`

Failure is indicated by a http status code `4xx` or `5xx`

## Label Image

#### Request
`POST /api/images/id/label`
```
{  
  "labelname": "name",
  "topright": "1",
  "topleft": "2",
  "bottomright": "3",
  "bottomleft": "4"
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
  "error": "Bad request"
}
```


## List Labels

#### Request
`GET /api/images/id/label`

#### Success
```
[
    {
        "LabelName": "",
        "Topright": 1,
        "Topleft": 2,
        "Bottomright": 3,
        "Bottomleft": 4
    },
    {
        "LabelName": "",
        "Topright": 2,
        "Topleft": 4,
        "Bottomright": 5,
        "Bottomleft": 6
    }
]
```

#### Failure
```
{
  "error": "Bad request"
}
```
