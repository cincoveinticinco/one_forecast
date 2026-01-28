import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleDoc } from './example-doc';

describe('ExampleDoc', () => {
  let component: ExampleDoc;
  let fixture: ComponentFixture<ExampleDoc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleDoc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleDoc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
