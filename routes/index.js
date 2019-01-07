var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/config');
var userSQL = require('../db/usersql');


// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );

// 响应一个JSON数据
var responseJSON = function (res, ret) {
     if(typeof ret === 'undefined') { 
          res.json({
          	code:'-200',
          	msg: '操作失败'   
        }); 
    } else { 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    res.json(ret); 
    res.end();
  	}
};

/* GET home page. */
router.get('/', function(req, res, next) {
	res.writeHead(301, {
		'Location': 'https://www.lafitewu.xyz/'
	});
	res.end()
});
//鞭炮小程序分享api
router.get('/wxTool/share/api',function(req,res,next) {
	pool.getConnection(function(err, connection) {
		connection.query(userSQL.queryWX, function(err, result) {
			var data = result;
			if(result) {      
				result = {   
				code: 200,   
				msg:'请求成功',
				datas: data
				};  
			}
			// 以json形式，把操作结果返回给前台页面     
			responseJSON(res, result);   

			// 释放连接  
			connection.release(); 
		});
	});
});

// 写一份信小程序 信纸api
router.get('/wxTool/api/selecthead',function(req,res,next) {
	pool.getConnection(function(err, connection) {
		connection.query(userSQL.queryLetterHead, function(err, result) {
			var data = result;
			if(result) {      
				result = {   
				code: 200,   
				msg:'请求成功',
				datas: data
				};  
			}
			// 以json形式，把操作结果返回给前台页面     
			responseJSON(res, result);   

			// 释放连接  
			connection.release(); 
		});
	});
});

// 写一份信小程序 背景音乐api
router.get('/wxTool/api/selectMusic',function(req,res,next) {
	pool.getConnection(function(err, connection) {
		connection.query(userSQL.queryLetterMusic, function(err, result) {
			var data = result;
			if(result) {      
				result = {   
				code: 200,   
				msg:'请求成功',
				datas: data
				};  
			}
			// 以json形式，把操作结果返回给前台页面     
			responseJSON(res, result);   

			// 释放连接  
			connection.release(); 
		});
	});
});

// 写一封信小程序 保存信内容api
router.post('/wxTool/api/saveInfo', function(req, res, next) {
	var datas;
	pool.getConnection(function(err, connection) { 
		// 获取前台页面传过来的参数  
 		var param = req.query || req.params;
		console.log(param);
		var ParamArr = [
			param.name,
			param.iconUrl,
			param.gender,
			param.content,
			param.bgUrl,
			param.musicUrl,
			param.addresses,
			param.serviceTime,
			param.password,
			param.autograph
		];
 		connection.query(userSQL.saveWxContent, ParamArr,function(err, result) {
			if(result) {      
	             result = {   
	                code: 200,   
	                msg:'添加成功'
	             };  
	        }
	        // 以json形式，把操作结果返回给前台页面     
       		responseJSON(res, result);   

     		// 释放连接  
      		connection.release();
		});

	})
});


// admin api
router.get('/yyt/cj/admin/api', function(req, res, next) {
	//从连接池获取连接 
	pool.getConnection(function(err, connection) { 
		// 获取前台页面传过来的参数  
 		var param = req.query || req.params;   
		// 建立连接 增加一个用户信息 
		var pages,
		cupages = parseInt(param.currentPage) || 1,
		returnpage = parseInt(param.returnPage) || 10;
		connection.query(userSQL.querypages, function(err, result) {
			pages = Math.ceil(result.length/returnpage);
		});
		connection.query(userSQL.queryAdmin, [(cupages-1)*returnpage,returnpage], function(err, result) {
			var data = result;
			connection.query(userSQL.queryImg, function(err, result) {
				var Img = result;
				if(Object.keys(param).length > 1 ) {
					if(result) {      
			             result = {   
			                code: 200,   
			                msg:'请求成功',
			                AllPages: pages,
			                CurrentPages: cupages,
			                items: data
			             };  
			        }
			        for(var i = 0; i < result.items.length; i++) {
			        	result.items[i].images = result.items[i].images.split("#");
			        }
				}else {
					result = {   
		                code: 201,   
		                msg:'参数错误',
		            }
				}
	     		// 以json形式，把操作结果返回给前台页面     
	       		responseJSON(res, result);   

	     		// 释放连接  
	      		connection.release(); 
	      	});
       });
	});
});

// add - api
router.get('/yyt/cj/add', function(req, res, next) {
	var datas;
	pool.getConnection(function(err, connection) { 
		// 获取前台页面传过来的参数  
 		var param = req.query || req.params;
 		console.log(param);
 		var Id = param.id,
 			title = param.name,
 			resource = param.source,
 			url = param.url,
 			type = param.pictype,
 			category = param.category,
 			seqNum = param.seqNum,
 			img,
 			status = param.status;
 			if(param.pic2 != "") {
 				img = param.pic1+"#"+param.pic2+"#"+param.pic3;
 			}else {
 				img = param.pic1;
 			}
 		connection.query(userSQL.insert, [Id,category,seqNum,title,resource,url,type,img,status],function(err, result) {
			if(result) {      
	             result = {   
	                code: 200,   
	                msg:'添加成功'
	             };  
	        }
	        // 以json形式，把操作结果返回给前台页面     
       		responseJSON(res, result);   

     		// 释放连接  
      		connection.release();
		});

	})
		
  // res.json();
});

// delete - api
router.get('/yyt/cj/delete', function(req, res, next) {
	pool.getConnection(function(err, connection) { 
		// 获取前台页面传过来的参数  
 		var param = req.query || req.params;
 
 		connection.query(userSQL.deleteAdmin,param.id,function(err, result) {
			if(result) {      
	             result = {   
	                code: 200,   
	                msg:'删除成功'
	             };  
	        }
	        // 以json形式，把操作结果返回给前台页面     
       		responseJSON(res, result);   

     		// 释放连接  
      		connection.release();
		});

	})
		
  // res.json();
});

// edit - api
router.get('/yyt/cj/edit', function(req, res, next) {
	pool.getConnection(function(err, connection) { 
		// 获取前台页面传过来的参数  
 		var param = req.query || req.params;
 		var Id = param.id,
 			title = param.name,
 			resource = param.source,
 			url = param.url,
 			type = param.pictype,
 			category = param.category,
 			seqNum = param.seqNum,
 			img,
 			status = param.status;
 			if(param.pic2 != "") {
 				img = param.pic1+"#"+param.pic2+"#"+param.pic3;
 			}else {
 				img = param.pic1;
 			}
 		connection.query(userSQL.updateAdmin, [category,seqNum,title,resource,url,type,img,status,Id],function(err, result) {
			if(result) {      
	             result = {   
	                code: 200,   
	                msg:'添加成功'
	             };  
	        }
	        // 以json形式，把操作结果返回给前台页面     
       		responseJSON(res, result);   

     		// 释放连接  
      		connection.release();
		});

	})
		
  // res.json();
});

// status - api
router.get('/yyt/cj/status', function(req, res, next) {
	pool.getConnection(function(err, connection) { 
		// 获取前台页面传过来的参数  
 		var param = req.query || req.params;
 		var Id = param.id,
 			status = param.status;
 			if(status == "true") {
 				status = 2
 			}else {
 				status = 1
 			}
 		connection.query(userSQL.updateStatus, [status,Id],function(err, result) {
			if(result) {      
	             result = {   
	                code: 200,   
	                msg:'状态更新成功'
	             };  
	        }
	        // 以json形式，把操作结果返回给前台页面     
       		responseJSON(res, result);   

     		// 释放连接  
      		connection.release();
		});

	})
		
  // res.json();
});

module.exports = router;
