import { expectSaga, testSaga } from "redux-saga-test-plan";
import { all, fork, take, takeEvery } from "redux-saga/effects";
import { rootSaga, timerSaga, timer } from "./sagas";
import { timerMs, NEXT_GENERATION, START, STOP, CLEAR } from './game';
import { call } from "redux-saga-test-plan/matchers";

describe('sagas', () => {
  it('run saga', () => {
    return expectSaga(rootSaga)
      .provide({ all: () => null })
      .run();
  });

  it('Root Saga take', () => {
    const saga = rootSaga();
    expect(saga.next().value).toEqual(take(START));
  });

  /*it('Timer Saga take', () => {
    const saga = timerSaga();
    expect(saga.next().value).toEqual(call);
  });*/

  /*it('should call back button pressed action', () => {
    const api = testSaga(timerSaga)
      .next()
      .call(timer);
    api.
  });*/

  test('timer saga redux-saga-test-plan', () => {
    testSaga(timerSaga)
      .next()
      .call(timer);
  });
});