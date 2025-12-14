const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Vite default port
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.get('/', (req, res) => {
    res.send('Private Notes App API is running');
});

module.exports = app;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
