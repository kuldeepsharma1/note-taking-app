import { useState } from 'react';
import { FaHome, FaStar, FaMicrophone } from 'react-icons/fa';
import { FiImage } from 'react-icons/fi';
import { AiFillEdit } from "react-icons/ai";
import Search from './Search';

export default function Notes() {
  const [recording, setRecording] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            <span className="bg-purple-600 text-white px-2 py-1 rounded mr-2">AI</span>
            Notes
          </h2>
        </div>
        <nav className="p-6 flex-grow">
          <ul className="space-y-4">
            <li className="flex items-center gap-3 p-2 bg-purple-100 rounded-lg text-purple-700 font-medium cursor-default">
              <FaHome />
              <span>Home</span>
            </li>
            <li className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg text-gray-600 cursor-pointer transition">
              <FaStar />
              <span>Favourites</span>
            </li>
          </ul>
        </nav>
        <div className="p-6 border-t flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <span className="text-gray-700 font-medium">Emmanual Vincent</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <Search/>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Note Card */}
          <div className="bg-white p-5 h-64  rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
              <span>Jan 30, 2025 • 5:26 PM</span>
              <span className="flex items-center gap-1">
                <FaMicrophone className="text-gray-600" />
                00:09
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Engineering Assignment Audio</h3>
            <p className="text-gray-600 text-sm">
              I'm recording an audio to transcribe into text for the assignment of engineering in terms of actors.
            </p>
          </div>

          {/* Second Note Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
              <span>Jan 30, 2025 • 5:21 PM</span>
              <span className="text-sm text-gray-600">Text</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Random Sequence</h3>
            <p className="text-gray-600 text-sm">ssxscscscsc</p>
          </div>

        </div>
      </main>

      {/* Bottom Button Container */}
      <div className="fixed bottom-2 left-[32%] right-20 bg-white border-t border-gray-200 py-4 px-8 flex justify-between items-center shadow-lg rounded-full">
        {/* Create and Upload Buttons */}
        <div className="flex gap-8">
          <button className="flex flex-col items-center text-gray-700 hover:text-purple-600 transition">
            <AiFillEdit  className="text-2xl mb-1" />
            <span className="text-xs">Create</span>
          </button>
          <button className="flex flex-col items-center text-gray-700 hover:text-purple-600 transition">
            <FiImage className="text-2xl mb-1" />
            <span className="text-xs">Upload</span>
          </button>
        </div>

        {/* Recording Button */}
        <button
          onClick={() => setRecording(!recording)}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
        >
          <FaMicrophone />
          {recording ? "Recording..." : "Start Recording"}
          
        </button>
      </div>
    </div>
  );
}