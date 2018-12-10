import {ExecPipeline} from "./exec-pipeline";
import {command, IVegetaPlotConfig, IVegetaAttackConfig, IVegetaEncodeConfig, IVegetaReportConfig} from "./command";

export class Vegeta extends ExecPipeline {
  public attack(config?: IVegetaAttackConfig): Vegeta {
    this.add(command.attack(config));
    return this;
  }
  
  public encode(config?: IVegetaEncodeConfig): Vegeta {
    this.add(command.encode(config));
    return this;
  }
  
  public plot(config?: IVegetaPlotConfig): Vegeta {
    this.add(command.plot(config));
    return this;
  }
  
  public report(config?: IVegetaReportConfig): Vegeta {
    this.add(command.report(config));
    return this;
  }
}