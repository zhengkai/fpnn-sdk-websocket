'use strict'

let client = new fpnn.FPClient({
    endpoint: 'ws://52.83.245.22:13013/service/test',
    autoReconnect: true,
    connectionTimeout: 10 * 1000
});

client.connect();
client.on('connect', function() {

    console.log('connect!');

    let options = {
        flag: 1,
        method: 'duplex demo',
        payload: msgpack.encode({}),
    };

    client.sendQuest(options, function(data) {

        if (data) {

            console.log('duplex demo:\n', data);
        }
    }, 10 * 1000);
});

client.on('error', function(err) {

    console.error(err);
});

client.processor.on('duplex quest', function(payload, cb) {

    console.log('push demo:', payload);
    // cb && cb(msgpack.encode({test: 'test push'}), false);
});