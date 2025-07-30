const openBtn = document.querySelector('.open-modal-btn');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-modal');

// Function to open modal
function openModal() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

// Function to close modal
function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

// Events
openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
