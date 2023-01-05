import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

// Import book schema
import bookSchema from './Book';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // Set savedBooks to be an array of data that adheres to the book schema
    savedBooks: [bookSchema],
  },
  // Set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Custom method to compare and validate password for logging in
userSchema.methods
.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
  };

  const bookSchema = new Schema(
    {
    bookId: {
    type: String,
    required: true,
    unique: true,
    },
    authors: [String],
    description: String,
    title: String,
    image: String,
    link: String,
    },
    {
    toJSON: {
    virtuals: true,
    },
    }
    );
    
    const Book = model('Book', bookSchema);
    
    module.exports = Book;