/*
 * Person Class
 */

class Person {
  constructor(name) {
    this.candidateIndex = 0;
    this.group = null;
    this.name = name;
    this.fiance = null;
    this.candidates = [];
  }

  rank = function(p) {
    for (let i = 0; i < this.candidates.length; i++)
      if (this.candidates[i] === p) return i;
    return this.candidates.length + 1;
  };

  prefers = function(p) {
    return this.rank(p) < this.rank(this.fiance);
  };

  nextCandidate = function() {
    if (this.candidateIndex >= this.candidates.length) return null;
    return this.candidates[this.candidateIndex++];
  };

  engageTo = function(p) {
    if (p.fiance) p.fiance.fiance = null;
    p.fiance = this;
    if (this.fiance) this.fiance.fiance = null;
    this.fiance = p;
  };

  swapWith = function(p) {
    console.log("%s & %s swap partners", this.name, p.name);
    var thisFiance = this.fiance;
    var pFiance = p.fiance;
    this.engageTo(pFiance);
    p.engageTo(thisFiance);
  };

  addCandidate(candidate) {
    this.candidates.push(candidate);
  }
}

/*
 * Storage class
 */
class Storage {
  constructor() {
    this.data = { rankingGroup1: {}, rankingGroup2: {} };
    this.names = null;
  }

  setNames(group1, group2) {
    this.names = {
      rankingGroup1: group1,
      rankingGroup2: group2
    };
  }

  getData() {
    return this.data;
  }

  initCandidates(group1, group2) {
    this.setNames(group1, group2);
    this.data.rankingGroup1 = group1.map(name => new Person(name));
    this.data.rankingGroup2 = group2.map(name => new Person(name));
  }

  addPerson(name, parentGroup, choicesArr) {
    let candidateGroup =
      parentGroup === "rankingGroup1" ? "rankingGroup2" : "rankingGroup1";

    this.data[parentGroup].forEach((person, index) => {
      if (person.name == name) {
        choicesArr.forEach(name => {
          this.data[candidateGroup].forEach((person, j) => {
            if (this.data[candidateGroup][j].name == name) {
              this.data[parentGroup][index].addCandidate(
                this.data[candidateGroup][j]
              );
            }
          });
        });
      }
    });
  }
}

/*
 * Jquery elements in use
 */
let subject = $("#subject"),
  instructions = $("#instructions"),
  amountFormContainer = $("#amountFormContainer"),
  pickAmountInput = $("#pickAmountInput"),
  pickAmountBtn = $("#pickAmountBtn"),
  errDiv = $("#errDiv"),
  submitGroupsContainer = $("#submitGroupsContainer"),
  submitGroupsBtn = $("#submitGroupsBtn"),
  rankingGroup1 = $("#rankingGroup1"),
  rankingGroup2 = $("#rankingGroup2"),
  setCandidatesContainer = $("#setCandidatesContainer"),
  showCouplesContainer = $("#showCouplesContainer"),
  showCouplesOutput = $("#showCouplesOutput");

/*
 * init store for candidates and other potential data.
 */
const PersonStore = new Storage();

/*
 * functions -- validation/error display
 */

function validateInput(logic, errEl, msg) {
  if (logic) {
    showErr(errEl, msg);
    return false;
  }
  return true;
}

function showErr(errEl, errMsg) {
  errEl.text(errMsg);
  errEl
    .slideDown("slow")
    .delay(1500)
    .slideUp("slow");
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

function groupNames(group, errEl) {
  let flag = false,
    msg = "",
    groupName = $(group).attr("id"),
    groupValues = [];

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

/*
 * functions -- render elements
 */
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
    class: "col-sm-12 row candidateForm",
    id: name
  });

  let isSubmitted = $("<input>", {
    name: "isSubmitted",
    type: "hidden",
    value: false
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

  form.append(isSubmitted);
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
    text: `Submit ${name} rankings`
  });
  container.append(button);
  return container;
}

function renderRankingContainer(groups, container) {
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
    $("input[name=isSubmitted]")[0].remove();
    $(e.target).removeClass("btn-primary");
    $(e.target).addClass("btn-warning");
    $(e.target).text("Edit again");
    let parentGroup = parentForm.parent().attr("id");
    let PickerName = parentForm.attr("id");
    PersonStore.addPerson(PickerName, parentGroup, arr);
  }

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

/**
 *
 * marriage functions
 */
