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
                window.location.replace(response);
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
                window.location.replace(response);
            }).catch(err => {
                console.log(err.responseJSON);
            });
        }
    });

    $(`#commentForm`).on(`submit`, function(e) {
        e.preventDefault();
        $.ajax({
            type: `POST`,
            url: `/articles/${$(this).data(`articleid`)}/comment/create`,
            data: {commentText: $(`#commentBox`).val().trim()},
            success: function (response) {
                window.location.replace(response);
            }
        });
    });

    $(`.deleteComment`).on(`click`, function(e){
        $.ajax({
            type: `DELETE`,
            url: `${window.location.pathname}/comment/${$(this).data(`commentid`)}/delete`,
            success: function (response) {
                window.location.reload();
            }
        });
    })

});