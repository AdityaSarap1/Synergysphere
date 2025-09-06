const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // download from Firebase console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
module.exports = db;


//signup
const admin = require('firebase-admin');

app.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name
    });
    res.json({ message: 'User created', user: userRecord });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


//create project
const db = require('./firebase');

app.post('/project', async (req, res) => {
  const { name, ownerId } = req.body;
  try {
    const projectRef = db.collection('projects').doc();
    await projectRef.set({
      name,
      ownerId,
      members: [ownerId],
      createdAt: new Date()
    });
    res.json({ message: 'Project created', id: projectRef.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});




//create task
app.post('/task', async (req, res) => {
  const { title, projectId, assigneeId, dueDate } = req.body;
  try {
    const taskRef = db.collection('projects').doc(projectId).collection('tasks').doc();
    await taskRef.set({
      title,
      assigneeId,
      status: 'To-Do',
      dueDate: new Date(dueDate),
      createdAt: new Date()
    });
    res.json({ message: 'Task created', id: taskRef.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});




//get tasks for a project
app.get('/tasks/:projectId', async (req, res) => {
  const { projectId } = req.params;
  try {
    const tasksSnap = await db.collection('projects').doc(projectId).collection('tasks').get();
    const tasks = tasksSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});




//add member
/app.post('/project/:id/members', async (req, res) => {
  const { id } = req.params; // project ID
  const { memberId } = req.body; // user to add

  try {
    const projectRef = db.collection('projects').doc(id);
    const projectSnap = await projectRef.get();

    if (!projectSnap.exists) return res.status(404).json({ error: 'Project not found' });

    await projectRef.update({
      members: admin.firestore.FieldValue.arrayUnion(memberId)
    });

    res.json({ message: 'Member added' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



//update task
app.put('/task/:projectId/:taskId', async (req, res) => {
  const { projectId, taskId } = req.params;
  const { status, title, dueDate } = req.body;

  try {
    const taskRef = db.collection('projects').doc(projectId).collection('tasks').doc(taskId);
    await taskRef.update({
      ...(status && { status }),
      ...(title && { title }),
      ...(dueDate && { dueDate: new Date(dueDate) })
    });

    res.json({ message: 'Task updated' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});




//basic project comments(threaded discussion)
app.post('/project/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { userId, message } = req.body;

  try {
    const projectRef = db.collection('projects').doc(id);
    await projectRef.update({
      comments: admin.firestore.FieldValue.arrayUnion({
        userId,
        message,
        timestamp: new Date()
      })
    });

    res.json({ message: 'Comment added' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



//get comments
app.get('/project/:id/comments', async (req, res) => {
  const { id } = req.params;
  try {
    const projectSnap = await db.collection('projects').doc(id).get();
    if (!projectSnap.exists) return res.status(404).json({ error: 'Project not found' });

    res.json(projectSnap.data().comments || []);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
