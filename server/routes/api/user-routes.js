const express = require('express');

const { createUser, getSingleUser, saveBook, deleteBook, login } = require('../controllers/user-controller');
const { authMiddleware } = require('../utils/auth');

const router = express.Router();

router.post('/', createUser);
router.put('/', authMiddleware, saveBook);
router.post('/login', login);
router.get('/me', authMiddleware, getSingleUser);
router.delete('/books/:bookId', authMiddleware, deleteBook);

module.exports = router;
