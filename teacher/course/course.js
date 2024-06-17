document.addEventListener('DOMContentLoaded', () => {
  const selectCourse = document.getElementById('created-course');

  if (selectCourse) {
      selectCourse.addEventListener('click', () => {
          window.location.href = "select-course.php";
      });
  }

  // Modal class definition
  class Modal {
      constructor(modalId, triggerId, closeClass) {
          this.modal = document.getElementById(modalId);
          this.btn = document.getElementById(triggerId);
          this.span = document.getElementsByClassName(closeClass)[0];

          // Ensure elements are found before adding event listeners
          if (this.btn && this.span && this.modal) {
              // Bind methods to the current instance
              this.openModal = this.openModal.bind(this);
              this.closeModal = this.closeModal.bind(this);
              this.outsideClick = this.outsideClick.bind(this);

              // Attach event listeners
              this.btn.addEventListener('click', this.openModal);
              this.span.addEventListener('click', this.closeModal);
              window.addEventListener('click', this.outsideClick);
          } else {
              console.error(`Elements not found for modal: ${modalId}, trigger: ${triggerId}, close: ${closeClass}`);
          }
      }

      openModal() {
          this.modal.style.display = "block";
      }

      closeModal() {
          this.modal.style.display = "none";
      }

      outsideClick(event) {
          if (event.target === this.modal) {
              this.modal.style.display = "none";
          }
      }
  }

  // Create instances of the Modal class
  new Modal("modal-create-course", "btn-create-course", "close-modal");
  new Modal("modal-create-module", "btn-create-module", "close-modal");
});
