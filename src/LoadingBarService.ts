import {Injectable, EventEmitter} from "@angular/core";

@Injectable()
export class LoadingBarService {

    onStart = new EventEmitter();
    onStop = new EventEmitter();
    onComplete = new EventEmitter();
    onReset = new EventEmitter();

    start() {
        this.onStart.emit(undefined);
    }

    stop() {
        this.onStop.emit(undefined);
    }

    complete() {
        this.onComplete.emit(undefined);
    }

    reset() {
        this.onReset.emit(undefined);
    }

}