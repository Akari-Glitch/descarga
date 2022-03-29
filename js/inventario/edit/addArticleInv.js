//
const inputsInv = document.getElementById("content-articles-edit");
const getCountInv = inputsInv.childNodes.length - 1;
let countInv = Number(getCountInv);
document.getElementById("add-venta").style.display = "none";
function addNewArticleInv() {
  countInv++;
  let tr = document.createElement("tr");
  tr.setAttribute("class", "article");
  tr.innerHTML = `
				<td>
				<span>${countInv}#</span>
				<input id="article${countInv}" autocomplete="off" type="text" name="product" placeholder="nombre del articulo" required>
				</input>
				</td>
				<td>
				<input id="mount${countInv}" oninput="changeMount(this)" type="number" name="amount" placeholder="cantidad" required></input>
				</td>
				<td>
				<input id="price${countInv}" step="0.01" type="number" oninput="converToBs(this)" name="priceDolar" placeholder="precio $"></input>
				</td>
				<td>
				<input id="priceBs${countInv}" step="0.01" type="number" name="priceBs" placeholder="monto bs" readonly>
				</td>
				<td>
				<input id="priceTotalDolar${countInv}" step="0.01" type="number" name="priceTotalDolar" placeholder="total $" readonly>
				</td>
				<td>
				<input id="priceTotalBs${countInv}" step="0.01" type="number" name="priceTotalBs" placeholder="monto Bs" readonly>
				</td>
				<td onClick="removeArticle(this)" class="btn-delete-art">
				Eliminar
				</td>
					`;

  inputsInv.appendChild(tr);
}

function removeArticle(e) {
  e.parentElement.remove();
  changeTotal();
}
