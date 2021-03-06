const bcrypt = require('bcrypt')
const Posts = require('../model/posts')
const login = require('../middleware/login')

module.exports = app => {
    app.post('/cadastro', async (req, res) => {

        try{
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const user = { email: req.body.email, password: hashedPassword }
            
            Posts.cadastro(user, res)
        }catch{
            res.status(500).send()
        }
       
    })

    app.post('/login', async (req, res) => {
        
        const user = { email: req.body.email, password: req.body.password }
        
        Posts.login(user, res)

    })

    app.get('/lista', login.cookie, (req, res) => {
     
        Posts.lista(res)

    })
}