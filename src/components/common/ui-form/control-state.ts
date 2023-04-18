export interface IControlState {
  disable: {
    [x: string]: boolean;
  };
  hidden: {
    [x: string]: boolean;
  };
  label: {
    [x: string]: string;
  };
}
export class ControlState implements IControlState {

  disable: { [x: string]: boolean } = {};

  hidden: { [x: string]: boolean } = {};

  label: { [x: string]: string } = {};
}
