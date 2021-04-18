export default class Accordeon {
    constructor(btns) {
        this.btns = document.querySelectorAll(btns);
    }

    bindTriggers() {
        this.btns.forEach(btn => {
            const parent = btn.parentElement;
            btn.addEventListener('click', () => {
                if (parent.getAttribute('data-opened') !== 'true') {
                    parent.nextElementSibling.style.display = 'block';
                    parent.setAttribute('data-opened', 'true');
                    btn.querySelector('svg').firstElementChild.style.display = 'none';
                } else if (parent.getAttribute('data-opened') == 'true'){
                    parent.nextElementSibling.style.display = '';
                    parent.setAttribute('data-opened', 'false');
                    btn.querySelector('svg').firstElementChild.style.display = 'block';
                }
            });
        });
    }

    init() {
        this.bindTriggers();
    }
}