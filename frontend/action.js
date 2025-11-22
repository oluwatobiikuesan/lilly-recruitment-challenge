import MedicineServices from "./request.js";
const med_service = new MedicineServices();

export default class ButtonAction {

  constructor(form){
    super.key;
    this.form = form;
  }

  editAction() {
    try {
      if (this.form) {
        med_service.updateMedicine(this.form);
      } else {
        alert("Medicine probably does not exist");
      }
    } catch (error) {
      if (error.message) {
        alert(error.message);
      }
      alert(error);
    }
  }

  deleteAction() {
    try {
      if (this.form) {
        med_service.deleteMedicine(this.form);
      } else {
        alert("There is no item to delete");
      }
    } catch (error) {
      if (error.message) {
        alert(error.message);
      }
    }
  }

}
