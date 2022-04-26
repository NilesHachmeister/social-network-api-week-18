const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    postNewUser,
    updateUser,
    deleteUser
} = require('../../controllers/userController');


// current route is /api/users

router.route('/').get(getAllUsers)
// .post(postNewUser);

// router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;