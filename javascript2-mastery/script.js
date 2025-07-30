// Select elements
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-modal');
const modalTitle = document.querySelector('.modal-title');
const modalMessage = document.querySelector('.modal-message');

// Open modal
function openModal() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

// Close modal
function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  // Clear modal content when closed (optional)
  modalTitle.textContent = '';
  modalMessage.textContent = '';
}

// ✅ Reusable function
function showModal(title, message) {
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  openModal();
}

// Event listeners
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
