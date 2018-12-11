import { exec, spawn, ChildProcess, ExecException } from "child_process";
import { Stream, Writable } from "stream";

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

export class ExecPipeline {
  private commands: string[] = [];
  private pipe(): string{
    return this.commands.join(" | ");
  }
  
  protected add(command:string): ExecPipeline{
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

  public execStream(outStream: Writable, errStream: Writable,
      callback?: (err: ExecException|null, stdout: string, stderr: string) => void) {
    const subprocess = exec(this.pipe(), callback);
    subprocess.stdout.pipe(outStream);
    subprocess.stderr.pipe(errStream);
    return subprocess;
  }
}