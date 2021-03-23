
const SELECT = document.querySelector('.flex-select')
const LABEL = SELECT.querySelector('.flex-select--label')
const TEXT = SELECT.querySelector('.flex-select--text')
const ITEMS = SELECT.querySelector('.flex-select--items')
const DEFAULT = SELECT.querySelector('.flex-select--inputs [checked]')
const INPUTS = Array.from(SELECT.querySelectorAll('.flex-select--inputs input'))
const LABELS = Array.from(SELECT.querySelectorAll('.flex-select--items label'))

function update_label(id) {
    TEXT.innerHTML = ITEMS.querySelector(`[for="${id}"]`).innerHTML
}

window.addEventListener('click', e => {
    SELECT.classList.remove('active')
})

LABEL.addEventListener('click', e => {
    SELECT.classList.toggle('active')
    e.stopPropagation()
})

if (DEFAULT !== null) {
    update_label(DEFAULT.value)
}

for (let i = INPUTS.length; i--;) {
    INPUTS[i].addEventListener('change', e => {
        update_label(INPUTS[i].value)
    })
}