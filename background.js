chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    fetch(
        'https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=en&tl=ru&tbb=1&ie=UTF-8&oe=UTF-8&hl=en&q=' +
            encodeURIComponent(request.translate),
    )
        .then((res) => res.json())
        .then((json) => {
            sendResponse({
                translation: json,
            });
        });

    return true;
});
