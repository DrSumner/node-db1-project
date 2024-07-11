const router = require('express').Router()
const accounts = require('./accounts-model')
const {checkAccountId, checkAccountPayload, checkAccountNameUnique} = require('./accounts-middleware')

router.get('/', (req, res, next) => {
accounts.getAll()
.then(accs => res.json(accs) )
.catch(err => res.status(500).json({
  message: "err getting accounts",
  err: err.message,
  stack: err.stack,
}
))
})

router.get('/:id', checkAccountId, (req, res, next) => {
  res.json(req.acc)
})

router.post('/', checkAccountPayload, checkAccountNameUnique,  (req, res, next) => {
  accounts.create(req.body)
  .then(acc => res.status(201).json(acc))
  .catch(err => res.status(500).json({
    message: "err creating accounts",
    err: err.message,
    stack: err.stack,
  }
  ))
})

router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  const {id} = req.params
  accounts.updateById(id, req.body)
  .then( acc => res.json(acc))
  .catch(err => res.status(500).json({
    message: "err updating accounts",
    err: err.message,
    stack: err.stack,
  }
  ))
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  accounts.deleteById(req.params.id)
  .then(() => res.json(req.acc))
  .catch(err => res.status(500).json({
    message: "err deleting accounts",
    err: err.message,
    stack: err.stack,
  }
  ))
  
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
