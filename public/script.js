const htmlEditor = document.getElementById('html-editor');
const cssEditor = document.getElementById('css-editor');
const jsEditor = document.getElementById('js-editor');
const previewFrame = document.getElementById('preview');
const messageDiv = document.getElementById('message');

function updatePreview() {
    const htmlContent = htmlEditor.value;
    const cssContent = `<style>${cssEditor.value}</style>`;
    const jsContent = `<script>${jsEditor.value}<\/script>`;

    const combinedContent = `${htmlContent}${cssContent}${jsContent}`;
    previewFrame.srcdoc = combinedContent;
}

function loadTemplate(templateName) {
    htmlEditor.value = '';
    cssEditor.value = '';
    jsEditor.value = '';

    fetch(`/templates/${templateName}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Cannot fetch ${templateName}.html`);
            }
            return response.text();
        })
        .then(html => {
            htmlEditor.value = html;
            updatePreview();
        })
        .catch(error => console.error('Error fetching HTML template:', error));

    fetch(`/templates/${templateName}.css`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Cannot fetch ${templateName}.css`);
            }
            return response.text();
        })
        .then(css => {
            cssEditor.value = css;
            updatePreview();
        })
        .catch(error => console.error('Error fetching CSS template:', error));

    fetch(`/templates/${templateName}.js`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Cannot fetch ${templateName}.js`);
            }
            return response.text();
        })
        .then(js => {
            jsEditor.value = js;
            updatePreview();
        })
        .catch(error => console.error('Error fetching JS template:', error));
}

function publishWebsite() {
    const zip = new JSZip();
    const html = htmlEditor.value;
    const css = cssEditor.value;
    const js = jsEditor.value;

    zip.file("index.html", html);
    zip.file("styles.css", css);
    zip.file("script.js", js);

    zip.generateAsync({ type: "blob" })
        .then(function(content) {
            const element = document.createElement("a");
            element.href = URL.createObjectURL(content);
            element.download = "website.zip";
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            showMessage("Website published successfully!", "success");
        })
        .catch(error => {
            showMessage(`Error publishing website: ${error.message}`, "error");
        });
}

function showMessage(message, type) {
    messageDiv.innerText = message;
    messageDiv.className = type;
    setTimeout(() => {
        messageDiv.innerText = "";
        messageDiv.className = "";
    }, 3000);
}

function downloadFile(type) {
    let content, fileName;
    if (type === 'html') {
        content = htmlEditor.value;
        fileName = 'index.html';
    } else if (type === 'css') {
        content = cssEditor.value;
        fileName = 'styles.css';
    } else if (type === 'js') {
        content = jsEditor.value;
        fileName = 'script.js';
    }

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', fileName);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

document.getElementById('load-template-btn').addEventListener('click', () => {
    const selectedTemplate = document.getElementById('template-select').value;
    loadTemplate(selectedTemplate);
});

htmlEditor.addEventListener('input', updatePreview);
cssEditor.addEventListener('input', updatePreview);
jsEditor.addEventListener('input', updatePreview);
