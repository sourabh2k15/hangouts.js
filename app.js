var Client = require('hangupsjs');
var Q = require('q');

var client = new Client();
client.loglevel('debug');

client.on('chat_message',function(ev){
  console.log(ev);
});

client.connect(function(){
   return { auth: Client.authStdin };
}).then(function(){
   return client.sendchatmessage('UgzJilj2Tg_oqkAaABAQ',[[0,' Hello World']]);
}).done();
