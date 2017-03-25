install:
		npm install

start:
		npm run babel-node -- 'src/bin/gendiff.js' ./__tests__/__fixtures__/_before.ini ./__tests__/__fixtures__/_after.ini

publish:
		npm publish

lint:
		npm run eslint -- src __tests__

test:
		npm test
