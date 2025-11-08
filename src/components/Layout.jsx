// src/components/Layout.jsx
import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbar />
      <main className="pt-0">
        {children}
      </main>
    </div>
  );
}