document.getElementById('upload-btn').addEventListener('change', function(event) {
    const files = event.target.files;
    const container = document.getElementById('canvas-container');

    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.classList.add('draggable-image');
            img.style.top = `${Math.random() * (container.clientHeight - 100)}px`; // Adjust to prevent overflow
            img.style.left = `${Math.random() * (container.clientWidth - 100)}px`; // Adjust to prevent overflow
            //random positioning should try not to be on top of another
            container.appendChild(img);

            makeDraggable(img);
        };
        reader.readAsDataURL(files[i]);
    }
});

function makeDraggable(element) {
    let offsetX = 0, offsetY = 0;

    element.addEventListener('mousedown', function(e) {
        e.preventDefault();
        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;

        function onMouseMove(e) {
            // Calculate new position
            let newLeft = e.clientX - offsetX;
            let newTop = e.clientY - offsetY;

            // Get the bounding rectangle of the canvas
            const container = document.getElementById('canvas-container');
            const containerRect = container.getBoundingClientRect();

            // Check boundaries
            if (newLeft < 0) newLeft = 0;
            if (newTop < 0) newTop = 0;
            if (newLeft + element.clientWidth > containerRect.width) {
                newLeft = containerRect.width - element.clientWidth;
            }
            if (newTop + element.clientHeight > containerRect.height) {
                newTop = containerRect.height - element.clientHeight;
            }

            // Update element's position
            element.style.left = `${newLeft}px`;
            element.style.top = `${newTop}px`;
        }

        document.addEventListener('mousemove', onMouseMove);

        element.addEventListener('mouseup', function() {
            document.removeEventListener('mousemove', onMouseMove);
        }, { once: true });
    });
}

// Beginning work to delete an image
function deleteImg(element){
    element.addEventListener('click', (event) => {
        event.target.remove();
    });
}
