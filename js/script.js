// Validate email
// ############################################################## //
const validateForm = formSelector => {
    const formElement = document.querySelector(formSelector);
    const form = document.querySelector('#signup-form');
    const userEmail = document.querySelector('.userEmail');

    const validationOptions = [
        {
            attribute: 'pattern',
            isValid: input => {
                const re = new RegExp(input.pattern);
                return re.test(input.value);
            },
            errorsMsg: (input, label) => `${label.textContent} is not  valid`
        },
        {
            attribute: 'required',
            isValid: input => input.value.trim() !== '',
            errorsMsg: (input, label) => `${label.textContent} is required`
        }
    ];

    const validateSingleFormGroup = formGroup => {
        const label = formGroup.querySelector('label');
        const input = formGroup.querySelector('input');
        const errors = formGroup.querySelector('.errors');

        let formGroupError = false;
        for (const option of validationOptions) {
            if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
                errors.textContent = option.errorsMsg(input, label);
                input.classList.add('border-red');
                input.classList.remove('border-green');
                formGroupError = true;
            }
        }

        if (!formGroupError) {
            errors.textContent = '';
            input.classList.add('border-green');
            input.classList.remove('border-red');
            userEmail.innerHTML = input.value;
            form.reset();
            newsletterSignup();
        }
    };

    formElement.setAttribute('novalidate', '');

    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        validateAllFormGroups(formElement);
    });

    const validateAllFormGroups = formToValidate => {
        const formGroups = Array.from(formToValidate.querySelectorAll('.form-group'));

        formGroups.forEach(formGroup => {
            validateSingleFormGroup(formGroup);
        });
    };
};

validateForm('#signup-form');


//Modal open / close
//####################################################################; //

const newsletterSignup = () => {
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('[data-close-button]');
    const overlay = document.getElementById('overlay');
    const input = document.querySelector('input[type=email]');

    openModal(modal);
    input.classList.remove(...input.classList);

    // openModalButtons.forEach(button => {
    //     button.addEventListener('submit', (e) => {
    //         e.preventDefault();
    //         const modal = document.querySelector(button.dataset.modalTarget);
    //         openModal(modal);
    //     });
    // });


    overlay.addEventListener('click', (e) => {
        e.preventDefault();
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            closeModal(modal);
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    function openModal(modal) {
        if (modal == null) return;
        modal.classList.add('active');
        overlay.classList.add('active');
    }

    function closeModal(modal) {
        if (modal == null) return;
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }

};
