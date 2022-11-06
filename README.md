# BLOGGING API PROJECT 

This project serves as the second semester **exam** for [Alt School's](altschoolafrica.com) Backend development with Nodejs.

## GETTING STARTED

* Clone the repository into your local environment
* Run `npm install` to install all dependencies
* Create a .env file
    * Add the following variables
        * DB_URL = `Mongo db url`
        * PORT = 3000
        * JWT_SECRET = `add a random text here`.
* The Entry point for the api is localhost:3000/articles

## END POINTS

Routes                                                                |Authorization        |Method  | Data
----------------------------------------------------------------------|---------------------|--------|------------------------------------------
/articles                                                             |All Users            |GET     |Returns all Published Articles
/Articles/article/*title of article*                                  |All Users            |GET     |Returns the article           
/Articles/search/*title of article*                                   |All Users            |GET     |Returns the article
/Articles/sort/read_count                                             |All Users            |GET     |Returns the article sorted by read_count 
/Articles/sort/reading_time                                           |All Users            |GET     |Returns the article sort by reading_time
/Articles/sort/timestamp                                              |All Users            |GET     |Returns the article sorted by timestamp   
/login    *with email and password*                                   |All Users            |POST    |Returns a secret_token
/signup    *with email, password, firstName, and lastNAme*            |All Users            |POST    |Returns a secret_token
/Articles/email/user-page?secret_token= *your secret token*           |login/signup required|GET     |Returns all articles by logged in user
/Articles/email/user-page/draft?secret_token= *your secret token*     |login/signup required|GET     |Returns all draft by logged in user
/Articles/email/user-page/published?secret_token= *your secret token* |login/signup required|GET     |Returns all published by logged in user
/Articles/email/create?secret_token= *your secret token*              |login/signup required|POST    |User is able to create a new article
/Articles/email/*title*/edit?secret_token= *your secret token*        |login/signup required|PUT     |Returns the article for editing
/Articles/email/*title*/delete?secret_token= *your secret token*      |login/signup required|DELETE  |Deletes the provided article

## DATA NEEDED TO CREATE A NEW OR EDIT AN ATRICLE

1. title: String
2. description: String
3. body: String
4. tags: String


## GETTING FAMILIAR WITH THE PROJECT REQUIREMENTS

Question

You are required to build a blogging api. The general idea here is that the api has a general endpoint that shows a list of articles that have been created by different people, and anybody that calls this endpoint, should be able to read a blog created by them or other users.

Requirements

1. Users should have a first_name, last_name, email, password, (you can add other attributes you want to store about the user)

2. A user should be able to sign up and sign in into the blog app

3. Use JWT as authentication strategy and expire the token after 1 hour

4. A blog can be in two states; draft and published

5. Logged in and not logged in users should be able to get a list of published blogs created

6. Logged in and not logged in users should be able to to get a published blog

7. Logged in users should be able to create a blog.

8. When a blog is created, it is in draft state

9. The owner of the blog should be able to update the state of the blog to published

10. The owner of a blog should be able to edit the blog in draft or published state

11. The owner of the blog should be able to delete the blog in draft or published state

12. The owner of the blog should be able to get a list of their blogs.

    1. The endpoint should be paginated

    2. It should be filterable by state

13. Blogs created should have title, description, tags, author, timestamp, state, read_count, reading_time and body.

14. The list of blogs endpoint that can be accessed by both logged in and not logged in users should be paginated,

a. default it to 20 blogs per page.

b. It should also be searchable by author, title and tags.

c. It should also be orderable by read_count, reading_time and timestamp

15. When a single blog is requested, the api should return the user information with the blog. The read_count of the blog too should be updated by 1

16. Come up with any algorithm for calculating the reading_time of the blog.

17. Write tests for all endpoints

Note:

The owner of the blog should be logged in to perform actions

Use the MVC pattern

Database

1. Use MongoDB

Data Models

___

User

- email is required and should be unique

- first_name and last_name is required

- password

Blog/Article

- title is required and unique

- description

- author

- state

- read_count

- reading_time

- tags

- body is required

- timestamp

Submission

___

- Push your code to GitHub

- Host it on heroku

- Share the heroku link and the GitHub link

Helpful links

___

- [Express](https://expressjs.com/) - [MongoDB](https://www.mongodb.com/)

Best of luck!







