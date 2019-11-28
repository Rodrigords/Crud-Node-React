const User = require('../models/User')

module.exports = {
  async store(req, res) {
    const { name, email } = req.body.user

    const user = await User.create({ name, email })

    return res.json(user)
  },
  async index(req, res){
    const users = await User.find()
    return res.json(users)
  },
  async show(req, res){
    const { user_id } = req.query

    const user = await User.findById(user_id)

    return res.json(user)
  },
  async update(req, res){
    const { _id, name, email } = req.body.user
    const user = await User.findById(_id)
    
    user.name = name
    user.email = email
    
    await user.save();
    
    return res.json(user)
  },
  async delete(req, res){

  }
}

