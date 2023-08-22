const canvas = document.querySelector("#canvas")
context = canvas.getContext("2d", { willReadFrequently: true })
image = new Image()
startTime = 0

const processImageWithoutPyScript = (imageData) => {
    startTime = Date.now()
    for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i] // Red color lies between 0 and 255
        const g = imageData.data[i + 1] // Green color lies between 0 and 255
        const b = imageData.data[i + 2] // Blue color lies between 0 and 255
        const a = imageData.data[i + 3] // Transparency lies between 0 and 255

        if (
			r >= 0 &&
			r <= 80 &&
			g >= 180 &&
			g <= 255 &&
			b >= 0 &&
			b <= 80
		) {
			imageData.data[i + 3] = 0;
		}
    }

    context.putImageData(imageData, 0, 0)
    document.querySelector(".time-taken").textContent = Date.now() - startTime
}

const initApp = () => {
    image.onload = function () {
        canvas.width = image.width
        canvas.height = image.height
        context.drawImage(image, 0, 0)
    }
    image.src = "picture.jpg"
    document.querySelector(".without-btn").addEventListener("click", () => {
        const imageData = context.getImageData(0, 0, image.width, image.height)
        processImageWithoutPyScript(imageData)
    })
}
initApp()
