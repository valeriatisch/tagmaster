# Project API

## Overview

| url                | method        | description                     |
| -------------------|:-------------:| -------------------------------:|
| `/api/projects`    | POST          | Create a new project            |
| `/api/projects`    | GET           | See a list of your projects     |
| `/api/projects/id` | GET           | See a specific project          |
| `/api/projects/id` | DELETE        | Delete a project                |

Success is indicated by the http status code `200`

Failure is indicated by a http status code `4xx` or `5xx`

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
* ```Bad request``` if there's something missing

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
        "images": []
    },
    {
        "id": 2,
        "name": "project2",
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
    "images": []
}
```

#### Failure
```
{
  "error": "description"
}
```

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