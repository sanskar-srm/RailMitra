import Link from 'next/link';
import { TrainFront, Github, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white/5 border-t border-white/10 mt-16">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <TrainFront className="h-7 w-7" />
              <span className="text-2xl font-bold">RailMitra</span>
            </Link>
            <p className="text-gray-400 text-sm">Your all-in-one companion for Indian Railways travel.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link href="/dashboard" className="text-gray-400 hover:text-white">Dashboard</Link></li>
              <li><Link href="/#features" className="text-gray-400 hover:text-white">Features</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white"><Github /></Link>
              <Link href="#" className="text-gray-400 hover:text-white"><Twitter /></Link>
              <Link href="#" className="text-gray-400 hover:text-white"><Linkedin /></Link>
              <Link href="#" className="text-gray-400 hover:text-white"><Instagram /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} RailMitra. All Rights Reserved.</p>
          <p className="mt-2">MADE WITH ❤️ BY SANSKAR FOR RAIL YATRI</p>
        </div>
      </div>
    </footer>
  );
}
