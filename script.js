document.getElementById('upload-btn').addEventListener('change', function(event) {
    const files = event.target.files;
    const container = document.getElementById('canvas-container');

    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const wrapper = document.createElement('div');
            wrapper.classList.add('draggable-resizable-wrapper');

            const img = document.createElement('img');
            img.src = e.target.result;
            img.classList.add('draggable-image');

            // Create delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'X';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.style.display = 'none';  // Hidden by default

            // Show delete button when clicking on the wrapper
            wrapper.addEventListener('click', function(event) {
                event.stopPropagation();  // Prevent click propagation
                deleteBtn.style.display = 'block';  // Show the delete button
            });

            // Delete the image when the delete button is clicked
            deleteBtn.addEventListener('click', function() {
                wrapper.remove();
            });

            // Set image's initial size to 1/16th of its natural size while maintaining aspect ratio
            img.onload = function() {
                const naturalWidth = img.naturalWidth;
                const naturalHeight = img.naturalHeight;

                // Scale down by a factor of 4 to get 1/16th of the area
                const scaledWidth = naturalWidth / 4;
                const scaledHeight = naturalHeight / 4;

                // Set wrapper's size based on the scaled image size
                wrapper.style.width = `${scaledWidth}px`;
                wrapper.style.height = `${scaledHeight}px`;

                wrapper.appendChild(img);
                wrapper.appendChild(deleteBtn);  // Add the delete button to the wrapper

                // Find a non-overlapping position
                const position = findNonOverlappingPosition(container, wrapper, scaledWidth, scaledHeight);
                wrapper.style.left = `${position.x}px`;
                wrapper.style.top = `${position.y}px`;

                container.appendChild(wrapper);

                // Make image draggable and resizable
                makeDraggableAndResizable(wrapper, img);
            };
        };
        reader.readAsDataURL(files[i]);
    }
});

function findNonOverlappingPosition(container, wrapper, imgWidth, imgHeight) {
    const existingImages = container.getElementsByClassName('draggable-resizable-wrapper');
    let foundPosition = false;
    let posX, posY;

    while (!foundPosition) {
        // Generate random positions for the new image
        posX = Math.random() * (container.clientWidth - imgWidth);
        posY = Math.random() * (container.clientHeight - imgHeight);

        const newCenterX = posX + imgWidth / 2;
        const newCenterY = posY + imgHeight / 2;
        const newRadius = 0.7 * Math.min(imgWidth, imgHeight) / 2;

        foundPosition = true;

        for (let i = 0; i < existingImages.length; i++) {
            const existingImage = existingImages[i];
            const existingWidth = existingImage.clientWidth;
            const existingHeight = existingImage.clientHeight;
            const existingCenterX = existingImage.offsetLeft + existingWidth / 2;
            const existingCenterY = existingImage.offsetTop + existingHeight / 2;
            const existingRadius = 0.7 * Math.min(existingWidth, existingHeight) / 2;

            const distance = Math.sqrt(
                Math.pow(existingCenterX - newCenterX, 2) +
                Math.pow(existingCenterY - newCenterY, 2)
            );

            if (distance < (newRadius + existingRadius)) {
                foundPosition = false;
                break;
            }
        }
    }

    return { x: posX, y: posY };
}

function makeDraggableAndResizable(wrapper, img) {
    $(wrapper).draggable({
        containment: '#canvas-container',
    }).resizable({
        aspectRatio: true,
        handles: 'n, e, s, w, se',
        containment: '#canvas-container',
        resize: function(event, ui) {
            img.style.width = `${ui.size.width}px`;
            img.style.height = `${ui.size.height}px`;
        }
    });
}
