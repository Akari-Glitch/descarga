let tasadolar = Number(document.getElementById("tasa-actual").textContent);
const montoTotalDolar = document.getElementById("monto-total-dolar");
const montoTotalBs = document.getElementById("monto-total-bs");

// esta funcion cambia los campos que represental el total, tanto en bs como en $

function changeTotal() {
  let suma = 0;
  console.log(inputs);
  if (inputs.childNodes.length - 1 != 0) {
    for (let i = 1; i <= inputs.childNodes.length - 1; i++) {
      let input = inputs.childNodes[i].childNodes[9] != undefined ? 9 : 5;
      let inputChild = input == 9 ? 1 : 0;

      let artMontoDolar =
        inputs.childNodes[i].childNodes[input].childNodes[inputChild].id;
      let valueMontoDolar = Number(
        document.getElementById(artMontoDolar).value
      );
      suma += valueMontoDolar;
    }
  } else {
    suma = 0;
  }
  montoTotalDolar.value = suma.toFixed(2);
  montoTotalBs.value = (montoTotalDolar.value * tasadolar).toFixed(2);
}

// esta funcion hace la conversion a bolivares y actualiza los campos

function converToBs(e) {
  const getCount = e.id.slice(5);
  const mount = document.getElementById(`mount${getCount}`);
  const priceBs = document.getElementById(`priceBs${getCount}`);
  const priceTotalBs = document.getElementById(`priceTotalBs${getCount}`);
  const priceTotalDolar = document.getElementById(`priceTotalDolar${getCount}`);
  const priceDolar = document.getElementById(`price${getCount}`);

  priceBs.value = (tasadolar * e.value).toFixed(2);
  priceTotalBs.value = (tasadolar * e.value * mount.value).toFixed(2);
  priceTotalDolar.value = (priceDolar.value * mount.value).toFixed(2);

  if (document.getElementById(`priceTotalDolar1`) != null) {
    changeTotal();
  }
}

// esta funcion al cambiar la cantidad de articulos, se actualiza los demas campos dependientes

function changeMount(e) {
  const getCount = e.id.slice(5);
  const priceDolar = document.getElementById(`price${getCount}`);
  converToBs(priceDolar);
}
