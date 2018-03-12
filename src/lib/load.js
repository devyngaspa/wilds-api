function get_encounter(encounter, get=false) {
  return new Promise( (resolve, reject) => {
    if (get) {
      Encounter.findById(encounter).then( (document) => {
        resolve(document);
      });
    }
    else { resolve(encounter); }
  });
}

function start_encounter(encounter) {
  return new Promise( (resolve, reject) => {
    if (encounter.current_turn === undefined || encounter.current_turn === null) {
      encounter.start().then( () => {
        resolve();
      });
    }
    else {
      resolve();
    }
  });
}

class Load {

  static encounter(params) {
    return new Promise( (resolve, reject) => {
      get_encounter(params, (typeof params == 'string')).then( (encounter) => {
        start_encounter(encounter).then( () => {
          let hash = {
            actors:        encounter.get_actors(),
            current_actor: encounter.get_current_actor(),
            parties:       encounter.parties()
          }
          whelp.promise_hash(hash).then( (data) => {
            data.encounter = encounter;
            resolve(data);
          });
        });
      });
    });
  }
}

module.exports = Load;
