const express = require('express')
const router = express.Router()

const { saveNewEvent,
  getAllEvents,
  deleteEvent,
  addUserToEvent,
  getUsersForEvent } = require('../Db/projectDb')

router.get('/', (req, res) => {
  getAllEvents(req.body)
    .then(events => res.status(200).json(events))
    .catch(() => res.status(500).send('DATABASE ERROR'))
})

router.post('/:id', (req, res) => {
  console.log('route')
  const id = Number(req.params.id)
  saveNewEvent(id, req.body)
    .then((ids) => {
      return res.status(200).json(ids[0])
    })
    .catch(err => console.log(err))
})

router.delete('/', (req, res) => {
  const id = Number(req.body)
  deleteEvent(id)
    .then(() => {
      res.sendStatus(200)
      return null
    })
    .catch(error => {
      res.status(500).send('DATABASE ERROR' + error.message)
    })
})

module.exports = router
