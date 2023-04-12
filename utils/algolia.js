const algoliasearch = require("algoliasearch");

const client = algoliasearch("OBIKFMAM15", "9a8dc8ab1212c7f7121f767a8def2d57");

export const creatorsIndex = client.initIndex("creators");

creatorsIndex.setSettings({
  attributesToIndex: ["username", "displayName"],
});
