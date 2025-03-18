function toggleSection(sectionId) {
    const sections = document.querySelectorAll('section'); 
    sections.forEach((section) => {

    section.classList.remove('active');
    });
    
    const activeSection = document.getElementById(sectionId);
    if (activeSection) { 
        // Only add if it's not already active
        if (!activeSection.classList.contains('active')) {
            activeSection.classList.add('active');
        }
    } else {
        console.warn(`Section with ID '${sectionId}' not found.`);
    }
}