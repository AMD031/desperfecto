import { TestBed } from '@angular/core/testing';

import { ValorBusquedaService } from './valor-busqueda.service';

describe('ValorBusquedaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValorBusquedaService = TestBed.get(ValorBusquedaService);
    expect(service).toBeTruthy();
  });
});
