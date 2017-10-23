/** Declaration file generated by dts-gen */

export = koa_session2;

declare function koa_session2(opts: any): any;

declare namespace koa_session2 {
  class Store {
    constructor(...args: any[]);

    destroy(...args: any[]): void;

    get(...args: any[]): void;

    getID(...args: any[]): void;

    set(...args: any[]): void;

  }

  namespace Store {

    function destroy(...args: any[]): void;

    function get(...args: any[]): void;

    function getID(...args: any[]): void;

    function set(...args: any[]): void;

  }



}
