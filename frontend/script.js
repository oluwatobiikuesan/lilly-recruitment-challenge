import ButtonAction from "./action.js";
import MedicineServices from "./request.js";
const med_service = new MedicineServices();
const form = new FormData();
const med_name = document.getElementById("meds_name");
const med_price = document.getElementById("meds_price");
const search_input = document.getElementById("search_input");
const create_button = document.getElementById("add");
const listing_node = document.getElementById("listing");
const show_average_price = document.getElementById("avg_price");
const action = new ButtonAction(form);

function createCard(name, price) {
  const template = document.getElementById("med_template");
  const clone = template.content.cloneNode(true);
  clone.querySelector("li b").textContent = name;
  clone.querySelector("li small").textContent = "$" + price;

  // Edit button action
  clone.querySelector("#edit").addEventListener("click", function () {
    let newPrice = prompt("Enter new price:");
    form.set("name", name);
    form.set("price", newPrice);
    action.editAction();
    form.delete;
  });

  // Delete button action
  clone.querySelector("#delete").addEventListener("click", function () {
    form.set("name", name);
    form.set("price", price);
    action.deleteAction();
    form.delete;
  });

  return clone;
}

// Listing medicine
document.addEventListener("DOMContentLoaded", async function () {
  const listed_data = await med_service.fetchMedicines();
  const average_price = await med_service.averagePrice();

  let avg = show_average_price.appendChild(document.createElement("span"));
  avg.setAttribute("class", "large_text");
  avg.innerText = "$" + average_price.toFixed(2) || "0";

  listed_data.medicines.forEach((item) => {
    let name = item.name || "Unknown";
    let price = item.price || "No price";
    listing_node.appendChild(createCard(name, price));
  });
});

search_input.addEventListener("change", async function () {
  const meds = await med_service.fetchMedicineName(search_input.value);
  console.log(meds);
  alert(meds.name);
});

create_button.addEventListener("click", function (event) {
  event.preventDefault();
  try {
    if (med_name.value === "" || med_price.value === "") {
      alert("Enter value for name and price");
      return;
    } else {
      form.set("name", med_name.value);
      form.set("price", med_price.value);
      med_service.createMedicine(form);
    }
  } catch (error) {
    if (error.message == "Network Error") {
      alert("Network Issues");
    }
    alert(error.message);
  } finally {
    form.delete;
    med_name.value = "";
    med_price.value = "";
  }
});

// Testing
async function test() {
  const data = await med_service.fetchMedicines();
  data.medicines.map((item) => {
    console.log(item.name);
  });
  const named_data = await med_service.fetchMedicineName("Cureallium");
  console.log(named_data);
  // const create = await createMedicine(form);
}

test();
