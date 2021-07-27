const express = require('express')
const app = express()

const expressLayout = require('express-ejs-layouts')
const session = require('express-session')
const flash = require('connect-flash')

require('./utils/db')
const auth = require('./models/Auth')
const { get } = require('mongoose')

app.set('view engine', 'ejs')
app.use(expressLayout)
app.use(express.static('public'))
app.use(session({
    maxAge : 3600,
    secret : 'secret',
    resave : true,
    saveUninitialized: true
}))
app.use(flash())

app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) => {
    if(req.session.hasLogin) {
        res.render('index', { layout: 'layouts/main-layout'})
    } else {
        res.redirect('/login')
    }
})

app.get('/shop', (req, res) => {
    res.render('shop', { layout: 'layouts/main-layout' })
})

app.get('/shop/men', (req, res) => {
    res.render('products/men/main', { layout: false})
})

app.get('/shop/men/belt', (req, res) => {
    res.render('products/men/belt', { layout: false})
})

app.get('/shop/men/glasses', (req, res) => {
    res.render('products/men/glasses', { layout: false})
})

app.get('/shop/men/bracelet', (req, res) => {
    res.render('products/men/bracelet', { layout: false})
})

app.get('/shop/men/hat', (req, res) => {
    res.render('products/men/hat', { layout: false})
})

app.get('/shop/men/necklace', (req, res) => {
    res.render('products/men/necklace', { layout: false})
})

app.get('/shop/men/watches', (req, res) => {
    res.render('products/men/watches', { layout: false})
})

app.get('/shop/women', (req, res) => {
    res.render('products/women/main', { layout: false})
})

app.get('/shop/women/anklet', (req, res) => {
    res.render('products/women/anklet', { layout: false})
})

app.get('/shop/women/belt', (req, res) => {
    res.render('products/women/belt', { layout: false})
})

app.get('/shop/women/glasses', (req, res) => {
    res.render('products/women/glasses', { layout: false})
})

app.get('/shop/women/earrings', (req, res) => {
    res.render('products/women/earrings', { layout: false})
})

app.get('/shop/women/necklace', (req, res) => {
    res.render('products/women/necklace', { layout: false})
})

app.get('/shop/women/ring', (req, res) => {
    res.render('products/women/ring', { layout: false})
})

app.get('/shop/women/scarf', (req, res) => {
    res.render('products/women/scarf', { layout: false})
})

app.get('/membership', (req, res) => {
    res.render('membership', { layout: 'layouts/main-layout' })
})

app.get('/claimit', (req, res) => {
    res.render('claimit', { layout: 'layouts/main-layout'})
})

app.get('/login', (req, res) => {
    res.render('login', { layout: false, msg: req.flash('msg')})
})

app.post('/register', (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password =  req.body.password

    const newUser = new auth({
        name, email, password
    })
    newUser.save().then(() =>  res.redirect('/login'))
})

app.post('/login', async (req,res) => {
    const email = req.body.email
    const password = req.body.password
    const getUser = await auth.findOne({ email : email })

    if(!getUser) {
        req.flash('msg', 'User email not found!')
        res.redirect('/login')
    } else {
        if(password == getUser.password) {
            if(getUser.role == 'admin') {
                req.session.admin = true
            }
                req.session.hasLogin = true
                res.redirect('/')
        }
        else {
            req.flash('msg', 'Wrong password!')
            res.redirect('/login')
        }
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) {
            console.log(err)
        } else {
            res.redirect('/login')
        }
    })
})

app.get('/testi', (req, res) => {
    res.render('testi', {layout : false})
})

app.listen(process.env.PORT || 8080)