declare class Lenis {
  constructor(options?: {autoRaf?:boolean; duration?:number; smoothWheel?:boolean; syncTouch?:boolean; anchors?:boolean; prevent?:(node:HTMLElement)=>boolean});
  destroy():void;
}
export default Lenis;
