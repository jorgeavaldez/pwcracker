# pwcracker
This repository serves as my submission program for CSE 3339 InfoSec Lab 4 on
Cryptography.

## Quickstart
```
git clone https://github.com/jorgeavaldez/pwcracker.git
cd pwcracker
yarn
yarn start -h
```

## Requirements
- [Node.js v8.0+](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/docs/install)
    - You may also use npm, which comes with your Node.js installation

### Corpus
You will need to provide a corpus of common passwords to construct the
rainbow table. I used the files provided [here](https://github.com/danielmiessler/SecLists/tree/master/Passwords).

By default, the program looks for a corpus at the directory `./corpus`

To specify your corpus directory you can pass it in with the flag `--corpus`.

## Running
After providing your text [corpus](###Corpus), just clone this repository and run 
```yarn``` (or ```npm install```) to install the dependencies.

Then you can run ```yarn start -h``` for instructions.

### Examples
Then you can run the program using the default settings:
```yarn start```

Or you can specify the settings:
```yarn start hashes.txt passwords.txt -c ./corpus```