use QuanLyTrungTam;
--create table Student (
--	id int not null identity(1,1),
--	work_place varchar(50),
--	address varchar(50),
--	name varchar(50),
--	phone_1 varchar(50),
--	phone_2 varchar(50),
--	primary key(id),
	

--)
--create table Teacher(
--	id int not null identity(1,1),
--	name varchar(50) not null,
--	primary key(id)
--)
--create table Class(
--	id int not null identity(1,1),
--	name varchar(50) not null,
--	price int not null,
--	teacher_id int not null,
--	primary key(id),
--	foreign key(teacher_id) references Teacher(id),
	
--)
create table student_class (
	student_id int not null ,
	class_id int not null,
	primary key (student_id, class_id),
	foreign key(student_id) references Student(id),
	foreign key(class_id) references Class(id),
	
)
create table Weekday(
	id int not null ,
	name varchar(50) not null,
	primary key(id),

)
create table Schedule(
	class_id int not null,
	weekday_id int not null,
	primary key(class_id, weekday_id),
	foreign key(class_id) references Class(id),
	foreign key(weekday_id) references Weekday(id),
)
create table Payment(
	class_id int not null,
	student_id int not null,
	amount int not null,
	status int not null,
	month_ int not null,
	year_ int not null,
	primary key(class_id, student_id, month_, year_),
	foreign key(class_id) references Class(id),
	foreign key(student_id) references Student(id),
)