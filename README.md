Instructions from root directory:

```bash
    npm run client
    npm run server
```

# Domain-Driven Design (DDD) Explained

Hey there! Imagine you're building the coolest video game ever. Well, Domain-Driven Design (DDD) is like creating that game world in a smart and organized way. Let's dive in!

## What's DDD All About?

Think of DDD as a super guidebook for making your game. Here's the deal:

-   **Domain:** This is your game world, with all its characters, places, and rules. Just like the world in your favorite game!
-   **Model:** Imagine it as a special book that helps you remember who's who and what's what in your game.
-   **Bounded Contexts:** Picture different zones in your game, like a spooky forest or a magical castle. Each zone has its own rules and characters.
-   **Entities:** These are like the main heroes and villains in your game. They can change and learn new things.
-   **Value Objects:** Think of them as special treasures, like a powerful sword or a healing potion. They're super helpful!
-   **Aggregates:** Imagine a group of characters and treasures working together. It's like a superhero team with awesome powers.
-   **Repositories:** These are like magical chests where you keep your characters and cool stuff. You can easily find them when you need them.
-   **Services:** Think of them as expert helpers in your game. They do important tasks, like casting spells or fixing things.
-   **Ubiquitous Language:** It's like if everyone—players and characters—used the same words. This makes everything easier to understand!

## How Does DDD Work?

1. **Layered Architecture:** Imagine your game as a yummy cake with different layers. Each layer does something special, like showing the game to players or making characters move.
2. **Hexagonal Architecture (Ports and Adapters):** This is like having a secret clubhouse for all the game's magic. There are doors (adapters) that let things go in and out.
3. **CQRS (Command Query Responsibility Segregation):** It's like having separate notebooks—one for writing stuff and one for reading stuff. This keeps the game organized.
4. **Event Sourcing:** Imagine writing down every adventure in a special book. Instead of saving the game at one point, you can read the book and know everything.
5. **Aggregate Roots:** These are like the leaders of different groups in the game. They make sure everyone follows the rules.
6. **Domain Events:** Think of these as special announcements in the game. When something cool happens, everyone gets to know.

## Why Use DDD?

-   DDD helps make software as exciting and real as an awesome video game!
-   It makes software easier to understand because everything is neat and organized.
-   It's like crafting a magical world where everything works together perfectly.

## Challenges of DDD:

-   Learning DDD might take some time because it introduces new ideas.
-   At the start, planning and understanding the game world might need more time.
-   Finding the right balance between accuracy and practicality can be a bit tricky.

Domain-Driven Design is a bit like creating an epic adventure that's fun for both players and creators. Just like your favorite game, DDD helps build software worlds that are amazing, consistent, and a whole lot of fun for everyone! 🚀

# Project Architecture

Welcome to the world of software architecture! 🚀 This document will guide you through the different parts of your project and explain each one in a fun and relatable way. Imagine your project as a big playground, and each folder and component is like a player or equipment that contributes to the game.

## Main Folder: Your Project's Home 🏡

This is where everything starts! Just like how a game starts from a central place, your project starts from here. It's like the entrance to a big playground, and all the fun begins when you step in.

## cmd Folder: Where the Main Game Plan is Written 📜

Think of this as the place where the game plan is written. It's like someone giving instructions on how to play. "Start the game, set up everything, and let the fun begin!" This folder contains the instructions that your project needs to follow.

## config Folder: How the Game Will Be Played 🎮

Here, you decide how the game should be played. Imagine you're setting up the rules, like which colors are good, how fast players can run, and other settings. The config folder is where you adjust your project's settings and make sure everything is just right.

## database Folder: Getting Ready for the Game 🏟️

This is like the part of the playground where you prepare everything before the game starts. You set up the swings, slides, and all the fun stuff needed for the game to happen. The database folder is where you get everything ready for your project to run smoothly.

## repo Folder: Helpers for Playing the Game 🤝

Think of this as your helper friends who know all the rules of the game. They help you keep track of scores, who's playing, and other important stuff. The repo folder holds the code that helps your project interact with the data it needs.

## rest Folder: Where People Play the Game 🏟️

Imagine this as the game field itself! People come here to play the game. They run, jump, and have fun. In the rest folder, you manage how people can play together. This is where the different parts of your project connect and interact with each other.

## svc Folder: Managing the Game 🎮

This is like the person who makes sure everything is going well in the game. They decide if someone wins, if the game is fair, and if everyone is happy. The svc folder contains the important logic that keeps your project running smoothly and ensures things work as expected.

## models Folder: Characters and Stuff in the Game 🧙‍♂️

Imagine this is where you create all the characters for your game. Like the heroes, villains, and other cool stuff you can use to play. In your project, the models folder holds the data structures that represent the different things your project works with.

## cache Folder: Remembering Important Stuff 📚

Just like how you remember where you left off in a game, the cache folder helps your project remember things quickly. It's like a super-fast memory that stores important information so your project can use it again later.

