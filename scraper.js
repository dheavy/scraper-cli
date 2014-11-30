#!/usr/bin/env node

var program = require('commander'),
    url, userId;

program
  .version('0.3.0')
  .option('-u, --url', 'URL to crawl and scrape')
  .option('-i, --userid', 'User ID')
  .parse(process.argv);

if (!program.url || !program.userid) {
  return console.log('Error: missing argument(s)');
} 
