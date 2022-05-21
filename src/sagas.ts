import { EventChannel, eventChannel, Task, Saga } from 'redux-saga';
import { take, put, call, CallEffect, RaceEffect, ForkEffect, TakeEffect, SimpleEffect, fork, cancel, cancelled, race, CancelEffect } from "redux-saga/effects";
import { timerMs, NEXT_GENERATION, START, STOP, CLEAR } from './game';

function timer() {
    return eventChannel(emitter => {
        const iv = setInterval(() => {
            emitter(timerMs);
        }, timerMs);
        return () => {
            clearInterval(iv);
        };
    });
}
  
function* timerSaga(): Generator<any> {
    const chan: EventChannel<number> = (yield call(timer)) as EventChannel<number>;
    try {
        while (true) {
            yield take(chan);
            yield put({ type: NEXT_GENERATION });
        }
    } finally {
        if (yield cancelled) {
            chan.close();
        }
    }
}
  
type YieldType = TakeEffect | ForkEffect<Generator> | RaceEffect<TakeEffect> | CancelEffect;

export function* rootSaga(): Generator<YieldType, void, Task> {
    while (yield take(START)) {
        const asyncTask: Task = (yield fork(timerSaga)) as Task;
        yield race([ take(STOP),
                    take(CLEAR) ]);
        yield cancel(asyncTask);
    }
}