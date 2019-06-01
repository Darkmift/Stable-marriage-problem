import {
  validateInput,
  renderInputGroupt,
  groupNames,
  uniqueNames,
  renderRankingContainer,
  calcAll
} from "./functions.js";

let subject = $("#subject"),
  instructions = $("#instructions"),
  amountFormContainer = $("#amountFormContainer"),
  pickAmountInput = $("#pickAmountInput"),
  pickAmountBtn = $("#pickAmountBtn"),
  errDiv = $("#errDiv"),
  submitGroupsContainer = $("#submitGroupsContainer"),
  submitGroupsBtn = $("#submitGroupsBtn"),
  rankingGroup1 = $("#rankingGroup1"),
  rankingGroup2 = $("#rankingGroup2");

//reject e keypress
pickAmountInput.keydown(e => (e.keyCode == 69 ? false : true));

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

submitGroupsBtn.click(e => {
  e.preventDefault();

  let group1 = $("#group1"),
    group2 = $("#group2"),
    group1Names = groupNames(group1, errDiv, "Group #1"),
    group2Names = groupNames(group2, errDiv, "Group #2");

  if (group1Names && group2Names) {
    if (!uniqueNames(group1, group2)) {
      validateInput(true, errDiv, "same name in both group is not allowed");
      return;
    }
    subject.text("Select counterparts"),
      instructions.text("Rank preffered mates for each candidate"),
      submitGroupsContainer.hide();

    //group1 pick form
    renderRankingContainer([group1Names, group2Names], rankingGroup1);
    $(rankingGroup1).show();

    //group2 pick form
    renderRankingContainer([group2Names, group1Names], rankingGroup2);
    $(rankingGroup2).show();
    $("#rankingCalc").show();
  }
});

$("#rankingCalcBtn").click(function(e) {
  e.preventDefault();
  calcAll();
});
