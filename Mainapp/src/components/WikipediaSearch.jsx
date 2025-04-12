import generateContent from '../utils/genai';

import React, { useState } from 'react';
import { Search, Loader2, BookOpen, ArrowRight, History, Sparkles } from 'lucide-react';
import parse from 'html-react-parser';
import NavbarComponent from './common/Navbar';

function WikipediaSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchHistory] = useState([
    'Climate Change',
    'Renewable Energy',
    'Biodiversity',
    'Ocean Conservation'
  ]);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!query.trim()) return;

    setSearching(true);
    try {
      const airesponse = (await generateContent(`✅ 🎓 Enhanced Prompt for Visual HTML Educational Module

        🧑‍🏫 Role:  
        You are a highly respected Environmental Science professor at a *globally renowned university*. Your mission is to analyze and visually present the topic of ${query} in a way that is scientifically accurate, modern, and easily digestible, specifically crafted for first-year Environmental Studies students.
        
        🎨 Design & Layout Guidelines  
        🛠 Output a complete HTML page, styled entirely using Tailwind CSS.
        
        📌 Theme & Aesthetic:
        - \`bg-white\` for a pure, distraction-free background
        - \`font-sans text-gray-700\` for clean, readable text
        - \`p-6\`, \`my-6\`, and ample spacing for better flow
        - Use \`rounded-xl\`, \`shadow-lg\`, and \`transition\` for a modern look
        - Fully responsive for desktop, tablet, and mobile
        
        🧱 Structure (Semantic HTML Required):  
        Use the following HTML5 tags for organization:
        - <header>, <section>, <article>, <aside>, <footer>
        - Logical headings: <h1> to <h4> with good spacing
        - Use:  
          ✅ Bullet points  
          ✅ Blockquotes  
          ✅ Callouts and definition boxes
        
        🌟 Content & Highlighting Rules  
        🧑‍🎓 Target: Make the topic accessible to students new to environmental science.
        
        ✍️ Tone & Language:
        - Simple, student-friendly explanations
        - Use real-world analogies and case studies
        - Focus on clarity, relevance, and interactivity
        
        🖍 Highlighting & Callout Styles:
        Use color and spacing to visually separate content:
        - 🔸 Key Terms → \`text-green-600\`
        - 🔸 Important Stats → \`bg-yellow-100 text-yellow-900 font-semibold px-2 py-1 rounded\`
        - 🔸 Definition Boxes → \`bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4 rounded\`
        - 🔸 Examples → \`bg-green-50 border-l-4 border-green-400 p-4 my-4 rounded\`
        - 🔸 Info Callouts → \`bg-blue-50 border-l-4 border-blue-400 p-4 my-4 rounded\`
        - 🔸 Summary Points → \`bg-indigo-50 border-l-4 border-indigo-400 p-4 my-4 rounded\`
        
        🖼 Image Rules (Only If Requested)  
        ⚠️ Do NOT include images unless the user explicitly asks.
        
        If included:
        - Use verified image URLs from Unsplash, Pexels, or other trusted sites
        - Style with:  
          \`rounded-xl shadow-lg w-full h-auto my-4\`  
          Add: \`onerror="this.style.display='none'"\` to auto-hide broken images
        
        ✅ Mandatory Sections
        
        📌 1. Summary (Before the Footer)  
        Use:
        \`\`\`html
        <section class="bg-gray-100 p-6 rounded-xl my-8">
          <h3 class="text-xl font-bold text-gray-800 mb-2">Summary</h3>
          <p class="text-gray-700 leading-relaxed">[...]</p>
        </section>
        \`\`\`
        
        📌 2. Sources & Credits Table  
        A clean table format at the bottom of the page:
        | **Title / Description** | **Source / Author** | **Verified Link** |
        |-------------------------|---------------------|-------------------|
        
        ❌ Strict Rules:
        - Do NOT include broken image links
        - Do NOT use placeholders like example.com
        - Do NOT output anything outside the HTML block
        - Do NOT include incomplete or messy structure
        
        💯 Final Output Expectations:
        - Return only valid, polished, copy-paste-ready HTML
        - All Tailwind CSS classes should be inline (\`class="..."\`)
        - No external styles or scripts unless required
        - Structure and content should be clear, elegant, and informative
        - This should feel like a premium learning module suitable for:
          🌐 University LMS  
          📘 Educational Portals  
          📱 Mobile-friendly class pages
                
          - do not give any addition things, just the html code for the module.
          - and make sure to make the sources table responsive for mobile.
          - use icons from according to the need
          - also use wikipedia and other sources for details informations
          `)).candidates[0].content.parts[0].text; // Your existing prompt
      setResults(airesponse.split("```html").join("").split("```").join(""));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setSearching(false);
    }
  };

  return (
    <>
    
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center gap-3">
            <BookOpen className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              Environmental Science Explorer
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-20">
        {/* Search Section */}
        <section className="max-w-4xl mx-auto space-y-8">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="relative">
            <div className="relative rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border border-green-100 transition-all duration-300 hover:shadow-xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-green-500" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Explore environmental topics..."
                className="block w-full pl-12 pr-36 py-4 rounded-2xl bg-transparent text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none text-lg transition-all duration-200"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button
                  type="submit"
                  disabled={searching || !query.trim()}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group"
                >
                  {searching ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5" />
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <span>Search</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Popular Searches */}
          {!results && !searching && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="flex items-center gap-2 mb-4 text-green-700">
                <History className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Popular Topics</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(topic)}
                    className="px-4 py-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors duration-200 text-sm font-medium"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Results Section */}
        <section className="max-w-5xl mx-auto mt-8">
          {searching ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <Loader2 className="animate-spin h-10 w-10 text-green-500" />
              <p className="text-green-600 font-medium animate-pulse">
                Gathering environmental insights...
              </p>
            </div>
          ) : results ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-green-100">
              <div className="prose prose-green max-w-none">
                {parse(results)}
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <Sparkles className="h-16 w-16 mx-auto mb-4 text-green-400" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Ready to Explore Environmental Science
              </h2>
              <p className="text-gray-500 max-w-md mx-auto">
                Enter any environmental topic to discover comprehensive insights and scientific explanations.
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-green-100 fixed w-full bottom-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-600 text-sm">
            Environmental Science Explorer © {new Date().getFullYear()} • Powered by AI
          </p>
        </div>
      </footer>
    </div>
    </>
  );
}

export default WikipediaSearch;