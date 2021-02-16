import { Component, OnInit } from '@angular/core';
import { ArticlesFacade } from '../../services';

@Component({
  selector: 'articles-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  articles$ = this.articlesFacade.allArticles$;
  pending$ = this.articlesFacade.pending$;
  constructor(private articlesFacade: ArticlesFacade) {}

  ngOnInit() {
    this.articlesFacade.loadArticles();
  }
}
