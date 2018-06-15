import { SellsModule } from './sells.module';

describe('SellsModule', () => {
  let sellsModule: SellsModule;

  beforeEach(() => {
    sellsModule = new SellsModule();
  });

  it('should create an instance', () => {
    expect(sellsModule).toBeTruthy();
  });
});
