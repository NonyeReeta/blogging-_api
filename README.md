# BLOGGING API PROJECT 

This project serves as the second semester **exam** for [Alt School's](altschoolafrica.com) Backend development with Nodejs.

## GETTING STARTED

* Clone the repository into your local environment
* Run `npm install` to install all dependencies
* Create a .env file
    * Add the folloving variables
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










