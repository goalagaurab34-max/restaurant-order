function loadKitchenOrders() {
  const tbody = document.getElementById("kitchenOrders");
  tbody.innerHTML = "";

  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const pendingOrders = orders.filter(o => o.status === "pending");

  if (pendingOrders.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5">No pending orders</td>
      </tr>
    `;
    return;
  }

  pendingOrders.forEach(order => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${order.id}</td>
      <td>${order.table}</td>
      <td>
        ${order.items.map(i => `${i.name} × ${i.qty}`).join("<br>")}
      </td>
      <td>₹${order.total}</td>
      <td>
        <button onclick="markDone(${order.id})">DONE</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

function markDone(orderId) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders = orders.map(order => {
    if (order.id === orderId) {
      order.status = "completed";
    }
    return order;
  });

  localStorage.setItem("orders", JSON.stringify(orders));
  loadKitchenOrders();
}

/* AUTO LOAD + AUTO REFRESH */
loadKitchenOrders();
setInterval(loadKitchenOrders, 1000);
