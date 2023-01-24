//Importing the stream data from a CSV file.
import stream_data from './PFD-MEB-v5.csv';

//Set time out so that all of this JS happens once the drawing HTML file is put onto the webpage
setTimeout(() => getElements(), 100);

//Gather assets from the page.
function getElements() {
  const identifiers = document.querySelector("#drawing-frame").contentWindow.document.querySelectorAll("div");
  const rightContent = document.querySelector(".content-right");
  const addProjectBtn = document.getElementById("add-project-btn");
  const form = document.getElementById("add-project-form");

  //Call the event listener functions
  addSNListeners(identifiers, rightContent);
  addPageListeners(addProjectBtn, form);
}

//Add Event Listeners on the stream numbers on the drawing. 
function addSNListeners(identifiers, rightContent) {
  identifiers.forEach(identifier => {
    if (identifier.textContent.substring(0,2) == "AS") {
      
      // Create div blocks which will be the boxes holding the stream tables.
      const streamDiv = document.createElement("div");
      // Asign the div blocks the ID of the stream number
      streamDiv.id = identifier.textContent;

      //Find the position of the stream number on the page
      let position = identifier.getBoundingClientRect();
      //Call the buildTable function to populate the table box with the necessary data.
      buildTable(streamDiv, position, rightContent);
      
      //Add event listener such that the stream data will be shown when the stream number is clicked.
      identifier.addEventListener('click', () => {
        showInfo(identifier, streamDiv);
      });

      return rightContent;
    };
  });  
};

//Build the stream table with the necessary data from the CSV file.
function buildTable(streamDiv, position, rightContent) {
  //Create a div block for the actual stream table.
  const streamInfo = document.createElement("div");
  streamDiv.appendChild(streamInfo);

  //Add a heading to the stream data box.
  const stHeading = document.createElement("h2");
  stHeading.classList.add("streaminfo-title");
  stHeading.textContent = "Stream Information";
  streamInfo.appendChild(stHeading);

  //Create a table for the stream data
  const table = document.createElement("table");
  table.classList.add("stream-table");
  streamInfo.appendChild(table);

  //Populate the stream data using the CSV file.
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

  //Add class list and position the table. Set the display of the table to "none" which means it's default is to not be shown.
  streamDiv.classList.add('stream-info');
  streamDiv.style.left = `${position.left + position.width}px`
  streamDiv.style.top = `${position.top + position.height}px`
  streamDiv.style.display = "none";

  //Append the table to the page (invisible by default)
  rightContent.appendChild(streamDiv);
};

//Function to show the stream table.
function showInfo(identifier, streamDiv) {
  identifier.style.backgroundColor = "red";
  identifier.style.cursor = "pointer";

  //Change the display of the stream data from "none" to "flex" which will make the table visible on the page.
  streamDiv.style.display = "flex";
}

//Function to hide the stream table.
function hideInfo(identifier, streamDiv) {
  identifier.style.backgroundColor = "white";
  identifier.style.cursor = "pointer";

  //Change the display of the stream data from "flex" to "none" which will make the table invisible on the page.
  streamDiv.style.display = "none";
}

function addPageListeners(addProjectBtn, form) {
  const modal = document.getElementById('add-project-wrapper');
  const cancelBtn = document.getElementById('project-stop');
  addProjectBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    form.reset();
    createProject(data, addProjectBtn);
    modal.style.display = 'none';
  });
  cancelBtn.addEventListener('click', (event) => {
    event.preventDefault();
    form.reset();
    modal.style.display = 'none';
  })
};

function createProject(data, addProjectBtn) {
  const newProject = document.createElement('div');
  newProject.classList.add('navigation-button');
  newProject.textContent = data.name;
  const leftContent = document.getElementById("content-left");
  leftContent.insertBefore(newProject, addProjectBtn);
}