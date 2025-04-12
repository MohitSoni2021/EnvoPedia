import { useState } from "react";
import { motion } from "framer-motion";

const Card = ({ children, title }) => (
  <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 w-full max-w-3xl transition duration-300">
    <h2 className="text-xl font-semibold text-green-700 mb-4">{title}</h2>
    <div className="text-gray-700 dark:text-gray-300 text-base">{children}</div>
  </div>
);

const sections = [
  {
    title: "Introduction to Ecosystem",
    content: `An ecosystem is a biological community of interacting organisms and their physical environment. It includes both living (biotic) and non-living (abiotic) components working together as a system.`,
  },
  {
    title: "Biotic Components",
    content: `These are the living organisms in the ecosystem. They include producers (plants), consumers (animals), and decomposers (bacteria and fungi).`,
  },
  {
    title: "Abiotic Components",
    content: `These are non-living physical and chemical elements in the ecosystem, such as sunlight, temperature, water, air, and minerals.`,
  },
  {
    title: "Types of Ecosystems",
    content: `Ecosystems can be natural (forests, oceans) or artificial (urban, agricultural). Major types include terrestrial (desert, forest) and aquatic (freshwater, marine) ecosystems.`,
  },
  {
    title: "Importance of Ecosystems",
    content: `Ecosystems provide essential services like air and water purification, climate regulation, pollination, and nutrient cycling.`,
  },
];

export default function EcosystemBooklet() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % sections.length);
  const prev = () => setCurrent((prev) => (prev - 1 + sections.length) % sections.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-50 dark:from-gray-800 dark:to-gray-900 p-6 flex flex-col items-center justify-center">
      <motion.div
        key={current}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-3xl"
      >
        <Card title={sections[current].title}>
          {sections[current].content}
        </Card>
      </motion.div>

      <div className="mt-6 flex space-x-4">
        <button
          onClick={prev}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow"
        >
          Previous
        </button>
        <button
          onClick={next}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow"
        >
          Next
        </button>
      </div>
    </div>
  );
}
