const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
// get data from form-data -- build-in middleware
app.use(express.urlencoded({ extended: false }));

// créer un dossier public où on y pose notre css - images pour que ça s'affiche
// app.use(express.static(path.join(__dirname, '/public')));

var users = require('./routes/users');
app.use('/users', users);

var groups = require('./routes/groups');
app.use('/groups', groups);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
