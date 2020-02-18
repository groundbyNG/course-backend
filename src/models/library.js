import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const librarySchema = new Schema({
  data: [{
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  }],
  users: [
    {
      userId: {
        type: String,
        required: true,
      },
      items: [
        {
          title: {
            type: String,
            required: true,
          },
          link: {
            type: String,
            required: true,
          },
          checked: {
            type: Boolean,
            required: true,
          }
        }
      ]
    }
  ]
});

export default mongoose.model('Library', librarySchema);