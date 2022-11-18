INSERT INTO users (username, first_name, last_name, summary, linkedIn_link, github_link, profile_image) 
VALUES

('test.guy@gmail.com', 'Test', 'Guy', 'junior software engineer with experience with JavaScript, HTML, CSS, React.js, postgreSQL', 'https://www.google.com/', 'https://www.google.com/', ''),

('joseph.t.low@gmail.com', 'Joe', 'Low', 'junior software engineer with experience with JavaScript, HTML, CSS, React.js, postgreSQL', 'www.linkedin.com/in/joe-low', 'https://github.com/Lowjoejoe', './profile-images/Joe_low.jpg'),
('noahgragg@gmail.com', 'Noah', 'Gragg', 'junior software engineer with experience with JavaScript, HTML, CSS, React.js, postgreSQL. code focused on World of Warcraft', 'https://www.linkedin.com/in/noahgragg/', 'https://github.com/noahgragg', 'No Image'),
('JpKelley6@gmail.com', 'Jeff', 'Kelley', 'junior software engineer 2nd of his name, 1st of the dependants with experience with JavaScript, HTML, CSS, React.js, postgreSQL. code focused on World of Warcraft', 'https://www.linkedin.com/in/jeffreypkelley/', 'https://github.com/Jpkelley6', 'No Image');

INSERT INTO projects (project_name, project_link, project_desc, user_id)
VALUES 
('Online Project', 'https://www.google.com/','it takes you to google home page.', 1),

('React-MVP-Circuit-Workouts', 'https://github.com/Lowjoejoe/React-MVP-Circuit-Workouts','allows users to build custom circuit workouts', 1),
('mvp-fullstack', 'https://github.com/noahgragg/mvp-fullstack', 'displays loot and bosses from Ice Crown Citadel.', 2),
('React-MVP', 'https://github.com/Jpkelley6/React-MVP','Diablo II builds finder', 3);