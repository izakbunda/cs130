import Task from '../models/Task.js'
import Note from '../models/Note.js'

// points mapping -- refactor/change later
let pointsMapping = {
  easy: 100,
  medium: 500,
  hard: 1000
}

// desc: create a new task
// route: POST /tasks/:noteId
// access: private (TODO)
export const createTask = async (req, res) => {
  try {
    const { noteId } = req.params
    const { name } = req.body

    // confirm required data
    if (!name) {
      return res.status(400).json({ message: 'Required fields missing' })
    }

    // check if note exists
    const note = await Note.findById(noteId).exec()
    if (!note) {
      return res.status(404).json({ message: 'Note not found' })
    }

    // create new task
    const task = new Task({
      note: noteId,
      name,
      creationDate: Date.now(),
      status: 'pending', // new tasks will always be pending
      category: 'easy',
      points: pointsMapping['easy']
    })

    console.log('created')

    // store the new task
    const savedTask = await task.save()

    console.log('saved')

    // add task to note's tasks arr
    note.tasks.push(task._id)
    await note.save()

    // send back new task
    res.status(201).json(savedTask)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// desc: get all tasks associated with note
// route: GET /tasks/:noteId
// access: private (TODO)
export const getTasks = async (req, res) => {
  try {
    const { noteId } = req.params

    // confirm data
    if (!noteId) {
      return res.status(400).json({ message: 'Note ID required' })
    }

    // get list of tasks from note
    const note = await Note.findById(noteId).populate('tasks').exec()

    if (!note) {
      return res.status(404).json({ message: 'Note not found' })
    }

    // send back list of tasks
    res.status(200).json(note.tasks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// desc: update a task
// route: PATCH /tasks/:taskId
// access: private (TODO)
export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params
    const taskData = req.body

    // confirm required data
    if (!taskId) {
      return res.status(400).json({ message: 'Task ID required' })
    }

    // TODO: need to check that update data is valid

    // check if task exists
    const oldTask = await Task.findById(taskId).exec()
    if (!oldTask) {
      res.status(404).json({ message: 'Task not found' })
    }

    // if category changes, update points
    if (taskData.category && taskData.category !== oldTask.category) {
      taskData.points = pointsMapping[taskData.category]
    }

    // find task + update it
    const task = await Task.findByIdAndUpdate(taskId, taskData, { new: true }).exec()

    // send back updated task
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// desc: delete a task
// route: DELETE /tasks/:taskId
// access: private (TODO)
export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params

    // confirm data
    if (!taskId) {
      return res.status(400).json({ message: 'Task ID requireed' })
    }

    // check if task exists
    const task = await Task.findById(taskId).exec()
    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    // delete task -- triggers pre-delete hook
    await task.deleteOne()

    res.status(200).json()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
