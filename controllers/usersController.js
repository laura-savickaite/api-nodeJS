const db = require('../database');
const bcrypt = require('bcrypt');
var express = require('express');
const jwt = require('jsonwebtoken')

app.use(express.json());

const getUsers = (req, res) => {
    const sql = 'SELECT `firstname`, `lastname` FROM users'
	db.query(sql, function(error, data){
		if (error) {
			throw error;
		}
		else {
			res.send(data);
		}
	})
}

const registerUser = async (req, res) => {

	const data = req.body;

	const email = data.email;
	const password = data.password;
	const firstname = data.firstname;
	const lastname = data.lastname;
	const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
	let groups = data.groups
		if(groups == "winx") groups = 1;
		else if (groups == "witch") groups = 2;
		else groups = null

	try {
		const salt = await bcrypt.genSalt()
		const hashedPassword = await bcrypt.hash(password, salt)

		if(email && password) {
			const sql = `INSERT INTO users (email, firstname, lastname, password, createdAt, groups_id) VALUES ("${email}", "${firstname}", "${lastname}", "${hashedPassword}", "${datetime}", ${groups})`
	
			db.query(sql, function (err) {
				if (err) throw err;
				else res.status(201).send('inserted');
			});
		}
	}
	catch {
		res.status(500).send()
	}


}

const loginUser = async (req, res) => {
	const data = req.body;

	const email = data.email;
	const password = data.password;

	if(!email && !password) return res.send('please enter email or/and password')
	else {
		db.query(`SELECT id, email, password FROM users WHERE email=?`, [email] ,async function (error, result) {
			if(error) throw error;
			if(!result.length || !await bcrypt.compare(password, result[0].password)) return res.status(400).send()
			else {
				res.status(201).send('identified')
			}
		});
	}
}

const getUser = (req, res) => {
    const sql = `SELECT email, firstname, lastname, groups_id FROM users WHERE id="${req.params.userId}"`

	db.query(sql, function(error, data){
		if (error) throw error;
		else res.send(data);
	})
}

const updateUser = (req, res) => {
    const data = req.body;
	const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
	
	const entries = Object.entries(data);
	entries.forEach(element => {
		if(element[1] !== '') {
			const sql = `UPDATE users SET ${element[0]}='${element[1]}', updatedAt='${datetime}' WHERE id="${req.params.userId}"`

			db.query(sql, function(error){
				if (error) throw error;
				else res.send("worked");
			})
		}
	});
}

const addInGroup = (req, res) => {
    const data = req.body;
	const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
	
	if(data.groups) {
		let groups; 
		if(data.groups == 'winx') groups = 1
		else if (data.groups == 'witch') groups = 2
		else groups = 3

		const sql = `UPDATE users SET groups_id='${groups}', updatedAt='${datetime}' WHERE id="${req.params.userId}"`

		db.query(sql, function(error){
			if (error) throw error;
			else res.send("worked");
		})
	}
	else {
		res.send("add yourself to a group")
	}
}

const deleteUser = (req, res) => {
    const sql = `DELETE FROM users WHERE id="${req.params.userId}"`

	db.query(sql, function(error){
		if (error) throw error;
		else res.send("worked");
	})
}

module.exports = {
    getUsers,
    registerUser,
	loginUser,
    getUser,
    updateUser,
    addInGroup,
    deleteUser
}
