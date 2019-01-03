var UserSQL = {  
	insert:'INSERT INTO htt_tab_dynamic_list(id,category,seqNum,title,resource,url,type,images,status,createDate) VALUES(?,?,?,?,?,?,?,?,?,NOW())', 
	querypages: 'select id from htt_tab_dynamic_list',
	queryAll:'SELECT id,type,title,info,resource,url,html,status,images FROM htt_tab_dynamic_list where category = ? and status = 2 order by seqNum desc,createDate desc limit ?,?', 
	queryAdmin: 'select * from htt_tab_dynamic_list order by seqNum desc,createDate desc limit ?,?',
	queryImg:'SELECT images FROM htt_tab_dynamic_list', 
	getUserById:'SELECT * FROM user WHERE id = ? ',
	getUserByName:'SELECT * FROM user WHERE name = ? ',
	deleteAdmin: 'delete from htt_tab_dynamic_list where id = ?',
	updateAdmin: 'update htt_tab_dynamic_list set category = ?,seqNum = ?,title = ?,resource = ?,url = ?,type = ?,images = ?,status = ?,updateDate = NOW() where id = ?',
	updateStatus: 'update htt_tab_dynamic_list set status = ?,updateDate = NOW() where id =?',
	queryWX: "select * from gamefiresharemsg",
	queryLetterHead: "select bgUrl from letterhead"
};
module.exports = UserSQL;