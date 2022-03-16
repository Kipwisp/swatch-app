import mitt from "mitt";

export type ColorSelectEvent = {
  pos: number[];
  color: string;
};

export type Events = {
  colorSelect: ColorSelectEvent;
};

const emitter = mitt<Events>();

export default emitter;
