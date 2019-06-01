export { Person, doMarriage };

function Person(name) {
  var candidateIndex = 0;
  this.group = null;
  this.name = name;
  this.fiance = null;
  this.candidates = [];

  this.rank = function(p) {
    for (let i = 0; i < this.candidates.length; i++)
      if (this.candidates[i] === p) return i;
    return this.candidates.length + 1;
  };

  this.prefers = function(p) {
    return this.rank(p) < this.rank(this.fiance);
  };

  this.nextCandidate = function() {
    if (candidateIndex >= this.candidates.length) return null;
    return this.candidates[candidateIndex++];
  };

  this.engageTo = function(p) {
    if (p.fiance) p.fiance.fiance = null;
    p.fiance = this;
    if (this.fiance) this.fiance.fiance = null;
    this.fiance = p;
  };

  this.swapWith = function(p) {
    console.log("%s & %s swap partners", this.name, p.name);
    var thisFiance = this.fiance;
    var pFiance = p.fiance;
    this.engageTo(pFiance);
    p.engageTo(thisFiance);
  };
}

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

  for (let person in group1) {
    console.log("TCL: doMarriage -> group1", group1);
    console.log("TCL: doMarriage -> person", group1[person]);
    console.log("%s is engaged to %s", person.name, person.fiance);
  }

  console.log("Stable = %s", isStable(group1, group2) ? "Yes" : "No");
  // jon.swapWith(fred);????
  console.log("Stable = %s", isStable(group1, group2) ? "Yes" : "No");
}
