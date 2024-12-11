create database ApiUsers
go
use ApiUsers

create table users (
	id int primary key identity(1,1),
	name varchar(127) not null,
	email varchar(127) not null unique,
	password varchar(127) not null,
	role int default(1),
	created_at datetime DEFAULT getdate() not null,
	update_at datetime DEFAULT getdate() not null
	)
	go


