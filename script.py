from js import document, window, Date
from pyodide import create_proxy

def process_image_with_pyscript(event):
    window.startTime = Date.now()
    imageData = window.context.getImageData(0, 0, window.image.width, window.image.height)

    for i in range(0, len(imageData.data), 4):
        r = imageData.data[i]  # Red color lies between 0 and 255
        g = imageData.data[i + 1]  # Green color lies between 0 and 255
        b = imageData.data[i + 2]  # Blue color lies between 0 and 255
        a = imageData.data[i + 3]  # Transparency lies between 0 and 255

        if (
            r >= 0
            and r <= 80
            and g >= 180
            and g <= 255
            and b >= 0
            and b <= 80
        ):
            imageData.data[i + 3] = 0

    window.context.putImageData(imageData, 0, 0)
    document.querySelector(".time-taken").textContent = Date.now() - window.startTime

document.querySelector(".with-btn").addEventListener("click", create_proxy(process_image_with_pyscript))
