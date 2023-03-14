import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillLanguagesComponent } from './skill-languages.component';

describe('SkillLanguagesComponent', () => {
  let component: SkillLanguagesComponent;
  let fixture: ComponentFixture<SkillLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillLanguagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
