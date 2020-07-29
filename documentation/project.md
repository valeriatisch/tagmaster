# Project API

## Overview

| url                        | method        | description                                             |
| ---------------------------|:-------------:| -------------------------------------------------------:|
| `/api/projects`            | POST          | Create a new project                                    |
| `/api/projects`            | GET           | See a list of your projects                             |
| `/api/projects/id`         | GET           | See a specific project                                  |
| `/api/projects/id`         | DELETE        | Delete a project                                        |
| `/api/projects/id/activate`| POST          | Set projects status to active if its ready for labeling |
| `/api/projects/id/export`  | GET           | Download a file with projects label data                |

Success is indicated by the http status code `200`

Failure is indicated by a http status code `4xx` or `5xx`

Error descriptions:
* ```Bad request``` indicates that the JSON format body is incorrect or there're keys missing.
* ```Not found``` indicates that the link is incorrect.

## Create Project

#### Request
`POST /api/projects`
```
{
  "name": "projectname",
  "tags": "tag1, tag2, tagn"
}
```

#### Success 
A new project has been created.
```
{
    "id": 1,
    "name": "projectname",
    "tags": "tag1, tag2, tag3",
    "active": false,
    "done": false,
    "images": null
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

## List Projects

#### Request
`GET /api/projects`

#### Success
```
[
    {
        "id": 1,
        "name": "project1",
        "tags": "tag1, tag2, tag3",
        "active": false,
        "done": true,
        "images": []
    },
    {
        "id": 2,
        "name": "project2",
        "active": false,
        "done": true,
        "tags": "tag1, tag2, tag3",
        "images": []
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


## Project Details

#### Request
`GET /api/projects/id`

#### Success
See name, tags and images of a project.
```
{
    "id": 1,
    "name": "project1",
    "tags": "tag1, tag2, tag3",
    "active": false,
    "done": false,
    "images": []
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

## Delete Project
#### Request
`DELETE /api/projects/id`

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
* ```Not found``` if the project id is incorrect

## Activate Project

#### Request
`POST /api/projects/id/activate`

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
* ```Not found``` if the project id is incorrect
* ```Project is already active```
* ```Project is empty``` if the project contains no images

## File w/ Projects Label Data 

#### Request
`GET /api/projects/id/export`

#### Success 
```
[{"filename":"image1.png",
  "tags":[{
            "label":"tag",
            "x1":1,
            "y1":2,
            "x2":3,
            "y2":4
           }]
 },
 {"filename":"image2.png",
  "tags":[{
            "label":"tag",
            "x1":1,
            "y1":2,
            "x2":3,
            "y2":4
          }]
}]
```

#### Failure
```
{
  "error": "description"
}
```

Possible error descriptions:
* ```"Unauthorized"``` if the user is not logged in
* ```"Internal server error"``` if the project is not done yet or there are problems with the database
* ```Not found``` if the project id is incorrect