export { doMarriage };

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
  console.log("TCL: doMarriage -> groups", groups);
  let group1 = groups[0];
  let group2 = groups[1];
  engageEveryone(group1);

  for (var i = 0; i < group1.length; i++) {
    console.log("%s is engaged to %s", group1[i].name, group1[i].fiance.name);
  }
  console.log("Stable = %s", isStable(group1, group2) ? "Yes" : "No");
  // jon.swapWith(fred);
  console.log("Stable = %s", isStable(group1, group2) ? "Yes" : "No");
}
