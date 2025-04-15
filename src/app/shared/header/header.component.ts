import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  name: string = 'Christian';
  scrambledName: string[] = [];

  ngOnInit(): void {
    this.scrambledName = this.name.split(''); // Initialisiere das scrambledName-Array mit den Originalbuchstaben
    this.startScrambling();
  }

  startScrambling(): void {
    const letters = '0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    const scrambleInterval = () => Math.random() * (8000 - 3000) + 3000; // Zufällige Zeit zwischen 3 und 8 Sekunden

    const scrambleLetter = () => {
      const index = Math.floor(Math.random() * this.name.length); // Wähle einen zufälligen Buchstaben aus
      const originalLetter = this.name[index];
      let scrambleCount = 0;

      const scrambleStep = () => {
        if (scrambleCount < 5) {
          this.scrambledName[index] = letters[Math.floor(Math.random() * letters.length)]; // Ersetze durch einen zufälligen Buchstaben
          scrambleCount++;
          setTimeout(scrambleStep, 100); // Zeige den nächsten zufälligen Buchstaben nach 200ms
        } else {
          this.scrambledName[index] = originalLetter; // Setze den Originalbuchstaben zurück
          setTimeout(scrambleLetter, scrambleInterval()); // Plane den nächsten Scramble
        }
      };

      scrambleStep();
    };

    scrambleLetter(); // Starte den Scramble-Prozess
  }
}