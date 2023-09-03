import { TinyEmitter } from "tiny-emitter";

export const eventBus = new TinyEmitter();
export const EVENTS = {
  UPDATE_INDEX_I: "UPDATE_INDEX_I",
  UPDATE_INDEX_J: "UPDATE_INDEX_J",
  TERMINATE_SORT: "TERMINATE_SORT",
} as const;
