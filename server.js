// const fs = require("fs");
// const http = require("http");

// const server = http.createServer((req, res) => {
//   console.log("Received a response...");
//   fs.readFile("index.html", (err, data) => {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.write(data);
//     return res.end();
//   });
// });

// server.listen(3000, () => {
//   console.log("Server started: Listening on port 3000");
// });

// const fs = require('fs');
// const http = require('http');

// const server = http.createServer((req, res) => {
//   if (req.url === '/') {

//     fs.readFile('index.html', (err, data) => {
//       res.writeHead(200, { 'Content-Type': 'text/html' });
//       res.write(data);
//       return res.end();
//     });
//   }
//    else {
//     fs.readFile('script.js', (err, data) => {
//       res.writeHead(200, { 'Content-Type': 'text/javascript' });
//       res.write(data);
//       return res.end();
//     });
//   }
// });

// server.listen(3000, () => {
//   console.log('Server started: Listening on port 3000');
// });

const fs = require("fs");
const http = require("http");
let allUsers = [
  { name: "trkl", email: "trkl@gmail.com", pw: "ttttttt" },
  { name: "aung aung", email: "aungaung@gmail.com", pw: "aungaung" },
  { name: "kyaw kyaw", email: "kyawkyaw@gmail.com", pw: "kyawkyaw" },
];

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile("index.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  } else if (req.url === "/script.js") {
    fs.readFile("script.js", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(data);
      console.log(data);
      return res.end();
    });
  } else if (req.url === "/style.css") {
    fs.readFile("style.css", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.write(data);
      return res.end();
    });
  } else if (req.url === "/users") {
    const method = req.method;
    if (method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(allUsers));
      
      return res.end();
    } else if (method === "POST") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", () => {
        
        const newUser = JSON.parse(data);
        console.log(newUser)
        allUsers.push(newUser);
        console.log(allUsers);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify({allUsers , status : "success"}));
        res.end();
      });
    } else if (method === "PUT") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", () => {
        const chgDataToJson = JSON.parse(data);

        const isSameEmail = allUsers.find((user) => {
          console.log(chgDataToJson)
          return user.email === chgDataToJson.email;
        });
        const newName = chgDataToJson.name;
        const newPw = chgDataToJson.pw;

        if (isSameEmail) {
          isSameEmail.name = newName;
          isSameEmail.pw = newPw;
          res.writeHead(200, { "Content-Type": "application/json" });
          res.write(JSON.stringify(allUsers));
        }

        res.end();
      });
    } else if (method === "DELETE") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });

        req.on("end", () => {
        const chgDataToJson = JSON.parse(data);

        allUsers = allUsers.filter((user) => {

          return user.email !== chgDataToJson.email; 
        });
   

        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(allUsers , {status : "noDelete"}));
         
        // if (isSameEmail) {
        //   const deleteUser = allUsers.splice(index, index);
        //   res.writeHead(200, { "Content-Type": "application/json" });
        //   res.write(JSON.stringify(allUsers)); 
        // }
        console.log(allUsers)
        res.end(); 
      });
    }
  }else if (req.url === "/fileUpload") {
  
    const writeStream = fs.createWriteStream("image.jpg");
    req.pipe(writeStream);
    res.writeHead(200, {"Content-Type" : "application/json"});
    res.write(JSON.stringify({massage : "Upload Success....."}));
    res.end()

    // let data = "";
    // req.on("data" , (chunk) => {
    //   data += chunk
    // });
    // req.on("end", () => {
    //   fs.writeFileSync("test.txt" , "hello Its Work test.text.....")
    //   res.writeHead(200 , {"Content-Type" : "application/json"});
    //   res.write(JSON.stringify({message : "Upload File Success"}));
    //   res.end();
    // })
  } else if (req.url === "/data") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ hero: "hello .... i am spiderman.." }));
    return res.end();
  }
});

server.listen(3000, () => {
  console.log("Server started : Listening on port 3000");
});


