const Evaluate = require('../models/evaluate.model');
const Account = require('../models/account.model');
const fs = require('fs');

const {
	mutipleMongooseToObject,
	mongooseToObject,
} = require('../utils/mongoose');

class evaluateController {
	// [PUT] /specific-product/:id/report
	reportEvaluate = async (req, res, next) => {
		try {
			const evaluateId = req.params.id;
			await Evaluate.updateOne({ _id: evaluateId }, { $set: { status: 'reported' } });
			res.redirect('back');

		} catch (error) {
			res.status(500).json({ error: 'Lỗi khi lấy tất cả sản phẩm 1' });
		}
	};
	// [PUT] /specific-product/create
	createEvaluate = async (req, res, next) => {
		try {
			const account = await Account.findOne({}); //***
			// const idAccount = req.params._id; //***
			const cmtInput = req.body.cmtInput
			const idProduct = req.params.id

			// Tạo một đối tượng "evaluate" mới và lưu vào cơ sở dữ liệu
			const newEvaluate = new Evaluate({
				idAccount: account._id,
				idProduct,
				content: cmtInput
			});
			await newEvaluate.save();

			// console.log()
			// res.status(200).json(newEvaluate);
			res.redirect('back');
		} catch (error) {
			res.status(500).json({ error: 'Lỗi khi lấy tất cả sản phẩm 1' });
		}
	};

	// [GET] /sales-page/review
	showEvaluate = async (req, res, next) => {
		try {
			const account = await Account.findOne({}); //***
			// const idAccount = await Account.findOne({_id: req.params._id}); //***
			const evaluates = await Evaluate.find({idAccount: account._id, reply: ""})
			.populate('idProduct')
			res.locals.evaluates = mutipleMongooseToObject(evaluates)
			res.render('review-shop')
		} catch (error) {
			res.status(500).json({ error: 'Lỗi khi lấy tất cả sản phẩm 1' });
		}
	};

	// [POST] /sales-page/:id/reply
	replyEvaluate = async (req, res, next) => {
		try {
			const idEvaluate = req.params.id
			const replyShop = req.body.reply
			await Evaluate.updateOne({ _id: idEvaluate }, { $set: { reply: replyShop } });
			res.redirect('back');
		} catch (error) {
			res.status(500).json({ error: 'Lỗi khi lấy tất cả sản phẩm 1' });
		}
	};
}

module.exports = new evaluateController();
