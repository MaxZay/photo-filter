let inputs = document.querySelectorAll('input')
let results = document.querySelectorAll('output')
let reset = document.querySelector('.btn-reset')
let fullScreenButton = document.querySelector('.fullscreen')
let canvasImg = document.querySelector('canvas')

onLoadImg('./assets/img/img.jpg')

inputs.forEach(input => input.addEventListener('change', mouseEvent))
inputs.forEach(input => input.addEventListener('mousemove', mouseEvent))

reset.addEventListener('click', resetEvent)

fullScreenButton.addEventListener('click', () => {
    document.fullscreen == false ? document.documentElement.requestFullscreen() : document.exitFullscreen()
})


function mouseEvent() {
    this.parentElement.children[1].value = this.value
    document.documentElement.style.setProperty(`--${this.name}`, this.value + this.dataset.sizing)
}

function resetEvent() {
    document.documentElement.style.setProperty(`--blur`, 0)
    document.documentElement.style.setProperty(`--invert`, 0)
    document.documentElement.style.setProperty(`--sepia`, 0)
    document.documentElement.style.setProperty(`--saturate`, 1)
    document.documentElement.style.setProperty(`--hue`, 0)
    inputs[0].value = 0
    inputs[1].value = 0
    inputs[2].value = 0
    inputs[3].value = 100
    inputs[4].value = 0
    results[0].value = 0;
    results[1].value = 0;
    results[2].value = 0;
    results[3].value = 100;
    results[4].value = 0;

}

function onLoadImg(src) {
    let img = new Image()
    img.setAttribute('crossOrigin', 'anonymous')
    img.src = src
    img.onload = function () {
        canvasImg.width = img.width
        canvasImg.height = img.height
        const ctx = canvasImg.getContext('2d')
        ctx.drawImage(img, 0, 0)
    }
}