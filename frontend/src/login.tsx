export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-green-500 text-2xl font-bold mb-6 text-center">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1" htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              className="w-full p-2 rounded-lg  text-white focus:outline-none focus:ring-2 focus:ring-green-500" 
              placeholder="Enter your email" 
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1" htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              className="w-full p-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500" 
              placeholder="Enter your password" 
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full p-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}