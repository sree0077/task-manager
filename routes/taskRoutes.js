const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {createTask,getTasks,getTaskById,updateTask,deleteTask,sharedTask} = require('../controllers/taskController');


const router = express.Router();
router.use(authMiddleware);

router.post('/',createTask);
router.get('/',getTasks);
router.get('/:id',getTaskById);
router.put('/:id',updateTask);
router.delete('/:id',deleteTask);
router.post('/:id/share',sharedTask);

module.exports = router;
