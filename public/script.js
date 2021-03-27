async function dataHandler() {
    const endpoint = await fetch('/api/dining');
    const data = await endpoint.json();
    const table = document.querySelector('tbody');
  
    data.data.forEach((item) => {
      const location = document.createElement('tr');
      location.innerHTML = `
      <th>${item.hall_id}</th>
      <th>${item.hall_name}</th>
      <th>${item.hall_address}</th>`;
      table.append(location);
    });
  }
  
async function windowActions() {
    await dataHandler();
}

window.onload = windowActions;