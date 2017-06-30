var express = require('express');
var admin = require('../models/admin');
var r = express.Router();
var crypto = require('crypto');
var moment = require('moment');
 
var mail = require('../fn/mailtouser');

r.get('/', function(req, res){
	var vm =
	{
		layout: false
	};
	res.render('admin/admin', vm);
});

r.get('/DuyetNguoiDungDuocBan', function(req, res){
		admin.LoadNguoiDungXinNangQuyenBan().then(function(rows){
			var vm ={
				layout: false,
				nguoidungxinban: rows
			};
			res.render('admin/AdminDuyetNguoiDungDuocBan', vm);	
		});
		
});

r.post('/DuyetNguoiDungDuocBan', function(req, res)
{
	admin.DuyetNguoiDungXinNangQuyenBan(req.body);
	console.log(req.body);
	var mailinfo = {
                        email : req.body.Email,
                        subject : 'Nâng quyền người bán Auction.com',
                        htmltext : 'Chào bạn!'
                        			+'<br>Xin chúc mừng bạn'
                                    +'<br>Chúng tôi đã xét duyệt và nâng cấp bạn thành <b>NGƯỜI BÁN</b>.'                                    
                                    + '<br>Chúc bạn thật nhiều may mằn và có trãi nghiệm tốt tại Auction.com'
                                    + '<br>Thân chào bạn!'
                    }
    mail.mailtouser(mailinfo);
		res.redirect('/admin/DuyetNguoiDungDuocBan');
});

r.get('/DuyetSanPham', function(req, res){
	admin.LoadSanPhamChoDuyet().then(function(rows){
		var vm ={
			layout: false,
			sanpham: rows
		};
		res.render('admin/adminDuyetSanPham', vm);
		});

});

r.post('/DuyetSanPham', function(req, res)
{
	admin.DuyetSanPhamDuocBan(req.body).then(function(changeRows)
	{
		res.redirect('/admin/DuyetSanPham');
	})
});

r.get('/QuanLyDanhMuc', function(req, res){
	admin.LoadTatCaDanhMuc().then(function(rows){
		var vm ={
			layout: false,
			danhmuc: rows
		};
		res.render('admin/adminQuanLyDanhMuc', vm);	
	});
	
});

r.get('/QuanLyDanhMucChinhSua', function(req, res)
{
	var id = req.query.id;
	admin.LoadDanhMucTheoID(id).then(function(rows)
	{	
		var vm ={
			layout: false,
			danhmuc: rows
		};
		console.log(vm.danhmuc);
		res.render('admin/adminChinhSuaDanhMuc', vm);
	});
});

r.post('/QuanLyDanhMucChinhSua', function(req, res)
{	
	console.log(req.body);
	admin.CapNhatDanhMucTheoID(req.body);
	res.redirect('/admin/QuanLyDanhMuc');
});


r.post('/QuanLyDanhMuc', function(req, res){
	admin.ThemDanhMucMoi(req.body);
	res.redirect('/admin/QuanLyDanhMuc');	
	
});

r.post('/QuanLyDanhMucDelete', function(req, res){
	console.log(req.body);
	admin.LoadSanPhamTheoDanhMuc(req.body).then(function(rows){
		if(rows === null)
		{

			console.log('null roi nen xoa duoc');
			admin.XoaDanhMuc(req.body);
			res.redirect('/admin/QuanLyDanhMuc');
			
				
		}
		else
		{
			console.log('ko null');
			res.redirect('/admin/QuanLyDanhMuc'); 
				//{
				//	showErrow:true,
				//	errorMgs: 'Có sản phẩm trong danh mục này, nên không được xóa'
				//});	
		}

	});

	
});


r.get('/ResetMatKhauNguoiDung', function(req, res){
	admin.LoadNguoiDungResetMatKhau().then(function(rows){
		var vm =
		{
			layout: false,
			nguoidungresetmatkhau: rows
		};
		res.render('admin/adminResetMatKhauNguoiDung', vm);

	});
});

r.post('/ResetMatKhauNguoiDung', function(req, res){
	//gửi mail tự động cho người dùng cho người dùng
	var passMoi = moment().format('DMYYYYHHmm') + req.body.MaKH + 'wQeckr';
	var mailinfo = {
                        email : req.body.Email,
                        subject : 'Reset mật khẩu Auction.com',
                        htmltext : 'Chào bạn!'
                                    +'<br>Chúng tôi nhận được yêu cầu reset mật khẩu từ tài khoản của bạn.'
                                    +'<br>Mật khẩu mới: <b> ' + passMoi + '</b>'
                                    + '<br>Mời bạn đăng nhập lại và đổi mật khẩu mới'
                                    + '<br>Chúc bạn gặp thật nhiều may mắn'
                    }
    mail.mailtouser(mailinfo);
	var ePWD = crypto.createHash('md5').update(passMoi).digest('hex');
	var entity = {
		MaKH: req.body.MaKH,
		ThoiGian: req.body.ThoiGian,
		MatKhau:  ePWD
	}
	console.log(mailinfo);
	admin.NguoiDungResetMatKhau(entity);

	res.redirect('/admin/ResetMatKhauNguoiDung');
});



module.exports = r;