const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");




// save Notes to local storage
function saveNotes() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}



notesContainer.addEventListener("focusout", function (e) {
  if (!e.target.classList.contains("input-box")) return;

  const note = e.target.parentElement;

  // if note already removed (delete click)
  if (!note.isConnected) return;

  if (e.target.innerText.trim() === "") {
    note.remove();
    saveNotes();
  }
});

// Load notes from local storage
function loadNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes") || "";
}
loadNotes();




const last = notesContainer.querySelector(".input-box:last-child");
if (last) last.focus();



// Create new note
createBtn.addEventListener("click", function () {
  const note = document.createElement("div");
  note.className = "note";

  const inputbox = document.createElement("div");
  inputbox.className = "input-box";
  inputbox.contentEditable = "true";

  const img = document.createElement("img");
  img.src = "images/delete.png";
  img.className = "delete";

  note.appendChild(inputbox);
  note.appendChild(img);
  notesContainer.appendChild(note);

  inputbox.focus();
  saveNotes();
});



// Delete
notesContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    saveNotes();
  }
});

// notesContainer.addEventListener("keydown", function(e){
//     if(e.key === "Enter" && e.target.classList.contains("input-box")){
//         e.preventDefault(); // prevent new line
//         createBtn.click(); // trigger create button click
//     }
// })


//  Auto save while typing
notesContainer.addEventListener("input", saveNotes);
