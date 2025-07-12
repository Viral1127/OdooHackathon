create database ReWear

CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY,
    FullName NVARCHAR(100),
    Email NVARCHAR(100) UNIQUE,
    PasswordHash NVARCHAR(255),
    Points INT DEFAULT 0,
    ProfileImage NVARCHAR(255),
    Role NVARCHAR(50) DEFAULT 'User', -- 'User' or 'Admin'
    CreatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE Items (
    ItemID INT PRIMARY KEY IDENTITY,
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    Title NVARCHAR(100),
    Description NVARCHAR(MAX),
    Category NVARCHAR(50),
    Type NVARCHAR(50), -- e.g., "T-shirt", "Jeans"
    Size NVARCHAR(20),
    Condition NVARCHAR(50), -- e.g., "New", "Gently Used"
    Tags NVARCHAR(255),
    IsAvailable BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE()
);

ALTER TABLE Items ADD PointCost INT DEFAULT 50;

select * from Items


CREATE TABLE ItemImages (
    ImageID INT PRIMARY KEY IDENTITY,
    ItemID INT FOREIGN KEY REFERENCES Items(ItemID),
    ImagePath NVARCHAR(255)
);

CREATE TABLE Swaps (
    SwapID INT PRIMARY KEY IDENTITY,
    RequesterID INT FOREIGN KEY REFERENCES Users(UserID),
    RequestedItemID INT FOREIGN KEY REFERENCES Items(ItemID),
    OfferedItemID INT FOREIGN KEY REFERENCES Items(ItemID),
    Status NVARCHAR(50), -- e.g., 'Pending', 'Accepted', 'Rejected', 'Completed'
    CreatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE Redemptions (
    RedemptionID INT PRIMARY KEY IDENTITY,
    RedeemerID INT FOREIGN KEY REFERENCES Users(UserID),
    ItemID INT FOREIGN KEY REFERENCES Items(ItemID),
    PointsUsed INT,
    Status NVARCHAR(50), -- e.g., 'Pending', 'Completed'
    CreatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE AdminActions (
    ActionID INT PRIMARY KEY IDENTITY,
    AdminID INT FOREIGN KEY REFERENCES Users(UserID),
    ItemID INT FOREIGN KEY REFERENCES Items(ItemID),
    ActionType NVARCHAR(50), -- 'Approved', 'Rejected', 'Deleted'
    Notes NVARCHAR(MAX),
    ActionDate DATETIME DEFAULT GETDATE()
);

CREATE TABLE Testimonials (
    TestimonialID INT PRIMARY KEY IDENTITY,
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    Message NVARCHAR(MAX),
    Rating INT, -- Optional: 1-5
    CreatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE Categories (
    CategoryID INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(50)
);





select * from [Users]
select * from Items
select * from Swaps
select * from ItemImages
delete from Users
where UserID = 1
select * from Redemptions