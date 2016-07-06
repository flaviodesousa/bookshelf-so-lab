drop table users;
create table users("id" integer not null primary key autoincrement, "name" varchar(255), "email" varchar(255) unique);
insert into users(name, email) values ('amy', 'amy@example.com');
insert into users(name, email) values ('anne', 'anne@example.com');
select * from users;
