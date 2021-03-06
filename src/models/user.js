import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
});


//hashing a password before saving it to the database
userSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, function (err, hash){
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
  });

  userSchema.statics.authenticate = function (email, password, callback) {
    mongoose.model('User', userSchema).findOne({ email })
      .exec(function (err, user) {
        
        if (err) {
          return callback(err)
        } else if (!user) {
          const err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, user.password, function (err, result) {
          if (result) {
            return callback(null, user);
          } else {
            return callback();
          }
        })
      });
  };


export default mongoose.model('User', userSchema);