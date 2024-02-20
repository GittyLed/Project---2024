CREATE TABLE Fields (
    FieldID int IDENTITY(1,1) PRIMARY KEY,
    FieldName varchar(50)
);

CREATE TABLE Courses (
    CourseID int IDENTITY(1,1) PRIMARY KEY,
    CourseName varchar(50) not null,
    NumOfMeetings int not null,
    Price int not null,
    FieldID int not null,
    CONSTRAINT FK_CoursesField FOREIGN KEY(FieldID) REFERENCES Fields(FieldID)
);


CREATE TABLE Teachers (
    ID int IDENTITY(1,1) PRIMARY KEY,
    [Name] varchar(50) not null,
    Email varchar(50) not null,
    PhoneNumber varchar(10)not null,
    CourseID int not null,
    CONSTRAINT FK_TeacherCourse FOREIGN KEY(CourseID) REFERENCES Courses(CourseID)
);


CREATE TABLE Users (
    ID int IDENTITY(1,1) PRIMARY KEY,
    [Name] varchar(50) not null,
    Email varchar(50) not null,
    [Password] varchar(20)not null
);