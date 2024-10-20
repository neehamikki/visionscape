document.getElementById('upload-btn').addEventListener('change', function(event) {
    const files = event.target.files;
    const container = document.getElementById('canvas-container');

    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.classList.add('draggable-image');
            img.style.top = `${Math.random() * (container.clientHeight - 100)}px`; // Prevent overflow
            img.style.left = `${Math.random() * (container.clientWidth - 100)}px`; // Prevent overflow
            container.appendChild(img);

            // Make image draggable and resizable with aspect ratio lock
            makeDraggableAndResizable(img);
        };
        reader.readAsDataURL(files[i]);
    }
});

function makeDraggableAndResizable(element) {
    // Use jQuery UI to make the image draggable and resizable
    $(element).draggable({
        containment: '#canvas-container', // Keep the image within the container
    }).resizable({
        aspectRatio: true,  // Maintain the aspect ratio while resizing
        handles: 'n, e, s, w, se',  // Allow resizing from edges and corners
        containment: '#canvas-container',  // Prevent resizing outside the container
    });
}
