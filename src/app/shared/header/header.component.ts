import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  name: string = 'C h r i s t i a n';
  scrambledName: string[] = [];

  ngOnInit(): void {
    this.scrambledName = this.name.split(''); // Initialisiere das scrambledName-Array mit den Originalbuchstaben
    this.startScrambling();
  }

  startScrambling(): void {
    const letters = '0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    const scrambleInterval = () => Math.random() * (4000 - 2000) + 10000; // Zufällige Zeit zwischen 2 und 4 Sekunden

    const scrambleLetter = (index: number) => {
      const originalLetter = this.name[index];
      let scrambleCount = 0;
  
      const scrambleStep = () => {
        if (scrambleCount < 3) {
          this.scrambledName[index] = letters[Math.floor(Math.random() * letters.length)]; // Ersetze durch einen zufälligen Buchstaben
          scrambleCount++;
          setTimeout(scrambleStep, 200); // Zeige den nächsten zufälligen Buchstaben nach 100ms
        } else {
          this.scrambledName[index] = originalLetter; // Setze den Originalbuchstaben zurück
        }
      };
  
      scrambleStep();
    };
  
    this.name.split('').forEach((_, index) => {
      const scramble = () => {
        scrambleLetter(index);
        setTimeout(scramble, scrambleInterval()); // Plane den nächsten Scramble für denselben Buchstaben
      };
      setTimeout(scramble, scrambleInterval()); // Starte den Scramble für jeden Buchstaben
    });
  }
}