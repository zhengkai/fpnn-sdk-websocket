'use strict'

let client = new FPClient({
    endpoint: 'ws://35.167.185.139:13013/service/test',
    autoReconnect: true,
    connectionTimeout: 10 * 1000
});

client.connect();
client.on('connect', () => {
    console.log('connect!');

    let options = {
        flag: 1,
        method: 'duplex demo',
        payload: msgpack.encode({}),
    };

    client.sendQuest(options, (data) => {
        if (data){
            console.log('\n[DATA] sendFile:\n', data);
        }
    }, 10 * 1000);
});

client.on('error', (err) => {
    console.error(err);
});

client.processor.on('duplex quest', (payload, cb) => {
    console.log(payload);
    // cb && cb(msgpack.encode({test: 'test push'}), false);
});