import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormEditarPage } from './form-editar.page';

describe('FormEditarPage', () => {
  let component: FormEditarPage;
  let fixture: ComponentFixture<FormEditarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEditarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormEditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
