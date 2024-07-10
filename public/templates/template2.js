document.addEventListener('DOMContentLoaded', () => {
  console.log('Template 2 JavaScript is loaded.');

  const sections = document.querySelectorAll('main section');
  const navLinks = document.querySelectorAll('nav ul li a');
  const fileInput = document.getElementById('file-input');
  const galleryItems = document.querySelectorAll('.gallery-item img');
  const mainTitle = document.getElementById('main-title');
  let currentElement = null;

  navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.querySelector(link.getAttribute('href'));
          sections.forEach(section => section.classList.add('hidden'));
          target.classList.remove('hidden');
      });
  });

  document.body.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      if (e.target.tagName === 'IMG' && e.target.parentElement.classList.contains('gallery-item')) {
          currentElement = e.target;
          fileInput.click();
      }
  });

  fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file && currentElement) {
          const reader = new FileReader();
          reader.onload = (e) => {
              currentElement.src = e.target.result;
              alert('Image uploaded successfully!');
          };
          reader.readAsDataURL(file);
      } else {
          alert('Please select an image to upload.');
      }
  });

  galleryItems.forEach(item => {
      item.setAttribute('draggable', true);

      item.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', e.target.dataset.index);
          e.target.classList.add('dragging');
      });

      item.addEventListener('dragend', (e) => {
          e.target.classList.remove('dragging');
      });

      item.addEventListener('dragover', (e) => {
          e.preventDefault();
      });

      item.addEventListener('drop', (e) => {
          e.preventDefault();
          const draggedIndex = e.dataTransfer.getData('text/plain');
          const draggedElement = document.querySelector(`img[data-index='${draggedIndex}']`);
          const dropTarget = e.target;

          if (draggedElement !== dropTarget) {
              const draggedParent = draggedElement.parentElement;
              const dropTargetParent = dropTarget.parentElement;

              draggedParent.appendChild(dropTarget);
              dropTargetParent.appendChild(draggedElement);
          }
      });
  });

  mainTitle.addEventListener('click', () => {
      window.location.reload();
  });

  document.querySelectorAll('nav ul li').forEach(li => {
      li.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.querySelector(li.querySelector('a').getAttribute('href'));
          sections.forEach(section => section.classList.add('hidden'));
          target.classList.remove('hidden');
      });
  });
});
