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

function showInfo(streamDiv, rightContent) {
  streamDiv.style.backgroundColor = "red";
  streamDiv.style.cursor = "pointer";
  let position = streamDiv.getBoundingClientRect();
  const streamInfo = document.createElement("div");
  streamInfo.classList.add('stream-info');
  streamInfo.style.left = `${position.left + position.width}px`
  streamInfo.style.top = `${position.top + position.height}px`
  rightContent.appendChild(streamInfo);
  buildTable(streamInfo);
}

function hideInfo(streamDiv, rightContent) {
  streamDiv.style.background = "none";
  streamInfo = document.querySelector(".stream-info");
  streamInfo.remove();
}

function buildTable(streamInfo) {
  const stHeading = document.createElement("h2");
  stHeading.textContent = "Stream Information";
  streamInfo.appendChild(stHeading);

  const table = document.createElement("table");
  streamInfo.appendChild(table);

  for (let row = 0; row <= 10; row++) {
    const rowElement = document.createElement("tr");
    rowElement.classList.add("table-cell");
    table.appendChild(rowElement);
    for (let col = 0; col <= 1; col++) {
      const cellElement = document.createElement("td");
      cellElement.classList.add("table-cell");
      cellElement.textContent = `row: ${row}, column: ${col}`;
      rowElement.appendChild(cellElement);
    };
  };
};