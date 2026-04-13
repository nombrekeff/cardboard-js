// --- tests/reactivity.test.ts ---

import { tag } from "../src/tag.js";
import { createObservable, observe } from "../src/observables.js";
import { event, timer, classIf } from "../src/ext/reactivity/reactivity.js";
import {
  jest,
  describe,
  beforeAll,
  beforeEach,
  expect,
  it,
  afterEach,
} from "@jest/globals";
import { init } from "../src/cardboard";

describe("Reactivity & Observe API", () => {
  beforeAll(() => {
    init({ selector: "body" });
  });
  beforeEach(() => {
    // We use fake timers to instantly test our timer() blueprints
    jest.useFakeTimers();
    document.body.innerHTML = "";
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  describe("1. The .observe() Chaining Engine", () => {
    it("should create a reactive stream from a DOM event", () => {
      const callback = jest.fn();
      const myBtn = tag("button");

      // Map the click event to a static string to avoid deduplication ignores
      const clickStream = myBtn.observe(event("click", () => "clicked!"));
      clickStream.changed(callback);

      expect(callback).not.toHaveBeenCalled();

      myBtn.el.dispatchEvent(new window.Event("click"));

      expect(callback).toHaveBeenCalledWith("clicked!");
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should create a reactive stream from a contextual timer", () => {
      const callback = jest.fn();
      const myDiv = tag("div");

      const ticks = myDiv.observe(timer(1000));
      ticks.changed(callback);

      jest.advanceTimersByTime(1000);
      expect(callback).toHaveBeenCalledWith(1);

      jest.advanceTimersByTime(2500);
      // 1000ms + 2500ms = 3.5s total -> should have ticked 3 times
      expect(callback).toHaveBeenCalledWith(3);
    });
  });

  describe("2. Standalone observe() Engine", () => {
    it("should handle standalone blueprints without a CTag", () => {
      const callback = jest.fn();

      // Testing the non-contextual observe engine directly
      const globalTicks = observe(timer(500));
      globalTicks.changed(callback);

      jest.advanceTimersByTime(500);
      expect(callback).toHaveBeenCalledWith(1);
    });
  });

  describe("3. Memory Safety and Teardowns", () => {
    it("should clear intervals when the observable is destroyed", () => {
      const myDiv = tag("div");
      const ticks = myDiv.observe(timer(1000));

      // Jest tracks active timers. We should have 1 running.
      expect(jest.getTimerCount()).toBe(1);

      // Destroying the observable should trigger the blueprint's teardown function
      ticks.destroy();

      // The interval should be cleared safely
      expect(jest.getTimerCount()).toBe(0);
    });

    it("should remove event listeners when tag is destroyed", () => {
      // Mocking removeEventListener to ensure it gets called
      const removeSpy = jest.spyOn(
        HTMLElement.prototype,
        "removeEventListener",
      );

      const myBtn = tag("button");
      const clickStream = myBtn.observe(event("click", () => true));

      // Destroying the tag triggers the teardown queue
      myBtn.destroy();
      // destroying the tag destroys the stream, which calls the blueprint teardown
      clickStream.destroy();

      expect(removeSpy).toHaveBeenCalledWith("click", expect.any(Function));
      removeSpy.mockRestore();
    });
  });

  describe("4. Child Transformers (Middleware)", () => {
    it("should unwrap IObservable children into TextNodes automatically", () => {
      const nameObs = createObservable("Alice");

      // The plugin should intercept this and wrap it in a text() CTag
      const t = tag("div", ["Hello, ", nameObs]);

      expect(t.el.textContent).toBe("Hello, Alice");

      // Reactivity should be maintained
      nameObs.value = "Bob";
      expect(t.el.textContent).toBe("Hello, Bob");
    });
  });

  describe("5. .use() Pipeline (Tree-shakeable DX)", () => {
    it("should apply standalone plugins directly without chaining prototype", () => {
      const isActive = createObservable(false);

      // Using the functional approach directly
      const t = tag("div").use(classIf(isActive, ["active-state"]));

      expect(t.hasClass("active-state")).toBe(false);

      isActive.value = true;
      expect(t.hasClass("active-state")).toBe(true);
    });
  });
});
