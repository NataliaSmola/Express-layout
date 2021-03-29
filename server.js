const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/hello/:name', (req, res) => {
  res.render('hello', {layout: false, name: req.params.name });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', { layout: 'dark' });
});

app.use((req, res, next) => {
  next();
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.post('/contact/send-message', (req, res) => {

  const { author, sender, title, message, image } = req.body;
  if(author && sender && title && message && image) {
    res.render('contact', { isSent: true, image: image });
  }
  else {
    if(!image){
      res.render('contact', { isNoImage: true });
    }
    else{
      res.render('contact', { isError: true, image: image });
    }
  }
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
