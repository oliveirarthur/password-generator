$('form.password-generator').on('submit', (e) => {
    e.preventDefault();

    const values = $('form.password-generator').serializeArray().reduce((acc, field) => {
        acc[field.name] = field.value;
        return acc;
    }, {
        format: 'plain',
        rnd: 'new',
    });

    const passwordList = $('ul.password-list');

    axios.get('https://www.random.org/passwords/', {
        params: values,
    }).then((res) => res.data)
    .then((data) => data
        .trim()
        .split("\n")
        .forEach((password) => {
            passwordList.append(
                $('<li>', {
                    class: 'row',
                }).append(
                    $('<div>', {
                        class: 'col',
                    }).append(
                        $('<code>', {
                            class: 'text-truncate',
                            id   : 'password-' + password,
                            html : password,
                        }),
                    ),
                    $('<div>', {
                        class: 'col text-right',
                    }).append(
                        $('<button>', {
                            'data-clipboard-target': '#password-' + password,
                            html: 'copy',
                        })
                    )
                )
            );
        })
    ).then(() => {
        var clipboard = new ClipboardJS('button[data-clipboard-target]');
    });
});
