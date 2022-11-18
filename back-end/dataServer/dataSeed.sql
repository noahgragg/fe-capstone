INSERT INTO users (username, first_name, last_name, summary, linkedIn_link, github_link, profile_image) 
VALUES

('joseph.t.low@gmail.com', 'Joe', 'Low', 'junior software engineer with experience with JavaScript, HTML, CSS, React.js, postgreSQL', 'No resume uploaded', 'https://github.com/Lowjoejoe', './profile-images/Joe_low.jpg'),
('noahgragg@gmail.com', 'Noah', 'Gragg', 'junior software engineer with experience with JavaScript, HTML, CSS, React.js, postgreSQL. code focused on World of Warcraft', 'No resume uploaded', 'https://github.com/noahgragg', 'No Image'),
('JpKelley6@gmail.com', 'Jeff', 'Kelley', 'junior software engineer 2nd of his name, 1st of the dependants with experience with JavaScript, HTML, CSS, React.js, postgreSQL. code focused on World of Warcraft', 'No resume uploaded', 'https://github.com/Jpkelley6', 'No Image');

INSERT INTO projects (project_name, project_link, project_desc, user_id)
VALUES 

('React-MVP-Circuit-Workouts', 'https://github.com/Lowjoejoe/React-MVP-Circuit-Workouts','allows users to build custom circuit workouts', 1),
('mvp-fullstack', 'https://github.com/noahgragg/mvp-fullstack', 'displays loot and bosses from Ice Crown Citadel.', 2),
('React-MVP', 'https://github.com/Jpkelley6/React-MVP','Diablo II builds finder', 3);