export {
  validateInput,
  renderInputGroupt,
  groupNames,
  uniqueNames,
  renderRankingForm,
  renderSubmitBtn,
  btnCallback,
  renderRankingContainer,
  calcAll
};

import { Storage } from "./Storage.js";
import { Person, doMarriage } from "./Person.js";
let FormData = new Storage();
FormData.reset();

function validateInput(logic, errEl, msg) {
  if (logic) {
    showErr(errEl, msg);
    return false;
  }
  return true;
}

function showErr(errEl, errMsg) {
  console.log("TCL: showErr -> errMsg", errMsg);

  errEl.text(errMsg);
  errEl
    .slideDown("slow")
    .delay(1500)
    .slideUp("slow");
}

function renderInputGroupt(fieldName, groupName) {
  let container = $("<div></div>", {
    class: "col-s-6 col-m-6 col-l-6 col-xl-6"
  });
  let formGroup = $("<div></div>", {
    class: "form-group"
  });
  let label = $("<label></label>", {
    for: fieldName
  });
  let input = $("<input>", {
    class: "form-control",
    type: "text",
    id: `${groupName}_${fieldName + 1}`,
    placeholder: `member#${fieldName + 1}`
  });
  container.append(formGroup.append([label, input]));
  return container;
}

function groupNames(group, errEl, groupName) {
  let flag = false;
  let msg = "";
  let groupValues = [];

  $.each($(group).find("input"), function(index, element) {
    if ($(element).val().length < 1) {
      flag = true;
      msg = `${groupName} has empty entries`;
      return false;
    }
    groupValues.push($(element).val());
  });

  if (flag) {
    validateInput(true, errEl, msg);
    return false;
  }

  if (find_duplicate_in_array(groupValues)) {
    msg = `${groupName} has duplicate entries`;
    validateInput(true, errEl, msg);
    return false;
  }

  return groupValues;
}

function uniqueNames(group1, group2) {
  let groupValues = [];

  $.each($(group1).find("input"), function(index, element) {
    groupValues.push($(element).val());
  });
  $.each($(group2).find("input"), function(index, element) {
    groupValues.push($(element).val());
  });

  return !find_duplicate_in_array(groupValues);
}

function find_duplicate_in_array(arr) {
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

function renderSelect(arr, name) {
  let select = $("<select></select>", {
    class: "form-control",
    name: name
  });

  $.each(arr, function(index, element) {
    let option = $("<option></option>", {
      value: element.toString(),
      text: element.toString()
    });
    select.append(option);
  });
  return select;
}

function renderRankingForm(name, group) {
  let form = $("<form></form>", {
    class: "col-sm-12 row",
    id: name
  });

  let formGroup = $("<div></div>", {
    class: "form-group col-sm-12"
  });
  let label = $("<label></label>", {
    style: "font-weight: bold",
    text: `Rank candidates for ${name}`
  });

  formGroup.append(label);
  $.each(group, function(index, name) {
    formGroup.append(renderSelect(group, index));
  });
  formGroup.append(renderSubmitBtn(name));
  formGroup.append($("<hr>"));
  form.append(formGroup);
  return form;
}

function renderSubmitBtn(name) {
  let container = $("<div></div>", {
    class: "row col-sm-12"
  });
  let button = $("<button></button>", {
    type: "submit",
    class: "btn btn-primary btn-block",
    id: `${name}_rankings`,
    text: `Update ${name} rankings`
  });
  container.append(button);
  return container;
}

function btnCallback(e) {
  let parentForm = $(e.target).closest("form");

  let arr = parentForm.serialize().split("&");
  arr = arr.map(subArr => subArr.split("=")[1]);

  //validate selects all have diffrent values
  if (find_duplicate_in_array(arr)) {
    validateInput(
      true,
      $("#errDiv"),
      "cannot-save: values for each select must be diffrent"
    );
    return;
  }
  $(e.target).removeClass("btn-primary");
  $(e.target).addClass("btn-warning");
  $(e.target).text("Edit again?");
  let parentGroup = parentForm.parent().attr("id");
  let PickerName = parentForm.attr("id");
  FormData.addPerson(PickerName, parentGroup, arr);
}

function renderRankingContainer(groups, container) {
  //build form for each group member and populate choices
  $.each(groups[0], function(index, name) {
    let rankingForm = renderRankingForm(name, groups[1]);
    $(rankingForm)
      .find("button")
      .click(e => {
        e.preventDefault();
        btnCallback(e);
      });
    container.append(rankingForm);
  });
  return container;
}

function calcAll() {
  if (FormData.fetchData() == false) {
    validateInput(
      true,
      $("#errDiv"),
      "either previous data is conflicting or you've not updated for all candidates."
    );
    $("#previousDataAlert").show();
    return;
  }

  let groups = Object.values(FormData.fetchData());
  const groupNames = Object.keys(groups);
  console.log("TCL: calcAll -> groupNames", groupNames);
  console.log("TCL: calcAll -> groups", groups);

  let people = {};
  for (let obj in groups) {
    let group = groups[obj];
    for (let person in group) {
      people[person] = group[person];

      // console.log("TCL: people", people);
    }
  }

  let candidates = [];
  let choices = [];

  for (let person in people) {
    let bachelor = new Person(person);
    candidates.push(bachelor);
    choices.push(people[person]);
  }

  for (let i = 0; i < choices.length; i++) {
    for (let j = 0; j < choices[i].length; j++) {
      for (let l = 0; l < candidates.length; l++) {
        if (candidates[l].name == choices[i][j]) {
          choices[i][j] = candidates[l];
        }
      }
    }
  }

  // console.log("TCL: calcAll -> candidates", candidates);
  // console.log("TCL: calcAll -> choices", choices);

  for (let index = 0; index < candidates.length; index++) {
    candidates[index].candidates = choices[index];
  }
  // console.log("TCL: calcAll -> candidates", candidates);

  // for (let group in groups) {
  //   for (let person in group) {
  //     for (let candidate in candidates) {
  //       console.log(
  //         "TCL: calcAll -> groups[group]",
  //         groups[group][person]
  //       );
  //       console.log("TCL: calcAll -> groups[group]", groups[group]);
  //       console.log("TCL: calcAll -> candidate.name", candidate.name);
  //       console.log("TCL: calcAll -> candidate", candidate);

  //       if (candidate.name == groups[group].name) {
  //         groups[group][person] = candidate;
  //       }
  //     }
  //   }
  // }
  console.log(groups);
  doMarriage(groups);
}
