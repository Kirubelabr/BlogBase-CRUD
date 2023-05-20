const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema(
  {
    name: {
      desc: "The user's name.",
      trim: true,
      type: String,
      index: true,
      required: true,
    },
    email: {
      desc: "The user's email address.",
      trim: true,
      type: String,
      index: true,
      required: true,
    },
    password: {
      trim: true,
      type: String,
      required: true,
    },
    isActive: {
      desc: 'Is Active.',
      type: Boolean,
      default: true,
      required: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    strict: true,
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

UserSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    delete ret.tokens;
    delete ret.usernames;
  },
});

UserSchema.pre('save', async function (next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});

UserSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for user stays for an hour
  const user = this;
  const tempRoles = user.systemRoles;
  user.systemRoles = [];
  const token = jwt.sign({ user }, process.env.JWT_KEY, {
    expiresIn: 7200,
  });
  user.tokens[0] = { token };
  user.systemRoles = tempRoles;
  await user.save();
  return token;
};

UserSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password
  const user = await User.findOne({
    email,
    isActive: true,
  });
  if (!user) {
    throw new Error({ error: 'Invalid login credentials!' });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: 'Invalid login credentials!' });
  }
  return user;
};

module.exports = mongoose.model('User', UserSchema);
