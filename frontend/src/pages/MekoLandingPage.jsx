import React, { useState } from 'react';
import { MessageCircle, Shield, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MekoLandingPage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-black text-white">
      {/* Combined Header + Hero Section to cover full screen height */}
      <div className="h-screen flex flex-col">
        {/* Header */}
        <header className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <MessageCircle className="mr-2" />
            <h1 className="text-2xl font-bold">Meko</h1>
          </div>
        </header>

        {/* Hero Section - takes up remaining space */}
        <section className="flex-1 container mx-auto px-4 flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Connect with the World</h2>
          <p className="text-xl md:text-2xl mb-12 max-w-2xl opacity-90">
            Experience communication like never before with Meko's secure and elegant chat platform
          </p>
          
          <Link
            to="/login"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
              text-xl font-bold py-4 px-12 rounded-full 
              transition-all duration-300 ease-in-out
              ${isHovered ? 
                'bg-white text-indigo-900 shadow-lg shadow-indigo-500/50 transform scale-105' : 
                'bg-indigo-600 text-white shadow-md'}
            `}
          >
            Start Now
          </Link>
        </section>
      </div>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-indigo-800 bg-opacity-30 rounded-lg p-6 backdrop-blur-sm">
            <Shield className="text-indigo-300 mb-4 w-12 h-12" />
            <h3 className="text-xl font-bold mb-3">Secure Messaging</h3>
            <p className="opacity-80">End-to-end encryption keeps your conversations private and secure.</p>
          </div>
          
          <div className="bg-indigo-800 bg-opacity-30 rounded-lg p-6 backdrop-blur-sm">
            <Zap className="text-indigo-300 mb-4 w-12 h-12" />
            <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
            <p className="opacity-80">Instant messaging with minimal latency for real-time communication.</p>
          </div>
          
          <div className="bg-indigo-800 bg-opacity-30 rounded-lg p-6 backdrop-blur-sm">
            <Globe className="text-indigo-300 mb-4 w-12 h-12" />
            <h3 className="text-xl font-bold mb-3">Global Reach</h3>
            <p className="opacity-80">Connect with people from across the world without boundaries.</p>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-indigo-800 to-purple-800 rounded-xl p-8 md:p-12 text-center">
          <p className="text-xl md:text-2xl italic mb-6">
            "Meko transformed how our team communicates. The interface is elegant and the experience is seamless."
          </p>
          <p className="font-bold">Alex Morgan, Tech Innovator</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your conversations?</h2>
        <Link 
          to="/login" 
          className="inline-block text-lg font-bold py-3 px-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 ease-in-out"
        >
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 opacity-75 text-sm text-center">
        <p>© 2025 Meko Chat. All rights reserved.</p>
      </footer>
    </div>
  );
}