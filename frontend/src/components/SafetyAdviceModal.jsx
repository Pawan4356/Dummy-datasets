import React from "react";

export default function SafetyAdviceModal({ threat, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-8 max-w-md mx-auto shadow-lg neumorphism">
        <button className="absolute top-4 right-4 text-black" onClick={onClose}>✖</button>
        <h2 className="text-xl font-bold mb-2 text-red-500">{threat.title}</h2>
        <p className="mb-2 text-gray-800">{threat.description}</p>
        <div className="mt-4 p-4 rounded bg-blue-100 bg-opacity-40 glass">
          <h3 className="font-semibold mb-1 text-blue-600">Safety Advice:</h3>
          <ul className="list-disc pl-5 text-gray-900">
            {threat.advice?.split('\n').map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}