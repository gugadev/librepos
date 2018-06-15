import { EmissionPointsModule } from './emission-points.module';

describe('EmissionPointsModule', () => {
  let emissionPointsModule: EmissionPointsModule;

  beforeEach(() => {
    emissionPointsModule = new EmissionPointsModule();
  });

  it('should create an instance', () => {
    expect(emissionPointsModule).toBeTruthy();
  });
});
