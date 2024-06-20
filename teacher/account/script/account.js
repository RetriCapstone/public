document.getElementById('change-pass').addEventListener('change', function() {
    var form = document.getElementById('form-change-password');
    if (this.checked) {
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }
});