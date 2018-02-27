# pwcracker
This repository serves as my submission program for CSE 3339 InfoSec Lab 4 on
Cryptography.

## Requirements
- [Node.js v8.0+](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/docs/install)
    - You may also use npm, which comes with your Node.js installation

### If Running on Windows
You will need to install the [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools)
for the library requirements to build correctly. 

Just run the following in a terminal:

```npm install --global --production windows-build-tools```

## Running
After providing your text [corpus](###Corpus), just clone this repository and run 
```yarn``` (or ```npm install```), then run it with ```yarn start```

### Corpus
You will need to provide a corpus of common passwords to construct the
rainbow table. I used the files provided [here](https://github.com/danielmiessler/SecLists/tree/master/Passwords).

Place the corpus files in the cloned project root directory in a folder called `corpus`.

