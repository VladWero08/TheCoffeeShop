const fs = require("fs");

// JSON Reading function
module.exports.readJSONFile = () => {
    return JSON.parse(fs.readFileSync("coffees.json"))["coffees"];
}
  
  // JSON Writing function
module.exports.writeJSONFile = (content) => {
    fs.writeFileSync(
        "coffees.json",
        JSON.stringify({ coffees: content }),
        "utf8",
        err => {
            if (err) {
                console.log(err);
            }
        }
    );
}