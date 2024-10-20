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
            deleteBtn.innerText = '';
            deleteBtn.addEventListener('click', function() {
                container.removeChild(wrapper);  // Remove the image wrapper
            });

            wrapper.appendChild(deleteBtn);
            wrapper.appendChild(img);
            container.appendChild(wrapper);

            // Create empty popup window
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
            // Update img size to fit inside the wrapper
            const wrapperWidth = ui.size.width;
            const wrapperHeight = ui.size.height;

            // Calculate the new image dimensions
            const aspectRatio = img.naturalWidth / img.naturalHeight;
            let newWidth = wrapperWidth;
            let newHeight = wrapperHeight;

            // Resize the image based on the wrapper dimensions
            if (newWidth / aspectRatio > newHeight) {
                newWidth = newHeight * aspectRatio; // Fit by height
            } else {
                newHeight = newWidth / aspectRatio; // Fit by width
            }

            img.style.width = `${newWidth}px`;
            img.style.height = `${newHeight}px`;
        }
    });

    // Initially set image size to fit within the wrapper
    const container = document.getElementById('canvas-container');
    const wrapperWidth = wrapper.clientWidth;
    const wrapperHeight = wrapper.clientHeight;

    const aspectRatio = img.naturalWidth / img.naturalHeight;
    let newWidth = wrapperWidth;
    let newHeight = wrapperHeight;

    // Calculate the dimensions to ensure both width and height fit
    if (newWidth / aspectRatio > newHeight) {
        newWidth = newHeight * aspectRatio; // Fit by height
    } else {
        newHeight = newWidth / aspectRatio; // Fit by width
    }

    // Set the size of the image
    img.style.width = `${newWidth}px`;
    img.style.height = `${newHeight}px`;
}



// Function to create a popup window with a textarea for user input
function createPopupWindow() {
    const popupWindow = document.createElement('div');
    popupWindow.classList.add('popup-window');

    // Create close button
    const closeBtn = document.createElement('div');
    closeBtn.classList.add('popup-close-btn');
    closeBtn.innerText = '';
    closeBtn.addEventListener('click', function() {
        popupWindow.style.display = 'none';  // Close the popup window
    });

    // Create a textarea for user input
    const textarea = document.createElement('textarea');
    textarea.placeholder = "Type your notes here..."; // Placeholder text
    textarea.style.width = '100%';
    textarea.style.height = '80%';
    textarea.style.margin = '10px'; // Add margins
    textarea.style.boxSizing = 'border-box'; // Include padding and border in width/height
    textarea.style.resize = 'none'; // Prevent resizing of the textarea

    // Append the textarea and close button to the popup window
    popupWindow.appendChild(closeBtn);
    popupWindow.appendChild(textarea);

    document.body.appendChild(popupWindow);  // Append popup to body (not canvas-container)

    return popupWindow;
}

