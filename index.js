const lists     = require('grouped');
const arget     = require('arget');
const fs        = require('fs');
const randArray = require('unique-random-array');
const randInt   = require('random-int');

const groupByLength = (words) => {
    const result = words.reduce((result, word) => {
        if(result[word.length]) {
            result[word.length].push(word);
        } else {
            result[word.length] = [word];
        }

        return result;
    }, {});

    Object.keys(result).forEach(len => result[len] = randArray(result[len]));

    return result;
};

const words = {
    nouns       : groupByLength(fs.readFileSync(lists.nouns, 'utf8').split('\n')),
    verbs       : groupByLength(fs.readFileSync(lists.verbs, 'utf8').split('\n')),
    adverbs     : groupByLength(fs.readFileSync(lists.adverbs, 'utf8').split('\n')),
    adjectives  : groupByLength(fs.readFileSync(lists.adjectives, 'utf8').split('\n'))
};

module.exports = function (options) {
    let [_length, _separator, _patterns, _options] = arget(arguments).match(Number, String, Array, Object);

    _options = {
        length      : _length || _options && _options.length || 0,
        separator   : _separator || _options && _options.separator || '',
        pattern     : _patterns || _options && _options.patterns || [['adjectives', 'nouns'], ['verbs', 'adverbs'], ['nouns', 'nouns'], ['verbs', 'nouns']]
    };

    const getWordPattern    = randArray(_options.pattern);
    const getLenfthPattern  = () => {
        let first, second;
        if(_options.length < 6) {
            first  = randInt(3, 13);
            second = randInt(3, 13);
        } else {
            first  = randInt(3, _options.length - 3);
            second = _options.length - first;
        }
        return [first, second];
    }

    return () => {
        const wordPattern   = getWordPattern();
        const lengthPattern = getLenfthPattern();
        return [words[wordPattern[0]][lengthPattern[0]](), words[wordPattern[1]][lengthPattern[1]]()].join(_options.separator);
    }
}