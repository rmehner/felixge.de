#!/usr/bin/env node
var env     = process.env;
var app     = require('./app');
var cluster = require('cluster');
var port    = parseInt(env.HTTP_PORT, 10) || 3000;
var root    = require('path').dirname(__dirname);

var server = cluster(app);
server
 .use(cluster.reload(root, {extensions: ['.js', '.less', '.ejs', '.mo']}))
 .listen(port)

if (env.PROCESS_USER) cluster.set('user', env.PROCESS_USER);
if (env.PROCESS_GROUP) cluster.set('user', env.PROCESS_GROUP);