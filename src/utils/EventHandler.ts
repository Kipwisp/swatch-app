import mitt from "mitt";

export type Events = {
  colorSelect: number[];
};

const emitter = mitt<Events>();

export default emitter;
