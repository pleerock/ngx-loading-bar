import {Component, Input, Optional, OnInit, OnDestroy} from "@angular/core";
import {LoadingBarService} from "./LoadingBarService";

@Component({
    selector: "loading-bar",
    template: `
<div class="loading-bar">
    <div class="loading-bar-progress" 
        [style.width]="progress + '%'" 
        [style.backgroundColor]="color" 
        [style.color]="color"
        [style.height]="height + 'px'" 
        [style.opacity]="visible ? 1 : 0"
        [style.-webkit-transition]="'all ' + animationTime + 's ease-in-out'"
        [style.-moz-transition]="'all ' + animationTime + 's ease-in-out'"
        [style.-o-transition]="'all ' + animationTime + 's ease-in-out'"
        [style.transition]="'all ' + animationTime + 's ease-in-out'"></div>
</div>
`,
    styles: [`
.loading-bar {
    position: fixed;
    margin: 0;
    padding: 0;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99999;
}

.loading-bar-progress {
    margin: 0;
    padding: 0;
    z-index: 99998;
    box-shadow: 0 0 10px 0;
    height: 2px;
    opacity: 0;
}
`]
})
export class LoadingBar implements OnInit, OnDestroy {

    // -------------------------------------------------------------------------
    // Inputs / Outputs
    // -------------------------------------------------------------------------

    @Input()
    color: string = "#4092F1";

    @Input()
    height: number = 2;

    @Input()
    animationTime: number = 0.5;

    @Input()
    runInterval: number = 300;

    @Input()
    progress: number = 0;

    // -------------------------------------------------------------------------
    // Public Properties
    // -------------------------------------------------------------------------

    visible: boolean = false;

    // -------------------------------------------------------------------------
    // Private Properties
    // -------------------------------------------------------------------------

    private runningInterval: any;

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor(@Optional() private loadingBarService: LoadingBarService) {
    }

    // -------------------------------------------------------------------------
    // Lifecycle listeners
    // -------------------------------------------------------------------------

    ngOnInit() {
        if (this.loadingBarService) {
            this.loadingBarService.onStart.subscribe(() => this.start());
            this.loadingBarService.onStop.subscribe(() => this.stop());
            this.loadingBarService.onReset.subscribe(() => this.reset());
            this.loadingBarService.onComplete.subscribe(() => this.complete());
        }
    }

    ngOnDestroy() {
        if (this.loadingBarService) {
            this.loadingBarService.onStart.unsubscribe();
            this.loadingBarService.onStop.unsubscribe();
            this.loadingBarService.onReset.unsubscribe();
            this.loadingBarService.onComplete.unsubscribe();
        }
    }

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    start() {
        this.stop();
        this.visible = true;
        this.runningInterval = setInterval(() => {
            this.progress++;
            if (this.progress === 100)
                this.complete();

        }, this.runInterval);
    }

    stop() {
        if (this.runningInterval) {
            clearInterval(this.runningInterval);
            this.runningInterval = null;
        }
    }

    reset() {
        this.stop();
        this.progress = 0;
    }

    complete() {
        this.progress = 100;
        this.stop();
        setTimeout(() => {
            this.visible = false;
            setTimeout(() => {
                this.progress = 0;
            }, this.animationTime * 1000);
        }, this.animationTime * 1000);
    }

}