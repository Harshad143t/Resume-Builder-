const GEMINI_API_KEY = "AIzaSyB4zhU81fuEsUFWCBY33ZbV5Laj1QIv0Lc";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

async function generateGeminiContent(prompt) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 500
                }
            })
        });

        const data = await response.json();

        if (!response.ok) {
            
            if (response.status === 429) {
                
                throw new Error(`API Quota Exceeded (429).\n\nYour API key [${GEMINI_API_KEY.slice(0,10)}...] has hit Google's free rate limit map. \n\nPlease wait a minute and try clicking the button again, or generate a completely new API key at aistudio.google.com.`);
            }
            throw new Error(data.error?.message || `API Error: ${response.status}`);
        }

        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Error from Gemini API:", error);
        alert(error.message || "Failed to connect to AI. Please check the console for details.");
        return null;
    }
}
 
// we can make chnges in this part to change gemini responses.. like short or long summery suggetions...

async function enhanceBulletLevel(text) {
    const prompt = `You are an expert resume writer. Enhance the following work experience description to sound more professional, impactful, and action-oriented. Keep it concise (2-3 sentences max). Return JUST the text, no markdown, no quotes.\n\nOriginal Text: "${text}"\n\nEnhanced Text:`;
    return await generateGeminiContent(prompt);
}

async function generateSummary(jobTitle, skills) {
    const prompt = `You are an expert resume writer. Write a concise, 3-sentence professional summary for a resume. 
The candidate's title is "${jobTitle}". 
Their key skills are: "${skills}". 
Make it sound compelling, professional, and action-oriented. Return only the summary text without quotes or markdown.`;
    return await generateGeminiContent(prompt);
}

async function suggestSkills(jobTitle) {
    const prompt = `You are an expert recruiter. Suggest exactly 10 highly relevant skills (a mix of hard and soft skills) for a "${jobTitle}". 
Return them as a simple comma-separated list. No other text or formatting. Example: JavaScript, Leadership, React, Communication`;
    return await generateGeminiContent(prompt);
}
