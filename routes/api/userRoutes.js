const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    postNewUser,
    updateUser,
    deleteUser,
    addNewFriend,
    removeFriend
} = require('../../controllers/userController');


// current route is /api/users

router.route('/').get(getAllUsers).post(postNewUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addNewFriend).delete(removeFriend)



module.exports = router;