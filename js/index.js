
if(window.location == 'https://tacho.sotrans.ru/privacy') {
    let body = document.querySelector('.politics__privacy-text')
    let textAnimation = document.querySelector('.politics__privacy-text-animation')
    body.onscroll = function (e) {
        if (window.matchMedia('(max-width: 520px)').matches){
            if(body.scrollTop > body.scrollHeight-400) {
                textAnimation.classList.remove('politics__privacy-text')
            } else if (body.scrollTop < body.scrollHeight-400) {
                textAnimation.classList.add('politics__privacy-text')
            }
        } else {
            if(body.scrollTop > body.scrollHeight-700) {
                textAnimation.classList.remove('politics__privacy-text')
            } else if (body.scrollTop < body.scrollHeight-700) {
                textAnimation.classList.add('politics__privacy-text')
            }
        }
    };
} else {
    let openForm = document.querySelectorAll('.call')
    let closeSucc = document.querySelector('.form__close')
    let closeForm = document.querySelectorAll('.form__cross')
    let formModal = document.querySelector('.form')
    let formWrap = document.querySelector('.form__wrap')
    openForm.forEach(item => {
        item.addEventListener('click', function () {
            formModal.style.opacity = '1'
            formModal.style.display = 'flex'

        })
    })
    closeForm.forEach(item => {
        item.addEventListener('click', function () {
            formModal.style.opacity = '0'
            formModal.style.display = 'none'

        })
    })
    closeSucc.addEventListener('click', function () {
        formModal.style.opacity = '0'
        formModal.style.display = 'none'
    })

    document.addEventListener('click', (e) => {
        if(e.target === formWrap) {
            formModal.style.opacity = '0'
            formModal.style.display = 'none'
        }
    });

// Animation

    let animItems = document.querySelectorAll('._anim-items')

    if(animItems.length > 0) {
        window.addEventListener('scroll', animOnScroll)

        function animOnScroll() {
            for (let i = 0; i < animItems.length; i++) {
                const animItem = animItems[i]
                const animItemH = animItem.offsetHeight
                const animItemOffset = offset(animItem).top
                const animStart = 3

                let animItemPoint = window.innerHeight - animItemH / animStart
                if (animItemH > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart
                }

                if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemH)) {
                    animItem.classList.add('_active')
                } else {
                    animItem.classList.remove('_active')
                }
            }
        }

        function offset(el) {
            const rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
        }

        setTimeout(() => {
            animOnScroll()
        }, 300)
    }

// Form Validate
    let form = document.querySelector('.form__call')

    let formBlock = document.querySelector('.form__request')
    let formSucc = document.querySelector('.form__answer')
    form.addEventListener('submit', function (event) {
        event.preventDefault()
        let error = formValidate(form)
    })

    function formValidate(form) {
        let error = 0
        let formReq = document.querySelectorAll('._req')
        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index]
            formRemoveError(input)
            if (input.classList.contains('_username')) {
                if (usernameTest(input)) {
                    formAddError(input)
                    error++
                } else {
                    if (input.value === '') {
                        formAddError(input)
                        error++
                    }
                }
            }
            if (input.classList.contains('_phone')) {
                if (input.value.length < 17) {
                    formAddError(input)
                    error++
                } else {
                    if (input.value === '') {
                        formAddError(input)
                        error++
                    }
                }
            }
        }
        if(error == 0) {
            formBlock.style.display = 'none'
            formSucc.style.display = 'block'
        }
    }
    function formAddError(input) {
        input.parentElement.classList.add('_error')
        input.classList.add('_error')
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error')
        input.classList.remove('_error')
    }

// Функция теста username
    function usernameTest(input) {
        return !/^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/.test(input.value)
    }

    [].forEach.call( document.querySelectorAll('._phone'), function(input) {
        let keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            let pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            let matrix = "+7 (___)-___-____",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function(a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            let reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function(a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type == "blur" && this.value.length < 5)  this.value = ""
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false)

    });
    // Open form


}





//


