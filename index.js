var request = require('request');
var fs = require('fs');

var OAUTH2_CLIENT_ID = '936475272427.apps.googleusercontent.com';
var OAUTH2_CLIENT_SECRET = 'KWsJlkaMn1jGLxQpWxMnOox-';
var OAUTH2_SCOPE = 'https://www.google.com/accounts/OAuthLogin';

var OAUTH2_LOGIN_END = 'https://accounts.google.com/o/oauth2/auth';
var OAUTH2_TOKEN_REQUEST_END = 'https://accounts.google.com/o/oauth2/token';

var OAUTH2_LOGIN_URL = OAUTH2_LOGIN_END+"?client_id="+_(OAUTH2_CLIENT_ID)+"&scope="+_(OAUTH2_SCOPE)+"&redirect_uri="+_('urn:ietf:wg:oauth:2.0:oob')+"&response_type=code";

var OAUTH2_AUTHORIZATION_CODE = "4/7aE-Bin3V0F1JiEDbv5djg9OT5QlrxUYSd7IB6AZPaM";
var access_token = null;
var refresh_token = null;

fs.readFile('refresh_token.txt',function(err,data){
  if(!err) {
     refresh_token = data.toString();
     if(refresh_token.length>0){
       console.log("found a previously acquired rtoken :)!");
       var payload = {
         client_id: OAUTH2_CLIENT_ID,
         client_secret: OAUTH2_CLIENT_SECRET,
         grant_type: 'refresh_token',
         refresh_token: refresh_token
       }
       var url = OAUTH2_TOKEN_REQUEST_END;
       request.post(url,{ form:payload },function(err,res,body){
           console.log(body);
       });
     }
     else getAuth();
  }else getAuth();
});

function getAuth(){
  console.log(OAUTH2_LOGIN_URL);

  console.log("Authorization code:");
  process.stdin.on('data',function(txt){
    var code = txt.toString();
    console.log(code);

    var payload = {
      grant_type:'authorization_code',
      code      : code,
      client_id : OAUTH2_CLIENT_ID,
      client_secret: OAUTH2_CLIENT_SECRET,
      redirect_uri : 'urn:ietf:wg:oauth:2.0:oob'
    };
    var uri = OAUTH2_TOKEN_REQUEST_END;
    request.post(uri,{ form:payload },function(err,res,body){ saveRefreshToken(JSON.parse(body)); });

  });
}

function saveRefreshToken(obj){
  console.log(obj.refresh_token);
  fs.writeFile('refresh_token.txt',obj.refresh_token,function(suc,err){
    if(!err) console.log("successfull stored refresh_token");
  });
  access_token = obj.access_token;
}

function _(a){
 return encodeURIComponent(a);
}
