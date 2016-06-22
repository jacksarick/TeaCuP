#TeaCuP

A quick little data-storage engine running on TCP.

##Use

Sample use with netcat with intstance running on `localhost:3333`
```bash
$ nc localhost 3333
=> {'status':'connected'}
<= {"user":"jack","pass":"password"}
=> {"status":"success","tables":["things","stuff"]}
<= {"req":"get", "table":"things"}
=> {"status":"success","data":{"names":{"john":5,"stacy":34,"joe":16,"carol":21},"size":[78,179,132,182],"default":true}}
<= {"req":"get", "table":"things", "query":["names","john"]}
=> {"status":"success","data":5}
<= ^C
$ 
```

To see an example happen lighting fast, open up a verbatim and run `test.tcl`. Why are my tests written in a unsexy language like TCL you may ask? It's adorable, super small to write for stuff like this, and it just works.
