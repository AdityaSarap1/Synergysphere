const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;
const DATA_FILE = 'data.json';

// Ensure JSON file exists
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ projects: [], tasks: [] }));
}

// Helper function to read JSON file
const readData = () => JSON.parse(fs.readFileSync(DATA_FILE));
const writeData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// Start server
//app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

//create project route
app.post('/project', (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Project name is required' });

    const data = readData();
    const newProject = { id: Date.now(), name };
    data.projects.push(newProject);
    writeData(data);

    res.json({ message: 'Project created', project: newProject });
});


//create task route
app.post('/task', (req, res) => {
    const { title, projectId } = req.body;
    if (!title || !projectId) return res.status(400).json({ error: 'Task title and projectId required' });

    const data = readData();
    const projectExists = data.projects.find(p => p.id === projectId);
    if (!projectExists) return res.status(404).json({ error: 'Project not found' });

    const newTask = { id: Date.now(), title, projectId };
    data.tasks.push(newTask);
    writeData(data);

    res.json({ message: 'Task created', task: newTask });
});


//task
app.get('/tasks', (req, res) => {
    const data = readData();
    res.json(data.tasks);
});


//start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

