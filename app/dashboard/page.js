// 'use client'; // Required for client-side hooks in Next.js

// import { useDispatch } from 'react-redux';
// import { logout } from '@/features/authSlice'; // Import the logout action
// import { useRouter } from 'next/navigation'; // useRouter is for redirecting
// import { useSelector } from 'react-redux';
// import { useState, useEffect, useRef } from 'react';
// import Link from 'next/link'; // Link component to navigate to other pages

// const Dashboard = () => {
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const sidebarRef = useRef(null);

//   useEffect(() => {
//     if (!user) {
//       router.push('/login');
//     }
//   }, [user, router]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//         setIsSidebarOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleLogout = () => {
//     dispatch(logout()); // Dispatch logout action
//     router.push('/login'); // Redirect to login page
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div
//         ref={sidebarRef}
//         className={`fixed top-0 left-0 h-full bg-gray-900 text-white transition-transform shadow-lg ${
//           isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         } w-64`}
//       >
//         <div className="p-4">
//           <h2 className="text-2xl font-bold mb-6">Menu</h2>
//           <div className="space-y-4">
//             <Link href="/tasks">
//               <button className="w-full bg-gray-700 p-3 rounded-md hover:bg-gray-600 text-left mb-4">
//                 📝 Go to Tasks
//               </button>
//             </Link>
//             <Link href="/profile">
//               <button className="w-full bg-gray-700 p-3 rounded-md hover:bg-gray-600 text-left mb-4">
//                 👤 View Profile
//               </button>
//             </Link>
//             <button
//               onClick={handleLogout}
//               className="w-full bg-gray-700 p-3 rounded-md hover:bg-gray-600 text-left mb-4"
//             >
//               🚪 Logout
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1">
//         <div className="container mx-auto px-4 py-6">
//           {/* Button to toggle the sidebar */}
//           <button
//             className="bg-gray-900 text-white p-3 rounded-md hover:bg-gray-800 mb-4"
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           >
//             {isSidebarOpen ? 'Close Menu' : 'Open Menu'}
//           </button>

//           <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h1>
//           {user ? (
//             <>
//               <p className="text-xl mb-4">Hello, {user.username}!</p>
//               <p className="text-lg mb-6">
//                 You can manage your to-do list here. Start collaborating by
//                 adding tasks, setting deadlines, and more!
//               </p>
//             </>
//           ) : (
//             <p className="text-red-500">
//               You are not logged in. Please log in to view your dashboard.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// Dashboard.js
'use client'; // Required for client-side hooks in Next.js

import { useDispatch } from 'react-redux';
import { logout } from '@/features/authSlice'; // Import the logout action
import { useRouter } from 'next/navigation'; // useRouter is for redirecting
import { useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link'; // Link component to navigate to other pages

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    router.push('/login'); // Redirect to login page
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white transition-transform shadow-lg ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-6">Menu</h2>
          <div className="space-y-4">
            <Link href="/tasks">
              <button className="w-full bg-gray-700 p-3 rounded-md hover:bg-gray-600 text-left mb-4">
                📝 Go to Tasks
              </button>
            </Link>
            <Link href="/profile">
              <button className="w-full bg-gray-700 p-3 rounded-md hover:bg-gray-600 text-left mb-4">
                👤 View Profile
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full bg-gray-700 p-3 rounded-md hover:bg-gray-600 text-left mb-4"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Button to toggle the sidebar */}
          <button
            className="bg-gray-900 text-white p-3 rounded-md hover:bg-gray-800 mb-4"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? 'Close Menu' : 'Open Menu'}
          </button>

          <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h1>
          {user ? (
            <>
              <p className="text-xl mb-4">Hello, {user.username}!</p>
              <p className="text-lg mb-6">
                You can manage your to-do list here. Start collaborating by
                adding tasks, setting deadlines, and more!
              </p>
            </>
          ) : (
            <p className="text-red-500">
              You are not logged in. Please log in to view your dashboard.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
