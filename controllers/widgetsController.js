let greetings = [
    { id: 1, recipient: "Maali",  message: "xxx", recipient: "Mina" },
    { id: 2, recipient: "Juuli",  message: "001", recipient: "Mina" },
    { id: 3, recipient: "Tuuli",  message: "morse", recipient: "Mina" },
]
const getGreetingsById = function(id) {
    return greetings.find(x => x.id == id)
}

exports.getAll = (req, res) => {
    res.send(greetings)
}

exports.getById = (req, res) => {
    const result = getGreetingById(req.params.id)
    if (typeof result === 'undefined') {
        return res.status(404).send({ error: "Greeting not found" })
    }
    res.send(result)
}

exports.create = (req, res) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({ error: 'One or all params are missing' })
    }
    let newGreeting = {
        id: greetings[greetings.length - 1].id + 1,
        recipient: req.body.recipient,
        message: req.body.message,
        sender: req.body.sender
    }
    greetings.push(newGreeting)
    res.status(201)
        .location('http://localhost:8080/greetings/' + newGreeting.id)
        .send(newGreeting)
}

exports.update = (req,res) => {
    const result = getGreetingById(req.params.id)
    if (typeof result === 'undefined') {
        return res.status(404).send({ error: "Greeting not found" })
    }
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({ error: 'One or all params are missing' })
    }
    result.recipient = req.body.recipient
    result.message = req.body.message
    result.recipient = req.body.recipient
    result.sender = req.body.sender

    res.status(200)        
        .location('http://localhost:8080/greetings/' + result.id)
        .send(result)
}

exports.delete = (req,res)=>{
    const greetingToDelete = getGreetingById(req.params.id)
    if (typeof greetingToDelete === 'undefined') {
        return res.status(404).send({ error: "Greeting not found" })
    }
    greetings = greetings.filter(w => w.id !== greetingToDelete.id)
    res.status(204).send()    
}