import React from "react";

export default function NavBar({ user, setUser, currentCity, setCurrentCity }) {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 shadow">
      <div className="text-2xl font-bold text-blue-300">🛡 SafeSpace</div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <img src={user.photoURL} alt="profile" className="w-8 h-8 rounded-full" />
            <span className="text-white">{user.username}</span>
            <span className="bg-gray-700 px-2 py-1 rounded text-blue-200">{currentCity}</span>
          </>
        ) : (
          <>
            <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Login</button>
            <button className="bg-green-500 text-white px-3 py-1 rounded">Sign Up</button>
          </>
        )}
        <input
          type="text"
          className="ml-4 px-2 py-1 rounded bg-gray-700 text-white"
          placeholder="Search city..."
          onChange={e => setCurrentCity(e.target.value)}
        />
        {/* Bonus: Dark mode toggle */}
        <button className="ml-2 text-white">🌗</button>
      </div>
    </nav>
  );
}