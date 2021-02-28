import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IArticle } from '../../models';
@Component({
  selector: 'articles-item-article',
  templateUrl: './item-article.component.html',
  styleUrls: ['./item-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemArticleComponent {
  @Input() article: IArticle;
}
