// function Person(name) {
 
//     var candidateIndex = 0;
 
//     this.name = name;
//     this.fiance = null;
//     this.candidates = [];
 
//     this.rank = function(p) {
//         for (i = 0; i < this.candidates.length; i++)
//             if (this.candidates[i] === p) return i;
//         return this.candidates.length + 1;
//     }
 
//     this.prefers = function(p) {
//         return this.rank(p) < this.rank(this.fiance);
//     }
 
//     this.nextCandidate = function() {
//         if (candidateIndex >= this.candidates.length) return null;
//         return this.candidates[candidateIndex++];
//     }
 
//     this.engageTo = function(p) {
//         if (p.fiance) p.fiance.fiance = null;
//         p.fiance = this;
//         if (this.fiance) this.fiance.fiance = null;
//         this.fiance = p;
//     }
 
//     this.swapWith = function(p) {
//         console.log("%s & %s swap partners", this.name, p.name);
//         var thisFiance = this.fiance;
//         var pFiance = p.fiance;
//         this.engageTo(pFiance);
//         p.engageTo(thisFiance);
//     }
// }
 
// function isStable(guys, gals) {
//     for (var i = 0; i < guys.length; i++)
//         for (var j = 0; j < gals.length; j++)
//             if (guys[i].prefers(gals[j]) && gals[j].prefers(guys[i]))
//                 return false;
//     return true;
// }
 
// function engageEveryone(guys) {
//     var done;
//     do {
//         done = true;
//         for (var i = 0; i < guys.length; i++) {
//             var guy = guys[i];
//             if (!guy.fiance) {
//                 done = false;
//                 var gal = guy.nextCandidate();
//                 if (!gal.fiance || gal.prefers(guy))
//                     guy.engageTo(gal);
//             }
//         }
//     } while (!done);
// }
 
// function doMarriage() {
 
//     var p1 ;
//     var p2 ;
//     var p3 ;
//     var p4 ;
//     var c1 ;
//     var c2 ;
//     var c3 ;
//     var c4 ;
//     //
//     var p1o1 = document.getElementById("pref11").value;
//     var p1o2 = document.getElementById("pref12").value;
//     var p1o3 = document.getElementById("pref13").value;
//     var p1o4 = document.getElementById("pref14").value;
//     //
//     var p2o1 = document.getElementById("pref21");
//     var p2o2 = document.getElementById("pref22");
//     var p2o3 = document.getElementById("pref23");
//     var p2o4 = document.getElementById("pref24");
//     //
//     var p3o1 = document.getElementById("pref31");
//     var p3o2 = document.getElementById("pref32");
//     var p3o3 = document.getElementById("pref33");
//     var p3o4 = document.getElementById("pref34");
//     //
//     var p4o1 = document.getElementById("pref41");
//     var p4o2 = document.getElementById("pref42");
//     var p4o3 = document.getElementById("pref43");
//     var p4o4 = document.getElementById("pref44");
//     //////////////////////////////////////////////////
//     var c1o1 = document.getElementById("chos11");
//     var c1o2 = document.getElementById("chos12");
//     var c1o3 = document.getElementById("chos13");
//     var c1o4 = document.getElementById("chos14");
//     //
//     var c2o1 = document.getElementById("chos21");
//     var c2o2 = document.getElementById("chos22");
//     var c2o3 = document.getElementById("chos23");
//     var c2o4 = document.getElementById("chos24");
//     //
//     var c3o1 = document.getElementById("chos31");
//     var c3o2 = document.getElementById("chos32");
//     var c3o3 = document.getElementById("chos33");
//     var c3o4 = document.getElementById("chos34");
//     //
//     var c4o1 = document.getElementById("chos41");
//     var c4o2 = document.getElementById("chos42");
//     var c4o3 = document.getElementById("chos43");
//     var c4o4 = document.getElementById("chos44");
    
//     p1.candidates  = [p1o1, p1o2, p1o3, p1o4];
//     p2.candidates  = [p2o1, p2o2, p2o3, p2o4];
//     p3.candidates  = [p2o1, p3o2, p3o3, p3o4];
//     p4.candidates  = [p2o1, p4o2, p4o3, p4o4];
//     /////////////////////////////////////////
//     c1.candidates  = [c1o1, c1o2, c1o3, c1o4];
//     c2.candidates  = [c2o1, c2o2, c2o3, c2o4];
//     c3.candidates = [c3o1, c3o2, c3o3, c3o4];
//     c4.candidates  = [c4o1, c4o2, c4o3, c4o4];
 
//     var guys = [p1, p2, p3, p4];
//     var gals = [c1, c2, c3, c4];
 
//     engageEveryone(guys);
 
//     for (var i = 0; i < guys.length; i++) {
//         console.log("%s is engaged to %s", guys[i].name, guys[i].fiance.name);
//     }
//     console.log("Stable = %s", isStable(guys, gals) ? "Yes" : "No");
//     jon.swapWith(fred);
//     console.log("Stable = %s", isStable(guys, gals) ? "Yes" : "No");
// }
 
// doMarriage();

