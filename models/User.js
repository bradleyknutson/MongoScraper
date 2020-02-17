const mongoose = require(`mongoose`);
const bcrypt = require(`bcryptjs`);

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },

    password: {
        type: String,
        trim: true,
        required: "Password is Required",
        validate: [
          function(input) {
            return input.length >= 6;
          },
          "Password needs to be longer."
        ]
    },
  
    userCreated: {
        type: Date,
        default: Date.now
    },

    comments: [
        {
          type: Schema.Types.ObjectId,
          ref: "Comment"
        }
    ],

    lastUpdated: Date,

});

UserSchema.methods.lastUpdatedDate = function() {
    this.lastUpdated = Date.now();
    return this.lastUpdated;
}

UserSchema.pre(`save`, function(next) {
    if(!this.isModified(`password`)) return next();

    bcrypt.genSalt(12, (err, salt) => {
        if(err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if(err) return next(err);
            this.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.hashPassword = function(password){
    return hashSync(password);
}
 
const User = mongoose.model("User", UserSchema);
  

module.exports = User;