


const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");


const themeToggle = document.createElement("button");
themeToggle.className = "theme-toggle";
document.body.appendChild(themeToggle);


function updateThemeIcon(){
  themeToggle.innerText =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
}



if(localStorage.getItem("theme")==="dark"){
  document.body.classList.add("dark");
}
updateThemeIcon();
themeToggle.addEventListener("click",()=>{

  document.body.classList.toggle("dark");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );

  updateThemeIcon();
});

// save Notes to local storage
function saveNotes() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

// Delete empty notes on focus out
notesContainer.addEventListener("focusout", function (e) {
  if (
    !e.target.classList.contains("input-box") &&
    !e.target.classList.contains("note-title")
  )
    return;

  const note = e.target.closest(".note");

  const title = note.querySelector(".note-title");
  const body = note.querySelector(".input-box");

  if (title.innerText.trim() === "" && body.innerText.trim() === "") {
    note.remove();
    saveNotes();
  }
});

// Load notes from local storage
function loadNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes") || "";
}
loadNotes();

const last = notesContainer.querySelector(".note:last-child .note-title");
if(last) last.focus();

// Create new note
createBtn.addEventListener("click", function () {
  const note = document.createElement("div");
  note.className = "note";

  const title = document.createElement("div");
  title.className = "note-title";
  title.contentEditable = "true";

  const date = document.createElement("div");
  date.className = "note-date";

  const now = new Date();
  date.innerText = now.toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const inputbox = document.createElement("div");
  inputbox.className = "input-box";
  inputbox.contentEditable = "true";

  const img = document.createElement("img");
  img.src = "images/delete.png";
  img.className = "delete";

  note.appendChild(title);
  note.appendChild(date);
  note.appendChild(inputbox);
  note.appendChild(img);
  notesContainer.appendChild(note);

  title.focus();
  saveNotes();
});


// Delete
notesContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {

    const note = e.target.parentElement;

    note.classList.add("removing"); // start animation

    setTimeout(() => {
      note.remove();
      saveNotes();
    }, 200); 
  }
});
notesContainer.addEventListener("keydown", function (e) {
  if (e.target.classList.contains("note-title") && e.key === "Enter") {
    e.preventDefault();
    e.target.closest(".note").querySelector(".input-box").focus();
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


