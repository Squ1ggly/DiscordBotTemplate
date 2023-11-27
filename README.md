# Description

Hi,
This is just my VERY opinionated discord bot template. The intention of this template is to make setting up a new discord bot fast and easy, should work out of the box. If there are any issues you can create an issue on Github => [HERE](https://github.com/Squ1ggly/DiscordBotTemplate/issues)

## Main Features

Automatic help message generation, derived from command files.
Plenty of helper functions to help speed things up.
Simple typing definitions that can be expanded easily.

## Help

To add commands you create a new file in either the prefix or slash command folder.

### How to run

PREREQUISITES
Nodejs 16 or later => Required
yarn ===============> Optional
If you are using yarn, please remove package-lock.json OR yarn.lock if you are using npm

1. **DO THIS FIRST** => **_npm genenv_** OR **_yarn genenv_** : This will generate the .env file required for the bot to run.
2. After run **npm start:npm** OR **yarn start:yarn** in the terminal to start.
