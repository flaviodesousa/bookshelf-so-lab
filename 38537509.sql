drop table if exists "Order";
drop table if exists "Item";
drop table if exists "OrderItem";
create table "Order"("id" integer increment primary key);
insert into "Order"("id") values (33);
insert into "Order"("id") values (33);
create table "Item"("id" integer increment primary key,name text);
insert into "Item"("id") values (1);
insert into "Item"("id") values (2);
insert into "Item"("id") values (3);
insert into "Item"("id") values (4);
CREATE TABLE "OrderItem"(id integer primary key, 
	"item_id" integer, "order_id" integer, 
	foreign key("item_id") references "Item"("id"),
	foreign key("order_id") references "Order"("id"));
insert into "OrderItem"(id,"item_id","order_id") values (1,1,33);
insert into "OrderItem"(id,"item_id","order_id") values (2,2,33);
insert into "OrderItem"(id,"item_id","order_id") values (3,3,33);
insert into "OrderItem"(id,"item_id","order_id") values (4,2,44);
