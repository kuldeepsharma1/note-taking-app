
import { Note } from "../models/Notes";

// ✅ Create Note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id; // Fetched from JWT middleware

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required." });
    }

    const note = await Note.create({ title, content, user: userId });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get All Notes
export const getNotes = async (req,res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get Single Note
export const getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Update Note
export const updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;
    await note.save();

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Delete Note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Note not found" });
    }

    await note.deleteOne();
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
