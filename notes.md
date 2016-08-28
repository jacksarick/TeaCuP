- [x] GET: get a variable value
- [x] SET: set a variable value
- [x] See if we can secure the connection
- [ ] Add command line interaction [POSTPONED]
- [ ] Save to file

Huge issue. Once the file is read in, it is read in across ALL sockets. This is good because it means it is persistent, but also bad because once loaded, it is loaded for everyone.

My solution: ~~every time the user writes to the table, a secondary table is made of the changes. Every time the user reads from a table, the secondary table is checked to make sure nothing has changed. A "SAVE" instruction will commit the secondary table to the master.~~ Scratch that. I took a long walk and realized it was a bad plan. Two main functions here, LOAD and SAVE, and also BYE. 

When the user calls LOAD, two things happen The server loads the table to a database kept in memory, and adds the table to a list of table the user can access. If the table is already loaded, the server just tests the users password to make sure it's valid.

When a user calls SAVE to a table, the server writes the table in memory to a file. This function is pretty much useless, and you'll see why in a second.

When a user issues BYE, we SAVE all tables the user had called LOAD on. We then check all those tables, and see if anyone else is using them. If no one is using them, we pop them out of memory to free up space.

This model has a few advantages:
- Lighting fast. One person accessing the table or 100, all the same amount of memory.
- Multiple users. My last version sucked because two people couldn't use the same table at the same time.
- Very little redundancy. If 20 people all query the same table, it only gets opened once. 

A few disadvantages:
- I have no idea if this will be secure
- I have no idea if it will actually be faster
- I have no idea if it will actually work