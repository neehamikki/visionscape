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
            
            wrapper.appendChild(img);
            container.appendChild(wrapper);

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
            // Adjust the img size to fit within the wrapper, maintaining aspect ratio
            img.style.width = '100%';
            img.style.height = '100%';
        }
    });
}
