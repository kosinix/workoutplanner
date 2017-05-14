const express = require('express');
const expressNunjucks = require('express-nunjucks');
const app = express();
const isDev = app.get('env') === 'development';
 
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.locals.baseUrl = "http://localhost:3000"

const njk = expressNunjucks(app, {
    watch: isDev,
    noCache: isDev
});
 
app.get('/', (req, res) => {
    res.render('index.html', { baseUrl: req.app.locals.baseUrl, title: "Home2", username: "heyah"} );
});
 
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(':memory:')

db.serialize(function () {
  db.run('CREATE TABLE lorem (info TEXT)')
  var stmt = db.prepare('INSERT INTO lorem VALUES (?)')

  for (var i = 0; i < 10; i++) {
    stmt.run('Ipsum ' + i)
  }

  stmt.finalize()

  db.each('SELECT rowid AS id, info FROM lorem', function (err, row) {
    console.log(row.id + ': ' + row.info)
  })
})

db.close()