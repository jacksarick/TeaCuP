- [x] GET: get a variable value
- [x] SET: set a variable value
- [x] See if we can secure the connection
- [ ] Add command line interaction [POSTPONED]
- [ ] Save to file

Huge issue. Once the file is read in, it is read in across ALL sockets. This is good because it means it is persistant, but also bad because once loaded, it is loaded for everyone.

My solution: every time the user writes to the table, a secondary table is made of the changes. Every time the user reads from a table, the secondary table is checked to make sure nothing has changed. A "SAVE" instruction will commit the secondary table to the master.