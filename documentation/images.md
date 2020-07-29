# Images API

## Overview

| url                       | method        | description                     |
| --------------------------|:-------------:| -------------------------------:|
| `/api/projects/id/images` | POST          | Upload an image to a project    |
| `/api/projects/id/images` | GET           | See all images of a project     |
| `/api/images/id`          | GET           | Get image details               |
| `/api/images/id/file`     | GET           | See an image                    |
| `/api/next`               | GET           | Get the next image in a slider  |

Success is indicated by the http status code `200`

Failure is indicated by a http status code `4xx` or `5xx`

Error descriptions:
* ```Bad request``` indicates that the JSON format body is incorrect or there're keys missing.
* ```Not found``` indicates that the link is incorrect.

## Image Upload

#### Request
`POST /api/projects/id/images`
```
{   
  "file": selectedfile,
}
```

#### Success 
```
{
  "done": false,
  "id": 1
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
* ```Not found``` if the project id is incorrect
* ```Project is already active```

## List Images

#### Request
`GET /api/projects/id/images`

#### Success
```
[
    {
        "id": 1,
        "filename": "imagename.png",
        "done": false
    },
    {
        "id": 2,
        "filename": "imagename.png",
        "done": true
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
* ```Not found``` if the project id is incorrect

## Image Details

#### Request
`GET /api/images/id`

#### Success
Shows id, done status and tags of an image.
```
{
  "done": false/true,
  "id": 1,
  "tags": "tag1, tag2, tag3"
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

## Image
#### Request
`GET /api/images/id/file`

#### Success 
Shows the image.

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

## Next Image
#### Request
`GET /api/next`

#### Success 
```
{
  "id": 1,
  "tags": "tag1, tag2, tag3"
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
* ```No image available``` if there are no images left
