import { useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { FiDownload, FiX, FiPlus } from "react-icons/fi";

export default function NoteModal({ onClose }: any) {
  const [selectedTab, setSelectedTab] = useState("transcript");
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote]);
      setNewNote("");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[700px] rounded-2xl shadow-lg p-6 relative">
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-gray-500" onClick={onClose}>
          <FiX size={20} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-900">Engineering Assignment Audio</h2>
        <p className="text-gray-500 text-sm">30 January 2025 • 05:26 PM</p>

        {/* Audio Player */}
        <div className="mt-4 w-full flex flex-col">
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
              <FaMicrophone className="text-gray-700" />
            </button>
            <div className="w-full bg-gray-200 h-2 rounded-full relative">
              <div className="w-1/4 h-full bg-red-500 rounded-full"></div>
            </div>
            <span className="text-gray-600 text-sm">00:00 / 00:09</span>
            <button className="ml-2 text-gray-600 flex items-center gap-1 border border-gray-300 px-3 py-1 rounded-lg hover:bg-gray-100">
              <FiDownload size={16} /> Download Audio
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-4 flex space-x-4 border-b pb-2">
          {[
            { label: "Notes", id: "notes" },
            { label: "Transcript", id: "transcript" },
            { label: "Create", id: "create" },
            { label: "Speaker Transcript", id: "speaker" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                selectedTab === tab.id ? "bg-gray-200 text-gray-900" : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-4">
          {/* Notes Section */}
          {selectedTab === "notes" && (
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold text-gray-800">Saved Notes</h3>
              {notes.length === 0 ? (
                <p className="text-gray-600 text-sm mt-2">No notes available.</p>
              ) : (
                <ul className="mt-2 text-gray-700 text-sm space-y-2">
                  {notes.map((note, index) => (
                    <li key={index} className="p-2 bg-white rounded-md shadow-sm border">{note}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Transcript Section */}
          {selectedTab === "transcript" && (
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold text-gray-800">Transcript</h3>
              <p className="text-gray-600 text-sm mt-2">
                I'm recording an audio to transcribe into text for the assignment of engineering in terms of actors.
              </p>
              <button className="text-blue-600 text-sm mt-1">Read More</button>
            </div>
          )}

          {/* Create Section */}
          {selectedTab === "create" && (
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold text-gray-800">Create a Note</h3>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Write your note here..."
                className="w-full mt-2 p-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={3}
              />
              <button
                onClick={handleAddNote}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
              >
                <FiPlus /> Add Note
              </button>
            </div>
          )}

          {/* Speaker Transcript Section */}
          {selectedTab === "speaker" && (
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold text-gray-800">Speaker Transcript</h3>
              <div className="text-gray-600 text-sm mt-2 space-y-2">
                <div>
                  <strong className="text-gray-800">Speaker 1:</strong> Hello, today we are discussing the engineering
                  assignment.
                </div>
                <div>
                  <strong className="text-gray-800">Speaker 2:</strong> Yes, we need to transcribe this audio and extract
                  key points.
                </div>
                <div>
                  <strong className="text-gray-800">Speaker 1:</strong> That sounds good. Let's start the transcription
                  now.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Image Upload */}
        <div className="mt-4 flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
          <button className="w-16 h-16 border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center text-gray-500">
            +
            <span className="text-xs">Image</span>
          </button>
        </div>
      </div>
    </div>
  );
}
