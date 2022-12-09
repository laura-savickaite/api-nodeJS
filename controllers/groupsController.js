const db = require('../database');

const getGroups = (req, res) => {
    const sql = 'SELECT `name` FROM groupes'
	db.query(sql, function(error, data){
		if (error) throw error;
		else res.send(data);
	})
}

const getUsersfromGroups = (res, req) => {
    const sql = 'SELECT groupes.name, users.firstname, users.lastname FROM `groupes` INNER JOIN `users` ON groupes.id = users.groups_id'
	db.query(sql, function(error, data){
		if (error) throw error;
		else res.send(data);
	})
}

const addGroup = (res, req) => {
    const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
	const data = req.body;

	if(data.name) {
		const sql = `INSERT INTO groupes (name, createdAt) VALUES ("${data.name}", "${datetime}")`

		db.query(sql, function (err) {
			if (err) throw err;
			else console.log("inserted");
		});
	}
	else res.send('add a name')
}

const deleteGroup = (res, req) => {
    const sql = `DELETE FROM groupes WHERE id="${req.params.groupsId}"`

	db.query(sql, function(error){
		if (error) throw error;
		else res.send("worked");
	})
}

const editGroup = (res, req) => {
    const data = req.body;
	const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');

	if(data.name) {
		const sql = `UPDATE groupes SET name='${data.name}', updatedAt='${datetime}' WHERE id="${req.params.groupsId}"`
	
		db.query(sql, function(error, data){
			if (error) throw error;
			else res.send("worked");
		})
	}
}

const editUsersinGroup = (res, req) => {
    const data = req.body;
	const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');

	const entries = Object.entries(data);
	entries.forEach(element => {
		if(element[1] !== '') {
			const sql = `UPDATE users INNER JOIN groupes ON groupes.id = users.groups_id SET ${element[0]}='${element[1]}', updatedAt='${datetime}' WHERE users.id = "${req.params.usersId}" AND groupes.id = "${req.params.groupsId}"`

			db.query(sql, function(error, data){
				if (error) throw error;
				else res.send("worked");
			})
		}
	});
}

module.exports = {
    getGroups,
    getUsersfromGroups,
    addGroup,
    deleteGroup,
    editGroup,
    editUsersinGroup
}