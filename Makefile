install:
		npm install

start:
		npm run babel-node -- 'src/bin/gendiff.js' ./__tests__/__fixtures__/_before.yml ./__tests__/__fixtures__/_after.yml

publish:
		npm publish

lint:
		npm run eslint -- src __tests__

test:
		npm test
