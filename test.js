import fs from 'fs';
import test from 'ava';
import m from './';
import g from 'grouped';

test('Test length param', t => {
	const usernames = m(8);
	t.true(usernames().length === 8);
	t.true(usernames().length === 8);
	t.true(usernames().length === 8);
});

test('Test seprator param', t => {
	const usernames = m('-');
	t.true(usernames().indexOf('-') > -1);
	t.true(usernames().indexOf('-') > -1);
	t.true(usernames().indexOf('-') > -1);
});

test('Test patterns param', t => {
	const nouns = fs.readFileSync(g.nouns, 'utf8').split('\n');
	const verbs = fs.readFileSync(g.verbs, 'utf8').split('\n');
	const usernames = m({patterns: [['verbs', 'nouns']], separator: ' '});

	const [generatedVerbs, generatedNouns] = [
		usernames(), usernames(), usernames()
	].reduce((result, username) => {
		result[0].push(username.split(' ').shift());
		result[1].push(username.split(' ').pop());
		return result;
	}, [[], []]);

	t.true(verbs.includes(generatedVerbs[0]));
	t.true(verbs.includes(generatedVerbs[1]));
	t.true(verbs.includes(generatedVerbs[2]));
	t.true(nouns.includes(generatedNouns[0]));
	t.true(nouns.includes(generatedNouns[1]));
	t.true(nouns.includes(generatedNouns[2]));
});

test(t => {
	const usernames = m();
	t.true(usernames() !== usernames());
	t.true(usernames() !== usernames());
	t.true(usernames() !== usernames());
});
