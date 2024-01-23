import mongoose from 'mongoose'

const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    required: true,
  },
})

const Account = mongoose.model('Account', AccountSchema)

export default Account
