import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarSpeechComponent } from './avatar-speech.component';

describe('AvatarSpeechComponent', () => {
  let component: AvatarSpeechComponent;
  let fixture: ComponentFixture<AvatarSpeechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarSpeechComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarSpeechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
