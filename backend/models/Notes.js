import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
        unique: true,
        trim: true,
        maxlength: [50, "Title cannot exceed 50 characters"],
    },
    content: {
        type: String,
        required: [true, "Please provide content"]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    isAudio: {
        type: Boolean,
        default: false
    },
    audioUrl: {
        type: String,
        default: null
    },
    isFavorite: {
        type: Boolean,
        default: false
    },
    imageUrls: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})
export const Notes = mongoose.model("Notes", NotesSchema)

