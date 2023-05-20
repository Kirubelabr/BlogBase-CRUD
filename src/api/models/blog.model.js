const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      desc: 'Blog title',
      required: true,
    },
    intro: { type: String, required: true },
    content: {
      type: String,
      desc: 'Blog content',
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      desc: 'Blog author',
    },
    tags: [String],
    isActive: {
      desc: 'Is Active.',
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    strict: true,
    versionKey: false,
    timestamps: true,
  }
);

blogSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model('Blog', blogSchema);
