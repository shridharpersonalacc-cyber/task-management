import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-signal-example',
  standalone: false,
  templateUrl: './signal-example.html',
  styleUrl: './signal-example.css',
})
export class SignalExample {
  counts = signal(12);

  // read value
  /**
   *
   */
  constructor() {
    effect(() => {
      console.log('Count changed:', this.counts());
    });
  }

  readOnlyUpatedCount() {
    // here computed is readonly
    let dd = computed(() => this.counts() * 2);

  }

  readWriteUpdateSignal() {

    // read value
    console.log(this.counts());

    // update value
    this.counts.set(1);

    // update based on the previous value
    this.counts.update(v => v + 1);

  }

  increaseCount() {
    this.counts.update(v => v + 1);
  }


}