function isStable(guys, gals) {
  for (var i = 0; i < guys.length; i++)
    for (var j = 0; j < gals.length; j++)
      if (guys[i].prefers(gals[j]) && gals[j].prefers(guys[i])) return false;
  return true;
}

function engageEveryone(guys) {
  var done;
  do {
    done = true;
    for (var i = 0; i < guys.length; i++) {
      var guy = guys[i];
      if (!guy.fiance) {
        done = false;
        var gal = guy.nextCandidate();
        if (!gal.fiance || gal.prefers(guy)) guy.engageTo(gal);
      }
    }
  } while (!done);
}

function doMarriage(groups) {
  let group1 = groups.rankingGroup1;
  let group2 = groups.rankingGroup2;
  engageEveryone(group1);

  for (var i = 0; i < group1.length; i++) {
    console.log("%s is engaged to %s", group1[i].name, group1[i].fiance.name);
  }
  console.log("Stable = %s", isStable(group1, group2) ? "Yes" : "No");
  // jon.swapWith(fred);
  console.log("Stable = %s", isStable(group1, group2) ? "Yes" : "No");
}

/*
 * main events
 */

//reject e keypress
pickAmountInput.keydown(e => (e.keyCode == 69 ? false : true));

/*
 * first submit of amount
 * --accept only value higher than 1
 */
pickAmountBtn.click(e => {

  e.preventDefault();
  //validate input is a number and large enough
  if (
    validateInput(
      isNaN(pickAmountInput.val()),
      errDiv,
      "value is not numeric"
    ) === false ||
    validateInput(pickAmountInput.val() < 2, errDiv, "value is too low") ===
      false
  ) {
    return;
  }
  $("#previousDataAlert").hide();
  let group1 = $("#group1"),
    group2 = $("#group2");

  //render groups form
  for (let index = 0; index < pickAmountInput.val(); index++) {
    group1.append(renderInputGroupt(index, "group1"));
    group2.append(renderInputGroupt(index, "group2"));
  }
  subject.text("Add names"),
    instructions.text("Each group must have unique names"),
    amountFormContainer.hide(),
    submitGroupsContainer.show();
});

/*
 * second submit
 * --reject empty or duplicate values
 */

submitGroupsBtn.click(e => {
  e.preventDefault();

  let group1 = $("#group1"),
    group2 = $("#group2"),
    group1Names = groupNames(group1, errDiv),
    group2Names = groupNames(group2, errDiv);

  if (group1Names && group2Names) {
    if (!uniqueNames(group1, group2)) {
      validateInput(true, errDiv, "same name in both group is not allowed");
      return;
    }
    subject.text("Select counterparts"),
      instructions.text("Rank preffered mates for each candidate"),
      submitGroupsContainer.hide();

    PersonStore.initCandidates(group1Names, group2Names);

    //group1 pick form
    renderRankingContainer([group1Names, group2Names], rankingGroup1);
    $(rankingGroup1).show();

    //group2 pick form
    renderRankingContainer([group2Names, group1Names], rankingGroup2);
    $(rankingGroup2).show();
    $("#rankingCalc").show();
  }
});

/*
 *final event -validate input then calc
 */

$("#rankingCalcBtn").click(function(e) {
  e.preventDefault();

  if ($("form input[name=isSubmitted]").length) {
    validateInput(
      true,
      $("#errDiv"),
      "Please submit for all forms."
    );
    return;
  }

  let persons = PersonStore.getData();
  if (!persons) {
    validateInput(
      true,
      $("#errDiv"),
      "Alert!previous data mismatch."
    );
    $("#previousDataAlert").show();
    return;
  }

  console.log("TCL: calcAll -> parties", persons);
  doMarriage(persons);
  setCandidatesContainer.hide(),
    subject.text("Meet the New Couples!"),
    instructions.text("See output below");

  let group1 = persons.rankingGroup1;

  for (var i = 0; i < group1.length; i++) {
    let span = $("<span></span>", {
      class: "coupleSpan"
    });
    span.text(`${group1[i].name} is engaged to ${group1[i].fiance.name}`);
    showCouplesOutput.append(span);
  }

  console.log("Stable = %s", isStable(group1, group2) ? "Yes" : "No");
  // jon.swapWith(fred);
  console.log("Stable = %s", isStable(group1, group2) ? "Yes" : "No");

  showCouplesContainer.show();
  return showCouplesOutput;
});
