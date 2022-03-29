let saveChanges = document.getElementById("save-changes");
let addArticle = document.getElementById("add-article");
saveChanges.style.display = "none";
function addArticleInv() {
  let trInv = document.createElement("tr");
  const tbody = document.getElementById("tbody-inv");
  trInv.setAttribute("class", "article");

  trInv.innerHTML = `
                <td> <span>#</span></td>     
                <td> <input autocomplete="off" oninput="activeChange()" name="id" required></input></td>
                <td> <input autocomplete="off" oninput="activeChange()" name="articulo"></input required></td> 
                <td> <input autocomplete="off" oninput="activeChange()" step="0.01" type="number" name="precioDolar" required></input></td> 
                <td> <input autocomplete="off" oninput="activeChange()" step="0.01" type="number" name="cantidad" required></input></td>  
                <td class="btn-delete-art" onClick="removeArt(this)" required>Eliminar</td>       
        `;

  tbody.appendChild(trInv);
  activeChange();
}

function removeArt(e) {
  e.parentElement.remove();
  activeChange();
}

function activeChange() {
  saveChanges.style.display = "block";
}
