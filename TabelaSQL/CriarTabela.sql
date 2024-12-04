create database ApiUsers
go
use ApiUsers

create table users (
	id int primary key identity(1,1),
	name varchar(127) not null,
	email varchar(127) not null,
	password varchar(127) not null,
	created_at datetime DEFAULT getdate() not null,
	update_at datetime DEFAULT getdate() not null
	)
	go

	select * from users

