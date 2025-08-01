// predefined grocery items
const ITEMS = [
  { name: "Rice (1kg)", price: 60 },
  { name: "Wheat Flour (1kg)", price: 50 },
  { name: "Milk (1L)", price: 35 },
  { name: "Eggs (dozen)", price: 90 },
  { name: "Sugar (1kg)", price: 45 },
  { name: "Cooking Oil (1L)", price: 180 },
  { name: "Salt (1kg)", price: 20 }
];

const tbody = document.querySelector("#itemsTable tbody");

function makeRow(item, idx){
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${item.name}</td>
    <td>₹${item.price.toFixed(2)}</td>
    <td><input type="number" min="0" value="0" data-idx="${idx}"></td>
    <td class="right">₹<span class="line">0.00</span></td>
  `;
  return tr;
}

function init(){
  ITEMS.forEach((it,i)=> tbody.appendChild(makeRow(it,i)));
}

function calculate(){
  let subtotal = 0;
  document.querySelectorAll("tbody tr").forEach(row=>{
    const qtyInput = row.querySelector("input");
    const idx = qtyInput.dataset.idx;
    const qty = parseFloat(qtyInput.value) || 0;
    const price = ITEMS[idx].price;
    const line = qty * price;
    row.querySelector(".line").textContent = line.toFixed(2);
    subtotal += line;
  });
  const discountPerc = Math.min(Math.max(parseFloat(document.getElementById("discount").value)||0,0),100);
  const discountAmount = subtotal * (discountPerc/100);
  const total = subtotal - discountAmount;
  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("discountDisplay").textContent = discountPerc.toFixed(2) + "%";
  document.getElementById("total").textContent = total.toFixed(2);
}

function clearAll(){
  document.querySelectorAll("tbody input").forEach(i=> i.value="0");
  document.getElementById("discount").value = "0";
  calculate();
}

document.getElementById("calcBtn").addEventListener("click", calculate);
document.getElementById("clearBtn").addEventListener("click", clearAll);

// auto-calc when quantity changes
tbody.addEventListener("input", e=>{
  if(e.target.tagName === "INPUT") calculate();
});

init();
calculate();
