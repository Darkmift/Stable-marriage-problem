var obj = {
  rankingGroup1: { Bob: ["Sam", "Lisa"], Joe: ["Sam", "Lisa"] },
  rankingGroup2: { Sam: ["Joe", "Bob"], Lisa: ["Joe", "Bob"] }
};

groups = Object.values(obj);

let people = {};
for (obj in groups) {
  let group = groups[obj];
  for (person in group) {
    people[person] = group[person];
    console.log("TCL: people", people);
    // console.log("TCL: person: ", person, group[person]);
  }
}


for (let set in choices) {
  console.log("TCL: calcAll -> set", set);

  for (let i = 0; i < choices.length; i++) {
    console.log("TCL: calcAll -> name", name);

    for (let j = 0; j < candidates.length; j++) {
      if (candidates[j].name == name) {
        choices[set][name] = candidates[candidate];
      }
    }
    // for (let candidate in candidates) {
    //   console.log("TCL: calcAll -> candidate", candidate.name);

    //   if (candidates[candidate].name == name) {
    //     choices[set][name] = candidates[candidate];
    //   }
    // }
  }
}
