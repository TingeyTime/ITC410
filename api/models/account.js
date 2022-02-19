const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Follow https://github.com/madhums/node-express-mongoose-demo/blob/master/app/models/user.js

const { Schema } = mongoose;

/**
 * Account Schema
 */

const AccountSchema = new Schema({
  username: String,
  email: String,
  name: { 
      first: String,
      last: String
    },
  password: String,
  session_info: Array
});

// const validatePresenceOf = value => value && value.length;

/**
 * Virtuals
 */

AccountSchema.virtual('password')
    .set(function(password) {
        this._password = password;
        this._password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

AccountSchema.virtual('fullName').get(function() {
    return this.name.first + ' ' + this.name.last;
})

/**
 * Validations
 */

AccountSchema.path('username').validate(function(username) {
    if (this.skipValidation()) return true;
    return username.length;
}, 'Username cannot be blank');

AccountSchema.path('email').validate(function(email) {
    if (this.skipValidation()) return true;
    return email.length;
}, 'Email cannot be blank');

AccountSchema.path('email').validate(function(email) {
    return new Promise(resolve => {
	const Account = mongoose.model('Account');
	if (this.skipValidation()) return resolve(true);

	// Check only when it is a new account or when email field is modified
	if (this.isNew || this.isModified('email')) {
	    Account.find({ email }).exec((err, accounts) => resolve(!err && !users.length))
	} else resolve(true);
    });
}, 'Email `{VALUE} already exists');

AccountSchema.path('name').validate(function(name) {
    if (this.skipValidation()) return true;
    return name.length;
}, 'Name cannot be blank')

/**
 * Methods
 */

UserSchema.methods = {
	/**
	 * Authenticate - check if the passwords are the same
	 * Encrypt
	 * Validation
	 */
};

// Compile model from schema
var AccountModel = mongoose.model('AccountModel', AccountSchema)