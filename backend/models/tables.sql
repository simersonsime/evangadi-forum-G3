--  1. Create Database
CREATE DATABASE IF NOT EXISTS evangadi_forum;
USE evangadi_forum;

-- 2. Users Table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--  3. Questions Table
CREATE TABLE questions (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_question_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

-- 4. Answers Table
CREATE TABLE answers (
    answer_id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,
    user_id INT NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_answer_question
        FOREIGN KEY (question_id)
        REFERENCES questions(question_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_answer_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

-- 5. (Optional but Recommended) Indexes
CREATE INDEX idx_questions_created_at ON questions(created_at);
CREATE INDEX idx_answers_question_id ON answers(question_id);
CREATE INDEX idx_answers_user_id ON answers(user_id);

-- 6. Comments Table (Optional)
CREATE TABLE comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    answer_id INT NOT NULL,
    user_id INT NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comment_answer
        FOREIGN KEY (answer_id)
        REFERENCES answers(answer_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_comment_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);  

-- 7. Index for Comments
CREATE INDEX idx_comments_answer_id ON comments(answer_id); 
CREATE INDEX idx_comments_user_id ON comments(user_id);

-- 8. Likes Table (Optional)
CREATE TABLE likes (
    like_id INT AUTO_INCREMENT PRIMARY KEY,
    target_id INT NOT NULL,
    target_type ENUM('question','answer') NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_like (target_id, user_id, target_type),
    CONSTRAINT fk_like_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Indexes for faster queries
CREATE INDEX idx_likes_target ON likes(target_id);
CREATE INDEX idx_likes_user ON likes(user_id);

-- 10. Verification Table Creation
SHOW TABLES;
-- Usage Instructions:
-- 1. Open MySQL Command Line or any MySQL Client:  
-- 2. Log in to MySQL:
-- mysql -u your_username -p
-- 3. Create and Use Database:
-- CREATE DATABASE evangadi_forum;  
-- USE evangadi_forum;
-- 4. Execute the SQL Script:
-- SOURCE path/to/this/tables.sql;
-- 5. Check Creation:
DESCRIBE users;
DESCRIBE questions;     
DESCRIBE answers;
-- 6. (Optional) Check Comments and Likes Tables:
DESCRIBE comments;
DESCRIBE likes;

-- 7. Exit MySQL:
Exit MySQL:
