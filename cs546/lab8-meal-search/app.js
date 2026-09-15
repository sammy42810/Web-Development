import express from 'express';
import {engine} from 'express-handlebars';
import configRoutes from './routes/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/public', express.static('public'));

app.engine('handlebars', engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', './views');

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
