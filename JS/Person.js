export { Person };

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
