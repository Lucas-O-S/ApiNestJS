create database ApiUsers
go
use ApiUsers

create table users (
	id int primary key,
	nome varchar(127) not null,
	email varchar(127) not null,
	password varchar(127) not null,
	created_at datetime DEFAULT getdate() not null,
	update_at datetime DEFAULT getdate() not null
	)
	go


