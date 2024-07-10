document.getElementById('load-template-btn').addEventListener('click', loadTemplate);
document.getElementById('edit-template-btn').addEventListener('click', editTemplate);
document.getElementById('save-changes-btn').addEventListener('click', saveChanges);
document.getElementById('cancel-changes-btn').addEventListener('click', cancelChanges);

let isEditing = false;
let selectedElement = null;

function loadTemplate() {
    const templateSelect = document.getElementById('template-select').value;
    if (!templateSelect) {
        showMessage('Vui lòng chọn một template trước!');
        return;
    }
    const htmlEditor = document.getElementById('html-editor');
    const cssEditor = document.getElementById('css-editor');
    const jsEditor = document.getElementById('js-editor');

    Promise.all([
        fetch(`templates/${templateSelect}.html`).then(response => response.text()),
        fetch(`templates/${templateSelect}.css`).then(response => response.text()),
        fetch(`templates/${templateSelect}.js`).then(response => response.text())
    ])
    .then(([htmlData, cssData, jsData]) => {
        htmlEditor.value = htmlData;
        cssEditor.value = cssData;
        jsEditor.value = jsData;
        updatePreview();  // Update the preview after loading template
    })
    .catch(error => console.error('Error loading template:', error));

    hideMessage();
    document.querySelector('.buttons').style.display = 'flex';
    document.querySelector('.edit-buttons').style.display = 'none';
    document.getElementById('edit-options').style.display = 'none'; // Ẩn edit-options khi tải lại template
}

function updatePreview() {
    const html = document.getElementById('html-editor').value;
    const css = `<style>${document.getElementById('css-editor').value}</style>`;
    const js = `<script>${document.getElementById('js-editor').value}<\/script>`;
    const srcdoc = `${html}${css}${js}`;
    document.getElementById('preview').srcdoc = srcdoc;
}

function downloadFile(type) {
    if (!isTemplateSelected()) return;

    let content = '';
    let fileName = '';
    
    switch (type) {
        case 'html':
            content = document.getElementById('html-editor').value;
            fileName = 'template.html';
            break;
        case 'css':
            content = document.getElementById('css-editor').value;
            fileName = 'template.css';
            break;
        case 'js':
            content = document.getElementById('js-editor').value;
            fileName = 'template.js';
            break;
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
}

function publishWebsite() {
    if (!isTemplateSelected()) return;

    const htmlContent = document.getElementById('html-editor').value;
    const cssContent = document.getElementById('css-editor').value;
    const jsContent = document.getElementById('js-editor').value;

    const zip = new JSZip();
    zip.file("index.html", htmlContent);
    zip.file("style.css", cssContent);
    zip.file("script.js", jsContent);

    zip.generateAsync({ type: 'blob' })
        .then(content => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(content);
            a.download = 'website.zip';
            a.click();
        });

    showMessage('Website published and downloaded!', 'success');
}

function editTemplate() {
    if (!isTemplateSelected()) return;

    if (isEditing) {
        showMessage('Đang chỉnh sửa. Vui lòng lưu hoặc hủy thay đổi trước khi tiếp tục.');
        return;
    }

    const iframe = document.getElementById('preview').contentWindow.document;
    iframe.body.contentEditable = 'true';
    iframe.body.focus();
    isEditing = true;

    iframe.body.addEventListener('click', selectElement);
    iframe.body.addEventListener('contextmenu', handleRightClick);

    document.querySelector('.buttons').style.display = 'none';
    document.querySelector('.edit-buttons').style.display = 'flex';
    document.getElementById('edit-options').style.display = 'block'; // Hiển thị edit-options khi bắt đầu chỉnh sửa
    showMessage('Chế độ chỉnh sửa đã bật. Chọn vùng phần tử để chỉnh sửa và nhấn "Lưu thay đổi" hoặc "Hủy".', 'info');
}

