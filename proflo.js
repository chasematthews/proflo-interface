setTimeout(() => {
  const identifiers = document.querySelector("#drawing-frame").contentWindow.document.querySelectorAll("div");
  const rightContent = document.querySelector(".content-right")

  identifiers.forEach(identifier => {
    if (identifier.textContent.substring(0,2) == "AS") {
      identifier.addEventListener('mouseover', () => {
        identifier.style.backgroundColor = "red";
        identifier.style.cursor = "pointer";
        let position = identifier.getBoundingClientRect();
        const streamInfo = document.createElement("div");
        streamInfo.classList.add('stream-info')
        streamInfo.style.left = `${position.left + position.width}px`
        streamInfo.style.top = `${position.top + position.height}px`
        rightContent.appendChild(streamInfo);
      });
      identifier.addEventListener('mouseout', () => {
        identifier.style.background = "none";
        streamInfo = document.querySelector(".stream-info");
        streamInfo.remove();
      });
    };
  });
}, 100);
