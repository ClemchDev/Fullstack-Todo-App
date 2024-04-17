const Todo = require("../models/Todo")


exports.updateTodo = async (req, res) => {
    const result = await Todo.findOne({ email: req.body.email}) 
    if(result) {
        Todo.updateOne({ email: req.body.email}, { ...req.body })
            .then(() => res.status(200).json({message : 'Objet modifié!'}))
            .catch(error => res.status(401).json({ error }));     
    } else {
        const todo = new Todo({
            ...req.body,
        })
        todo.save()
        .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
        .catch(error => { res.status(400).json( { error })})
    }       
}

exports.getTodos = (req, res) => {
    Todo.find({ email : req.body.email })
        .then(datas => {
            return res.status(200).json({data: datas})
        })
        .catch(error => res.status(500).json({ error }))
}