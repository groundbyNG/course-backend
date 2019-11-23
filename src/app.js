import mongoose from 'mongoose';
import app from './routes';

const db = mongoose.connection;

// подключение
mongoose.connect("mongodb://localhost:27017/bankdb", { useNewUrlParser: true });
db.on('error', () => {
  console.log('FAILED to connect to mongoose')
});
db.once('open', () => {
  console.log('Connected to mongoose')
});

app.listen({port: 8686}, () => {
  console.log('Server ready');
});