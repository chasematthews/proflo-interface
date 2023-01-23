import stream_data from './PFD-MEB-v5.csv';

setTimeout(() => getElements(), 100);

function getElements() {
  const identifiers = document.querySelector("#drawing-frame").contentWindow.document.querySelectorAll("div");
  const rightContent = document.querySelector(".content-right");
  addSNListeners(identifiers, rightContent)
}

function addSNListeners(identifiers, rightContent) {
  identifiers.forEach(identifier => {
    if (identifier.textContent.substring(0,2) == "AS") {
      
      const streamDiv = document.createElement("div");
      streamDiv.id = identifier.textContent;

      let position = identifier.getBoundingClientRect();
      buildTable(streamDiv, position, rightContent);
      
      identifier.addEventListener('click', () => {
        showInfo(identifier, streamDiv);
      });

      return rightContent;
    };
  });  
};

function buildTable(streamDiv, position, rightContent) {
  const streamInfo = document.createElement("div");
  streamDiv.appendChild(streamInfo);

  const stHeading = document.createElement("h2");
  stHeading.classList.add("streaminfo-title");
  stHeading.textContent = "Stream Information";
  streamInfo.appendChild(stHeading);

  const table = document.createElement("table");
  table.classList.add("stream-table");
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
        cellElement.textContent = stream_data[row][stream_data[0].indexOf(streamDiv.id)];
      }
      rowElement.appendChild(cellElement);
    };
  };

  streamDiv.classList.add('stream-info');
  streamDiv.style.left = `${position.left + position.width}px`
  streamDiv.style.top = `${position.top + position.height}px`
  streamDiv.style.display = "none";

  rightContent.appendChild(streamDiv);
};

function showInfo(identifier, streamDiv) {
  identifier.style.backgroundColor = "red";
  identifier.style.cursor = "pointer";
  streamDiv.style.display = "flex";
}

function hideInfo(identifier, streamDiv) {
  identifier.style.backgroundColor = "white";
  identifier.style.cursor = "pointer";
  streamDiv.style.display = "none";
}