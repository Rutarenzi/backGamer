## Table of contents

- [Badges ](#badges)
- [General info ](#general-info)
- [Setup](#setup)

## General info

This Backend boilerplate for any express project

## Setup 

To run this boilerplate, install it locally with npm:

```
$ git clone 
$ npm install
$ npm start

```

### To run migration:

```
$ npm run migrate
$ npm run down (for undo migration)

```

### To run seed for dump data

```
$ npm run seed
$ npm run undo-seed 

```

## create .env file and use environment variable in .env.example

### ESlint 

The Eslint is configured with prettier to format code and to enforce coding style and quality rules. To get Eslint
support in the editor, you have to install it's extesion.

To lint through the project you can run the command

```
$ npm run lint

```

if you need to lint a specific file or directory, you can archieve that by running this command

```
$ npx eslint <file_name>
$ npx eslint <directory_name>

```

ESlint can automatically fix some common erroes in a file,
to do so you will run this command

```
$ npx eslint --fix <file_name>




