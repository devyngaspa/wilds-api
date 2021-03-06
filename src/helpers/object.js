module.exports = {

  set_from_options: (obj, options) => {
    Object.keys(options).forEach( (key) => {
      obj[key] = options[key];
    });
    return obj;
  },

  for_each: (obj, iterator) => {
    let keys = Object.keys(obj);
    for(let i = 0; i < keys.length; i++) {
      let value = obj[keys[i]];
      iterator(keys[i], value);
    }
  },

  values: (obj) => {
    return Object.keys(obj).map((key) => {
      return obj[key];
    });
  },

  find: function (obj, ...args) {
    if (args.length === 0) { return obj }
    let prop = args[0]
    if (obj[prop] === undefined) { return undefined }
    return whelp.object.find(obj[prop], ...args.slice(1))
  }


}
