-- This code configures or resets the database. Use with caution!

-- Drop.
DROP TABLE IF EXISTS UserGeneratedPage;
DROP TABLE IF EXISTS UserGeneratedSection;
DROP TABLE IF EXISTS UserLoginDetails;

-- Create.
CREATE TABLE UserLoginDetails (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE,
    hashed_password TEXT NOT NULL
);

CREATE TABLE UserGeneratedSection (
    code TEXT PRIMARY KEY,
    title TEXT UNIQUE
);

CREATE TABLE UserGeneratedPage (
    code TEXT PRIMARY KEY,
    section TEXT NOT NULL DEFAULT 'internal-use-only' REFERENCES UserGeneratedSection (code),
    title TEXT UNIQUE,
    html TEXT
);

-- Insert dummy data.
INSERT INTO UserLoginDetails (id, username, hashed_password)
VALUES (
    1,
    'admin',
    '84983c60f7daadc1cb8698621f802c0d9f9a3c3c295c810748fb048115c186ec' -- i.e. 'guest'.
);

INSERT INTO UserGeneratedSection (code, title)
VALUES ('internal-use-only', 'Internal Use Only');