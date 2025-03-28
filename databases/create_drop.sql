-- This code configures or resets the database. Use with caution!

-- Drop.
DROP TABLE IF EXISTS DynamicPage;

-- Create.
CREATE TABLE DynamicPage (
    code VARCHAR(99) PRIMARY KEY,
    title VARCHAR(99) UNIQUE,
    markdown VARCHAR(99999)
);