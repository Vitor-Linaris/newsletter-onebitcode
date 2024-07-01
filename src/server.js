const express = require('express');
const path = require('node:path');

const app = express();

storedEmail = [];

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/register', (req, res) => {
    const email = req.body.email
    storedEmail.push({email})

    res.redirect('/success')
} )

app.get('/success', (req, res) => {
    res.render('success')
})
app.get('/list', (req, res) => {
    res.render('listEmails', {emails: storedEmail})
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`)
})