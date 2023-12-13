
const http = require('http'); // http 모듈을 가져옵니다.
const fs = require('fs').promises; // ts 모듈 파일시스템 모듈

// 데이터 저장용 객체
// [], () 차이점 --> [] 데이터 자체만 들가고 {} 데이터에 대한 key 값이 포함된다.
const users = {}

http.createServer(async (req,res) => {
    try {
        if (req.method === 'GET') { // API의 GET 요청 처리해야 하므로 대문자로 GET
        if (req.url === '/') {
            const data = await fs.readFile('./restFront.html');
            res.writeHead(200, {'Content-Type' : 'text/html; charset = utf-8'});
            return res.end(data);
        }
        else if (req.url === '/about') {
            const data = await fs.readFile("./about.html");
            res.writeHead(200, {'Content-Type' : 'text/html; charset = utf-8'});
            return res.end(data);
        }
        else if (req.url === '/users') {
            const data = await fs.readFile("./about.html");
            res.writeHead(200, {'Content-Type' : 'text/html; charset = utf-8'});
            // 사용자 데이터를 json 형태로 응답해야한다는 명령어이다.
            return res.end(JSON.stringify(users));
        }
        else {
            try {
                // 기타 경로 요청에 대한 처리
                const data = await fs.readFile(`.${req.url}`)
            }
            catch (err){
                res.writeHead(404); // 위의 조건에 해당하지 않으면 404 Not Found 응답
                return res.end('NOT FOUND');
            }
        }
    }
    else if (req.method === "POST") {
        if (req.url === '/user') {
            let body = "";
            req.on("data", (data) => {
                console.log("post 본문(body):", body);
                // 받은 데이터는 json 형식이므로 json 형식의 데이터를 파싱(해석) 사용자 읾을 추출함
                const { body }= JSON.parse(body)
                const id = Date.now()
                users[id] = name;
                res.writeHead(201, { "Content-Type": "text/plain; charset = urf-8 "})
            });
        }
    }
} catch {}
});