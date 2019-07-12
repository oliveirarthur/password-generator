console.log('app loaded');
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
        .forEach((password, index) => {
            passwordList.append(
                $('<li>', {
                    class: 'row',
                }).append(
                    $('<code>', {
                        class: 'col',
                        id   : 'password-' + index,
                        html : password,
                    }),
                    $('<div>', {
                        class: 'col',
                    }).append(
                        $('<button>', {
                            'data-clipboard-target': '#password-' + index,
                            html: 'copiar',
                        })
                    )
                )
            );
            console.log(password);
        })
    ).then(() => {
        var clipboard = new ClipboardJS('button[data-clipboard-target]');
    });
});
