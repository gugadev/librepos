<h1 align="center">LibrePOS</h1>

Tiny POS system written in NET Core 2.1 and Angular 6 as training for Belatrix Software.

## Screenshots

<p align="center">
  <img src="https://i.imgur.com/fJJMaes.png" width="1000">
</p>

<p align="center">
  <img src="https://i.imgur.com/UQ0T16Q.png" width="1000">
</p>

## Build and run

### Core

First, modify the file `appSettings.json` to change the connection string to point to your database.

> 💡 Tip: You can use Heroku free tier PostgreSQL service.

You need to run the `dotnet restore` command in order to fetch all project dependencies. After that, you need to setup the database executing `dotnet ef database update`. This command will create the tables in the database.

> ⚠️ Please take care that you have installed and using DotNet 2.1 at least. Also, you need PostgreSQL 8.x to 9.x. PostgreSQL's 10.x versions probably works without inconvenients, but I didn't test it.

To run the project, just execute `dotnet run`.

### UI

You need to compile the Typescript source code to ES5 code. To do this, just need to install the `@angular/cli` tool (version 6.x or highter). Once installed, just execute `ng serve` to run the server or `ng build` to generate a single bundle file.

> ⚠️ Take care you're using node 8.x or higher to work without problems.
