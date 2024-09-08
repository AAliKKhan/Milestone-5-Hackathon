declare global {
    interface Window {
        jspdf: any;
    }
}

const formButton = document.getElementById('buildResumeBtn') as HTMLButtonElement;
const shareLinkButton = document.getElementById('shareLinkBtn') as HTMLButtonElement;
const downloadPdfButton = document.getElementById('downloadPdfBtn') as HTMLButtonElement;

formButton.addEventListener('click', () => {
    const name = (document.querySelector('#name') as HTMLInputElement)?.value.trim() || 'Not Provided';
    const nationality = (document.querySelector('#nationality') as HTMLInputElement)?.value.trim() || 'Not Provided';
    const religion = (document.querySelector('#religion') as HTMLInputElement)?.value.trim() || 'Not Provided';
    const gender = (document.querySelector('input[name="gender"]:checked') as HTMLInputElement)?.value || 'Not Specified';
    const education = (document.querySelector('#education') as HTMLTextAreaElement)?.value.trim() || 'Not Provided';
    const workExperience = (document.querySelector('#workExperience') as HTMLTextAreaElement)?.value.trim() || 'Not Provided';
    const skills = (document.querySelector('#skills') as HTMLTextAreaElement)?.value.trim() || 'Not Provided';

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

function generateResume(personalInfo: any, otherInfo: any) {
    const resumeContainer = document.getElementById('resumeContainer')!;
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
    });}