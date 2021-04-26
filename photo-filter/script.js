let inputs = document.querySelectorAll('.input')
let results = document.querySelectorAll('output')
let reset = document.querySelector('.btn-reset')
let fullScreenButton = document.querySelector('.fullscreen')
let canvasImg = document.querySelector('canvas')
let download = document.querySelector('.btn-save')
let load = document.querySelector('#btnInput')
let next = document.querySelector('.btn-next')
let srcImage = './assets/img/img.jpg'
console.log(canvasImg);

const day = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/day/'
const evening = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/'
const morning = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/morning/'
const night = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/night/'
const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];

let currentIndex = 0;

onLoadImg(srcImage)

inputs.forEach(input => input.addEventListener('change', mouseEvent))
inputs.forEach(input => input.addEventListener('mousemove', mouseEvent))

reset.addEventListener('click', resetEvent)

fullScreenButton.addEventListener('click', () => {
    document.fullscreen == false ? document.documentElement.requestFullscreen() : document.exitFullscreen()
})

download.addEventListener('click', function () {
    const image = new Image()
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = srcImage
    image.onload = function () {
        const ctx = canvasImg.getContext('2d')
        ctx.filter = `blur(${inputs[0].value}px) invert(${inputs[1].value}%) sepia(${inputs[2].value}%) saturate(${inputs[3].value}%) hue-rotate(${inputs[4].value}deg)`
        ctx.drawImage(image, 0, 0)
        var link = document.createElement('a');
        link.download = 'download.png';
        link.href = canvasImg.toDataURL();
        link.click();
    }
})

load.addEventListener('change', function (e) {
    const file = load.files[0]
    const reader = new FileReader()
    reader.onload = () => {
        const img = new Image();
        onLoadImg(reader.result)
    }
    reader.readAsDataURL(file)
    load.value = ''
})

next.addEventListener('click', function () {
    let date = new Date()
    if (date.getHours() >= 6 && date.getHours() < 12) {
        onLoadImg(morning + images[currentIndex])
        currentIndex++;
    } else if (date.getHours() >= 12 && date.getHours() < 18) {
        onLoadImg(day + images[currentIndex])
        currentIndex++;
    } else if (date.getHours() >= 18 && date.getHours() < 24) {
        onLoadImg(evening + images[currentIndex])
        currentIndex++;
    } else if (date.getHours() >= 0 && date.getHours() < 6) {
        onLoadImg(night + images[currentIndex])
        currentIndex++;
    }
    if (currentIndex == 20)
        currentIndex = 0

})

function onLoadImg(src) {
    srcImage = src
    let img = new Image()
    const ctx = canvasImg.getContext('2d')
    img.setAttribute('crossOrigin', 'anonymous')
    img.src = src
    img.onload = function () {
        canvasImg.width = img.width
        canvasImg.height = img.height
        ctx.drawImage(img, 0, 0)
    }
}

function mouseEvent() {
    this.parentElement.children[1].value = this.value
    document.documentElement.style.setProperty(`--${this.name}`, this.value + this.dataset.sizing)
}

function resetEvent() {
    document.documentElement.style.setProperty(`--blur`, 0)
    document.documentElement.style.setProperty(`--invert`, 0)
    document.documentElement.style.setProperty(`--sepia`, 0)
    document.documentElement.style.setProperty(`--saturate`, 1)
    document.documentElement.style.setProperty(`--hue`, 10)
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