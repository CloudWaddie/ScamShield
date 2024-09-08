async function getPageHTML() {
    try {
      const response = await fetch(window.location.href);
      const html = await response.text();
      return html;
    } catch (error) {
      console.error('Error fetching HTML:', error);
      return null;
    }
  }
  
  async function main() {
    try {
      const html = await getPageHTML();
  
      if (!html) {
        console.error('Failed to fetch HTML');
        return;
      }
  
      const genAILibUrl = chrome.runtime.getURL("scripts/index.mjs");
      console.log(genAILibUrl);
      const contentScript = await import(genAILibUrl);
  
      const API_KEY = "INSERT API KEY";
      const genAI = new contentScript.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
      const prompt = "Output the probability of this code being a scam website: " + html;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log(text);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  main();
