// import mongoose, { Schema, model, models } from 'mongoose';

// const userSchema = new Schema({
//   firstname:{type:String,required:true},
//   lastname:{type:String,required:true},
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   refreshTokens: [String]
// });

// const User = models.User || model('User', userSchema);
// export default User;


// import mongoose, { Schema, model, models } from 'mongoose';

// const userSchema = new Schema({
//   firstname: {
//     type: String,
//     required: function () {
//       return this.provider === 'local';
//     },
//   },
//   lastname: {
//     type: String,
//     required: function () {
//       return this.provider === 'local';
//     },
//   },
//   email: { type: String, required: true, unique: true },
//   password: {
//     type: String,
//     required: function () {
//       return this.provider === 'local';
//     },
//   },
//   googleId: { type: String },
//   provider: {
//     type: String,
//     enum: ['local', 'google'],
//     default: 'local',
//   },
//   refreshTokens: [String],
// });

// // ✅ Prevent OverwriteModelError
// const User = models.User || model('User', userSchema);

// export default User;
import mongoose, { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  firstname: {
    type: String,
 
  },
  lastname: {
    type: String,
  
  },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: function () {
      return this.provider === 'local';
    },
  
  },
   isAdmin:{
    type:Boolean,
    default:false
  },
  googleId: { type: String },
  provider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local',
  },
  refreshTokens: [String],

  // ✅ New Field for Favorite Movies
  favourites: [{ type:String, ref: 'Movie' }]
});

const User = models.User || model('User', userSchema);
export default User;

