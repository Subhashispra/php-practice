function handleUpload() {
    const fileInput = document.getElementById('xmlFileInput');
    const linkInput = document.getElementById('xmlLinkInput');
    const downloadLinksDiv = document.getElementById('downloadLinks');

    // Check if a file is uploaded or a link is provided
    if (fileInput.files.length > 0) {
        // Handle file upload
        const file = fileInput.files[0];
        handleFile(file, downloadLinksDiv);
    } else if (linkInput.value.trim() !== '') {
        // Handle online XML file link
        const xmlLink = linkInput.value.trim();
        fetch(xmlLink)
            .then(response => response.text())
            .then(xmlContent => handleXMLContent(xmlContent, downloadLinksDiv))
            .catch(error => alert(`Error fetching XML file: ${error.message}`));
    } else {
        alert('Please select an XML file or provide an XML file link.');
    }
}

function handleFile(file, downloadLinksDiv) {
    const reader = new FileReader();

    reader.onload = function (e) {
        const xmlContent = e.target.result;
        handleXMLContent(xmlContent, downloadLinksDiv);
    };

    reader.readAsText(file);
}

function handleXMLContent(xmlContent, downloadLinksDiv) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');

    const videoNodes = xmlDoc.getElementsByTagName('video:video');
    downloadLinksDiv.innerHTML = '';

    for (let i = 0; i < videoNodes.length; i++) {
        const title = videoNodes[i].getElementsByTagName('video:title')[0].textContent;
        const contentLoc = videoNodes[i].getElementsByTagName('video:content_loc')[0].textContent;

        const link = document.createElement('a');
        link.href = contentLoc;
        link.target = '_blank';
        link.textContent = `Download ${title}`;
        link.download = `${title}.mp4`; // Set the download attribute

        downloadLinksDiv.appendChild(link);
        downloadLinksDiv.appendChild(document.createElement('br'));
    }
}
