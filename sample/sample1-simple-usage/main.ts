import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {Component, NgModule} from "@angular/core";
import {LoadingBarService, LoadingBarModule} from "../../src/index";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

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
`
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

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        LoadingBarModule
    ],
    declarations: [
        Sample1App
    ],
    bootstrap: [
        Sample1App
    ]
})
export class Sample1Module {

}

platformBrowserDynamic().bootstrapModule(Sample1Module);