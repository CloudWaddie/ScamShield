async function getPageHTML() {
    try {
      const response = await fetch(window.location.href);
      const html = await response.text();
      return html;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }


html = getPageHTML();
genAILibUrl = chrome.runtime.getURL("scripts/index.mjs");
console.log(genAILibUrl);
const contentScript = import(genAILibUrl);

const API_KEY = "AIzaSyDKmMsbeZL2AS5_efC3KPPwuVYYzHaGuFc";
const genAI = new contentScript.GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

async function send(html) {
    const prompt = "Output the probabilty of this code being a scam website: " + html;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  }
  
console.log(send(html));