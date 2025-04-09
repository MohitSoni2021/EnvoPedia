import React, { useEffect, useState } from 'react';
import generateContent from '../utils/genai';
import ReactMarkdown from 'react-markdown';
import parse from 'html-react-parser';
import ContentLoader from './ContentLoader';

const WikipediaSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState("");
  const [searching, setsearching] = useState(false);

  const handleSearch = async (event) => {
    setsearching(pre=>!pre);
    event.preventDefault();
    if (!query) return;

    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;

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
  `)).candidates[0].content.parts[0].text;
        console.log(airesponse);
        setResults(airesponse.split("```html").join("").split("```").join(""));


      
    } catch (error) {
      console.error('Error fetching data:', error);
    }finally{
      setsearching(pre=>!pre);
    }
  };



  return (
    <div className='h-screen flex items-center flex-col p-10 gap-10'>
      <form onSubmit={handleSearch} className='w-full  flex items-center justify-center gap-2 standard-max-width'>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Wikipedia"
          className='px-10 py-2 bg-white border-black border-2 rounded-lg custom-shadow outline-none w-full '
        />
        <button type="submit" className={` px-10 py-2 bg-white border-black border-2 rounded-lg custom-shadow cursor-pointer hover:border-none hover:bg-black hover:text-white disabled:bg-gray-300 `} disabled={searching} > {searching ? "Searching..." : "Search"} </button>
      </form>
      <div className="w-full flex items-center h-full  overflow-y-scroll scrollbar-hidden">
        <div className="standard-max-width h-full mx-auto w-full">
            {
                searching ? <ContentLoader/> : <div>{parse(results)}</div>
            }
        </div>
      </div>
    </div>
  );
};

export default WikipediaSearch;


