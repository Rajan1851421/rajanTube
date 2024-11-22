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

3. 
http://localhost:3000/video/upload
POST METHOD
 title,discription,category,tags,video,thumbnailUrl and bearer Token 
RESPONSE
 {
    "newVideo": {
        "title": "MERN",
        "discription": "mern stack developer",
        "user_id": "673480abe611185ee2a995e8",
        "videoUrl": "https://res.cloudinary.com/ds8ttmj8w/video/upload/v1731558462/k9bl7nlzxstudz28ludn.mp4",
        "videoId": "k9bl7nlzxstudz28ludn",
        "thumbnailUrl": "https://res.cloudinary.com/ds8ttmj8w/image/upload/v1731558463/qjxjbzjjin4hc0w6anl6.png",
        "thumbnailId": "qjxjbzjjin4hc0w6anl6",
        "category": "web dev",
        "tags": [
            "mern",
            "fullstack"
        ],
        "likes": 0,
        "dislike": 0,
        "likedby": [],
        "dislikedby": [],
        "viewby": [],
        "views": 0,
        "_id": "67357c3fb179181dce0bea3c",
        "createdAt": "2024-11-14T04:27:43.900Z",
        "updatedAt": "2024-11-14T04:27:43.900Z",
        "__v": 0
    }
}

3.
 http://localhost:3000/video/id
 PUT METHOD

 title,discription,tags,thunailUrl,category

 response

 {
    "upadted_Video": {
        "_id": "67357c3fb179181dce0bea3c",
        "title": "MERN stack developer",
        "discription": "mern stack developer mast hai",
        "user_id": "673480abe611185ee2a995e8",
        "videoUrl": "https://res.cloudinary.com/ds8ttmj8w/video/upload/v1731558462/k9bl7nlzxstudz28ludn.mp4",
        "videoId": "k9bl7nlzxstudz28ludn",
        "thumbnailUrl": "https://res.cloudinary.com/ds8ttmj8w/image/upload/v1731558463/qjxjbzjjin4hc0w6anl6.png",
        "thumbnailId": "qjxjbzjjin4hc0w6anl6",
        "category": "web dev",
        "tags": [
            "mern",
            "fullstack",
            "coputer"
        ],
        "likes": 0,
        "dislike": 0,
        "likedby": [],
        "dislikedby": [],
        "viewby": [],
        "views": 0,
        "createdAt": "2024-11-14T04:27:43.900Z",
        "updatedAt": "2024-11-14T05:53:08.229Z",
        "__v": 0
    }
}

4. http://localhost:3000/video/id
DELETE METHOD

Send bearer token only

RESPONSE IS 
{
    "message": "Video deleted successfully",
    "data": {
        "_id": "6735974132ced16090f6e042",
        "title": "MCA",
        "discription": "mern stack developer mast hai",
        "user_id": "673480abe611185ee2a995e8",
        "videoUrl": "https://res.cloudinary.com/ds8ttmj8w/video/upload/v1731565376/cfaqaaupbhihyapow7xq.mp4",
        "videoId": "cfaqaaupbhihyapow7xq",
        "thumbnailUrl": "https://res.cloudinary.com/ds8ttmj8w/image/upload/v1731565377/qlw9k4xisask889jxusk.png",
        "thumbnailId": "qlw9k4xisask889jxusk",
        "category": "web dev mini",
        "tags": [
            "mern",
            "fullstack",
            "coputer"
        ],
        "likes": 0,
        "dislike": 0,
        "likedby": [],
        "dislikedby": [],
        "viewby": [],
        "views": 0,
        "createdAt": "2024-11-14T06:22:57.755Z",
        "updatedAt": "2024-11-14T06:22:57.755Z",
        "__v": 0
    }
}


5. Like route

http://localhost:3000/video/like/"6735d2a2b000e3a0763e41cd"(which are generate mongodb)
PUT METHOD
{"_id":{"$oid":"6735d2a2b000e3a0763e41cd"},"title":"MCA","discription":"mern stack developer mast hai","user_id":"673480abe611185ee2a995e8","videoUrl":"https://res.cloudinary.com/ds8ttmj8w/video/upload/v1731580576/xz9gt5jgfuugnbyxz7iz.mp4","videoId":"xz9gt5jgfuugnbyxz7iz","thumbnailUrl":"https://res.cloudinary.com/ds8ttmj8w/image/upload/v1731580578/ozvbjyujccshivzckmxn.png","thumbnailId":"ozvbjyujccshivzckmxn","category":"web dev mini","tags":["mern","fullstack","coputer"],"likes":{"$numberInt":"0"},"dislike":{"$numberInt":"1"},"likedby":[{"$oid":"67346be0954f054c860c081e"}],"dislikedby":[{"$oid":"67346be0954f054c860c081e"}],"viewby":[],"views":{"$numberInt":"0"},"createdAt":{"$date":{"$numberLong":"1731580578375"}},"updatedAt":{"$date":{"$numberLong":"1731580641231"}},"__v":{"$numberInt":"2"}}

