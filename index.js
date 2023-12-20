const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');

const config = require('./config/key')

const { User } = require("./models/Users");

//application/x-www-form-urlencoded 이렇게 된 데이터를  분석해서 가지고 올 수 있게 해주는 것
app.use(bodyParser.urlencoded({extended: true}));

//application/json (json 타입으로 된 것을 분석해서 가져올 수 있게 해줌)
app.use(bodyParser.json());

app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World! 안녕하세요 ~'))

app.post('/register', async (req, res) => {
  // 회원 가입 할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.  
  try {
    const user = new User(req.body) // bodyParser를 이용해 클라이언트에 보내는 정보를 받아준다
    await user.save(); // 프로미스를 반환하도록 수정
    return res.status(200).json({
    success: true
    });
  } catch (err) {
    // 에러가 발생하면 json 형식으로 성공하지 못했다와 에러메시지 전달
    return res.json({ success: false, err });
  }
});



app.listen(port, () => console.log(`Example app listening on port ${port}`))
