function loadAdmin() {

  const pending = JSON.parse(localStorage.getItem("orders")) || [];
  const completed = JSON.parse(localStorage.getItem("completedOrders")) || [];

  // COUNTS
  document.getElementById("pendingOrders").innerText = pending.length;
  document.getElementById("completedOrders").innerText = completed.length;
  document.getElementById("totalOrders").innerText =
    pending.length + completed.length;

  // TOTAL SALES
  const sales = completed.reduce((sum, o) => sum + (o.total || 0), 0);
  document.getElementById("totalSales").innerText = sales;

  // TABLE
  const table = document.getElementById("orderTable");
  table.innerHTML = "";

  [...pending, ...completed].forEach(order => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.table}</td>
      <td>
        ${order.items.map(i => `${i.name} × ${i.qty}`).join("<br>")}
      </td>
      <td>₹${order.total}</td>
      <td>${order.status}</td>
    `;

    table.appendChild(row);
  });
}

loadAdmin();
setInterval(loadAdmin, 2000);
