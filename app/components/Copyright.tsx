import React from 'react';

export default function Copyright() {
  return (
    <footer className="bg-gray-900 py-4">
      <div className="text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} MAP-Pecuihe. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

