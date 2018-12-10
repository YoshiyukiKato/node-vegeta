import assert from "power-assert";
import {targetServer} from "./fixture/target-server";
import {Vegeta} from "../src";

const TARGET_SERVER_PORT = 3000;

describe("node-vegeta", () => {
  before(() => {
    targetServer.listen(TARGET_SERVER_PORT);
  });
  
  it("exec vegeta for targets", () => {
    const vegeta = new Vegeta();
    const attackConfig = {
      attack: {
        format: "json",
        duration: "5s",
        rate: "100/s",
      },
      targetList: [{"url":"http://localhost:3000","method":"GET"}, {"url":"http://localhost:3000","method":"GET"}]
    };
    
    const reportConfig = {
      report: {
        type: "json"
      }
    };
    
    return vegeta.attack(attackConfig).encode().report(reportConfig).exec()
      .then(({stdout, stderr}) => {
        console.log(stdout);
        assert(stdout);
      })
      .catch(console.error);
  });

  after(() => {
    targetServer.close();
  });
});