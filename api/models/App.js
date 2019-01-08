import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  display: String,
  theme: Object,
  features: {
    image_uploader: Boolean,
    quick_quiz: Boolean,
    leadboard: Boolean,
    tips: Boolean,
  },
  rules: {
    time_bouns_per_coin: Number, // 3min
    initial_coins: Number,
    cooldown: Number,
    show_questions: Boolean,
  },
  stages: [String],
  debug: Object,
  assets: Object,

  __v: { type: Number, select: false },
})

schema.statics = {
}

schema.methods = {
}

export default mongoose.model('App', schema)