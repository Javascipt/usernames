# Usernames [![Build Status](https://travis-ci.org/Javascipt/usernames.svg?branch=master)](https://travis-ci.org/Javascipt/usernames)

## Install

```
$ npm install --save usernames
```


## Usage

```js
const usernames = require('usernames');
const generate  = usernames({
    length      : 8, // only chars, separator not included
    separator   : '-',
    patterns    : [['adjectives', 'nouns'],['adverbs', 'verbs']]
});

generate() // 'elite-cup'
generate() // 'tiny-mark'
generate() // 'old-guide'
```


## License

MIT