import assert from "power-assert";
import {targetServer} from "./fixture/target-server";
import {Vegeta} from "../src";

const TARGET_SERVER_PORT = 3000;

describe("node-vegeta", () => {
  before(() => {
    targetServer.listen(TARGET_SERVER_PORT);
  });
  
  describe("exec with async", () => {
    it("exec vegeta for targets", () => {
      const vegeta = new Vegeta();
      const attackConfig = {
        attack: {
          format: "json",
          duration: "1s",
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
          if(stderr) throw new Error(stderr);
          assert(stdout);
        })
        .catch((err) => {
          assert(err);
        });
    });
  });

  describe("exec with stream", () => {
    it("reports every 1s", (done) => {
      const vegeta = new Vegeta();
      const attackConfig = {
        attack: {
          format: "json",
          duration: "3s",
          rate: "100/s",
        },
        targetList: [{"url":"http://localhost:3000","method":"GET"}, {"url":"http://localhost:3000","method":"GET"}]
      };

      const reportConfig = {
        report: {
          type: "json",
          every: "0.5s"
        }
      }

      vegeta.attack(attackConfig).encode().report(reportConfig)
        .execStream(process.stdout, process.stderr, (err) => {
          if(err){ 
            assert(err);
          } else {
            assert(true);
          }
          done();
        });
    });
  });

  after(() => {
    targetServer.close();
  });
});