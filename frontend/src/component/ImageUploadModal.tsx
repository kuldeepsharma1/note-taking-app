import { useState } from "react";
import { FiX, FiUpload } from "react-icons/fi";

export default function ImageUploadModal({ onClose }: { onClose: () => void }) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isClosing, setIsClosing] = useState(false);

  // Handle File Selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles([...selectedFiles, ...Array.from(event.target.files)]);
    }
  };

  // Handle Drag and Drop
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      setSelectedFiles([...selectedFiles, ...Array.from(event.dataTransfer.files)]);
    }
  };

  // Handle Close Animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 150);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`bg-white w-[500px] p-6 rounded-2xl shadow-lg relative transition-all duration-200 ${
          isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 active:scale-90 transition-all duration-150"
          onClick={handleClose}
        >
          <FiX size={24} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-900">Upload Images</h2>

        {/* Drag & Drop Area */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="mt-4 border-2 border-dashed border-gray-300 p-6 rounded-lg text-center text-gray-500 cursor-pointer hover:border-gray-400"
        >
          <FiUpload size={40} className="mx-auto text-gray-400" />
          <p className="mt-2">Drag & Drop images here</p>
          <p className="text-sm">or</p>
          <label className="text-blue-600 cursor-pointer">
            Browse Files
            <input type="file" className="hidden" multiple accept="image/*" onChange={handleFileChange} />
          </label>
        </div>

        {/* Preview Uploaded Images */}
        {selectedFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="text-sm font-semibold text-gray-800">Selected Images:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative w-20 h-20">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    className="w-full h-full rounded-lg object-cover border"
                  />
                  <button
                    onClick={() => setSelectedFiles(selectedFiles.filter((_, i) => i !== index))}
                    className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs"
                  >
                    <FiX />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
