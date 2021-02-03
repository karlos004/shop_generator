#Shop Generator
###Requirements:
- Git ([Download](https://git-scm.com/))
- Node.js + npm min. 14.15 recommended latest ([Download](https://nodejs.org/en/))
- Heroku account + HerokuCLI ([Register and download](https://nodejs.org/en/))
- MySQL Database

###Steps:
1. Install Node.js, Git and HerokuCLI(https://devcenter.heroku.com/articles/heroku-cli)
2. From Git Bash run commands to check if everything is installed
    ```shell
      $ node -v
        v15.4.0
      $ npm -v
        7.2.0
      $ git --version
        git version 2.29.2.windows.3
      $ heroku -v
        heroku/7.47.3 win32-x64 node-v12.16.2
    ```
3. Log in to HerokuCLI
    ```shell
      $ heroku login -i
        heroku: Enter your login credentials
        Email: me@example.com
        Password: ***************
        Two-factor code: ********
        Logged in as me@heroku.com
    ```
4. Clone project
    ```shell
      $ git clone https://github.com/karlos004/shop_generator.git
    ```
5. Create database 
    ```shell
      $ mysql -u username -p database_name < db.sql
    ```
6. Install front-end dependencies
    ```shell
      $ cd front
      $ npm install
    ```
7. Install back-end dependencies
    ```shell
      $ cd api
      $ npm install
    ```
8. Run project
    ```shell
      $ cd front
      $ npm run dev
    ```
    ```shell
      $ cd api
      $ npm start
    ```
9. Access generator  
    Open web browser and type http://localhost:3000 in address bar.