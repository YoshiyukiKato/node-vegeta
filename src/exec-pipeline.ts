import {exec} from "child_process";
import { Stream } from "stream";

function execAsync(command: string): Promise<{ stdout:string, stderr: string }> {
  return new Promise<{ stdout:string, stderr: string }>((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if(err){
        reject(err);
      }
      resolve({ stdout: stdout, stderr: stderr });
    });
  });
}

/**
 * TO BE DEVELOPED
function execStream(): Stream{}
 */

export class ExecPipeline {
  private commands: string[] = [];
  private pipe(): string{
    return this.commands.join(" | ");
  }
  
  public add(command:string): ExecPipeline{
    this.commands.push(command);
    return this;
  }

  public show(): ExecPipeline{
    console.log(this.pipe());
    return this;
  }

  public async exec(): Promise<{stdout:string, stderr: string}>{
    return await execAsync(this.pipe());
  }

  /**
   * TO BE DEVELOPED
  public execStream(): Stream {}
   */
}