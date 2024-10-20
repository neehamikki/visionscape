// Load jQuery and jQuery UI from CDN in the <head> section of index.html:
/*
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
*/

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

            // Make image draggable and resizable with aspect ratio
            makeDraggable(img);
        };
        reader.readAsDataURL(files[i]);
    }
});

function makeDraggable(element) {
    let offsetX = 0, offsetY = 0;

    $(element).draggable({
        containment: '#canvas-container',
    }).resizable({
        aspectRatio: true, // Maintain the aspect ratio
        handles: "n, e, s, w, se", // Allow resizing from the corners
        containment: '#canvas-container'
    });

    element.addEventListener('mousedown', function(e) {
        e.preventDefault();
        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;
    });
}

// Optionally, add a delete image feature (click to delete):
function deleteImg(element) {
    element.addEventListener('click', function() {
        element.remove();
    });
}
