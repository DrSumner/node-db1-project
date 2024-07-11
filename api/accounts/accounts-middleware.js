const accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  const {name, budget} = req.body
if(!name || budget === undefined){res.status(400).json({message:"name and budget are required"})}


  else  if (typeof budget !== 'number'){
    res.status(400).json({message:"budget of account must be a number"})
  } else if (budget < 0 || budget > 1000000){
    res.status(400).json({message:"budget of account is too large or too small"})}
  
  else if (name.trim().length < 3 || name.trim().length > 100){
    res.status(400).json({message:"name of account must be between 3 and 100"})
  } else
   {
    req.body.name = name.trim()
    next()
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  accounts.getAll()
  .then(accs => {
    const nameExist = accs.some( acc => acc.name === req.body.name)
    if(nameExist){
     return  res.status(400).json({message: "that name is taken"})
    } 
next()
  })

}

exports.checkAccountId = (req, res, next) => {
 accounts.getById(req.params.id)
 .then(acc => {
  if(acc && Object.keys(acc).length > 0){
    req.acc = acc; next()
  } else 
  res.status(404).json({message: 'account not found'})

 })
 .catch( err => res.status(500).json({
  message: 'error verifying id',
  err: err.message,
  stack: err.stack,

 }))
}