## logger Folder: Keeping a Diary of the Game 📖

Imagine having a diary where you write down what happens in the game. The logger folder is like a diary for your project. It keeps a record of what's happening, so you can go back and check what went right or wrong.

## docs and util Folders: Guides and Extra Helpers 🛠️

The docs folder is like the guidebook for your game, where you explain how everything works. The util folder is like a toolbox with extra tools that your project can use whenever it needs them.

---

## Directory Structure

Your project's structure looks like this:

-   root
    -   cmd/
    -   config/
    -   rest/
        -   user/
        -   server.go
    -   svc/
        -   userrepo/
        -   service.go
    -   repo/
        -   user.go
    -   cache/
    -   logger/
    -   docs/
    -   util/
    -   main.go

## Components

### rest

This is where the fun begins! Different parts of your project come together here to play the game.

### svc

Here's where the magic happens! The svc folder manages the game and ensures everything works smoothly.

### repo

The repo folder helps your project interact with data, just like your helper friends in the game.

### config

This folder sets the rules and settings for your game. It's like giving instructions on how to play.

### main.go

This is like the button to start the game. When you press it, your project starts running.

## Usage

To start the game (your project), run `go run main.go`.

## Notes

-   Always handle errors and validations in your code to keep the game fair.
-   Use clear and consistent naming for your packages and functions.
-   Feel free to add more details as your project grows and evolves.

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

-   There has been massieve change and no Entity relationship diagram was created before the project and it became a headache now because we did not follow a principle.
-   Before deployment of the software we will update this section.

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

-   There can be an issue like: You have initialized a new swagger documentation for a new platform but still can see the swagger documentation for another platform. In that case you have to clear browser caches and then reload the swagger documentation.

## Docker Port Forwarding:

-   Run a mysql container and configure it with the project:

Every computer has a localhost and every computer has ports of their own.

A Docker machine resides inside a host computer, and Docker containers are basically virtual computers.
Therefore, Docker containers also have their own localhost and ports.

Suppose we want to connect to a MySQL database from our host machine.
However, since we are running MySQL inside a container in the Docker machine,
we cannot directly access it through the default MySQL port (3306) from our host machine.

To enable access to the MySQL container from the host machine, we need to perform port forwarding.
This process involves mapping a port on the host machine to the specific port of the MySQL container.

The command to achieve port forwarding is as follows:

```bash
docker run -p host_machine_port:container_port image_name
```

For example, to forward port 4000 of the host machine to port 3306 of the MySQL container, you can use the following command:

```bash
docker run -p 4000:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
```

to enter in the running container :

```bash
docker exec -it <container id> sh
```

to enter in mysql in the running container :

```bash
mysql -u <MYSQL_USER> -p
```

Now, if you try to connect to the database on localhost:4000 from your host machine,
Docker will forward the request to the container's port (3306),
and you should be able to access the database, for example, using tools like TablePlus.

This method of exposing a container's port to the host machine is known as port forwarding.

### Completed docker compose for client server architectures.

    look at the docker-compose file in the root directory for further clarifications.

## TODO:

<details>
  <summary>Click to expand completed/not-completed Features: CLIENT-SERVER</summary>

-   [x] Static Documentation Serving

    -   [ ] Sub-feature 1: Describe the first sub-feature here.

-   [x] Health Check Endpoint

    -   [ ] Sub-feature 1: Describe the first sub-feature here.

-   [x] User Authentication

    -   [x] User Registration: Implement user registration.
    -   [x] User Login: Implement user login.

-   [x] User Profile Management : Only for logged in users.
    -   [x] User Profile Creation: Implement user profile creation.
    -   [x] Get Logged-in User: Implement the ability to retrieve the logged-in user.
    -   [x] Logout: Implement user logout.
    -   [x] Get User Profile: Implement the ability to retrieve user profiles.
-   [x] API specifications

    -   [x] Method signatures: Completed method signature for service and data-pact repository.
    -   [x] Create all necessary service and repo helper methods.
    -   [x] Create the controller for the singledatapack api service

-   [x] Refactor KYC Service : Only for logged in users.

    -   [] validations: Do validations for know your customer form so that one customer doesn't have same profile for 2 different emails and such.
    -   [] API: Create Api to get maskings for customers []
    -   [] API: Create Api to get Rewards for customers []
    -   [] API Specification: For Create Campaign create a custom API specification
    -   [] Make the date time fields responsive
    -   [] Make the Profile modal responsive
    -   [] Make Dummy charts in the dashboard
    -   [] Do database Indexing
    -   [] Create pagination in backend for reports
    -   [] Create pagination in frontend for reports

    </details>

*   new feature: store invalid numbers in db and expire them after some time -14 days

-   check invalid number:

    -   if number has characters
    -   if numberdoesn't start with operator wise

*   campaign summary first, after clicking on it then the details. \*\*\* - 5 working days
