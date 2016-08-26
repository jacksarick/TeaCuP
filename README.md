#TeaCuP

**I recently rewrote this whole thing, and am working to get back to the point I was at.**

A quick, little, standalone, data-storage engine running on TCP.

##Use

Queries are just sentences. The first word of the line is the command. Current commands are ECHO, GET, SET, and BYE.

Sample interaction, as seen from server log.

```
2k5f27rnr1nm logged in
2k5f27rnr1nm <= echo this is TeaCup
2k5f27rnr1nm => this is TeaCup
2k5f27rnr1nm <= get names
2k5f27rnr1nm => {"john":30,"stacy":34,"joe":16,"carol":21}
2k5f27rnr1nm <= get names.john
2k5f27rnr1nm => 30
2k5f27rnr1nm <= set names.john 12
2k5f27rnr1nm => john updated
qfrdvpxh94a7 logged in
qfrdvpxh94a7 <= get names.john
qfrdvpxh94a7 => 12
2k5f27rnr1nm <= bye
qfrdvpxh94a7 logged out
2k5f27rnr1nm logged out
```

To interact with the server on the command line, I suggest using `netcat`.