var cassandra = require('cassandra-driver');

/* Connect to the cluster */
var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'componentexecutionlogs'});
//var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'company'});

client.connect(function(err, result){
	console.log('Cassandra database connected');
});

module.exports = client;
