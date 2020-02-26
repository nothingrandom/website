const toggleInputs = document.querySelectorAll('.toggle__input');

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    toggleInputs.forEach((toggle) => {
      toggle.checked = false;
    });
  }
});
