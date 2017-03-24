install:
		npm install

start:
		npm run babel-node -- "src/bin/gendiff.js"

publish:
		npm publish

lint:
		npm run eslint -- src test

test:
		npm test
