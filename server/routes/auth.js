const express = require('express');
const supabase = require('../supabaseClient');
const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.status(201).json({ message: 'User created successfully', user: data.user });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return res.status(401).json({ error: error.message });
        }

        // Set HTTP-only cookie
        res.cookie('access_token', data.session.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000 // 1 hour
        });

        res.json({ message: 'Login successful', user: data.user });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Logout Route
router.post('/logout', async (req, res) => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.clearCookie('access_token');
    res.json({ message: 'Logged out successfully' });
});

module.exports = router;
