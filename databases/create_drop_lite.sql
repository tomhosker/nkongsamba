-- This code configures or resets the database. Use with caution!

-- Drop.
DROP TABLE IF EXISTS UserGeneratedPage;
DROP TABLE IF EXISTS UserLoginDetails;

-- Create.
CREATE TABLE UserLoginDetails (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE,
    hashed_password TEXT NOT NULL
);

CREATE TABLE UserGeneratedPage (
    code TEXT PRIMARY KEY,
    title TEXT UNIQUE,
    markdown TEXT
);

-- Insert dummy data.
INSERT INTO UserLoginDetails (id, username, hashed_password)
VALUES (
    1,
    'admin',
    '84983c60f7daadc1cb8698621f802c0d9f9a3c3c295c810748fb048115c186ec' -- guest
);

INSERT INTO UserGeneratedPage (code, title, markdown)
VALUES (
    'test',
    'Test',
    'This is a test page. If you''re reading it, the test has probably passed!'
);