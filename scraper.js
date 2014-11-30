#!/usr/bin/env node

var program = require('commander'),
    url, userId;

program
  .version('0.3.0')
  .option('-u, --url [url]', 'URL to crawl and scrape')
  .option('-i, --id [id]', 'Job ID')
  .option('-r, --requester [requester]','User ID')
  .parse(process.argv);

if (!program.url || !program.id || !program.requester) {
  return console.log('Error: missing argument(s)');
}