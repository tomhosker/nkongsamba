-- This code configures or resets the database. Use with caution!

-- Drop.
DROP TABLE IF EXISTS DynamicPage;

-- Create.
CREATE TABLE DynamicPage (
    code TEXT PRIMARY KEY,
    title TEXT UNIQUE,
    markdown TEXT
);