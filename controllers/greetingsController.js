let greetings = [
    { id: 1, recipient: "Onu", message: "Kauneid jõule!", sender: "Mina" },
    { id: 2, recipient: "Sober", message: "Häid pühi!", sender: "Mina" }, 
    { id: 3, recipient: "Keegi", message: "Jõulurõõmu!", sender: "Mina"  },
]
const getGreetingById = function(id) {
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
    let newWidget = {
        id: widgets[widgets.length - 1].id + 1,
        name: req.body.name,
        price: req.body.price
    }
    widgets.push(newWidget)
    res.status(201)
        .location('http://localhost:8080/widgets/' + newWidget.id)
        .send(newWidget)
}

exports.update = (req,res) => {
    const result = getWidgetById(req.params.id)
    if (typeof result === 'undefined') {
        return res.status(404).send({ error: "Widget not found" })
    }
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({ error: 'One or all params are missing' })
    }
    result.name = req.body.name
    result.price = req.body.price
    res.status(200)        
        .location('http://localhost:8080/widgets/' + result.id)
        .send(result)
}

exports.delete = (req,res)=>{
    const widgetToDelete = getWidgetById(req.params.id)
    if (typeof widgetToDelete === 'undefined') {
        return res.status(404).send({ error: "Widget not found" })
    }
    widgets = widgets.filter(w => w.id !== widgetToDelete.id)
    res.status(204).send()    
}