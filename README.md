Use
---

Sample use with netcat with intstance running on localhost:3333
```
$ nc localhost 3333
=> {'status':'connected'}
<= {"user":"jack","pass":"password"}
=> {"status":"success","tables":["things","stuff"]}
<= {"type":"get", "table":"things"}
=> {...data...}
<= ^C
```