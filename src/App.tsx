import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  const techStack = [
    {
      name: "Vite",
      description: "Next Generation Frontend Tooling",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      logo: viteLogo,
      url: "https://vite.dev",
      logoType: "img",
    },
    {
      name: "React",
      description: "A JavaScript library for building user interfaces",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      logo: reactLogo,
      url: "https://react.dev",
      logoType: "img",
    },
    {
      name: "TypeScript",
      description: "JavaScript with syntax for types",
      color: "text-blue-700",
      bgColor: "bg-blue-50",
      logo: "🔷",
      url: "https://www.typescriptlang.org/",
      logoType: "span",
    },
    {
      name: "Tailwind CSS",
      description: "A utility-first CSS framework",
      color: "text-teal-600",
      bgColor: "bg-teal-100",
      logo: "🎨",
      url: "https://tailwindcss.com/",
      logoType: "span",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            <img src={viteLogo} className="w-16 h-16" alt="Vite logo" />
            <span className="text-4xl font-bold text-gray-800">+</span>
            <img
              src={reactLogo}
              className="w-16 h-16 animate-spin"
              alt="React logo"
            />
            <span className="text-4xl font-bold text-gray-800">+</span>
            <span className="text-5xl">🔷</span>
            <span className="text-4xl font-bold text-gray-800">+</span>
            <span className="text-5xl">🎨</span>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Modern React Template
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A powerful development stack combining the best tools for building
            modern web applications
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {techStack.map((tech) => (
            <a
              key={tech.name}
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div
                className={`${tech.bgColor} rounded-xl p-6 h-full transition-all duration-300 hover:shadow-lg hover:scale-105 border border-gray-200`}
              >
                <div className="flex items-center justify-center mb-4">
                  {tech.logoType === "img" ? (
                    <img
                      src={tech.logo}
                      className="w-12 h-12"
                      alt={`${tech.name} logo`}
                    />
                  ) : (
                    <span className="text-4xl">{tech.logo}</span>
                  )}
                </div>
                <h3
                  className={`text-xl font-bold ${tech.color} text-center mb-2`}
                >
                  {tech.name}
                </h3>
                <p className="text-gray-700 text-sm text-center leading-relaxed">
                  {tech.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Interactive Demo */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Interactive Demo
          </h2>
          <p className="text-gray-600 mb-6">
            Click the button to test React state management and see TypeScript
            in action
          </p>

          <button
            onClick={() => setCount((count) => count + 1)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Count is {count}
          </button>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Hot Module Replacement (HMR):</strong> Edit{" "}
              <code className="bg-gray-200 px-2 py-1 rounded text-xs">
                src/App.tsx
              </code>{" "}
              and save to see changes instantly!
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Lightning Fast
            </h3>
            <p className="text-gray-600 text-sm">
              Vite's dev server starts instantly and provides blazing fast HMR
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl mb-4">🛡️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Type Safe
            </h3>
            <p className="text-gray-600 text-sm">
              TypeScript provides excellent developer experience with static
              type checking
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl mb-4">🎨</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Styled with Tailwind
            </h3>
            <p className="text-gray-600 text-sm">
              Utility-first CSS framework for rapid UI development
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
