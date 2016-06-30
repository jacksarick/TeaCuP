#TeaCuP

A quick, little, standalone, data-storage engine running on TCP.

##Use

Sample use with netcat with intstance running on `localhost:3333` that shows all available commands.
```bash
$ nc localhost 3333
=> {'status':'connected'}
<= {"user":"jack","pass":"password"}
=> {"status":"success","tables":["things","stuff"]}
<= {"req":"get", "table":"things"}
=> {"status":"success","data":{"names":{"john":20,"stacy":34,"joe":16,"carol":21},"numbers":[78,179,132,182,12,9],"default":true}}
<= {"req":"checkout", "table":"things", "token":"pass1234"}
=> {"status":"sucess"}
<= {"req":"put", "token":"password", "table":"things", "query":["names","john"], "val":40}
=> {"status":"sucess"}
<= {"req":"get", "table":"things"}
=> {"status":"success","data":{"names":{"john":40,"stacy":34,"joe":16,"carol":21},"numbers":[78,179,132,182,12,9],"default":true}}
<= {"req":"checkin", "table":"things", "token":"pass1234"}
=> {"status":"sucess"}
<= ^C
$ 
```

To see an example happen lighting fast, open up a verbatim and run `test.tcl`. Why are my tests written in a unsexy language like TCL you may ask? It's adorable, super small to write for stuff like this, and it just works.
