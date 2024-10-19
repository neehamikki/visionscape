document.getElementById('upload-btn').addEventListener('change', function(event) {
    const files = event.target.files;
    const container = document.getElementById('canvas-container');

    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.classList.add('draggable-image');
            img.style.top = `${Math.random() * 500}px`;
            img.style.left = `${Math.random() * 700}px`;
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
            element.style.left = `${e.clientX - offsetX}px`;
            element.style.top = `${e.clientY - offsetY}px`;
        }

        document.addEventListener('mousemove', onMouseMove);

        element.addEventListener('mouseup', function() {
            document.removeEventListener('mousemove', onMouseMove);
        }, { once: true });
    });
}
