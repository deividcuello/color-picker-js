const eyedropperButton = document.querySelector(".eyedropperButton"),
imageFile = document.querySelector('input[type="file"]'),
h2 = document.querySelector('h2'),
span = document.querySelector('span'),
label = document.querySelector('label'),
form = document.querySelector('form'),
img = document.querySelector('img'),
submitBtn = document.querySelector('input[type="submit"]'),
inputUrl = document.querySelector('input[type="text"]')

submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    img.src =  `${inputUrl.value}`
    img.onerror = () => {
        img.src = "./default_img.webp"
        label.textContent = 'No file chosen'
        h2.classList.add('error')
        span.style.display = 'none'
        h2.textContent = 'Invalid Url'
        return
    }
    if(h2.textContent == 'Invalid Url'){
      h2.textContent = ''
    }
    label.textContent = 'No file chosen'
})

const readURL = file => {
    return new Promise((res, rej) => {
        const reader = new FileReader()
        reader.onload = e => res(e.target.result)
        reader.onerror = e => rej(e)
        reader.readAsDataURL(file)
    });
};

const preview = async event => {
    const file = event.target.files[0];
    label.textContent = event.target.files[0].name
    const url = await readURL(file);
    img.src = url;
    h2.textContent = ''
    img.onerror = () => {
        label.textContent = 'No file chosen'
        img.src = "./default_img.webp"
    }
};

imageFile.addEventListener('change', preview)

function setup() {
  if (window.EyeDropper === undefined) {
    h2.textContent = "Unsupported!"
    return
  } else {
    eyedropperButton.addEventListener("click", pickColor, false)
  }
}
setup();

async function pickColor(event) {
  let eyeDropper = new EyeDropper()

  try {
    let pickedColor = await eyeDropper.open()
    if(h2.classList.contains('error')){
      h2.classList.remove('error')
    }
    h2.textContent = pickedColor.sRGBHex
    span.style.display = 'inline-block'
    span.style.backgroundColor = pickedColor.sRGBHex
  } catch (error) {
    return
  }
}
