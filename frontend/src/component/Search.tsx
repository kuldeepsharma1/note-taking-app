import { FiMoreVertical, FiSearch } from "react-icons/fi";


export default function Search() {
  return (
    <div className="flex justify-between items-center mb-8">
              <div className="relative w-full ">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <button className="ml-4 flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition">
                <FiMoreVertical />
                <span>Sort</span>
              </button>
            </div>
  )
}
