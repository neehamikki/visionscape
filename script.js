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

            const deleteBtn = document.createElement('div');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.innerText = 'X';
            deleteBtn.addEventListener('click', function() {
                container.removeChild(wrapper);  // Remove the image wrapper
            });

            wrapper.appendChild(deleteBtn);
            wrapper.appendChild(img);
            container.appendChild(wrapper);

            // Add popup window for the image
            const popupWindow = createPopupWindow();

            // Double-click event to show the popup
            wrapper.addEventListener('dblclick', function() {
                popupWindow.style.display = 'block';  // Show the popup window
            });

            // Add event listener to highlight the wrapper when selected
            wrapper.addEventListener('click', function() {
                document.querySelectorAll('.draggable-resizable-wrapper').forEach(el => el.classList.remove('selected'));
                wrapper.classList.add('selected');
            });

            // Make image draggable and resizable with aspect ratio lock
            makeDraggableAndResizable(wrapper, img);
        };
        reader.readAsDataURL(files[i]);
    }
});

function makeDraggableAndResizable(wrapper, img) {
    // Use jQuery UI to make the wrapper draggable and resizable
    $(wrapper).draggable({
        containment: '#canvas-container',  // Keep the wrapper inside the canvas container
    }).resizable({
        aspectRatio: true,  // Maintain aspect ratio during resizing
        handles: 'n, e, s, w, se',  // Allow resizing from corners and edges
        containment: '#canvas-container',  // Prevent resizing outside the container
        resize: function(event, ui) {
            // Update img size to fill the wrapper
            img.style.width = `${ui.size.width}px`;
            img.style.height = `${ui.size.height}px`;
        }
    });
}

// Function to create a popup window
function createPopupWindow() {
    const popupWindow = document.createElement('div');
    popupWindow.classList.add('popup-window');

    const closeBtn = document.createElement('div');
    closeBtn.classList.add('popup-close-btn');
    closeBtn.innerText = 'X';
    closeBtn.addEventListener('click', function() {
        popupWindow.style.display = 'none';  // Close the popup window
    });

    popupWindow.appendChild(closeBtn);
    document.body.appendChild(popupWindow);

    return popupWindow;
}