function saveChanges() {
    const iframe = document.getElementById('preview').contentWindow.document;
    document.getElementById('html-editor').value = iframe.body.innerHTML;
    iframe.body.contentEditable = 'false';
    isEditing = false;

    document.querySelector('.buttons').style.display = 'flex';
    document.querySelector('.edit-buttons').style.display = 'none';
    document.getElementById('edit-options').style.display = 'none'; // Ẩn edit-options khi lưu thay đổi
    showMessage('Thay đổi đã được lưu.', 'success');
    updatePreview();
}

function cancelChanges() {
    loadTemplate();
    document.getElementById('preview').contentWindow.document.body.contentEditable = 'false';
    isEditing = false;

    document.querySelector('.buttons').style.display = 'flex';
    document.querySelector('.edit-buttons').style.display = 'none';
    document.getElementById('edit-options').style.display = 'none'; // Ẩn edit-options khi hủy thay đổi
    showMessage('Thay đổi đã bị hủy.', 'info');
}

function isTemplateSelected() {
    const templateSelect = document.getElementById('template-select').value;
    if (!templateSelect) {
        showMessage('Vui lòng chọn một template trước!');
        return false;
    }
    return true;
}

document.getElementById('html-editor').addEventListener('input', updatePreview);
document.getElementById('css-editor').addEventListener('input', updatePreview);
document.getElementById('js-editor').addEventListener('input', updatePreview);

function selectElement(event) {
    event.preventDefault();
    removeHighlight(selectedElement);
    selectedElement = event.target;
    selectedElement.style.outline = '2px solid red';

    showEditOptions(selectedElement);
}

function removeHighlight(element) {
    if (element) {
        element.style.outline = '';
    }
}

function showEditOptions(element) {
    const editOptions = document.getElementById('edit-options');
    if (!editOptions) {
        createEditOptions();
    }

    const tagName = element.tagName.toLowerCase();
    if (tagName === 'p' || tagName === 'h1' || tagName === 'h2' || tagName === 'h3' || tagName === 'div') {
        showTextEditOptions(element);
    } else if (tagName === 'button') {
        showButtonEditOptions(element);
    } else if (tagName === 'img') {
        showImageEditOptions(element);
    }
}

function createEditOptions() {
    const editOptions = document.createElement('div');
    editOptions.id = 'edit-options';
    document.body.appendChild(editOptions);
}

function showTextEditOptions(element) {
    const editOptions = document.getElementById('edit-options');
    editOptions.innerHTML = `
        <label for="font-size">Font Size:</label>
        <input type="number" id="font-size" value="${window.getComputedStyle(element).fontSize.replace('px', '')}" onchange="updateTextStyle('fontSize', this.value + 'px')">
        <label for="font-color">Font Color:</label>
        <input type="color" id="font-color" value="${rgbToHex(window.getComputedStyle(element).color)}" onchange="updateTextStyle('color', this.value)">
        <label for="bg-color">Background Color:</label>
        <input type="color" id="bg-color" value="${rgbToHex(window.getComputedStyle(element).backgroundColor)}" onchange="updateTextStyle('backgroundColor', this.value)">
        <button onclick="toggleTextStyle('fontWeight', 'bold', this)">Bold</button>
        <button onclick="toggleTextStyle('fontStyle', 'italic', this)">Italic</button>
        <button onclick="toggleTextStyle('textDecoration', 'underline', this)">Underline</button>
        <label for="border-color">Border Color:</label>
        <input type="color" id="border-color" value="${getBorderColor(element)}" onchange="updateTextStyle('borderColor', this.value)">
        <label for="border-width">Border Width:</label>
        <select id="border-width" onchange="updateTextStyle('borderWidth', this.value)">
            <option value="none">None</option>
            <option value="1px">1px</option>
            <option value="2px">2px</option>
            <option value="3px">3px</option>
            <option value="4px">4px</option>
            <option value="5px">5px</option>
        </select>
    `;
}

function updateTextStyle(styleProperty, value) {
    if (selectedElement) {
        selectedElement.style[styleProperty] = value;
    }
}

