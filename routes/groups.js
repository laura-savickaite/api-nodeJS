var express = require('express');
var router = express.Router();
var {
	getGroups, 
	getUsersfromGroups,
	addGroup,
	deleteGroup,
	editGroup,
	editUsersinGroup
} = require('../controllers/groupsController')

// Une route qui retourne uniquement les noms des groupes (groupe 1, groupe 2, ...)
router.get('/', getGroups);

// Une route qui retourne les groupes ainsi que les users qui y sont rattachés(uniquement prenom et nom)
router.get('/users', getUsersfromGroups);

// Les routes qui permettent d’ajouter, modifier, supprimer un groupe
router.post('/add', addGroup)

router.delete('/delete/:groupsId', deleteGroup);

router.post('/edit/:groupsId', editGroup);

// Une route qui permet de modifier les utilisateurs présents dans un groupe
router.get('/edit/users/:groupsId/:usersId', editUsersinGroup);

module.exports = router;