let cart = [];

function addItem(name, price) {
  let found = cart.find(i => i.name === name);
  if (found) {
    found.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  renderCart();
}

function renderCart() {
  let cartDiv = document.getElementById("cart");
  let totalDiv = document.getElementById("total");
  cartDiv.innerHTML = "";

  let total = 0;

  cart.forEach(i => {
    total += i.price * i.qty;
    cartDiv.innerHTML +=`${i.name} × ${i.qty}<br>`;
  });

  totalDiv.innerText = "Total: ₹" + total;
}

function placeOrder() {
  let table = document.getElementById("tableNumber").value;

  if (!table || cart.length === 0) {
    alert("Table & items required");
    return;
  }

  let total = cart.reduce((s,i)=>s+i.price*i.qty,0);

  let order = {
    id: Date.now(),
    table: table,
    items: cart,
    total: total,
    status: "pending"
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  alert("ORDER PLACED");
  showBill(order);

  cart = [];
  renderCart();
}
function showBill(order) {
  document.getElementById("billTable").innerText = order.table;

  const itemsDiv = document.getElementById("billItems");
  itemsDiv.innerHTML = "";

  order.items.forEach(i => {
    itemsDiv.innerHTML += `
      <p>${i.name} × ${i.qty} = ₹${i.price * i.qty}</p>
    `;
  });

  document.getElementById("billTotal").innerText = order.total;
  document.getElementById("billPopup").style.display = "flex";
}

function closeBill() {
  document.getElementById("billPopup").style.display = "none";
}
