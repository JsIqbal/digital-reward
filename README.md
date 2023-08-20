Instructions from root directory:

```bash
    npm run client
    npm run server
```

1. **Main Folder (Your Project's Home):** This is like the base of your project. It's where everything starts. Imagine it as the entrance to a big playground.

2. **cmd Folder (Where the Main Game Plan is):** Think of this as the place where the game plan is written. It tells your project what to do first. Like, "Start the game, set up everything, and let the fun begin!"

3. **config Folder (How the Game Will Be Played):** Here, you decide how the game should be played. What rules to follow, like which colors are good, how fast the players can run, and other settings.

4. **database Folder (Getting Ready for the Game):** Imagine this is where you prepare the playground. You set up the swings, slides, and everything needed for the game to happen.

5. **repo Folder (Helpers for Playing the Game):** This is like your helper friends who know all the rules of the game. They help you keep track of scores, who's playing, and stuff like that.

6. **rest Folder (Where People Play the Game):** Think of this like the game field. People come here to play the game. They run, jump, and have fun. The rest folder manages how people can play together.

7. **svc Folder (Managing the Game):** This is like the person who makes sure everything is going well in the game. They decide if someone wins, if the game is fair, and if everyone is happy.

8. **models Folder (Characters and Stuff in the Game):** Imagine this is where you create all the characters for your game. Like the heroes, villains, and other cool stuff you can use to play.

Remember, just like how you can imagine different parts of a playground, your code is like the playground for your computer to play with. Each part has a special job to make the game fun and exciting!

---

# Project Architecture

This document outlines the architecture of the project, including its directory structure and major components.

## Directory Structure

-   root
-   -   `cmd/` (Root Files)
    -   `config/` (Configuration files)
    -   `rest/` (REST API handlers and routes)
        -   `admin/` (Admin-related routes and handlers)
        -   `dashboard/` (Dashboard-related routes and handlers)
        -   `user/` (User-related routes and handlers)
        -   `test/` (Test-related routes and handlers)
        -   `server.go` (server related system)
    -   `svc/` (Service layer)
        -   `adminrepo/` (Admin repository implementation)
        -   `dashboardrepo/` (Dashboard repository implementation)
        -   `userrepo/` (User repository implementation)
        -   `service.go` (Service implementation)
    -   `repo/` (Repository layer)
        -   `admin/` (Admin repository interface)
        -   `dashboard/` (Dashboard repository interface)
        -   `user/` (User repository interface)
        -   `admin.go` (Admin repository implementation)
        -   `dashboa.go` (Dashboard repository implementation)
        -   `user.go` (User repository implementation)
    -   `main.go` (Application entry point)

## Components

### rest

This directory contains the REST API handlers and routes, organized by different entities.

### svc

The service layer that holds the business logic and uses the repository layer for data access.

### repo

The repository layer that defines the interfaces and implementations for data access.

### config

Contains configuration files for the application.

### main.go

The entry point of the application that sets up the server and initializes the routes.

## Usage

To run the application, execute `go run main.go`.

## Notes

-   Make sure to handle error cases and validations properly in your code.
-   Use proper package and function naming conventions for clarity and consistency.
-   Feel free to add more details as the architecture evolves.

# NGROK Docs:

1. ngrok web login
2. download ngrok and run it
3. get the authToken from ngrok web account & run :

ngrok config add-authtoken YOUR_AUTH_TOKEN

4. execute : ngrok http YOUR_LOCAL_PORT

    - start ngrok task:

        - ```cmd
          ngrok http <PORT>
          ngrok http 3004
          ```

        ```

        ```

    - kill ngrok task:
        - find task list using :
        ```cmd
        tasklist | find "ngrok"
        ```
        - kill task :
        ```cmd
        taskkill /F /PID <pid>
        ```
        - kill all task :
        ```cmd
        taskkill /F /IM ngrok.exe
        ```

---

## DB Architecture

-   There will be 3 tables
-   A user table: user_id, email
-   A product table: product_id, product_name, product_description, product_price
-   A user product table naming user_prod: user_id, product_id

## Swagger Documentation:

-   go to the bin folder of GO path and :
    ```bash
    go install github.com/swaggo/swag@latest
    ```
-   execute swag init inside the server or your backend project
-   donload swagger from : https://github.com/swagger-api/swagger-ui
-   Take the dist folder from the swagger downloaded file and keep inside the projects docs folder
-   take the index.html file outside the dist folder and keep inside docs directory
-   This is the setup file for the index.html file:

    ````html
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <title>Swagger UI</title>
            <link
                rel="stylesheet"
                type="text/css"
                href="./dist/swagger-ui.css"
            />
            <link
                rel="icon"
                type="image/png"
                href="./dist/favicon-32x32.png"
                sizes="32x32"
            />
            <link
                rel="icon"
                type="image/png"
                href="./dist/favicon-16x16.png"
                sizes="16x16"
            />
        </head>

        <body>
            <div id="swagger-ui"></div>
            <script src="./dist/swagger-ui-bundle.js" charset="UTF-8"></script>
            <script
                src="./dist/swagger-ui-standalone-preset.js"
                charset="UTF-8"
            ></script>
            <script>
                const ui = SwaggerUIBundle({
                    url: "./swagger.json", // Path to swagger.json or swagger.yaml
                    dom_id: "#swagger-ui",
                    deepLinking: true,
                    presets: [
                        SwaggerUIBundle.presets.apis,
                        SwaggerUIStandalonePreset,
                    ],
                    layout: "StandaloneLayout",
                });
            </script>
        </body>
    </html>
    ```
    ````

-   Go to the server.go file and initialize the router for the documentation like this:

    ```code
    router.Static("/docs", "./docs")
    ```

-   write the documentations for the controllers and after each documentation execute comand:
    ```bash
    swag init
    ```
