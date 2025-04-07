// import ThemeToggle from './components/ThemeToggle';
// import URLTable from './components/URLTable'; // <- new component

// function App() {
//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 text-black dark:text-white">
//       <div className="flex flex-col items-center justify-start py-10 gap-10">
//         <ThemeToggle />
//         <div className="w-full max-w-4xl px-4">
//           <URLTable />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import URLTable from "./components/URLTable"; // <- new component
import { Navbar } from "@/components/navbar";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto py-6 px-4">
        <div className="w-full max-w-6xl mx-auto">
          <URLTable />
        </div>
      </main>
    </div>
  );
}

export default App;
