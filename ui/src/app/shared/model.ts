import { validate } from 'class-validator';

export class Model {
  validate(): Promise<any> {
    return new Promise((ok, fail) => {
      validate(this).then((errors: Array<any>) => {
        if (!errors.length) {
          ok();
        } else {
          fail(errors);
        }
      });
    });
  }
}
