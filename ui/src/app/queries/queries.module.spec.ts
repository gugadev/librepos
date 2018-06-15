import { QueriesModule } from './queries.module';

describe('QueriesModule', () => {
  let queriesModule: QueriesModule;

  beforeEach(() => {
    queriesModule = new QueriesModule();
  });

  it('should create an instance', () => {
    expect(queriesModule).toBeTruthy();
  });
});
