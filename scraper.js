#!/usr/bin/env node

var program = require('commander'),
    config  = require('./lib/configuration'),
    logger  = require('./lib/logger'),
    Scraper = require('./lib/scraper'),
    url, id, requester, scraper;

program
  .version('0.3.0')
  .option('-u, --url [string]', 'url to crawl and scrape')
  .option('-i, --id [int]', 'job id in queue')
  .option('-r, --requester [int]','user id')
  .parse(process.argv);

if (!program.url || !program.id || !program.requester) {
  return console.log('Error: missing argument(s)');
}

url = program.url;
id = program.id,
requester = program.requester;

scraper = new Scraper(url, id, requester);

console.log(program.url, program.id, program.requester)