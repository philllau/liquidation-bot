import { Observable, Subject } from "observable-fns";
import { ExecutionContext } from ".";

export abstract class AbstractMonitor<T> {
  constructor(protected context: ExecutionContext) {}
  protected channel: Subject<T> = new Subject<T>();
  abstract run(): Promise<Observable<T>>;
}