function toggleTextStyle(styleProperty, value, button) {
    if (selectedElement) {
        if (selectedElement.style[styleProperty] === value) {
            selectedElement.style[styleProperty] = '';
            button.style.backgroundColor = '';
        } else {
            selectedElement.style[styleProperty] = value;
            button.style.backgroundColor = 'lightgray';
        }
    }
}

function showButtonEditOptions(element) {
    const editOptions = document.getElementById('edit-options');
    editOptions.innerHTML = `
        <label for="button-text">Button Text:</label>
        <input type="text" id="button-text" value="${element.innerText}" onchange="updateButtonText(this.value)">
        <label for="button-color">Button Color:</label>
        <input type="color" id="button-color" value="${rgbToHex(window.getComputedStyle(element).backgroundColor)}" onchange="updateButtonStyle('backgroundColor', this.value)">
        <label for="text-color">Text Color:</label>
        <input type="color" id="text-color" value="${rgbToHex(window.getComputedStyle(element).color)}" onchange="updateButtonStyle('color', this.value)">
        <label for="border-color">Border Color:</label>
        <input type="color" id="border-color" value="${getBorderColor(element)}" onchange="updateButtonStyle('borderColor', this.value)">
        <label for="border-width">Border Width:</label>
        <select id="border-width" onchange="updateButtonStyle('borderWidth', this.value)">
            <option value="none">None</option>
            <option value="1px">1px</option>
            <option value="2px">2px</option>
            <option value="3px">3px</option>
            <option value="4px">4px</option>
            <option value="5px">5px</option>
        </select>
    `;
}

function updateButtonText(value) {
    if (selectedElement) {
        selectedElement.innerText = value;
    }
}

function updateButtonStyle(styleProperty, value) {
    if (selectedElement) {
        selectedElement.style[styleProperty] = value;
    }
}

function showImageEditOptions(element) {
    const editOptions = document.getElementById('edit-options');
    editOptions.innerHTML = `
        <label for="image-url">Image URL:</label>
        <input type="text" id="image-url" value="${element.src}" onchange="updateImageSource(this.value)">
        <label for="image-alt">Alt Text:</label>
        <input type="text" id="image-alt" value="${element.alt}" onchange="updateImageAlt(this.value)">
        <label for="border-color">Border Color:</label>
        <input type="color" id="border-color" value="${getBorderColor(element)}" onchange="updateImageStyle('borderColor', this.value)">
        <label for="border-width">Border Width:</label>
        <select id="border-width" onchange="updateImageStyle('borderWidth', this.value)">
            <option value="none">None</option>
            <option value="1px">1px</option>
            <option value="2px">2px</option>
            <option value="3px">3px</option>
            <option value="4px">4px</option>
            <option value="5px">5px</option>
        </select>
    `;
}

function updateImageSource(value) {
    if (selectedElement) {
        selectedElement.src = value;
    }
}

function updateImageAlt(value) {
    if (selectedElement) {
        selectedElement.alt = value;
    }
}

function updateImageStyle(styleProperty, value) {
    if (selectedElement) {
        selectedElement.style[styleProperty] = value;
    }
}

function handleRightClick(event) {
    event.preventDefault();
    showEditOptions(event.target);
}

function getBorderColor(element) {
    const borderColor = window.getComputedStyle(element).borderColor;
    return rgbToHex(borderColor);
}

function rgbToHex(rgb) {
    const result = rgb.match(/\d+/g).map(Number);
    return `#${result[0].toString(16).padStart(2, '0')}${result[1].toString(16).padStart(2, '0')}${result[2].toString(16).padStart(2, '0')}`;
}

function showMessage(message, type = 'error') {
    const messageElement = document.getElementById('message');
    messageElement.innerText = message;
    messageElement.style.backgroundColor = type === 'error' ? '#dc3545' : type === 'success' ? '#28a745' : '#17a2b8';
    messageElement.style.display = 'block';
}

function hideMessage() {
    const messageElement = document.getElementById('message');
    messageElement.style.display = 'none';
}
