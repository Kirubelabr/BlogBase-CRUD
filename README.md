# Getting Started with BlogBase

This project is based on NodeJS, ExpressJS with MongoDB as it's database and Mongoose for ORM

## Prerequisite

You need to install all dependencies

yarn install

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000).

## A little about how to start and testing this project

This is the backend server for BlogBase.UI which will be in another repo

1. API runs at localhost://3000
2. Has a version to it so full API endpoint will look like this

- http://localhost:3000/api/v1/

3. I've implemented Authentication and Authorization

- couldn't finish up to showcase this feature in the Frontend App so disabled in few routes
- you can fully tests using Postman - (might also need to touch the code in this case since I commented out the `auth` guard)

4. Available APIS

- http://localhost:3000/api/v1/blogs
  - CRUD - for Blogs
- http://localhost:3000/api/v1/users
  - CRUD - for Users

## Creating Users

Use this format in Postman to create a user

POST - http://localhost:3000/api/v1/users

`{
  "name": "Kirubel Abera",
  "email": "kirubelabr@gmail.com",
  "password": "test@123" 
}`

---

And after registered you can sign in with

`{
  "email": "kirubelabr@gmail.com",
  "password": "test@123"
}`

## Technologies Used

- NodeJS
- ExpressJS
- JWT
- Joi
- bcryptJs

### Finally

If you had anything to say reach out to me with my personal email address `kirubelabr@gmail.com`.

```
 Thank you!

```