// var input = {
//     "optimal": {
//         p1: [p1o1, p1o2, p1o3, p1o4],
//         "finch": ["morgan", "carter", "shaw", "groves"],
//         "fusco": ["shaw", "carter", "groves", "morgan"],
//         "elias": ["groves", "carter", "shaw", "morgan"]
//     },
//     "pessimal":{
//         "carter": ["reese", "fusco", "elias", "finch"],
//         "shaw": ["elias", "reese", "fusco", "finch"],
//         "groves": ["reese", "fusco", "elias", "finch"],
//         "morgan": ["finch", "fusco", "elias", "reese"]
//     }
// };
// Algorithmia.client("simHt9sZVSrYtvLlVJeQs4aSL0m1")
//     .algo("matching/StableMarriageAlgorithm/0.1.2?timeout=300") // timeout is optional
//     .pipe(input)
//     .then(function(output) {
//         console.log(output);
//     });

function Person(name) {
 
    var candidateIndex = 0;
 
    this.name = name;
    this.fiance = null;
    this.candidates = [];
 
    this.rank = function(p) {
        for (i = 0; i < this.candidates.length; i++)
            if (this.candidates[i] === p) return i;
        return this.candidates.length + 1;
    }
 
    this.prefers = function(p) {
        return this.rank(p) < this.rank(this.fiance);
    }
 
    this.nextCandidate = function() {
        if (candidateIndex >= this.candidates.length) return null;
        return this.candidates[candidateIndex++];
    }
 
    this.engageTo = function(p) {
        if (p.fiance) p.fiance.fiance = null;
        p.fiance = this;
        if (this.fiance) this.fiance.fiance = null;
        this.fiance = p;
    }
 
    this.swapWith = function(p) {
        console.log("%s & %s swap partners", this.name, p.name);
        var thisFiance = this.fiance;
        var pFiance = p.fiance;
        this.engageTo(pFiance);
        p.engageTo(thisFiance);
    }
}
 
function isStable(guys, gals) {
    for (var i = 0; i < guys.length; i++)
        for (var j = 0; j < gals.length; j++)
            if (guys[i].prefers(gals[j]) && gals[j].prefers(guys[i]))
                return false;
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
                if (!gal.fiance || gal.prefers(guy))
                    guy.engageTo(gal);
            }
        }
    } while (!done);
}
 
function doMarriage() {
 
    var Picker1  = new Person(document.getElementById("p1"));
    var bob  = new Person("Bob");
    var col  = new Person("Col");
    var dan  = new Person("Dan");
    var ed   = new Person("Ed");
    var fred = new Person("Fred");
    var gav  = new Person("Gav");
    var hal  = new Person("Hal");
    var ian  = new Person("Ian");
    var jon  = new Person("Jon");
    var abi  = new Person("Abi");
    var bea  = new Person("Bea");
    var cath = new Person("Cath");
    var dee  = new Person("Dee");
    var eve  = new Person("Eve");
    var fay  = new Person("Fay");
    var gay  = new Person("Gay");
    var hope = new Person("Hope");
    var ivy  = new Person("Ivy");
    var jan  = new Person("Jan");
 
    Picker1.candidates  = [abi, eve, cath, ivy, jan, dee, fay, bea, hope, gay];
    bob.candidates  = [cath, hope, abi, dee, eve, fay, bea, jan, ivy, gay];
    col.candidates  = [hope, eve, abi, dee, bea, fay, ivy, gay, cath, jan];
    dan.candidates  = [ivy, fay, dee, gay, hope, eve, jan, bea, cath, abi];
    ed.candidates   = [jan, dee, bea, cath, fay, eve, abi, ivy, hope, gay];
    fred.candidates = [bea, abi, dee, gay, eve, ivy, cath, jan, hope, fay];
    gav.candidates  = [gay, eve, ivy, bea, cath, abi, dee, hope, jan, fay];
    hal.candidates  = [abi, eve, hope, fay, ivy, cath, jan, bea, gay, dee];
    ian.candidates  = [hope, cath, dee, gay, bea, abi, fay, ivy, jan, eve];
    jon.candidates  = [abi, fay, jan, gay, eve, bea, dee, cath, ivy, hope];
    abi.candidates  = [bob, fred, jon, gav, ian, Picker1, dan, ed, col, hal];
    bea.candidates  = [bob, Picker1, col, fred, gav, dan, ian, ed, jon, hal];
    cath.candidates = [fred, bob, ed, gav, hal, col, ian, Picker1, dan, jon];
    dee.candidates  = [fred, jon, col, Picker1, ian, hal, gav, dan, bob, ed];
    eve.candidates  = [jon, hal, fred, dan, Picker1, gav, col, ed, ian, bob];
    fay.candidates  = [bob, Picker1, ed, ian, jon, dan, fred, gav, col, hal];
    gay.candidates  = [jon, gav, hal, fred, bob, Picker1, col, ed, dan, ian];
    hope.candidates = [gav, jon, bob, Picker1, ian, dan, hal, ed, col, fred];
    ivy.candidates  = [ian, col, hal, gav, fred, bob, Picker1, ed, jon, dan];
    jan.candidates  = [ed, hal, gav, Picker1, bob, jon, col, ian, fred, dan];
 
    var guys = [Picker1, bob, col, dan, ed, fred, gav, hal, ian, jon];
    var gals = [abi, bea, cath, dee, eve, fay, gay, hope, ivy, jan];
 
    engageEveryone(guys);
 
    for (var i = 0; i < guys.length; i++) {
        console.log("%s is engaged to %s", guys[i].name, guys[i].fiance.name);
    }
    console.log("Stable = %s", isStable(guys, gals) ? "Yes" : "No");
    jon.swapWith(fred);
    console.log("Stable = %s", isStable(guys, gals) ? "Yes" : "No");
}
 
doMarriage();