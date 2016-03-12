process.stdin.setEncoding('utf-8');
process.stdout.write("please write your name:");
process.stdin.on('data',function(txt){
  console.log(txt.toString());
  process.exit();
});
