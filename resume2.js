document.addEventListener('DOMContentLoaded', () => {
    
    const templateSelector = document.getElementById('template-selector');
    const resumePreview = document.getElementById('resume-preview');
    const downloadBtn = document.getElementById('download-btn');
    const loadingOverlay = document.getElementById('loading-overlay');

    templateSelector.addEventListener('change', (e) => {
        resumePreview.className = `resume-document ${e.target.value}`;
    });

    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.accordion-item').forEach(acc => acc.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });
   // in this object we have stored all the info typed by the user, so that we can paste it as it is in 
   // different differnt resume formats formates. 
    const bindings = [
        { inputId: 'name', previewId: 'preview-name', defaultText: 'Your Name' },
        { inputId: 'jobTitle', previewId: 'preview-jobTitle', defaultText: 'Professional Title' },
        { inputId: 'email', previewId: 'preview-email', defaultText: 'email@example.com' },
        { inputId: 'phone', previewId: 'preview-phone', defaultText: 'Phone Number' },
        { inputId: 'address', previewId: 'preview-address', defaultText: 'Location' },
        { inputId: 'linkedin', previewId: 'preview-linkedin', defaultText: 'LinkedIn Profile' }
    ];

    bindings.forEach(binding => {
        const inputEl = document.getElementById(binding.inputId);
        const previewEl = document.getElementById(binding.previewId);
        
        if(inputEl && previewEl) {
            inputEl.addEventListener('input', (e) => {
                const val = e.target.value.trim();
                previewEl.textContent = val || binding.defaultText;
                
                const parentItem = previewEl.closest('.preview-contact-item');
                if (parentItem) {
                    if (val) parentItem.classList.remove('hidden');
                    else parentItem.classList.add('hidden');
                }
            });
        }
    });

   // this part handles live priview of the resume based on user info.
   
    function setupTextareaBinding(inputId, previewId, sectionId, emptyHTML) {
        const input = document.getElementById(inputId);
        const preview = document.getElementById(previewId);
        const section = document.getElementById(sectionId);

        if(!input || !preview || !section) return;
        
        input.addEventListener('input', (e) => {
            const val = e.target.value.trim();
            if(!val) {
                preview.innerHTML = emptyHTML;
                section.classList.add('hidden');
                return;
            }
            section.classList.remove('hidden');
            
            if(emptyHTML.includes('<li')) {
                const arr = val.split(',').map(s => s.trim()).filter(s => s);
                preview.innerHTML = arr.map(item => `<li>${item}</li>`).join('');
            } else {
                preview.textContent = val;
            }
        });
        section.classList.add('hidden');
    }
    //This part of the code creates a automatic info typing funtion
    // Experience section for a resume. It stores all experience data in an array

    setupTextareaBinding('summary', 'preview-summary', 'section-summary', 'Briefly describe your professional background...');
    setupTextareaBinding('skills', 'preview-skills', 'section-skills', '<li>Add your skills</li>');
    setupTextareaBinding('languages', 'preview-languages', 'section-languages', '<li>Add languages</li>');
    setupTextareaBinding('interests', 'preview-interests', 'section-interests', '<li>Add interests</li>');

    let experiences = [];
    let educations = [];
    let projects = [];

    const expListContainer = document.getElementById('experience-list');
    const expPreviewContainer = document.getElementById('preview-experience-list');
    document.getElementById('section-experience').classList.add('hidden');

    function renderExperienceForm() {
        expListContainer.innerHTML = '';
        experiences.forEach((exp, index) => {
            const itemHTML = `
                <div class="dynamic-item">
                    <button class="danger-btn remove-btn" style="float: right; margin-bottom: 5px;" onclick="removeExperience(${index})">
                        <i class="fa-solid fa-trash"></i> Remove
                    </button>
                    <div class="input-group">
                        <label>Job Title</label>
                        <input type="text" value="${exp.title}" oninput="updateExperience(${index}, 'title', this.value)">
                    </div>
                    <div class="input-group">
                        <label>Company</label>
                        <input type="text" value="${exp.company}" oninput="updateExperience(${index}, 'company', this.value)">
                    </div>
                    <div class="input-group">
                        <label>Dates (e.g., Jan 2020 - Present)</label>
                        <input type="text" value="${exp.dates}" oninput="updateExperience(${index}, 'dates', this.value)">
                    </div>
                    <div class="input-group">
                        <div class="label-header">
                            <label>Description</label>
                            <button class="btn ai-btn small-btn" onclick="enhanceExpDescription(${index})">AI Enhance</button>
                        </div>
                        <textarea rows="3" oninput="updateExperience(${index}, 'description', this.value)">${exp.description}</textarea>
                    </div>
                </div>
            `;
            expListContainer.insertAdjacentHTML('beforeend', itemHTML);
        });
    }

    // this part shows live preview of the resume before downloading...

    function renderExperiencePreview() {
        if(experiences.length === 0) document.getElementById('section-experience').classList.add('hidden');
        else document.getElementById('section-experience').classList.remove('hidden');

        expPreviewContainer.innerHTML = experiences.map(exp => `
            <div class="preview-item">
                <div class="preview-item-header">
                    <span class="preview-item-title">${exp.title || 'Job Title'}</span>
                    <span class="preview-item-date">${exp.dates || 'Dates'}</span>
                </div>
                <div class="preview-item-subtitle">${exp.company || 'Company Name'}</div>
                ${exp.description ? `<div style="margin-top: 0.25rem; white-space: pre-wrap; font-size: 0.9em;">${exp.description}</div>` : ''}
            </div>
        `).join('');
    }

    window.addExperience = () => { experiences.push({ title: '', company: '', dates: '', description: '' }); renderExperienceForm(); renderExperiencePreview(); };
    window.updateExperience = (index, field, value) => { experiences[index][field] = value; renderExperiencePreview(); };
    window.removeExperience = (index) => { experiences.splice(index, 1); renderExperienceForm(); renderExperiencePreview(); };
    document.getElementById('add-experience-btn').addEventListener('click', window.addExperience);

    const eduListContainer = document.getElementById('education-list');
    const eduPreviewContainer = document.getElementById('preview-education-list');
    document.getElementById('section-education').classList.add('hidden');

    function renderEducationForm() {
        eduListContainer.innerHTML = '';
        educations.forEach((edu, index) => {
            const itemHTML = `
                <div class="dynamic-item">
                    <button class="danger-btn remove-btn" style="float: right; margin-bottom: 5px;" onclick="removeEducation(${index})">
                        <i class="fa-solid fa-trash"></i> Remove
                    </button>
                    <div class="input-group">
                        <label>Degree / Certificate</label>
                        <input type="text" value="${edu.degree}" oninput="updateEducation(${index}, 'degree', this.value)">
                    </div>
                    <div class="input-group">
                        <label>School / University</label>
                        <input type="text" value="${edu.school}" oninput="updateEducation(${index}, 'school', this.value)">
                    </div>
                    <div class="input-group">
                        <label>Year / Dates</label>
                        <input type="text" value="${edu.dates}" oninput="updateEducation(${index}, 'dates', this.value)">
                    </div>
                    <div class="input-group">
                        <label>GPA / Marks (Optional)</label>
                        <input type="text" value="${edu.gpa}" oninput="updateEducation(${index}, 'gpa', this.value)">
                    </div>
                </div>
            `;
            eduListContainer.insertAdjacentHTML('beforeend', itemHTML);
        });
    }

    function renderEducationPreview() {
        if(educations.length === 0) document.getElementById('section-education').classList.add('hidden');
        else document.getElementById('section-education').classList.remove('hidden');

        eduPreviewContainer.innerHTML = educations.map(edu => `
            <div class="preview-item">
                <div class="preview-item-header">
                    <span class="preview-item-title">${edu.degree || 'Degree'}</span>
                    <span class="preview-item-date">${edu.dates || 'Year'}</span>
                </div>
                <div class="preview-item-subtitle">${edu.school || 'School/University'}${edu.gpa ? ` | ${edu.gpa}` : ''}</div>
            </div>
        `).join('');
    }

    window.addEducation = () => { educations.push({ degree: '', school: '', dates: '', gpa: '' }); renderEducationForm(); renderEducationPreview(); };
    window.updateEducation = (index, field, value) => { educations[index][field] = value; renderEducationPreview(); };
    window.removeEducation = (index) => { educations.splice(index, 1); renderEducationForm(); renderEducationPreview(); };
    document.getElementById('add-education-btn').addEventListener('click', window.addEducation);

    const projListContainer = document.getElementById('project-list');
    const projPreviewContainer = document.getElementById('preview-project-list');
    document.getElementById('section-projects').classList.add('hidden');

    function renderProjectForm() {
        projListContainer.innerHTML = '';
        projects.forEach((proj, index) => {
            const itemHTML = `
                <div class="dynamic-item">
                    <button class="danger-btn remove-btn" style="float: right; margin-bottom: 5px;" onclick="removeProject(${index})">
                        <i class="fa-solid fa-trash"></i> Remove
                    </button>
                    <div class="input-group">
                        <label>Project Title</label>
                        <input type="text" value="${proj.title}" oninput="updateProject(${index}, 'title', this.value)">
                    </div>
                    <div class="input-group">
                        <label>Tech Stack</label>
                        <input type="text" value="${proj.stack}" oninput="updateProject(${index}, 'stack', this.value)" placeholder="e.g., React, Node, MongoDB">
                    </div>
                    <div class="input-group">
                        <label>Project Link</label>
                        <input type="text" value="${proj.link}" oninput="updateProject(${index}, 'link', this.value)" placeholder="github.com/your-project">
                    </div>
                    <div class="input-group">
                        <label>Description</label>
                        <textarea rows="3" oninput="updateProject(${index}, 'description', this.value)"></textarea>
                    </div>
                </div>
            `;
            projListContainer.insertAdjacentHTML('beforeend', itemHTML);

            const textareas = projListContainer.querySelectorAll('textarea');
            textareas[index].value = proj.description;
        });
    }

    function renderProjectPreview() {
        if(projects.length === 0) document.getElementById('section-projects').classList.add('hidden');
        else document.getElementById('section-projects').classList.remove('hidden');

        projPreviewContainer.innerHTML = projects.map(proj => `
            <div class="preview-item">
                <div class="preview-item-header">
                    <span class="preview-item-title">${proj.title || 'Project Name'}</span>
                    <span class="preview-item-date">${proj.link || ''}</span>
                </div>
                <div class="preview-item-subtitle">${proj.stack || 'Tech Stack'}</div>
                ${proj.description ? `<div style="margin-top: 0.25rem; white-space: pre-wrap; font-size: 0.9em;">${proj.description}</div>` : ''}
            </div>
        `).join('');
    }

    window.addProject = () => { projects.push({ title: '', stack: '', link: '', description: '' }); renderProjectForm(); renderProjectPreview(); };
    window.updateProject = (index, field, value) => { projects[index][field] = value; renderProjectPreview(); };
    window.removeProject = (index) => { projects.splice(index, 1); renderProjectForm(); renderProjectPreview(); };
    document.getElementById('add-project-btn').addEventListener('click', window.addProject);

    function showLoading() { loadingOverlay.classList.remove('hidden'); }
    function hideLoading() { loadingOverlay.classList.add('hidden'); }

// this function affects the behaviour of the ai summery generation option...

    document.getElementById('generate-summary-btn').addEventListener('click', async () => {
        const jobTitle = document.getElementById('jobTitle').value.trim();
        const skills = document.getElementById('skills').value.trim();
        if (!jobTitle) { alert("Please enter a Profession Title first so the AI knows what to write about."); return; }
        // if profession is note typed by the user this part gets a notification on screen about then problem...
        showLoading();
        const newSummary = await generateSummary(jobTitle, skills || 'General');
        hideLoading();

        if (newSummary) {
            document.getElementById('summary').value = newSummary;
            document.getElementById('summary').dispatchEvent(new Event('input'));
        }
    });
    // we send ai api requests in this part 
    document.getElementById('suggest-skills-btn').addEventListener('click', async () => {
        const jobTitle = document.getElementById('jobTitle').value.trim();
        if (!jobTitle) { alert("Please enter a Professional Title first."); return; }

        showLoading();
        const suggestedSkills = await suggestSkills(jobTitle);
        hideLoading();

        if (suggestedSkills) {
            const skillsInput = document.getElementById('skills');
            const current = skillsInput.value.trim();
            skillsInput.value = current ? `${current}, ${suggestedSkills}` : suggestedSkills;
            skillsInput.dispatchEvent(new Event('input'));
        }
    });
   // ai api request to enhanace the para
    window.enhanceExpDescription = async (index) => {
        const currentDesc = experiences[index].description;
        if (!currentDesc || currentDesc.length < 5) { alert("Please write a few words first."); return; }

        showLoading();
        const enhanced = await enhanceBulletLevel(currentDesc);
        hideLoading();

        if (enhanced) {
            experiences[index].description = enhanced;
            renderExperienceForm();
            renderExperiencePreview(); 
        }
    };
    // this part manages downloading og the pdf 
    downloadBtn.addEventListener('click', async () => {
        const element = document.getElementById('resume-preview');
        try {
            const canvas = await html2canvas(element, { scale: 2, useCORS: true, logging: false });
            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            const pdf = new window.jspdf.jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
            
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${document.getElementById('name').value.trim() || 'Resume'}.pdf`);
        } catch (err) {
            console.error(err);
            alert("Error generating PDF. Please try again.");
        }
    });
});
