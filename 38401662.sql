drop table if exists master;
drop table if exists child;                                                                                                                
create table master(
	id integer not null primary key autoincrement, 
	name text not null);
create table child(
	id integer not null primary key autoincrement, 
	id_master integer not null, 
	name text not null, 
	foreign key(id_master) references master(id));
insert into master(name) values ('master 1');
insert into child(id_master, name) values (1, 'child 1-1');
insert into child(id_master, name) values (1, 'child 1-2');
insert into child(id_master, name) values (1, 'child 1-3');
insert into child(id_master, name) values (1, 'child 1-4');
insert into child(id_master, name) values (1, 'child 1-5');
insert into master(name) values ('master 2');
insert into child(id_master, name) values (2, 'child 2-1');
insert into child(id_master, name) values (2, 'child 2-2');
insert into child(id_master, name) values (2, 'child 2-3');
insert into master(name) values ('master 3');
insert into child(id_master, name) values (3, 'child 3-1');
insert into child(id_master, name) values (3, 'child 3-2');
insert into child(id_master, name) values (3, 'child 3-3');
insert into child(id_master, name) values (3, 'child 3-4');
insert into child(id_master, name) values (3, 'child 3-5');
insert into child(id_master, name) values (3, 'child 3-6');
insert into child(id_master, name) values (3, 'child 3-7');
insert into child(id_master, name) values (3, 'child 3-8');
insert into child(id_master, name) values (3, 'child 3-9');
insert into child(id_master, name) values (3, 'child 3-10');
insert into child(id_master, name) values (3, 'child 3-11');
insert into child(id_master, name) values (3, 'child 3-12');
