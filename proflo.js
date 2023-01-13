setTimeout(() => {
  const identifiers = document.querySelector("#drawing-frame").contentWindow.document.querySelectorAll("div");
  const rightContent = document.querySelector(".content-right")

  identifiers.forEach(identifier => {
    if (identifier.textContent.substring(0,2) == "AS") {
      var streamDiv = identifier;
      identifier.addEventListener('mouseover', () => {
        showInfo(identifier, rightContent);
      });
      identifier.addEventListener('mouseout', () => {
        hideInfo(streamDiv, rightContent);
      });
      identifier.addEventListener('click', () => {
        identifier.removeEventListener('mouseOut', () => {
          hideInfo(streamDiv, rightContent);
        });
        showInfo(identifier, rightContent);
      });
    };
  });

}, 100);

let stream_data = [
  ['Parameter','AS-001','AS-002','AS-003'],
  ['Acetone',2.552e-6, 23,423],
  ['Methano',7.348e-5,34,345],
  ['Ethanol',1.408e-6,78,36],
  ['Acetic Acid',1.179e-5,78,67],
  ['Formic Acid',3.960e-6,89,56],
  ['Terpenes',1.382e-4,78,25]
]

function showInfo(streamDiv, rightContent) {
  streamDiv.style.backgroundColor = "red";
  streamDiv.style.cursor = "pointer";
  let position = streamDiv.getBoundingClientRect();
  const streamInfo = document.createElement("div");
  streamInfo.classList.add('stream-info');
  streamInfo.style.left = `${position.left + position.width}px`
  streamInfo.style.top = `${position.top + position.height}px`
  rightContent.appendChild(streamInfo);
  buildTable(streamInfo, streamDiv);
}

function hideInfo(streamDiv, rightContent) {
  streamDiv.style.background = "none";
  streamInfo = document.querySelector(".stream-info");
  streamInfo.remove();
}

function buildTable(streamInfo, streamDiv) {
  const stHeading = document.createElement("h2");
  stHeading.classList.add("streaminfo-title")
  stHeading.textContent = "Stream Information";
  streamInfo.appendChild(stHeading);

  const table = document.createElement("table");
  table.classList.add("stream-table")
  streamInfo.appendChild(table);

  for (let row = 0; row < stream_data.length; row++) {
    const rowElement = document.createElement("tr");
    rowElement.classList.add("table-cell");
    table.appendChild(rowElement);
    for (let col = 0; col < 2; col++) {
      const cellElement = document.createElement("td");
      cellElement.classList.add("table-cell");
      if (col == 0) {
        cellElement.textContent = stream_data[row][0];
      } else {
        cellElement.textContent = stream_data[row][stream_data[0].indexOf(streamDiv.textContent)]
      }
      rowElement.appendChild(cellElement);
    };
  };
};