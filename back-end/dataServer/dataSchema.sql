DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    user_id serial,
    username varchar (40),
    first_name varchar (40),
    last_name varchar (40),
    summary varchar(500),
    resume_link varchar(100),
    github_link varchar (100)
);

CREATE TABLE projects