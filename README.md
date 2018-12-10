# node-vegeta
Exec [vegeta](https://github.com/tsenart/vegeta) from nodejs.

## vegeta?
[vegeta](https://github.com/tsenart/vegeta) is awesome load testing tool made by Go. `node-vegeta` is a wrapper to exec `vegeta` command from node.js. You have to install `vegeta` appropriately before use `node-vegeta`.

## usage
### prerequisite
See [here](https://github.com/tsenart/vegeta) to install `vegeta`.

### quick start
```ts
import {Vegeta} from "node-vegeta";

const vegeta = new Vegeta();
const {stdout, stderr} = await vegeta
  .attack({
    attack: {
      format: "json",
      duration: "5s",
      rate: "100/s"
    },
    targetList: [
      {
        url: "http://localhost:3000"
      }
    ]
  })
  .encode()
  .report({
    report: {
      type: "json"
    }
  })
  .exec();
```

