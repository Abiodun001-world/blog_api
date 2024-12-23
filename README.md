# Blog API

This is a simple Blog API project.

## Features

- Create, read, update, and delete blog posts
- User authentication and authorization

## Installation and Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/Abiodun001-world/blog_api.git
    ```
2. Navigate to the project directory:
    ```bash
    cd blog_api
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory:

```
PORT=
MONGO_URI=
JWT_SECRET=
```

## Usage

1. Start the development server:
    ```bash
    npm start
    ```
2. Access the API at `http://localhost:3000`

### Testing the API

You can use tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to test the API endpoints.

1. **User Registration**:

   - Endpoint: `POST /auth/signup`
   - Body: `{"first_name":"test", "last_name":"endpoint", "email": "test@gmail.com", "password": "passord321" }`

2. **User Login**:

   - Endpoint: `POST /auth/signin`
   - Body: `{ "email": "email@gmail.com", "password": "password123" }`

3. **Create a Blog**:

   - Endpoint: `POST /blogs`
   - Body: `{  "title": "Blog Title", "description": "Details", "status": "draft/published" }`
   - Requires Auth: Yes (Include the token in the headers)

4. **Get All Blogs**:

   - Endpoint: `GET /blogs`
   - Requires Auth: No (the route is public)

5. **Get a Specific Blog by a blog id**:

   - Endpoint: `GET /blogs/:id`
   - Requires Auth: No (the route is public)

6. **Update a Blog by a blog id**:

   - Endpoint: `PUT /blogs/:id`
   - Body: `{  "title": "Blog Title", "description": "Blog Description", "status": "draft/published" }`
   - Requires Auth: Yes (Include the token in the headers)

7. **Delete a Task**:
   - Endpoint: `DELETE /blogs/:id`
   - Requires Auth: Yes (Include the token in the headers)

### Hosting Link

Access the live application [here](https://blog-api-wkre.onrender.com)
