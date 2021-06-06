const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const svmSchema = new Schema({
    svm_name: { type: String },
});

const SVM2 = mongoose.model('svmlists', svmSchema);

module.exports = SVM2;