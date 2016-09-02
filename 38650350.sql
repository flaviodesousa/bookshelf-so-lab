drop table if exists users;
CREATE TABLE users(
	id integer primary key autoincrement, 
	absent integer);
drop table if exists signed_in;
CREATE TABLE signed_in(
	id integer primary key autoincrement,
	studentId integer references users(id), 
	signedIn boolean);

insert into users(id,absent) values (1,0);
insert into users(id,absent) values (2,0);
insert into users(id,absent) values (3,0);
insert into users(id,absent) values (4,0);

insert into signed_in(id, studentId, signedIn) values (1, 2, 1);
insert into signed_in(id, studentId, signedIn) values (2, 3, 0);
insert into signed_in(id, studentId, signedIn) values (3, 4, 1);
