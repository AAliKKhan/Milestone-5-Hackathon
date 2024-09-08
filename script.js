"use strict";
const formButton = document.getElementById('buildResumeBtn');
const shareLinkButton = document.getElementById('shareLinkBtn');
const downloadPdfButton = document.getElementById('downloadPdfBtn');
formButton.addEventListener('click', () => {
    var _a, _b, _c, _d, _e, _f, _g;
    const name = ((_a = document.querySelector('#name')) === null || _a === void 0 ? void 0 : _a.value.trim()) || 'Not Provided';
    const nationality = ((_b = document.querySelector('#nationality')) === null || _b === void 0 ? void 0 : _b.value.trim()) || 'Not Provided';
    const religion = ((_c = document.querySelector('#religion')) === null || _c === void 0 ? void 0 : _c.value.trim()) || 'Not Provided';
    const gender = ((_d = document.querySelector('input[name="gender"]:checked')) === null || _d === void 0 ? void 0 : _d.value) || 'Not Specified';
    const education = ((_e = document.querySelector('#education')) === null || _e === void 0 ? void 0 : _e.value.trim()) || 'Not Provided';
    const workExperience = ((_f = document.querySelector('#workExperience')) === null || _f === void 0 ? void 0 : _f.value.trim()) || 'Not Provided';
    const skills = ((_g = document.querySelector('#skills')) === null || _g === void 0 ? void 0 : _g.value.trim()) || 'Not Provided';
    const personalInfo = { name, nationality, religion, gender };
    const otherInfo = { education, workExperience, skills };
    generateResume(personalInfo, otherInfo);
    // Display share link and download buttons
    shareLinkButton.style.display = 'block';
    downloadPdfButton.style.display = 'block';
    const uniqueUrl = `${name.toLowerCase().replace(/\s+/g, '')}.vercel.app/resume`;
    shareLinkButton.addEventListener('click', () => {
        prompt("Copy this link to share your resume:", uniqueUrl);
    });
});
function generateResume(personalInfo, otherInfo) {
    const resumeContainer = document.getElementById('resumeContainer');
    resumeContainer.innerHTML = `
        <div id="personalInfo">
            <h2>Personal Information</h2>
            <p><strong>Name:</strong> ${personalInfo.name}</p>
            <p><strong>Nationality:</strong> ${personalInfo.nationality}</p>
            <p><strong>Religion:</strong> ${personalInfo.religion}</p>
            <p><strong>Gender:</strong> ${personalInfo.gender}</p>
        </div>
        <div id="education">
            <h2>Education</h2>
            <p>${otherInfo.education}</p>
        </div>
        <div id="workExperience">
            <h2>Work Experience</h2>
            <p>${otherInfo.workExperience}</p>
        </div>
        <div id="skills">
            <h2>Skills</h2>
            <p>${otherInfo.skills}</p>
        </div>
    `;
    downloadPdfButton.addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text(20, 20, `Resume of ${personalInfo.name}`);
        doc.text(20, 30, `Nationality: ${personalInfo.nationality}`);
        doc.text(20, 40, `Religion: ${personalInfo.religion}`);
        doc.text(20, 50, `Gender: ${personalInfo.gender}`);
        doc.text(20, 60, `Education: ${otherInfo.education}`);
        doc.text(20, 70, `Work Experience: ${otherInfo.workExperience}`);
        doc.text(20, 80, `Skills: ${otherInfo.skills}`);
        doc.save(`${personalInfo.name}_Resume.pdf`);
    });
}
