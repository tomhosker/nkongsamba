-- This code configures or resets the database. Use with caution!

-- Drop.
DROP TABLE IF EXISTS UserGeneratedPage;
DROP TABLE IF EXISTS UserLoginDetails;

-- Create.
CREATE TABLE UserLoginDetails (
    id SERIAL PRIMARY KEY,
    username VARCHAR(99) UNIQUE,
    hashed_password VARCHAR(99) NOT NULL
);

CREATE TABLE UserGeneratedPage (
    code VARCHAR(99) PRIMARY KEY,
    title VARCHAR(99) UNIQUE,
    markdown VARCHAR(99999)
);