import axios from 'axios';

const API_KEY = 'AIzaSyB5QnVEYMYRgq3lslanv6PQH073FpfaR0k'; // Replace with your actual API key
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';


const generateContent = async (text) => {
  const url = `${BASE_URL}?key=${API_KEY}`;

  const headers = {
    'Content-Type': 'application/json',
  };

  const data = {
    contents: [{
      parts: [{ text }]
    }]
  };

  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
};

export default generateContent;
