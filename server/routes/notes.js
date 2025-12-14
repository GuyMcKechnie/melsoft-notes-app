const express = require('express');
const authenticateUser = require('../middleware/auth');
const router = express.Router();

// Apply middleware to all routes
router.use(authenticateUser);

// Get all notes
router.get('/', async (req, res) => {
    try {
        // Use req.supabase instead of global supabase
        const { data, error } = await req.supabase
            .from('notes')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a note
router.post('/', async (req, res) => {
    const { title, content } = req.body;

    try {
        // Use req.supabase
        const { data, error } = await req.supabase
            .from('notes')
            .insert([{ title, content, user_id: req.user.id }])
            .select();

        if (error) throw error;

        res.status(201).json(data[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a note
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        // Use req.supabase
        const { data, error } = await req.supabase
            .from('notes')
            .update({ title, content })
            .eq('id', id)
            .select();

        if (error) throw error;

        if (data.length === 0) {
            return res.status(404).json({ error: 'Note not found or unauthorized' });
        }

        res.json(data[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a note
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Use req.supabase
        const { error } = await req.supabase
            .from('notes')
            .delete()
            .eq('id', id);

        if (error) throw error;

        res.json({ message: 'Note deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
