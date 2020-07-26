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