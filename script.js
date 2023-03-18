function readWav() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    const data = new Uint8Array(e.target.result);
    const left = new Int16Array(data.buffer, 44); // Assumes 16-bit audio
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = xhr.responseURL;
        downloadLink.style.display = 'block';
      }
    };
    xhr.open('POST', 'process_wav.php'); // Replace with your server-side script
    xhr.setRequestHeader('Content-Type', 'application/octet-stream');
    xhr.responseType = 'blob';
    xhr.send(new Blob([left.buffer]));
  };
  reader.readAsArrayBuffer(file);
}
