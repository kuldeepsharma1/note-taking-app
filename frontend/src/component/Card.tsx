import { FaMicrophone } from "react-icons/fa";

export default function NoteCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 w-72 border border-gray-200">
      <div className="flex justify-between items-center text-gray-500 text-sm mb-2">
        <span className="bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-full">NEW</span>
        <span>Jan 30, 2025</span>
        <span className="flex items-center gap-1">
          <FaMicrophone className="text-gray-600" />
          00:09
        </span>
      </div>
      <h3 className="text-lg font-semibold text-gray-800">Engineering Assignment Audio</h3>
      <p className="text-gray-600 text-sm mt-1">
        I'm recording an audio to transcribe into text for the assignment of...
      </p>
      <div className="flex justify-between items-center mt-3 text-gray-500 text-lg">
        <button className="hover:text-purple-600 transition">📄</button>
        <button className="hover:text-purple-600 transition">➕</button>
        <button className="hover:text-purple-600 transition">⋯</button>
      </div>
    </div>
  );
}
