import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WidgetsModule } from '@modules/widgets';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared';
import { ArticlesRoutingModule } from './articles-routing.module';
import { COMPONENTS } from './components';
import { CONTAINERS } from './containers';
import { SERVICES } from './services';
import { ArticlesEffects } from './state/articles.effects';
import { ARTICLES_FEATURE_KEY, reducer } from './state/articles.reducer';

@NgModule({
  declarations: [...COMPONENTS, ...CONTAINERS],
  imports: [
    CommonModule,
    SharedModule,
    WidgetsModule,
    ArticlesRoutingModule,
    StoreModule.forFeature(ARTICLES_FEATURE_KEY, reducer),
    EffectsModule.forFeature([ArticlesEffects]),
  ],
  providers: [...SERVICES],
})
export class ArticlesModule {}
