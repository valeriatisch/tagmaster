# Label API

## Overview

| url                       | method        | description                       |
| --------------------------|:-------------:| ---------------------------------:|
| `/api/images/id/label`    | POST          | Save label coordinates of an image|
| `/api/images/id/label`    | GET           | See all labels of an image        |

Success is indicated by the http status code `200`

Failure is indicated by a http status code `4xx` or `5xx`

Error descriptions:
* ```Bad request``` indicates that the JSON format body is incorrect or there're keys missing.
* ```Not found``` indicates that the link is incorrect.

## Label Image

#### Request
`POST /api/images/id/label`
```
[{  
  "label": "tagname",
  "x1": 1,
  "y1": 2,
  "x2": 3,
  "y2": 4
}]
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

Possible error descriptions:
* ```"Unauthorized"``` if the user is not logged in
* ```"Internal server error"``` if there are problems with the database
* ```Not found``` if the image id is incorrect
* ```Image already labeled``` if the image is already marked as done

## List Labels

#### Request
`GET /api/images/id/label`

#### Success
```
[
    {
        "label": "tag1",
        "x1": 1,
        "y1": 2,
        "x2": 3,
        "y2": 4
    },
    {
        "label": "tag2",
        "x1": 1,
        "y1": 2,
        "x2": 3,
        "y2": 4
    }
]
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
* ```Not found``` if the image id is incorrect
