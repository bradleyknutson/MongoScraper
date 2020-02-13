$(function () {
    $(`form.login`).on(`submit`, e => {
        e.preventDefault();
        let userData = {
            email: $(`input[name="email"]`).val().trim(),
            password: $(`input[name="password"]`).val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        } else {
            $.post(`/auth/login`, userData).then((response) => {
                $(`input[name="email"]`).val(``);
                $(`input[name="password"]`).val(``);
                window.location.replace(`/`);
            }).catch(err => {
                console.log(err);
            });
        }
    });

    $(`form.signup`).on(`submit`, e => {
        e.preventDefault();
        let userData = {
            email: $(`input[name="email"]`).val().trim(),
            password: $(`input[name="password"]`).val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        } else {
            $.post(`/auth/signup`, userData).then((response) => {
                $(`input[name="email"]`).val(``);
                $(`input[name="password"]`).val(``);
                window.location.replace(`/`);
            }).catch(err => {
                console.log(err.responseJSON);
            });
        }
    });

});