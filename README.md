# ng2-loading-bar

Simple loading bar on the top of your page to indicate page loading loading.

## Installation

1. Install npm module:
    
    `npm install ng2-loading-bar --save`

2. If you are using system.js you may want to add this into `map` and `package` config:
    
    ```json
    {
        "map": {
            "ng2-loading-bar": "node_modules/ng2-loading-bar"
        },
        "packages": {
            "ng2-loading-bar": { "main": "index.js", "defaultExtension": "js" }
        }
    }
    ```
## Usage

Put loading bar component to the top of your page, most probably near the main header.

```typescript
<loading-bar color="#FF0000" [height]="3" [animationTime]="0.3" [runInterval]="100" [progress]="0"></loading-bar>
```

* `progress` is overall loading progress
* `color` color of the loading bar
* `height` height of the loading bar
* `animationTime` css animation time in ms
* `runInterval` interval during which loading will increase its percents

You can also use `LoadingBarService` service to control your loading bar progress - start and stop loading.

## Sample

```typescript
import {bootstrap} from "@angular/platform-browser-dynamic";
import {Component} from "@angular/core";
import {LoadingBar, LoadingBarService} from "ng2-loading-bar";

@Component({
    selector: "app",
    template: `
<div class="container">
    <loading-bar #loadingBar [height]="height" [color]="color" [runInterval]="runInterval"></loading-bar>

    <br/>
    <br/>
    <button (click)="loadingBar.start()">start</button><br/>
    <button (click)="loadingBar.stop()">stop</button><br/>
    <button (click)="loadingBar.reset()">reset</button><br/>
    <button (click)="loadingBar.complete()">complete</button><br/>

    <br/>
    change height: <input [(ngModel)]="height"><br/>
    change color: <input [(ngModel)]="color"><br/>
    run interval: <input [(ngModel)]="runInterval"><br/>
    <br/>

    <button (click)="emitStart()">dispatch start event using service</button>
    <button (click)="emitStop()">dispatch stop event using service</button>
    <button (click)="emitReset()">dispatch reset event using service</button>
    <button (click)="emitComplete()">dispatch complete event using service</button>

</div>
`,
    directives: [LoadingBar],
    providers: [LoadingBarService]
})
export class Sample1App  {

    height = 2;
    color = "#4092F1";
    runInterval = 300;

    constructor(private loadingBarService: LoadingBarService) {
    }

    emitStart() {
        this.loadingBarService.start();
    }

    emitStop() {
        this.loadingBarService.stop();
    }

    emitReset() {
        this.loadingBarService.reset();
    }

    emitComplete() {
        this.loadingBarService.complete();
    }

}
```

Take a look on samples in [./sample](https://github.com/pleerock/ng2-loading-bar/tree/master/sample) for more examples of
usages.
