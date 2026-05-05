document.addEventListener('DOMContentLoaded', function () {
    // Select all image elements and tier container elements on the page
    const images = document.querySelectorAll('img');
    const tiers = document.querySelectorAll('.tier-items');
  
    // Enable drag functionality for all images
    images.forEach(img => {
        img.setAttribute('draggable', true); // Allow images to be dragged
        img.addEventListener('dragstart', handleDragStart); // When drag starts, call handleDragStart
        img.addEventListener('dragend', handleDragEnd); // When drag ends, call handleDragEnd
    });
  
    // Enable drop functionality on all tier containers
    tiers.forEach(tier => {
        tier.addEventListener('dragover', handleDragOver); // Allow drag over tier containers
        tier.addEventListener('drop', handleDrop); // When drop happens, call handleDrop
    });
  
    // Handle the event when dragging starts
    function handleDragStart(event) {
        // Store a reference to the image being dragged
        event.dataTransfer.setData('text/plain', event.target.src); // Store the image source in the drag data
        event.target.style.opacity = 0.5; // Make the dragged image semi-transparent
    }
  
    // Handle the event when dragging ends
    function handleDragEnd(event) {
        event.target.style.opacity = ''; // Reset the image opacity after dragging ends
    }
  
    // Handle the event when an image is dragged over a drop target
    function handleDragOver(event) {
        event.preventDefault(); // Allow the drop by preventing the default behavior
    }
  
    // Handle the event when an image is dropped onto a tier container
    function handleDrop(event) {
        event.preventDefault(); // Prevent the default action of the drop
        const imageSrc = event.dataTransfer.getData('text/plain'); // Retrieve the image source from the drag data
        const image = document.querySelector(`img[src="${imageSrc}"]`); // Find the image element by its source
        
        if (image && event.target.classList.contains('tier-items')) {
            // If the drop target is a tier container, append the image to it
            event.target.appendChild(image);
        }
    }
  
    // Reset button functionality
    const resetButton = document.getElementById('reset'); // Select the reset button by its ID
    resetButton.addEventListener('click', function () {
        // Select all tier containers and the unassigned container
        const containers = document.querySelectorAll('.tier-items');
        const unassignedContainer = document.querySelector('.container:nth-child(2)');
  
        // Move all images from the tier containers back to the unassigned container
        containers.forEach(container => {
            while (container.firstChild) {
                unassignedContainer.appendChild(container.firstChild); // Append each image to the unassigned container - adds to the existing container
            }
        });
    });
  });
  