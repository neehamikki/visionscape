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
            
            img.onload = function() {
                const naturalWidth = img.naturalWidth;
                const naturalHeight = img.naturalHeight;
                
                // Set the initial size of the image to 1/16th of its natural size
                const scaledWidth = naturalWidth / 4;
                const scaledHeight = naturalHeight / 4;

                // Apply the scaled dimensions to the wrapper
                wrapper.style.width = `${scaledWidth}px`;
                wrapper.style.height = `${scaledHeight}px`;

                // Append the image to its wrapper
                wrapper.appendChild(img);
                container.appendChild(wrapper);

                // Enable dragging and resizing with the aspect ratio locked
                makeDraggableAndResizable(wrapper, img);
            };
        };
        reader.readAsDataURL(files[i]);
    }
});

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
