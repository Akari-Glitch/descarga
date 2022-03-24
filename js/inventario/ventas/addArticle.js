const inputs = document.getElementById("content-articles");
const getCount = inputs.childNodes.length - 1;
let count = Number(getCount);

if (count - 1 < 1) {
  count++;
  let tr = document.createElement("tr");
  tr.setAttribute("class", "article");
  tr.innerHTML += `
				<td id="article${count}">
				<span>${count}#</span>

				<input id="article${count}" autocomplete="off" type="text" name="product" placeholder="nombre del articulo" required>
				</input>
				</td>

				<td>
				<input id="mount${count}" type="number" name="amount" oninput="changeMount(this)" placeholder="cantidad de articulos" required></input>
				</td>

				<td>
				<input id="price${count}" step="0.01" oninput="converToBs(this)" type="number" name="priceDolar" placeholder="precio $"></input>
				</td>

				<td>
				<input id="priceBs${count}" step="0.01" type="number" name="priceBs" placeholder="precio bs" readonly>
				</td>

				<td>
				<input id="priceTotalDolar${count}" step="0.01" type="number" name="priceTotalDolar" placeholder="monto $" readonly>
				</td>

				<td>
				<input id="priceTotalBs${count}" step="0.01" type="number" name="priceTotalBs" placeholder="monto Bs" readonly>
				</td>

				<td class="btn-delete-art"></td>
				`;

  inputs.appendChild(tr);
}

function addNewArticle() {
  count++;
  let tr = document.createElement("tr");
  tr.setAttribute("class", "article");
  tr.innerHTML = `
				<td>
				<span>${count}#</span>
				<input id="article${count}" autocomplete="off" type="text" name="product" placeholder="nombre del articulo" required>
				</input>
				</td>

				<td>
				<input id="mount${count}" oninput="changeMount(this)" type="number" name="amount" placeholder="cantidad de articulos" required></input>
				</td>

				<td>
				<input id="price${count}" step="0.01" type="number" oninput="converToBs(this)" name="priceDolar" placeholder="precio $"></input>
				</td>

				<td>
				<input id="priceBs${count}" step="0.01" type="number" name="priceBs" placeholder="monto bs" readonly>
				</td>

				<td>
				<input id="priceTotalDolar${count}" step="0.01" type="number" name="priceTotalDolar" placeholder="total $" readonly>
				</td>

				<td>
				<input id="priceTotalBs${count}" step="0.01" type="number" name="priceTotalBs" placeholder="monto Bs" readonly>
				</td>
				<td onClick="removeArticle(this)" class="btn-delete-art">
				Eliminar
				</td>
					`;

  inputs.appendChild(tr);
}

function removeArticle(e) {
  e.parentElement.remove();
  changeTotal();
}
