const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

createBtn.addEventListener("click", function () {

  const note = document.createElement("div");
  note.className = "note";

  const inputbox = document.createElement("div"); // ✅ changed
  inputbox.className = "input-box";
  inputbox.contentEditable = "true";

  const img = document.createElement("img");
  img.src = "images/delete.png";
  img.className = "delete";

  note.appendChild(inputbox);
  note.appendChild(img);   
  notesContainer.appendChild(note);

  inputbox.focus();
});
deletebtn.adde