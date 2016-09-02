import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoadingBarService} from "./LoadingBarService";
import {LoadingBar} from "./LoadingBar";

export * from "./LoadingBar";
export * from "./LoadingBarService";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LoadingBar,
    ],
    exports: [
        LoadingBar,
    ],
    providers: [
        LoadingBarService
    ]
})
export class LoadingBarModule {

}