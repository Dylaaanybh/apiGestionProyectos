const express = require('express');
const app = express();
app.use(express.json());
const projects = require('../data/projects.json');

console.log(projects)

app.get('/', (req, res) => {
    res.send(projects)
})

app.get('/projects/:id', (req, res) => {
    const project = projects.find(project => project.id == req.params.id)
    res.send(project)
})

app.post('/projects', (req, res) => {
    const project = req.body
    project.id = projects.length + 1
    projects.push(project)
    console.log(project)
    console.log("body" + JSON.stringify(req.body))
    res.send(project)
})

app.put('/projects/:id', (req, res) => {
    const project = projects.find(project => project.id == req.params.id)
    if (!project) {
        return res.status(404).send('proyecto no encontrado')
    }
    projects[projects.indexOf(project)] = req.body
    res.send(project)
})

app.delete('/projects/:id', (req, res) => {
    const project = projects.find(project => project.id == req.params.id)
    if (!project) {
        return res.status(404).send('proyecto no encontrado')
    }
    projects.splice(projects.indexOf(project), 1)
    res.send(project)
})

app.listen(3000)