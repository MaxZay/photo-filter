let inputs = document.querySelectorAll('input')
let results = document.querySelectorAll('output')
let reset = document.querySelector('.btn-reset')
let fullScreenButton = document.querySelector('.fullscreen')
let canvasImg = document.querySelector('canvas')
let download = document.querySelector('.btn-save')
let load = document.querySelector('#btnInput')
let next = document.querySelector('.btn-next')

const day = 'https://github.com/rolling-scopes-school/stage1-tasks/tree/assets/images/day/'
const evening = 'https://github.com/rolling-scopes-school/stage1-tasks/tree/assets/images/evening/'
const morning = 'https://github.com/rolling-scopes-school/stage1-tasks/tree/assets/images/morning/'
const night = 'https://github.com/rolling-scopes-school/stage1-tasks/tree/assets/images/night/'

const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];

onLoadImg('./assets/img/img.jpg')
onLoadImg(day + images[3])

inputs.forEach(input => input.addEventListener('change', mouseEvent))
inputs.forEach(input => input.addEventListener('mousemove', mouseEvent))

reset.addEventListener('click', resetEvent)

fullScreenButton.addEventListener('click', () => {
    document.fullscreen == false ? document.documentElement.requestFullscreen() : document.exitFullscreen()
})

download.addEventListener('click', function () {
    var link = document.createElement('a');
    link.download = 'download.png';
    link.href = canvasImg.toDataURL();
    link.click();
    link.delete;
})

load.addEventListener('change', function (e) {
    const file = load.files[0]
    const reader = new FileReader()
    reader.onload = () => {
        const img = new Image();
        onLoadImg(reader.result)
    }
    reader.readAsDataURL(file)
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