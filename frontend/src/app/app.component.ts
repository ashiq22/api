import { Component , OnInit  } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'malabusWEB : application réservation billet de bus en ligne';
  constructor(private titleService: Title, private meta: Meta) {}
  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.meta.addTags([
      {
        name: 'author', content: 'Chayma shaiek'
      },
      {
        name: 'keywords', content: 'app web de réservation'
      },
      {
        name: 'description', content: 'This is my great description.'
      },
    ]);

  }

}
