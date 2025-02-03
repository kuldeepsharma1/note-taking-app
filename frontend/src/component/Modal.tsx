import { useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { FiDownload, FiX } from "react-icons/fi";

export default function NoteModal({ onClose }:any) {
  const [selectedTab, setSelectedTab] = useState("transcript");

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
                selectedTab === tab.id
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-4">
          {selectedTab === "transcript" && (
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold text-gray-800">Transcript</h3>
              <p className="text-gray-600 text-sm mt-2">
                I'm recording an audio to transcribe into text for the assignment of engineering in terms of actors.
              </p>
              <button className="text-blue-600 text-sm mt-1">Read More</button>
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
