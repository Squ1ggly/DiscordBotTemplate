# Description
Hi,
This is just my opinionated discord bot template.
there is no need to change index.ts or either of the help.ts files, they will maintain themselves.

## Help
To add commands you can just create a new file in either the prefix or slash command folder.
For example you can create randomQuote.ts as a file. It will be added to the help command automatically.

### How to run 
type **yarn start** in the terminal

## Extra Info
1. The Prefix commands are basically just messages sent into a channel where a user prefixes the command with prefix e.g. "!ping" and have no special discord integrations.
2. The Slash commands have a special integration with discord and will prompt the user what they can do when they type "/". They can also take special arguments. hence the createSlashCmd function.

## Stuff not finished;
TypeScript Typing



Don't worry about the credentials in there, they are from a deleted app :)
