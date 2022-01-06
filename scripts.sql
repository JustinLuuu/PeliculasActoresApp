create database PeliculasActoresApp
go
use PeliculasActoresApp
go
create table Actor
(
	Id int primary key identity(1,1),
	Nombre_completo nvarchar(200) not null, 
	Fecha_nacimiento date not null, 
	Sexo char(1) not null,
	Foto_url text null
)

create table Pelicula 
(
	Id int primary key identity(1,1),
	Titulo nvarchar(300) unique not null,  
	Genero nvarchar(200) not null,
	Fecha_estreno date not null, 
	Foto_url text null
)

create table Reparto 
(
	Id int primary key identity(1,1), 
	Actor_id int foreign key references Actor(Id) ON DELETE CASCADE,
	Pelicula_id int foreign key references Pelicula(Id) ON DELETE CASCADE,
)
