
document.addEventListener('DOMContentLoaded', (event) => {
    const studentBtn = document.getElementById('nav-btn-student');
    const requestBtn = document.getElementById('nav-btn-request');
    const studentContainer = document.querySelector('.container-students');
    const requestContainer = document.querySelector('.container-request');

    studentBtn.addEventListener('click', () => {
        // Show student container and hide request container
        studentContainer.style.display = 'block';
        requestContainer.style.display = 'none';

        // Update button styles
        studentBtn.classList.add('active-btn');
        requestBtn.classList.remove('active-btn');
    });

    requestBtn.addEventListener('click', () => {
        // Show request container and hide student container
        requestContainer.style.display = 'block';
        studentContainer.style.display = 'none';

        // Update button styles
        requestBtn.classList.add('active-btn');
        studentBtn.classList.remove('active-btn');
    });
});