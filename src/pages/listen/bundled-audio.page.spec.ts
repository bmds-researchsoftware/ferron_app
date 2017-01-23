import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ApplicationRef } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { NavParams, ViewController } from 'ionic-angular';
import { BundledAudioPage } from './bundled-audio.page';

describe('BundledAudioPage', () => {
  let bundledAudio: BundledAudioPage;
  let stubParams = {
    get(key) {
      return { url: 'audio1', title: 'Audio 1' }[key];
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: NavParams, useValue: stubParams },
        { provide: ViewController, useValue: {} },
        { provide: ApplicationRef, useValue: {} },
        BundledAudioPage
      ]
    });
  });

  beforeEach(inject([BundledAudioPage], (page) => {
    bundledAudio = page;
  }));

  describe('#audioTitle', () => {
    it('returns the "title" param', () => {
      expect(bundledAudio.audioTitle()).toEqual('Audio 1');
    });
  });

  describe('#nextActionName', () => {
    it('is initially "Play"', () => {
      expect(bundledAudio.nextActionName()).toEqual('Play');
    });
  });

  describe('#nextActionIcon', () => {
    it('is initially "play"', () => {
      expect(bundledAudio.nextActionIcon()).toEqual('play');
    });
  });
});