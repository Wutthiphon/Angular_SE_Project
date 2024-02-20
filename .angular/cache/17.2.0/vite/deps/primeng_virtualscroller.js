import {
  Scroller,
  ScrollerModule
} from "./chunk-6Y6CTX25.js";
import "./chunk-O4WKPIME.js";
import "./chunk-I45SWPWR.js";
import "./chunk-3SQF7L7O.js";
import {
  Footer,
  Header,
  PrimeTemplate,
  SharedModule
} from "./chunk-XS52XQIU.js";
import "./chunk-HXLP6H3M.js";
import {
  CommonModule,
  NgClass,
  NgIf,
  NgStyle,
  NgTemplateOutlet
} from "./chunk-RX32UDKQ.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  Output,
  ViewChild,
  ViewEncapsulation$1,
  setClassMetadata,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵviewQuery
} from "./chunk-M7N747A6.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-J4B6MK7R.js";

// node_modules/primeng/fesm2022/primeng-virtualscroller.mjs
var _c0 = ["scroller"];
function VirtualScroller_div_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function VirtualScroller_div_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 8);
    ɵɵprojection(1);
    ɵɵtemplate(2, VirtualScroller_div_1_ng_container_2_Template, 1, 0, "ng-container", 9);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r0.headerTemplate);
  }
}
function VirtualScroller_ng_template_6_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
var _c1 = (a0) => ({
  height: a0
});
var _c2 = (a0, a1) => ({
  $implicit: a0,
  options: a1
});
function VirtualScroller_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 10);
    ɵɵtemplate(1, VirtualScroller_ng_template_6_ng_container_1_Template, 1, 0, "ng-container", 11);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const scrollerOptions_r7 = ctx.options;
    const ctx_r3 = ɵɵnextContext();
    ɵɵproperty("ngStyle", ɵɵpureFunction1(3, _c1, ctx_r3.itemSize + "px"));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", item_r6 ? ctx_r3.itemTemplate : ctx_r3.loadingItemTemplate)("ngTemplateOutletContext", ɵɵpureFunction2(5, _c2, item_r6, scrollerOptions_r7));
  }
}
function VirtualScroller_div_7_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function VirtualScroller_div_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 12);
    ɵɵprojection(1, 1);
    ɵɵtemplate(2, VirtualScroller_div_7_ng_container_2_Template, 1, 0, "ng-container", 9);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = ɵɵnextContext();
    ɵɵattribute("data-pc-section", "footer");
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r4.footerTemplate);
  }
}
var _c3 = [[["p-header"]], [["p-footer"]]];
var _c4 = ["p-header", "p-footer"];
var VirtualScroller = class _VirtualScroller {
  el;
  cd;
  /**
   * An array of objects to display.
   * @group Props
   */
  value;
  /**
   * Height of an item in the list.
   * @group Props
   */
  itemSize;
  /**
   * Inline style of the component.
   * @group Props
   */
  style;
  /**
   * Style class of the component.
   * @group Props
   */
  styleClass;
  /**
   * Max height of the content area in inline mode.
   * @group Props
   */
  scrollHeight;
  /**
   * Defines if data is loaded and interacted with in lazy manner.
   * @group Props
   */
  lazy;
  /**
   * Whether to use the scroller feature. The properties of scroller component can be used like an object in it.
   * @group Props
   */
  options;
  /**
   * Threshold in milliseconds to delay lazy loading during scrolling.
   * @group Props
   */
  delay = 250;
  /**
   * Callback to invoke in lazy mode to load new data.
   * @param {VirtualScrollerLazyLoadEvent} event - custom lazy load event.
   * @group Emits
   */
  onLazyLoad = new EventEmitter();
  header;
  footer;
  templates;
  scroller;
  itemTemplate;
  headerTemplate;
  footerTemplate;
  loadingItemTemplate;
  virtualScrollTimeout;
  constructor(el, cd) {
    this.el = el;
    this.cd = cd;
  }
  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "item":
          this.itemTemplate = item.template;
          break;
        case "loadingItem":
          this.loadingItemTemplate = item.template;
          break;
        case "header":
          this.headerTemplate = item.template;
          break;
        case "footer":
          this.footerTemplate = item.template;
          break;
        default:
          this.itemTemplate = item.template;
          break;
      }
    });
  }
  onLazyItemLoad(event) {
    if (this.virtualScrollTimeout) {
      clearTimeout(this.virtualScrollTimeout);
    }
    this.virtualScrollTimeout = setTimeout(() => {
      this.onLazyLoad.emit(__spreadProps(__spreadValues({}, event), {
        rows: event.last - event.first,
        forceUpdate: () => this.cd.detectChanges()
      }));
    }, this.delay);
  }
  getBlockableElement() {
    return this.el.nativeElement.children[0];
  }
  scrollToIndex(index, mode) {
    this.scroller?.scrollToIndex(index, mode);
  }
  static ɵfac = function VirtualScroller_Factory(t) {
    return new (t || _VirtualScroller)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _VirtualScroller,
    selectors: [["p-virtualScroller"]],
    contentQueries: function VirtualScroller_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, Header, 5);
        ɵɵcontentQuery(dirIndex, Footer, 5);
        ɵɵcontentQuery(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.header = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.footer = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    viewQuery: function VirtualScroller_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.scroller = _t.first);
      }
    },
    hostAttrs: [1, "p-element"],
    inputs: {
      value: "value",
      itemSize: "itemSize",
      style: "style",
      styleClass: "styleClass",
      scrollHeight: "scrollHeight",
      lazy: "lazy",
      options: "options",
      delay: "delay"
    },
    outputs: {
      onLazyLoad: "onLazyLoad"
    },
    ngContentSelectors: _c4,
    decls: 8,
    vars: 17,
    consts: [[3, "ngClass", "ngStyle"], ["class", "p-virtualscroller-header", 4, "ngIf"], [1, "p-virtualscroller-content"], ["content", ""], ["styleClass", "p-virtualscroller-list", 3, "items", "itemSize", "lazy", "options", "onLazyLoad"], ["scroller", ""], ["pTemplate", "item"], ["class", "p-virtualscroller-footer", 4, "ngIf"], [1, "p-virtualscroller-header"], [4, "ngTemplateOutlet"], [1, "p-virtualscroller-item", 3, "ngStyle"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "p-virtualscroller-footer"]],
    template: function VirtualScroller_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef(_c3);
        ɵɵelementStart(0, "div", 0);
        ɵɵtemplate(1, VirtualScroller_div_1_Template, 3, 1, "div", 1);
        ɵɵelementStart(2, "div", 2, 3)(4, "p-scroller", 4, 5);
        ɵɵlistener("onLazyLoad", function VirtualScroller_Template_p_scroller_onLazyLoad_4_listener($event) {
          return ctx.onLazyItemLoad($event);
        });
        ɵɵtemplate(6, VirtualScroller_ng_template_6_Template, 2, 8, "ng-template", 6);
        ɵɵelementEnd()();
        ɵɵtemplate(7, VirtualScroller_div_7_Template, 3, 2, "div", 7);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.styleClass);
        ɵɵproperty("ngClass", "p-virtualscroller p-component")("ngStyle", ctx.style);
        ɵɵattribute("data-pc-name", "virtualscroller")("data-pc-section", "root");
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.header || ctx.headerTemplate);
        ɵɵadvance();
        ɵɵattribute("data-pc-section", "content");
        ɵɵadvance(2);
        ɵɵstyleMap(ɵɵpureFunction1(15, _c1, ctx.scrollHeight));
        ɵɵproperty("items", ctx.value)("itemSize", ctx.itemSize)("lazy", ctx.lazy)("options", ctx.options);
        ɵɵadvance(3);
        ɵɵproperty("ngIf", ctx.footer || ctx.footerTemplate);
      }
    },
    dependencies: [NgClass, NgIf, NgTemplateOutlet, NgStyle, PrimeTemplate, Scroller],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VirtualScroller, [{
    type: Component,
    args: [{
      selector: "p-virtualScroller",
      template: `
        <div [ngClass]="'p-virtualscroller p-component'" [ngStyle]="style" [class]="styleClass" [attr.data-pc-name]="'virtualscroller'" [attr.data-pc-section]="'root'">
            <div class="p-virtualscroller-header" *ngIf="header || headerTemplate">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            </div>
            <div #content class="p-virtualscroller-content" [attr.data-pc-section]="'content'">
                <p-scroller #scroller [items]="value" styleClass="p-virtualscroller-list" [style]="{ height: scrollHeight }" [itemSize]="itemSize" [lazy]="lazy" (onLazyLoad)="onLazyItemLoad($event)" [options]="options">
                    <ng-template pTemplate="item" let-item let-scrollerOptions="options">
                        <div [ngStyle]="{ height: itemSize + 'px' }" class="p-virtualscroller-item">
                            <ng-container *ngTemplateOutlet="item ? itemTemplate : loadingItemTemplate; context: { $implicit: item, options: scrollerOptions }"></ng-container>
                        </div>
                    </ng-template>
                </p-scroller>
            </div>
            <div class="p-virtualscroller-footer" *ngIf="footer || footerTemplate" [attr.data-pc-section]="'footer'">
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        </div>
    `,
      changeDetection: ChangeDetectionStrategy.Default,
      encapsulation: ViewEncapsulation$1.None,
      host: {
        class: "p-element"
      }
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }], {
    value: [{
      type: Input
    }],
    itemSize: [{
      type: Input
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    scrollHeight: [{
      type: Input
    }],
    lazy: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    delay: [{
      type: Input
    }],
    onLazyLoad: [{
      type: Output
    }],
    header: [{
      type: ContentChild,
      args: [Header]
    }],
    footer: [{
      type: ContentChild,
      args: [Footer]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }],
    scroller: [{
      type: ViewChild,
      args: ["scroller"]
    }]
  });
})();
var VirtualScrollerModule = class _VirtualScrollerModule {
  static ɵfac = function VirtualScrollerModule_Factory(t) {
    return new (t || _VirtualScrollerModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _VirtualScrollerModule,
    declarations: [VirtualScroller],
    imports: [CommonModule, SharedModule, ScrollerModule],
    exports: [VirtualScroller, SharedModule, ScrollerModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, SharedModule, ScrollerModule, SharedModule, ScrollerModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VirtualScrollerModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, SharedModule, ScrollerModule],
      exports: [VirtualScroller, SharedModule, ScrollerModule],
      declarations: [VirtualScroller]
    }]
  }], null, null);
})();
export {
  VirtualScroller,
  VirtualScrollerModule
};
//# sourceMappingURL=primeng_virtualscroller.js.map
