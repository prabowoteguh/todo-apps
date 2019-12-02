const express = require("express")
const db = require("../db/db")
const bodyParser = require("body-parser")

// Setup express
const app = express()

// Setup body-parser, parse incoming req data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false,

}))

app.get('/api/hello', (req, res) => {
	res.status(200).send({
		success: true,
		message: `Hello Guys`
	})
})

app.get('/api/todos',(req, res) => {
	res.status(200).send({
		success: true,
		message: "todos has been loaded",
		data: db
	})
})


app.post('/api/todos', (req, res) => {
	if(!req.body.title){
		return res.status(400).send({
			success: false,
			message: "Tolong isi Title"
		});
	} else if (!req.body.description) {
		return res.status(400).send({
			success: false,
			message: "Tolong isi Deskripsi"
		});
	} 

	const todo = {
		id: db[db.length -1].id +1,
		title: req.body.title,
		description: req.body.description,
		completed: false
	};

	db.push(todo);

	return res.status(201).send({
		success: true,
		message: "todo added successfully",
		data: db
	});
})

app.get('/api/todos/:id', (req, res) => {
	const id = parseInt(req.params.id)
	db.map((todo) => {
		if(todo.id === id) {
			return res.status(200).send({
				success: true,
				message: "todo successfully loded",
				data: todo
			})
		}
	})

	return res.status(404).send({
		success: false,
		message: "todo does not exist"
	})
})

app.delete('/api/todos/:id', (req, res) => {
	const id = parseInt(req.params.id)
	db.map((todo, index) => {
		if(todo.id === id) {
			db.splice(index, 1)
			return res.status(200).send({
				success: true,
				message: "todo successfully deleted",
				data: todo
			})
		}
	})

	return res.status(404).send({
		success: false,
		message: "todo does not exist"
	})
})

app.put('/api/todos/:id', (req, res) => {
	const id = parseInt(req.params.id)
	db.map((todo, index) => {
		if(todo.id === id){
			todo.completed = true
			return res.status(200).send({
				success: true,
				message: "todo successfully completed",
				data: todo
			})
		}
	})
})
const PORT = 8080

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

// HOT RELOAD => NODEMON (sisi deveopment)
// SSR => Hot reload untuk sisi production
















