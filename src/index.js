//Importing the stream data from a CSV file.
import stream_data from './PFD-MEB-v5.csv';

//Set time out so that all of this JS happens once the drawing HTML file is put onto the webpage
setTimeout(() => getElements(), 100);

//Gather assets from the page.
function getElements() {
  const identifiers = document.querySelector("#drawing-frame").contentWindow.document.querySelectorAll("div");
  const rightContent = document.querySelector(".content-right");
  const addProjectBtn = document.getElementById("add-project-btn");

  //Call the event listener functions
  addSNListeners(identifiers, rightContent);
  addPageListeners(addProjectBtn);
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

      //Add event listener such that the text will change when the stream number is hovered over.
      identifier.addEventListener('mouseover', () => {
        streamNumberHover(identifier);
      })

      //Add event listener such that the text will change when the mouse leaves the stream area.
      identifier.addEventListener('mouseout', () => {
        streamNumberOut(identifier);
      })
      
      //Add event listener such that the stream data will be shown when the stream number is clicked.
      identifier.addEventListener('click', () => {
        showInfo(streamDiv);
      });

      return rightContent;
    };
  });  
};

//Build the stream table with the necessary data from the CSV file.
function buildTable(streamDiv, position, rightContent) {

  const streamInfoHeader = document.createElement("div");
  streamInfoHeader.classList.add("stream-info-header")
  streamDiv.appendChild(streamInfoHeader)

  const exitBtn = document.createElement("div");
  exitBtn.textContent = "x";
  streamInfoHeader.appendChild(exitBtn);
  exitBtn.classList.add("stream-info-header-exit")

  streamInfoExitBtnListeners(exitBtn, streamDiv);

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

  //Add a button for making comments
  const commentBtn = document.createElement('button');
  commentBtn.textContent = "Add Comment"
  commentBtn.classList.add('add-comment-button');
  streamInfo.appendChild(commentBtn);
  addCommentBtn(commentBtn, streamDiv);

  //Add class list and position the table. Set the display of the table to "none" which means it's default is to not be shown.
  streamDiv.classList.add('stream-info');
  streamDiv.style.left = `${position.left + position.width}px`
  streamDiv.style.top = `${position.top + position.height}px`
  streamDiv.style.display = "none";

  //Append the table to the page (invisible by default)
  rightContent.appendChild(streamDiv);

  dragElement(streamDiv, streamInfoHeader);
};

//Function to change display of stream number when hovered over.
function streamNumberHover(identifier) {
  identifier.style.cursor = "pointer";
  identifier.style.backgroundColor = "rgb(204, 255, 239)"
  identifier.style.border = "solid 2px rgb(71, 71, 209)";
  identifier.style.padding = "5px"
}

//Function to change display of stream number when hovered over.
function streamNumberOut(identifier) {
  identifier.style.cursor = "default";
  identifier.style.backgroundColor = "white"
  identifier.style.border = "none";
  identifier.style.padding = "0px";
}

//Function to show the stream table.
function showInfo(streamDiv) {
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

//Function to add event listeners to the add project buttons
function addPageListeners(addProjectBtn) {
  // Get all the assets required for event listeners
  const projectForm = document.getElementById("add-project-form");
  const commentForm = document.getElementById('add-comment-form');
  const projectModal = document.getElementById('add-project-wrapper');
  const projectCancelBtn = document.getElementById('project-stop');
  const commentCancelBtn = document.getElementById('comment-stop');
  const commentModal = document.getElementById('add-comment-wrapper');
  //EL for add project button
  addProjectBtn.addEventListener('click', () => {
    projectModal.style.display = 'flex';
  });
  //EL for submit new project button
  projectForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(projectForm);
    const projectData = Object.fromEntries(formData);
    projectForm.reset();
    createProject(projectData, addProjectBtn);
    projectModal.style.display = 'none';
  });
  //EL for cancel new project button
  projectCancelBtn.addEventListener('click', (event) => {
    event.preventDefault();
    projectForm.reset();
    projectModal.style.display = 'none';
  })
  //EL for submit new comment button
  commentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(commentForm);
    const commentData = Object.fromEntries(formData);
    commentForm.reset();
    document.getElementById('add-comment-wrapper').style.display = 'none';
  })
  //EL for cancel new comment button
  commentCancelBtn.addEventListener('click', (event) => {
    event.preventDefault();
    projectForm.reset();
    commentModal.style.display = 'none';
  })
};

//function to add a project and gain the project data.
function createProject(data, addProjectBtn) {
  const newProject = document.createElement('div');
  newProject.classList.add('navigation-button');
  newProject.textContent = data.name;
  const leftContent = document.getElementById("content-left");
  leftContent.insertBefore(newProject, addProjectBtn);
}

function addCommentBtn(commentBtn) {
  commentBtn.addEventListener('click', () => {
    document.getElementById('add-comment-wrapper').style.display = 'flex'
  })
}

function streamInfoExitBtnListeners(exitBtn, streamDiv) {
  exitBtn.addEventListener('mouseover', () => {
    exitBtn.style.cursor = "pointer";
    exitBtn.style.filter = "brightness(90%)"
  })
  
  exitBtn.addEventListener('mouseout', () => {
    exitBtn.style.cursor = "default";
    exitBtn.style.filter = "none"
  })

  exitBtn.addEventListener('click', () => {
    streamDiv.style.display = "none";
  })
}

function dragElement(streamDiv, streamInfoHeader) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  streamInfoHeader.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || windows.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    streamDiv.style.top = (streamDiv.offsetTop - pos2) + "px";
    streamDiv.style.left = (streamDiv.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}