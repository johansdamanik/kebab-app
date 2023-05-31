# Challenge-1 API Documentation

## Endpoints :

List of available endpoints:

- `GET /`
- `POST /users/register`
- `POST /users/login`
- `POST /users/google-sign-in`
- `GET /products`
- `POST /products`
- `GET /products/:id`
- `DELETE /products/:id`
- `GET /categories`

### GET /

> API connection check

_Response_

```json
"Hello World!"
```

---

### POST /users/register

> Register for new user

_Request Body_

```json
{
    "username": <username input>,
    "email": <email input>,
    "password": <password input>,
    "phone": <phone input>,
    "address": <address input>
}
```

_Response (201 - Created)_

```json
{
    "access_token": <access_token>,
    "id": <new user id>,
    "email": <new user email>
}
```

_Response (400 - Bad Request)_

```json
{
    "name": "SequelizeValidationError",
    "errors": [
        {
            "message": "Email is required",
            "field": "email"
        },
        {
            "message": "Invalid email format",
            "field": "email"
        },
        {
            "message": "Password is required",
            "field": "password"
        },
        {
            "message": "Password must be at least 5 characters long",
            "field": "password"
        }
    ]
}

-OR-

{
    "name": "SequelizeUniqueConstraintError",
    "errors": [
        {
            "message": "Email is already used",
            "field": "email"
        }
    ]
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

---

### POST /users/login

> Login for registered user

_Request Body_

```json
{
    "email": <email input>,
    "password": <password input>
}
```

_Response (200 - OK)_

```json
{
    "access_token": <access_token>,
    "id": <user id>,
    "email": <user email>
}
```

_Response (400 - Bad Request)_

```json
{
    "name": "!email",
    "errors": { "message": "Email is required" }
},
{
    "name": "!password",
    "errors": { "message": "Password is required" }
}
```

_Response (401 - Unauthorized )_

```json
{
    "name": "!user",
    "errors": { "message": "Email/password is wrong" }
},
{
    "name": "!isValidPassword",
    "errors": { "message": "Email/password is wrong" }
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

---

### POST /users/google-sign-in

> Register new user with Google Account or Login with Google Account if user already registered

_Request Headers_

```json
{
    "google_token": <google token>
}
```

_Response (200 - OK)_

```json
{
    "access_token": <access token>,
    "email": <user email>,
    "role": <user role>
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

---

### GET /cuisines

> Get all cuisines include user through authorId

_Request Headers_

```json
{
    "access_token": <access token>
}
```

_Response (200)_

```json
[
    {
        "id": <cuisine id>,
        "name": <cuisine name>,
        "description": <cuisine description>,
        "price": <cuisine price>,
        "imgUrl": <cuisine image url>,
        "authorId": <cuisine authorId(FK)>,
        "categoryId": <cuisine categoryId(FK)>,
        "User": {
            "id": <user id>,
            "username": <user username>,
            "email": <user email>,
            "role": <user role>,
            "phoneNumber": <user phone number>,
            "address": <user address>,
        }
    },
    ...
]
```

_Response (401 - Unauthorized )_

```json
{
    "name": "InvalidToken",
    "errors": { "message": "Invalid Token" }
},
{
    "name": "JsonWebTokenError",
    "errors": { "message": "Invalid Token" }
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

---

### POST /cuisines

> Create new cuisine

_Request Headers_

```json
{
  "access_token": <access token>
}
```

_Request Body_

```json
{
  "name": <name input>,
  "description": <description input>,
  "price": <price input>,
  "imgUrl": <image url input>,
  "categoryID": <categoryID(FK) to get insert into>
}
```

_Request User_

```json
{
  "id": <user id>
}
```

_Response (201 - Created)_

```json
{
  "id": <created cuisine id>,
  "name": <created cuisine name>,
  "description": <created cuisine description>,
  "price": <created cuisine price>,
  "imgUrl": <created cuisine image url>,
  "authorId": <created cuisine authorId(FK)>,
  "categoryId": <created cuisine categoryId(FK)>,
}
```

_Response (400 - Bad Request)_

```json
{
  "name": "SequelizeValidationError",
  "message": "Bad Request",
  "errors": [
    {
      "message": "Name is required",
      "field": "name"
    },
    {
      "message": "Description is required",
      "field": "description"
    },
    {
      "message": "Price is required",
      "field": "price"
    },
    {
      "message": "Price should be at least 10000",
      "field": "price"
    },
    {
      "message": "Image url is required",
      "field": "imgUrl"
    },
    {
      "message": "Category is required",
      "field": "category"
    }
  ]
}
```

_Response (401 - Unauthorized )_

```json
{
    "name": "InvalidToken",
    "errors": { "message": "Invalid Token" }
},
{
    "name": "JsonWebTokenError",
    "errors": { "message": "Invalid Token" }
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

---

### GET /cuisines/:id

> Get cuisine by id

_Request Params_

```json
{
    "id": <cuisine id>
}
```

_Request Headers_

```json
{
  "access_token": <access token>
}
```

_Response (200)_

```json
[
    {
        "id": <cuisine id>,
        "name": <cuisine name>,
        "description": <cuisine description>,
        "price": <cuisine price>,
        "imgUrl": <cuisine image url>,
        "authorId": <cuisine authorId(FK)>,
        "categoryId": <cuisine categoryId(FK)>,
        "createdAt": <cuisine createdAt>,
        "updatedAt": <cuisine updatedAt>,
    },
    ...
]
```

_Response (401 - Unauthorized )_

```json
{
    "name": "InvalidToken",
    "errors": { "message": "Invalid Token" }
},
{
    "name": "JsonWebTokenError",
    "errors": { "message": "Invalid Token" }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Cuisine not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

---

### DELETE /cuisines/:id

> Delete cuisine by id

_Request Params_

```json
{
    "id": <cuisine id>
}
```

_Request Headers_

```json
{
  "access_token": <access token>
}
```

_Response (200)_

```json
{
     "message": `Cuisine ${cuisine.name} has been deleted`
}
```

_Response (401 - Unauthorized )_

```json
{
    "name": "InvalidToken",
    "errors": { "message": "Invalid Token" }
},
{
    "name": "JsonWebTokenError",
    "errors": { "message": "Invalid Token" }
}
```

_Response (403 - Forbidden )_

```json
{
  "name": "Forbidden",
  "errors": { "message": "You are not authorized" }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Cuisine not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

---

### GET /categories

> Get all categories

_Request Headers_

```json
{
  "access_token": <access token>
}
```

_Response (200)_

```json
[
    {
        "id": <categories id>,
        "name": <categories name>,
        "createdAt": <categories createdAt>,
        "updatedAt": <categories updatedAt>
    },
    ...
]
```

_Response (401 - Unauthorized )_

```json
{
    "name": "InvalidToken",
    "errors": { "message": "Invalid Token" }
},
{
    "name": "JsonWebTokenError",
    "errors": { "message": "Invalid Token" }
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

---

List of available endpoints for customers / pub :

- `POST /pub/register`
- `POST /pub/login`
- `POST /pub/google-login`
- `GET /pub/cuisines`
- `GET /pub/cuisines/:id`
- `GET /pub/categories`
- `GET /pub/qr-code/:id`
- `GET /pub/bookmark`
- `POST /pub/bookmark/:id`

### POST /pub/register

> Register for new user

_Request Body_

```json
{
    "email": <email input>,
    "password": <password input>,
}
```

_Response (201 - Created)_

```json
{
    "access_token": <access_token>,
    "email": <new user email>
}
```

_Response (400 - Bad Request)_

```json
{
    "name": "SequelizeValidationError",
    "errors": [
        {
            "message": "Email is required",
            "field": "email"
        },
        {
            "message": "Invalid email format",
            "field": "email"
        },
        {
            "message": "Password is required",
            "field": "password"
        },
        {
            "message": "Password must be at least 5 characters long",
            "field": "password"
        }
    ]
}

-OR-

{
    "name": "SequelizeUniqueConstraintError",
    "errors": [
        {
            "message": "Email is already used",
            "field": "email"
        }
    ]
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

---

### POST /users/login

> Login for registered user

_Request Body_

```json
{
    "email": <email input>,
    "password": <password input>
}
```

_Response (200 - OK)_

```json
{
    "access_token": <access_token>,
    "email": <user email>,
    "role": <user role>,
}
```

_Response (400 - Bad Request)_

```json
{
    "name": "!email",
    "errors": { "message": "Email is required" }
},
{
    "name": "!password",
    "errors": { "message": "Password is required" }
}
```

_Response (401 - Unauthorized )_

```json
{
    "name": "!user",
    "errors": { "message": "Email/password is wrong" }
},
{
    "name": "!isValidPassword",
    "errors": { "message": "Email/password is wrong" }
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

---

### POST /pub/google-login

> Register new user with Google Account or Login with Google Account if user already registered

_Request Headers_

```json
{
    "google_token": <google token>
}
```

_Response (200 - OK)_

```json
{
    "access_token": <access token>,
    "email": <user email>,
    "role": <user role>
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

---

### GET /pub/cuisines

> Get all cuisines include user through authorId

_Request Query_

```json
{
   "page": <integer>, OPTIONAL
   "filter":  <string>, OPTIONAL
   "category":  <integer>, OPTIONAL
   "price":  <string>, OPTIONAL
}
```

_Response (200)_

```json
[
    {
        "id": <cuisine id>,
        "name": <cuisine name>,
        "description": <cuisine description>,
        "price": <cuisine price>,
        "imgUrl": <cuisine image url>,
        "authorId": <cuisine authorId(FK)>,
        "categoryId": <cuisine categoryId(FK)>,
        "createdAt" : <cuisine createdAt>,
        "updatedAt" : <cuisine createdAt>,
    },
    ...
]
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

---

### GET /pub/cuisines/:id

> Get cuisine by id

_Request Params_

```json
{
    "id": <cuisine id>
}
```

_Response (200)_

```json
[
    {
        "id": <cuisine id>,
        "name": <cuisine name>,
        "description": <cuisine description>,
        "price": <cuisine price>,
        "imgUrl": <cuisine image url>,
        "authorId": <cuisine authorId(FK)>,
        "categoryId": <cuisine categoryId(FK)>,
        "createdAt": <cuisine createdAt>,
        "updatedAt": <cuisine updatedAt>,
    },
    ...
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Cuisine not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

---

### GET /pub/categories

> Get all categories

_Response (200)_

```json
[
    {
        "id": <categories id>,
        "name": <categories name>,
        "createdAt": <categories createdAt>,
        "updatedAt": <categories updatedAt>
    },
    ...
]
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

---

### GET /pub/qr-code/:id

> Get QR Code created by 3rd party API

_Request Params_

```json
{
  "id": <integer>
}
```

_Response (200)_

```json
<svg> SVG DATA </svg>
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

---

### GET /pub/bookmark/

> Get all customer's bookmark list

_Request Headers_

```json
{
  "access_token": <access token>
}
```

_Response (200)_

```json
{
    "id": <bookmark id>,
    "CustomerId": <bookmark customer id>,
    "CuisineId": <bookmark cuisine id>,
    "createdAt": <bookmark createdAt>,
    "updatedAt": <bookmark updatedAt>,
    "Cuisines" : {
        "id": <cuisine id>,
        "name": <cuisine name>,
        "description": <cuisine description>,
        "price": <cuisine price>,
        "imgUrl": <cuisine image url>,
        "authorId": <cuisine authorId(FK)>,
        "categoryId": <cuisine categoryId(FK)>,
        "createdAt": <cuisine createdAt>,
        "updatedAt": <cuisine updatedAt>,
    }
}
```

_Response (401 - Unauthorized )_

```json
{
    "name": "InvalidToken",
    "errors": { "message": "Invalid Token" }
},
{
    "name": "JsonWebTokenError",
    "errors": { "message": "Invalid Token" }
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

---

### POST /pub/bookmark/:id

> Add cuisine to bookmark

_Request Params_

```json
{
    "id": <cuisine id>
}
```

_Request Headers_

```json
{
  "access_token": <access token>
}
```

_Response (200)_

```json
{
    "id": <bookmark id>,
    "CustomerId": <bookmark customer id>,
    "CuisineId": <bookmark cuisine id>,
    "createdAt": <bookmark createdAt>,
    "updatedAt": <bookmark updatedAt>,
}
```

_Response (401 - Unauthorized )_

```json
{
    "name": "InvalidToken",
    "errors": { "message": "Invalid Token" }
},
{
    "name": "JsonWebTokenError",
    "errors": { "message": "Invalid Token" }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Cuisine not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

---
