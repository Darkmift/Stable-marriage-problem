export class Storage {
  constructor() {
    this.data = null;
    this.raw = null;
    this.storageName = "groupsData";
    this.structure = { rankingGroup1: {}, rankingGroup2: {} };
  }

  hello() {
    console.log(this.data);
  }

  //initialize once at start!
  getLocalStorage() {
    this.raw = localStorage.getItem(this.storageName);
    if (this.raw == null) {
      localStorage.setItem("groupsData", JSON.stringify(this.structure));
      console.log("storage initialized...");
    } else {
      console.log("data found...fetching");
    }
    this.validateLocalStorage();
  }

  validateLocalStorage() {
    if (this.raw == null) {
      return false;
    }
    this.data = JSON.parse(this.raw);
    if (
      this.data.hasOwnProperty("rankingGroup1") &&
      this.data.hasOwnProperty("rankingGroup2")
    ) {
      return true;
    }
    return false;
  }

  addPerson(name, parentGroup, choicesArr) {
    this.data[parentGroup][name] = choicesArr;
  }
}
