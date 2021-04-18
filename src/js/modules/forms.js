"use strict";
export default class Form {
    constructor (formSelector, inputSelector, statusFieldSelector) {
        this.forms = document.querySelectorAll(formSelector);
        this.inputs = document.querySelectorAll(inputSelector); // 'form input' - selector
        this.statusField = document.querySelector(statusFieldSelector); // 'form button'
        this.message = {
            loading: 'Loading...',
            success: 'Already calling!',
            failure: 'Failure!'
        };
    }

    async postData(url, data) {
        let res = await fetch(url, {
            method: "POST",
            body: data
        });
        return await res.text();
    }
    

    clearInputs() {
        this.inputs.forEach(input => {
            input.textContent = '';
        });
    }

    emailValidation() {
        const email = document.querySelectorAll('[type="email"]');
        email.forEach(item => {
            item.addEventListener('keydown', (e) => {
                if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    e.preventDefault();
                }
            });
        });
    }

    initMask() {
        let setCursorPosition = (pos, elem) => {
            elem.focus();
    
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();
    
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };
    
    
        function createMask(event) {
            let matrix = '+1 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''), // Получение всех не цифр из матрицы
                val = this.value.replace(/\D/g, ''); 
            if (def.length >= val.length) {
                val = def;
            }
    
            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
            });
    
            if (event.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }
    
        let inputs = document.querySelectorAll('[name="phone"]');
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    }


    bindFormUpload() {
        this.forms.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();
                this.statusField.textContent = this.message.loading;
                
                const formData = new FormData(item);

                this.postData('assets/question.php', formData)
                .then(res => {
                    console.log(res);
                    this.statusField.textContent = this.message.success;
                })
                .catch(() => {
                    this.statusField.textContent = this.message.failure;
                    this.statusField.style.backgroundColor = 'red';
                })
                .finally(() => {
                    setTimeout(() => {
                        item.reset();
                        this.statusField.textContent = 'Send';
                        this.statusField.style.backgroundColor = 'black';
                    }, 4000);
                    
                });

                
            });
        });
    }

    init() {
        this.bindFormUpload();
        this.emailValidation();
        this.initMask();
    }
    
}