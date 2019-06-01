export class Storage {
  constructor() {
    this.data = null;
    this.raw = null;
    this.storageName = "groupsData";
    this.structure = { rankingGroup1: {}, rankingGroup2: {} };
  }

  hello(msg) {
    alert(msg);
  }

  hasData() {
    return this.raw != null ? true : false;
  }

  reset() {
    this.setLocalStorage();
    this.initStorage();
  }

  setLocalStorage() {
    let obj = this.data == null ? this.structure : this.data;
    localStorage.setItem(this.storageName, JSON.stringify(obj));
  }
  //initialize once at start!
  initStorage() {
    this.raw = localStorage.getItem(this.storageName);
    if (this.raw == null) {
      localStorage.setItem(this.storageName, JSON.stringify(this.structure));
      localStorage.getItem(this.storageName);
      console.log("storage initialized...");
    } else {
      console.log("data found...fetching");
    }
    this.data = JSON.parse(this.raw);
    this.validateLocalStorage() ? true : false;
  }

  validateLocalStorage() {
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
    this.setLocalStorage();
  }

  duplicates(arr) {
    var object = {};
    var result = [];

    arr.forEach(function(item) {
      if (!object[item]) object[item] = 0;
      object[item] += 1;
    });

    for (var prop in object) {
      if (object[prop] >= 2) {
        result.push(prop);
      }
    }
    return result.length >= 1 ? true : false;
  }

  dataReady() {
    // console.log("TCL: Storage -> dataReady -> this.data", this.data);
    let group1 = Object.keys(this.data.rankingGroup1),
      group2 = Object.keys(this.data.rankingGroup2);
    // console.log("TCL: Storage -> dataReady -> this.data", this.data);
    // console.log("TCL: Storage -> dataReady -> group1", group1);
    // console.log("TCL: Storage -> dataReady -> group2", group2);

    // console.log(
    //   group1.length == group2.length,
    //   group1.length >= 2,
    //   this.duplicates(group1) == false,
    //   this.duplicates(group2) == false
    // );

    if (
      group1.length == group2.length &&
      group1.length >= 2 &&
      this.duplicates(group1) == false &&
      this.duplicates(group2) == false
    ) {
      return true;
    }
    return false;
  }

  fetchData() {
    console.log(
      "TCL: Storage -> fetchData -> this.dataReady()",
      this.dataReady()
    );
    if (this.dataReady()) {
      return this.data;
    }

    return false;
  }
}
