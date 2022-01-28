import { ActivatedRoute } from '@angular/router'
import { tap } from 'rxjs/operators'

export class BaseForm {
    protected id: number
    protected state: string

    constructor(
        public activeRoute: ActivatedRoute
    ) {
        this.activeRoute.params.pipe(
            tap(param => this.id = +param.id),
            tap(param => this.id ? this.state = 'edit' : this.state = 'add'),
        ).subscribe()
    }

}
