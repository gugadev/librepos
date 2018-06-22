import { environment as devEnvironment } from '../../../environments/environment';
import { environment as prodEnvironment } from '../../../environments/environment.prod';

export class Environment {
  static get(): any {
    return devEnvironment;
  }
}
