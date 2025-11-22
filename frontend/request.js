import config from "./config.js";

export default class MedicineServices {
  constructor() {
    this.baseUrl = config.baseUrl; // hardcoded base url
    /*
    The base url is hardcoded because the static we
    */
  }

  // Fetches all medicine in the data.json file
  async fetchMedicines() {
    try {
      const response = await fetch(this.baseUrl + "/medicines", {
        method: "GET",
      });
      if (response.status != 200) {
        throw new Error("Network Error");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  // Fetches Medicine Based On Name
  async fetchMedicineName(name) {
    try {
      const response = await fetch(this.baseUrl + "/medicines/" + name, {
        method: "GET",
      });
      if (response.status != 200 || !response.ok) {
        throw new Error("Network Error");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  // Create Medicine
  async createMedicine(form) {
    try {
      const response = await fetch(this.baseUrl + "/create", {
        method: "POST",
        body: form,
      });
      if (response.status != 200) {
        throw new Error("Network Error");
      }
      alert(response.statusText + " " + response.status);
      console.log("Created");
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  // Update Medicine
  async updateMedicine(form) {
    try {
      const response = await fetch(this.baseUrl + "/update", {
        method: "POST",
        body: form,
      });
      if (response.status != 200 || !response.ok) {
        throw new Error("Network Error");
      }
      console.log("Updated");
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  // Delete Medicine
  async deleteMedicine(form) {
    try {
      const response = await fetch(this.baseUrl + "/delete", {
        method: "DELETE",
        body: form,
      });
      if (response.status != 200) {
        throw new Error("Network Error");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  // Delete Medicine
  async averagePrice() {
    try {
      const response = await fetch(this.baseUrl + "/average", {
        method: "GET",
      });
      if (response.status != 200) {
        throw new Error("Network Error");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}