send Bearer toke in headers

6. disLike route

http://localhost:3000/video/dislike/videoId(which are generate mongodb)
PUT METHOD

send Bearer toke in headers


7. 
http://localhost:3000/user/subscribe/userId
http://localhost:3000/user/unsubscribe/userId
PUT METHOD
send bearer token

8. http://localhost:3000/video/views/videoId
PUT METHOD

9. http://localhost:3000/comment/new-comment/commentId
POST method
send in body and bearer token
{
    "commentText":"nice video"
}

response 
{
    "message": "Comment added",
    "comment": {
        "videoId": "6735d2a2b000e3a0763e41cd",
        "userId": "673480abe611185ee2a995e8",
        "commentText": "nice video",
        "_id": "6736ef07a699fcd705a061dc",
        "createdAt": "2024-11-15T06:49:43.941Z",
        "updatedAt": "2024-11-15T06:49:43.941Z",
        "__v": 0
    }
}



10. http://localhost:3000/comment/videoId
GET method
{
    "commentsList": [
        {
            "_id": "6736ee71a10ec4e31a602188",
            "videoId": "6735d2a2b000e3a0763e41cd",
            "userId": {
                "_id": "673480abe611185ee2a995e8",
                "channelName": "Blog"
            },
            "commentText": "dfjkhkjh djnkjsjdv",
            "createdAt": "2024-11-15T06:47:13.860Z",
            "updatedAt": "2024-11-15T06:47:13.860Z",
            "__v": 0
        },
        {
            "_id": "6736eea5a10ec4e31a60218a",
            "videoId": "6735d2a2b000e3a0763e41cd",
            "userId": {
                "_id": "673480abe611185ee2a995e8",
                "channelName": "Blog"
            },
            "commentText": "nice video",
            "createdAt": "2024-11-15T06:48:05.079Z",
            "updatedAt": "2024-11-15T06:48:05.079Z",
            "__v": 0
        },
        {
            "_id": "6736eefca10ec4e31a60218c",
            "videoId": "6735d2a2b000e3a0763e41cd",
            "userId": {
                "_id": "673480abe611185ee2a995e8",
                "channelName": "Blog"
            },
            "commentText": "nice video",
            "createdAt": "2024-11-15T06:49:32.406Z",
            "updatedAt": "2024-11-15T06:49:32.406Z",
            "__v": 0
        },
        {
            "_id": "6736ef07a699fcd705a061dc",
            "videoId": "6735d2a2b000e3a0763e41cd",
            "userId": {
                "_id": "673480abe611185ee2a995e8",
                "channelName": "Blog"
            },
            "commentText": "nice video",
            "createdAt": "2024-11-15T06:49:43.941Z",
            "updatedAt": "2024-11-15T06:49:43.941Z",
            "__v": 0
        }
    ]
}


11. http://localhost:3000/comment/commentId
PUT METHOD
send data in body and bearer token
{
    "commentText":"Hello nice way ::::"
}

{
    "message": "Comment updated successfully",
    "comment": {
        "_id": "6736eea5a10ec4e31a60218a",
        "videoId": "6735d2a2b000e3a0763e41cd",
        "userId": "673480abe611185ee2a995e8",
        "commentText": "Hello nice way ::::",
        "createdAt": "2024-11-15T06:48:05.079Z",
        "updatedAt": "2024-11-15T07:36:10.409Z",
        "__v": 0
    }
}


11. http://localhost:3000/comment/commentId

DELETE METHOD

{
    "message": "deleted data successfully"
}


12. get all videos 
http://localhost:3000/video
GET METHOD

13. get all videos 
http://localhost:3000/video/:id
GET METHOD


http://localhost:3000/video/own-video 
GET METHOD SEND TOKEN ONLY
USING THIS API GET PERTICULAR USER UPLOADED VIDEO SHOW


getALlusers API 
http://localhost:3000/user  GET METHOD 