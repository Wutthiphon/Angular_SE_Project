import {
  Tooltip,
  TooltipModule
} from "./chunk-QPDYA6JJ.js";
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule
} from "./chunk-T5LBJADV.js";
import "./chunk-DLSLDAPR.js";
import "./chunk-JYM5SJTG.js";
import {
  DomHandler
} from "./chunk-3SQF7L7O.js";
import "./chunk-XS52XQIU.js";
import "./chunk-HXLP6H3M.js";
import {
  CommonModule,
  NgClass,
  NgForOf,
  NgIf,
  NgStyle
} from "./chunk-RX32UDKQ.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
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
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵviewQuery
} from "./chunk-M7N747A6.js";
import "./chunk-J4B6MK7R.js";

// node_modules/primeng/fesm2022/primeng-steps.mjs
var _c0 = ["list"];
function Steps_li_3_a_2_span_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 12);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r2 = ɵɵnextContext(2).$implicit;
    ɵɵadvance();
    ɵɵtextInterpolate(item_r2.label);
  }
}
function Steps_li_3_a_2_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 13);
  }
  if (rf & 2) {
    const item_r2 = ɵɵnextContext(2).$implicit;
    ɵɵproperty("innerHTML", item_r2.label, ɵɵsanitizeHtml);
  }
}
var _c1 = () => ({
  exact: false
});
function Steps_li_3_a_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 8);
    ɵɵlistener("click", function Steps_li_3_a_2_Template_a_click_0_listener($event) {
      ɵɵrestoreView(_r15);
      const ctx_r14 = ɵɵnextContext();
      const item_r2 = ctx_r14.$implicit;
      const i_r3 = ctx_r14.index;
      const ctx_r13 = ɵɵnextContext();
      return ɵɵresetView(ctx_r13.onItemClick($event, item_r2, i_r3));
    })("keydown", function Steps_li_3_a_2_Template_a_keydown_0_listener($event) {
      ɵɵrestoreView(_r15);
      const ctx_r17 = ɵɵnextContext();
      const item_r2 = ctx_r17.$implicit;
      const i_r3 = ctx_r17.index;
      const ctx_r16 = ɵɵnextContext();
      return ɵɵresetView(ctx_r16.onItemKeydown($event, item_r2, i_r3));
    });
    ɵɵelementStart(1, "span", 9);
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵtemplate(3, Steps_li_3_a_2_span_3_Template, 2, 1, "span", 10)(4, Steps_li_3_a_2_ng_template_4_Template, 1, 1, "ng-template", null, 11, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const _r10 = ɵɵreference(5);
    const ctx_r18 = ɵɵnextContext();
    const item_r2 = ctx_r18.$implicit;
    const i_r3 = ctx_r18.index;
    const ctx_r5 = ɵɵnextContext();
    ɵɵproperty("routerLink", item_r2.routerLink)("queryParams", item_r2.queryParams)("routerLinkActive", "p-menuitem-link-active")("routerLinkActiveOptions", item_r2.routerLinkActiveOptions || ɵɵpureFunction0(19, _c1))("target", item_r2.target)("fragment", item_r2.fragment)("queryParamsHandling", item_r2.queryParamsHandling)("preserveFragment", item_r2.preserveFragment)("skipLocationChange", item_r2.skipLocationChange)("replaceUrl", item_r2.replaceUrl)("state", item_r2.state)("ariaCurrentWhenActive", ctx_r5.exact ? "step" : void 0);
    ɵɵattribute("tabindex", ctx_r5.getItemTabIndex(item_r2, i_r3))("aria-selected", i_r3 === ctx_r5.activeIndex)("aria-expanded", i_r3 === ctx_r5.activeIndex)("aria-disabled", item_r2.disabled || ctx_r5.readonly && i_r3 !== ctx_r5.activeIndex);
    ɵɵadvance(2);
    ɵɵtextInterpolate(i_r3 + 1);
    ɵɵadvance();
    ɵɵproperty("ngIf", item_r2.escape !== false)("ngIfElse", _r10);
  }
}
function Steps_li_3_ng_template_3_span_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 12);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r2 = ɵɵnextContext(2).$implicit;
    ɵɵadvance();
    ɵɵtextInterpolate(item_r2.label);
  }
}
function Steps_li_3_ng_template_3_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 13);
  }
  if (rf & 2) {
    const item_r2 = ɵɵnextContext(2).$implicit;
    ɵɵproperty("innerHTML", item_r2.label, ɵɵsanitizeHtml);
  }
}
function Steps_li_3_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 14);
    ɵɵlistener("click", function Steps_li_3_ng_template_3_Template_a_click_0_listener($event) {
      ɵɵrestoreView(_r26);
      const ctx_r25 = ɵɵnextContext();
      const item_r2 = ctx_r25.$implicit;
      const i_r3 = ctx_r25.index;
      const ctx_r24 = ɵɵnextContext();
      return ɵɵresetView(ctx_r24.onItemClick($event, item_r2, i_r3));
    })("keydown", function Steps_li_3_ng_template_3_Template_a_keydown_0_listener($event) {
      ɵɵrestoreView(_r26);
      const ctx_r28 = ɵɵnextContext();
      const item_r2 = ctx_r28.$implicit;
      const i_r3 = ctx_r28.index;
      const ctx_r27 = ɵɵnextContext();
      return ɵɵresetView(ctx_r27.onItemKeydown($event, item_r2, i_r3));
    });
    ɵɵelementStart(1, "span", 9);
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵtemplate(3, Steps_li_3_ng_template_3_span_3_Template, 2, 1, "span", 10)(4, Steps_li_3_ng_template_3_ng_template_4_Template, 1, 1, "ng-template", null, 15, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const _r21 = ɵɵreference(5);
    const ctx_r29 = ɵɵnextContext();
    const item_r2 = ctx_r29.$implicit;
    const i_r3 = ctx_r29.index;
    const ctx_r6 = ɵɵnextContext();
    ɵɵproperty("target", item_r2.target)("ariaCurrentWhenActive", ctx_r6.exact && (!item_r2.disabled || ctx_r6.readonly) ? "step" : void 0);
    ɵɵattribute("href", item_r2.url, ɵɵsanitizeUrl)("tabindex", ctx_r6.getItemTabIndex(item_r2, i_r3))("aria-selected", i_r3 === ctx_r6.activeIndex)("aria-expanded", i_r3 === ctx_r6.activeIndex)("aria-disabled", item_r2.disabled || ctx_r6.readonly && i_r3 !== ctx_r6.activeIndex);
    ɵɵadvance(2);
    ɵɵtextInterpolate(i_r3 + 1);
    ɵɵadvance();
    ɵɵproperty("ngIf", item_r2.escape !== false)("ngIfElse", _r21);
  }
}
var _c2 = (a0, a1) => ({
  "p-highlight p-steps-current": a0,
  "p-disabled": a1
});
function Steps_li_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "li", 4, 5);
    ɵɵtemplate(2, Steps_li_3_a_2_Template, 6, 20, "a", 6)(3, Steps_li_3_ng_template_3_Template, 6, 10, "ng-template", null, 7, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const i_r3 = ctx.index;
    const _r7 = ɵɵreference(4);
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMap(item_r2.styleClass);
    ɵɵproperty("ngStyle", item_r2.style)("tooltipOptions", item_r2.tooltipOptions)("ngClass", ɵɵpureFunction2(10, _c2, ctx_r1.isActive(item_r2, i_r3), item_r2.disabled || ctx_r1.readonly && !ctx_r1.isActive(item_r2, i_r3)));
    ɵɵattribute("aria-current", ctx_r1.isActive(item_r2, i_r3) ? "step" : void 0)("id", item_r2.id)("data-pc-section", "menuitem");
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.isClickableRouterLink(item_r2))("ngIfElse", _r7);
  }
}
var _c3 = (a1) => ({
  "p-steps p-component": true,
  "p-readonly": a1
});
var Steps = class _Steps {
  router;
  route;
  cd;
  /**
   * Index of the active item.
   * @group Props
   */
  activeIndex = 0;
  /**
   * An array of menu items.
   * @group Props
   */
  model;
  /**
   * Whether the items are clickable or not.
   * @group Props
   */
  readonly = true;
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
   * Whether to apply 'router-link-active-exact' class if route exactly matches the item path.
   * @group Props
   */
  exact = true;
  /**
   * Callback to invoke when the new step is selected.
   * @param {number} number - current index.
   * @group Emits
   */
  activeIndexChange = new EventEmitter();
  listViewChild;
  constructor(router, route, cd) {
    this.router = router;
    this.route = route;
    this.cd = cd;
  }
  subscription;
  ngOnInit() {
    this.subscription = this.router.events.subscribe(() => this.cd.markForCheck());
  }
  onItemClick(event, item, i) {
    if (this.readonly || item.disabled) {
      event.preventDefault();
      return;
    }
    this.activeIndexChange.emit(i);
    if (!item.url && !item.routerLink) {
      event.preventDefault();
    }
    if (item.command) {
      item.command({
        originalEvent: event,
        item,
        index: i
      });
    }
  }
  onItemKeydown(event, item, i) {
    switch (event.code) {
      case "ArrowRight": {
        this.navigateToNextItem(event.target);
        event.preventDefault();
        break;
      }
      case "ArrowLeft": {
        this.navigateToPrevItem(event.target);
        event.preventDefault();
        break;
      }
      case "Home": {
        this.navigateToFirstItem(event.target);
        event.preventDefault();
        break;
      }
      case "End": {
        this.navigateToLastItem(event.target);
        event.preventDefault();
        break;
      }
      case "Tab":
        if (i !== this.activeIndex) {
          const siblings = DomHandler.find(this.listViewChild.nativeElement, '[data-pc-section="menuitem"]');
          siblings[i].children[0].tabIndex = "-1";
          siblings[this.activeIndex].children[0].tabIndex = "0";
        }
        break;
      case "Enter":
      case "Space": {
        this.onItemClick(event, item, i);
        event.preventDefault();
        break;
      }
      default:
        break;
    }
  }
  navigateToNextItem(target) {
    const nextItem = this.findNextItem(target);
    nextItem && this.setFocusToMenuitem(target, nextItem);
  }
  navigateToPrevItem(target) {
    const prevItem = this.findPrevItem(target);
    prevItem && this.setFocusToMenuitem(target, prevItem);
  }
  navigateToFirstItem(target) {
    const firstItem = this.findFirstItem();
    firstItem && this.setFocusToMenuitem(target, firstItem);
  }
  navigateToLastItem(target) {
    const lastItem = this.findLastItem();
    lastItem && this.setFocusToMenuitem(target, lastItem);
  }
  findNextItem(item) {
    const nextItem = item.parentElement.nextElementSibling;
    return nextItem ? nextItem.children[0] : null;
  }
  findPrevItem(item) {
    const prevItem = item.parentElement.previousElementSibling;
    return prevItem ? prevItem.children[0] : null;
  }
  findFirstItem() {
    const firstSibling = DomHandler.findSingle(this.listViewChild.nativeElement, '[data-pc-section="menuitem"]');
    return firstSibling ? firstSibling.children[0] : null;
  }
  findLastItem() {
    const siblings = DomHandler.find(this.listViewChild.nativeElement, '[data-pc-section="menuitem"]');
    return siblings ? siblings[siblings.length - 1].children[0] : null;
  }
  setFocusToMenuitem(target, focusableItem) {
    target.tabIndex = "-1";
    focusableItem.tabIndex = "0";
    focusableItem.focus();
  }
  isClickableRouterLink(item) {
    return item.routerLink && !this.readonly && !item.disabled;
  }
  isActive(item, index) {
    if (item.routerLink) {
      let routerLink = Array.isArray(item.routerLink) ? item.routerLink : [item.routerLink];
      return this.router.isActive(this.router.createUrlTree(routerLink, {
        relativeTo: this.route
      }).toString(), false);
    }
    return index === this.activeIndex;
  }
  getItemTabIndex(item, index) {
    if (item.disabled) {
      return "-1";
    }
    if (!item.disabled && this.activeIndex === index) {
      return item.tabindex || "0";
    }
    return item.tabindex ?? "-1";
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  static ɵfac = function Steps_Factory(t) {
    return new (t || _Steps)(ɵɵdirectiveInject(Router), ɵɵdirectiveInject(ActivatedRoute), ɵɵdirectiveInject(ChangeDetectorRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _Steps,
    selectors: [["p-steps"]],
    viewQuery: function Steps_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.listViewChild = _t.first);
      }
    },
    hostAttrs: [1, "p-element"],
    inputs: {
      activeIndex: "activeIndex",
      model: "model",
      readonly: "readonly",
      style: "style",
      styleClass: "styleClass",
      exact: "exact"
    },
    outputs: {
      activeIndexChange: "activeIndexChange"
    },
    decls: 4,
    vars: 9,
    consts: [[3, "ngClass", "ngStyle"], ["role", "tablist"], ["list", ""], ["class", "p-steps-item", "role", "presentation", "pTooltip", "", 3, "ngStyle", "class", "tooltipOptions", "ngClass", 4, "ngFor", "ngForOf"], ["role", "presentation", "pTooltip", "", 1, "p-steps-item", 3, "ngStyle", "tooltipOptions", "ngClass"], ["menuitem", ""], ["role", "tab", "class", "p-menuitem-link", 3, "routerLink", "queryParams", "routerLinkActive", "routerLinkActiveOptions", "target", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "ariaCurrentWhenActive", "click", "keydown", 4, "ngIf", "ngIfElse"], ["elseBlock", ""], ["role", "tab", 1, "p-menuitem-link", 3, "routerLink", "queryParams", "routerLinkActive", "routerLinkActiveOptions", "target", "fragment", "queryParamsHandling", "preserveFragment", "skipLocationChange", "replaceUrl", "state", "ariaCurrentWhenActive", "click", "keydown"], [1, "p-steps-number"], ["class", "p-steps-title", 4, "ngIf", "ngIfElse"], ["htmlLabel", ""], [1, "p-steps-title"], [1, "p-steps-title", 3, "innerHTML"], ["role", "tab", 1, "p-menuitem-link", 3, "target", "ariaCurrentWhenActive", "click", "keydown"], ["htmlRouteLabel", ""]],
    template: function Steps_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "nav", 0)(1, "ul", 1, 2);
        ɵɵtemplate(3, Steps_li_3_Template, 5, 13, "li", 3);
        ɵɵelementEnd()();
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.styleClass);
        ɵɵproperty("ngClass", ɵɵpureFunction1(7, _c3, ctx.readonly))("ngStyle", ctx.style);
        ɵɵattribute("data-pc-name", "steps");
        ɵɵadvance();
        ɵɵattribute("data-pc-section", "menu");
        ɵɵadvance(2);
        ɵɵproperty("ngForOf", ctx.model);
      }
    },
    dependencies: [NgClass, NgForOf, NgIf, NgStyle, RouterLink, RouterLinkActive, Tooltip],
    styles: ["@layer primeng{.p-steps{position:relative}.p-steps ul{padding:0;margin:0;list-style-type:none;display:flex}.p-steps-item{position:relative;display:flex;justify-content:center;flex:1 1 auto}.p-steps-item .p-menuitem-link{display:inline-flex;flex-direction:column;align-items:center;overflow:hidden;text-decoration:none}.p-steps.p-steps-readonly .p-steps-item{cursor:auto}.p-steps-item.p-steps-current .p-menuitem-link{cursor:default}.p-steps-title{white-space:nowrap}.p-steps-number{display:flex;align-items:center;justify-content:center}.p-steps-title{display:block}}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Steps, [{
    type: Component,
    args: [{
      selector: "p-steps",
      template: `
        <nav [ngClass]="{ 'p-steps p-component': true, 'p-readonly': readonly }" [ngStyle]="style" [class]="styleClass" [attr.data-pc-name]="'steps'">
            <ul #list role="tablist" [attr.data-pc-section]="'menu'">
                <li
                    *ngFor="let item of model; let i = index"
                    class="p-steps-item"
                    #menuitem
                    [ngStyle]="item.style"
                    [class]="item.styleClass"
                    [attr.aria-current]="isActive(item, i) ? 'step' : undefined"
                    role="presentation"
                    [attr.id]="item.id"
                    pTooltip
                    [tooltipOptions]="item.tooltipOptions"
                    [ngClass]="{ 'p-highlight p-steps-current': isActive(item, i), 'p-disabled': item.disabled || (readonly && !isActive(item, i)) }"
                    [attr.data-pc-section]="'menuitem'"
                >
                    <a
                        *ngIf="isClickableRouterLink(item); else elseBlock"
                        [routerLink]="item.routerLink"
                        [queryParams]="item.queryParams"
                        role="tab"
                        [routerLinkActive]="'p-menuitem-link-active'"
                        [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                        class="p-menuitem-link"
                        (click)="onItemClick($event, item, i)"
                        (keydown)="onItemKeydown($event, item, i)"
                        [target]="item.target"
                        [attr.tabindex]="getItemTabIndex(item, i)"
                        [attr.aria-selected]="i === activeIndex"
                        [attr.aria-expanded]="i === activeIndex"
                        [attr.aria-disabled]="item.disabled || (readonly && i !== activeIndex)"
                        [fragment]="item.fragment"
                        [queryParamsHandling]="item.queryParamsHandling"
                        [preserveFragment]="item.preserveFragment"
                        [skipLocationChange]="item.skipLocationChange"
                        [replaceUrl]="item.replaceUrl"
                        [state]="item.state"
                        [ariaCurrentWhenActive]="exact ? 'step' : undefined"
                    >
                        <span class="p-steps-number">{{ i + 1 }}</span>
                        <span class="p-steps-title" *ngIf="item.escape !== false; else htmlLabel">{{ item.label }}</span>
                        <ng-template #htmlLabel><span class="p-steps-title" [innerHTML]="item.label"></span></ng-template>
                    </a>
                    <ng-template #elseBlock>
                        <a
                            [attr.href]="item.url"
                            class="p-menuitem-link"
                            role="tab"
                            (click)="onItemClick($event, item, i)"
                            (keydown)="onItemKeydown($event, item, i)"
                            [target]="item.target"
                            [attr.tabindex]="getItemTabIndex(item, i)"
                            [attr.aria-selected]="i === activeIndex"
                            [attr.aria-expanded]="i === activeIndex"
                            [attr.aria-disabled]="item.disabled || (readonly && i !== activeIndex)"
                            [ariaCurrentWhenActive]="exact && (!item.disabled || readonly) ? 'step' : undefined"
                        >
                            <span class="p-steps-number">{{ i + 1 }}</span>
                            <span class="p-steps-title" *ngIf="item.escape !== false; else htmlRouteLabel">{{ item.label }}</span>
                            <ng-template #htmlRouteLabel><span class="p-steps-title" [innerHTML]="item.label"></span></ng-template>
                        </a>
                    </ng-template>
                </li>
            </ul>
        </nav>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      host: {
        class: "p-element"
      },
      styles: ["@layer primeng{.p-steps{position:relative}.p-steps ul{padding:0;margin:0;list-style-type:none;display:flex}.p-steps-item{position:relative;display:flex;justify-content:center;flex:1 1 auto}.p-steps-item .p-menuitem-link{display:inline-flex;flex-direction:column;align-items:center;overflow:hidden;text-decoration:none}.p-steps.p-steps-readonly .p-steps-item{cursor:auto}.p-steps-item.p-steps-current .p-menuitem-link{cursor:default}.p-steps-title{white-space:nowrap}.p-steps-number{display:flex;align-items:center;justify-content:center}.p-steps-title{display:block}}\n"]
    }]
  }], () => [{
    type: Router
  }, {
    type: ActivatedRoute
  }, {
    type: ChangeDetectorRef
  }], {
    activeIndex: [{
      type: Input
    }],
    model: [{
      type: Input
    }],
    readonly: [{
      type: Input
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    exact: [{
      type: Input
    }],
    activeIndexChange: [{
      type: Output
    }],
    listViewChild: [{
      type: ViewChild,
      args: ["list", {
        static: false
      }]
    }]
  });
})();
var StepsModule = class _StepsModule {
  static ɵfac = function StepsModule_Factory(t) {
    return new (t || _StepsModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _StepsModule,
    declarations: [Steps],
    imports: [CommonModule, RouterModule, TooltipModule],
    exports: [Steps, RouterModule, TooltipModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, RouterModule, TooltipModule, RouterModule, TooltipModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StepsModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, RouterModule, TooltipModule],
      exports: [Steps, RouterModule, TooltipModule],
      declarations: [Steps]
    }]
  }], null, null);
})();
export {
  Steps,
  StepsModule
};
//# sourceMappingURL=primeng_steps.js.map
