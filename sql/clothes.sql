CREATE TABLE Clothes (
    id INT PRIMARY KEY, 
    name VARCHAR(255), 
    foodId INT REFERENCES Food(id),
);