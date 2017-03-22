#!/usr/bin/env node

import compareConfigFiles from '../';

export default () => {
  const result = compareConfigFiles();
  return result instanceof Object ? 0 : 1;
};
