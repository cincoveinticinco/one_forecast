import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowSteps } from './workflow-steps';

describe('WorkflowSteps', () => {
  let component: WorkflowSteps;
  let fixture: ComponentFixture<WorkflowSteps>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowSteps]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowSteps);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
