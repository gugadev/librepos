import { CreateModule } from './create.module';

describe('CreateModule', () => {
  let createModule: CreateModule;

  beforeEach(() => {
    createModule = new CreateModule();
  });

  it('should create an instance', () => {
    expect(createModule).toBeTruthy();
  });
});
