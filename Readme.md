1.
http://localhost:3000/user/signup 
POST METHOD
name,email,password,phone,channelName,logo=files
response is 
{
    "newUser": {
        "channelName": "RajanTube",
        "email": "rajanprajapati7403@gmail.com",
        "password": "$2b$10$0h1szGTNu/YvKXz3WksvX.77yWPw0lb2EfsrmoMpvKG1.98ucIwEm",
        "logoUrl": "https://res.cloudinary.com/ds8ttmj8w/image/upload/v1731489165/b4hotph7pywf64tid4us.jpg",
        "logoId": "b4hotph7pywf64tid4us",
        "subcribers": 0,
        "subcribedChannels": [],
        "_id": "67346d8efe449d97af73f55f",
        "createdAt": "2024-11-13T09:12:46.107Z",
        "updatedAt": "2024-11-13T09:12:46.107Z",
        "__v": 0
    }
}

2.
http://localhost:3000/user/login
POST METHOD

email,password
RESPONSE is
{
    "message": "Login successful",
    "user": {
        "id": "67346d8efe449d97af73f55f",
        "email": "rajanprajapati7403@gmail.com",
        "channelName": "RajanTube",
        "logoUrl": "https://res.cloudinary.com/ds8ttmj8w/image/upload/v1731489165/b4hotph7pywf64tid4us.jpg"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzQ2ZDhlZmU0NDlkOTdhZjczZjU1ZiIsImVtYWlsIjoicmFqYW5wcmFqYXBhdGk3NDAzQGdtYWlsLmNvbSIsImNoYW5uZWxOYW1lIjoiUmFqYW5UdWJlIiwiaWF0IjoxNzMxNDkwODE0LCJleHAiOjE3MzE0OTQ0MTR9.VnTFTFKFgikU9x51dFAR7GjNzbaUHlIFYYp2Lv-ZYi4"
}
