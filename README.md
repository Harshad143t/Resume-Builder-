# Resume Builder — AI Powered

A fully client-side, browser-based resume builder with live preview, five professional templates, and Google Gemini AI integration for generating summaries, suggesting skills, and enhancing work experience descriptions. No backend, no login, no cost.

---

## Live Demo

Open `resume2.html` directly in any modern browser. No installation or server required.

---

## Features

**Core**
- Real-time live preview — every keystroke updates the resume instantly, no button click needed
- Eight form sections in an accordion UI: Personal Information, Professional Summary, Work Experience, Education, Projects, Skills, Languages, and Interests
- Dynamic sections — add and remove multiple Work Experience, Education, and Project entries individually
- Five professionally designed templates switchable in real time from the navigation bar
- PDF export named after the user's entered name using html2canvas and jsPDF

**AI-Powered (Google Gemini 2.5 Flash)**
- Generate Summary — writes a professional 3-sentence summary from your job title and skills
- Suggest Skills — suggests 10 relevant hard and soft skills for any given role
- Enhance Experience — rewrites work experience descriptions to be action-oriented and impactful

---

## Project Structure

```
resume-builder/
├── resume2.html       # Page structure, accordion form, live preview layout
├── resume.css         # All styling — app UI and five template themes
├── resume2.js         # All interactive logic, real-time bindings, dynamic sections, PDF export
└── gemini-api.js      # Google Gemini AI API communication
```

---

## Getting Started

**1. Clone the repository**

```bash
git clone https://github.com/your-username/resume-builder.git
cd resume-builder
```

**2. Add your Gemini API key**

Open `gemini-api.js` and replace the existing key with your own:

```js
const GEMINI_API_KEY = "YOUR_API_KEY_HERE";
```

Get a free API key at [https://aistudio.google.com](https://aistudio.google.com)

**3. Open in browser**

```bash
# Simply open the file directly
open resume2.html
```

No server, no build step, no npm install.

---

## Usage

1. Open `resume2.html` in Chrome, Firefox, Edge, or Safari
2. Fill in your details across the accordion sections on the left panel
3. Watch the resume preview update live on the right panel
4. Use AI buttons to generate content — requires an active internet connection
5. Select a template from the dropdown in the top navigation bar
6. Click **Download PDF** to save your resume as a PDF named after your entered name

---

## AI Features — How They Work

All AI calls are made directly from the browser to the Google Gemini 2.5 Flash API using the Fetch API. No intermediate server is involved.

**Generate Summary**
Requires: Professional Title (and optionally Skills)
Prompt instructs Gemini to write a 3-sentence, action-oriented professional summary.

**Suggest Skills**
Requires: Professional Title
Returns exactly 10 relevant hard and soft skills as a comma-separated list, appended to any existing skills.

**Enhance Experience**
Requires: A written experience description (minimum 5 characters)
Rewrites the description to be professional, impactful, and concise (2-3 sentences).

> Note: The API key is embedded in `gemini-api.js` for demonstration purposes. For any public deployment, protect the key using a backend proxy.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| HTML5 | — | Page structure and form layout |
| CSS3 | — | Styling, five template themes, responsive layout |
| JavaScript | ES6+ | Real-time bindings, dynamic sections, PDF logic |
| Google Gemini API | gemini-2.5-flash | AI content generation |
| jsPDF | 2.5.1 | PDF document creation |
| html2canvas | 1.4.1 | Captures preview pane as image for PDF |

All external libraries are loaded via CDN — no local dependencies.

---

## How Data Works

All resume data stays entirely in the browser session. Simple fields (name, email, etc.) are bound directly to preview elements via `input` event listeners. Dynamic sections (Experience, Education, Projects) are stored as JavaScript arrays and re-rendered on every change.

No personal data is sent to any server. The only outbound request is the prompt text sent to the Gemini API when an AI button is clicked. Closing or refreshing the tab clears all entered data.

---


JavaScript must be enabled. Internet connection required for CDN libraries and AI features.

---


Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

---
Try Resume builder while creating your Resume. The application is currently live and accessible at: [Resume Builder]())

