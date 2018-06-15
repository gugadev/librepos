import { EditModule } from './edit.module';

describe('EditModule', () => {
  let editModule: EditModule;

  beforeEach(() => {
    editModule = new EditModule();
  });

  it('should create an instance', () => {
    expect(editModule).toBeTruthy();
  });
});
