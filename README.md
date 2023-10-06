# Patika-Agency
Agency is a portfolio site built with **Express** and **MongoDB** and [Agency theme](https://startbootstrap.com/theme/agency) for [this task](https://academy.patika.dev/tr/courses/nodejs-backend-patikasi-projeleri/Agency-Proje) in Patika.dev NodeJS course.

## Getting Started
- Clone this repo: ```git clone https://github.com/ahmet-parlak/patika-agency.git```
- Install all required dependencies: ```npm install```
- Create a **.env** file in the main directory and add your database connection: ```MONGODB_URI = "mongodb://localhost:27017/agency-db"```
- You can also specify the server port number by adding the following line to the *.env* file: ```PORT=3000```
- The application runs on port 5000 by default
- Start the local server by running: ```npm start``` or ```npm run dev```

After completing these steps, you can manage the portfolio area by logging in at `/login`. Please note that user creation is required when you first open the login page, and only one user can be created.

## Dependencies
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [EJS](https://ejs.co/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Method-override](https://www.npmjs.com/package/method-override)
- [Connect-flash](https://www.npmjs.com/package/connect-flash)