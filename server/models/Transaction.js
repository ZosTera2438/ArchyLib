import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  type: { type: String, enum: ['borrow', 'return'], required: true},
  date: { type: Date, default: Date.now },
});

export default mongoose.model('Transaction', requestSchema);
