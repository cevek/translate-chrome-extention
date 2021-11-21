document.addEventListener('keydown', (e) => {
    const text = getSelection().toString().trim();
    if (e.code === 'KeyT' && e.shiftKey && text !== '') {
        const rect = getSelection().getRangeAt(0).getBoundingClientRect();
        chrome.runtime.sendMessage({translate: text}, function (response) {
            // console.log(response, rect);
            const sentences = response.translation.sentences;
            sentences.pop();
            const transtion = sentences.map((s) => s.trans).join('\n');

            const overlay = document.createElement('div');
            const overlayStyle = overlay.style;
            overlayStyle.position = 'fixed';
            overlayStyle.left = '0';
            overlayStyle.top = '0';
            overlayStyle.right = '0';
            overlayStyle.bottom = '0';
            overlayStyle.zIndex = 9999999;

            const div = document.createElement('div');
            const style = div.style;
            style.position = 'fixed';
            style.left = rect.left + 'px';
            style.top = rect.bottom + 5 + 'px';
            style.display = 'flex';
            style.maxWidth = '500px';
            style.borderRadius = '4px';
            style.padding = '5px 8px';
            style.fontFamily =
                'system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif';
            style.fontSize = '14px';
            style.lineHeight = '20px';
            style.background = 'white';
            style.color = 'black';
            style.boxShadow = '1px 1px 7px 1px #0004';
            style.zIndex = 99999999;
            div.innerText = transtion;

            document.body.appendChild(overlay);
            document.body.appendChild(div);

            overlay.addEventListener('click', () => {
                document.body.removeChild(overlay);
                document.body.removeChild(div);
            });
        });
    }
});
