const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const svmSchema = new Schema({
    svm_name: { type: String, required: true },
    site: { type: String, required: false },
}, {
    timestamps: true,
});

const SVM = mongoose.model('svms', svmSchema);

module.exports = SVM;