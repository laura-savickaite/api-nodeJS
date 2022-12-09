var express = require('express');
var router = express.Router();
var {
	getUsers, 
	registerUser,
	loginUser,
	getUser,
	updateUser,
	addInGroup,
	deleteUser
} = require('../controllers/usersController')


// Une route qui retourne tous les utilisateurs dans une liste contenant les champs prenom et nom.
router.get('/', getUsers);

// Une route qui permet à un utilisateur de s’enregistrer en complétant les champs prenom, nom, email et un groupe.
router.post('/register', registerUser)

// Une route qui permet à un utilisateur de se connecter
router.post('/login', loginUser)

// Une route qui permet d’avoir les détails d’un user (nom prenom email groupe)
router.get('/:userId', getUser);

// Une route qui permet de modifier ses informations (uniquement celles de l’utilisateur connecté)
router.post('/edit/:userId', updateUser);

// Une route qui permet aux utilisateur de s’ajouter à un groupe
router.post('/add-group/:userId', addInGroup);

// Les routes qui permettent de supprimer, modifier un user et sélectionner tous les users.
router.delete('/delete/:userId', deleteUser);


module.exports = router;

//!! si deux routes ont la "même route" mais pas la même méthode (ex post/get) => router.route('/').get(getPeople).post(postPeople)
