import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { MessageSquareText, PlusCircle, ListFilter } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand Name */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-slate-900 hover:text-brand-600 transition-colors font-semibold text-lg tracking-tight"
          >
            <div className="w-9 h-9 rounded-lg bg-brand-600 text-white flex items-center justify-center shadow-sm">
              <MessageSquareText className="w-5 h-5" />
            </div>
            <span>Student Feedback Manager</span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <PlusCircle className="w-4 h-4" />
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/feedback"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <ListFilter className="w-4 h-4" />
              <span>Feedback</span>
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
