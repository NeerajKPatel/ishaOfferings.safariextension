Effect.Transitions.customExponentialEaseOut=function(b){if(b==0){return 0}if(b==1){return 1
}return -Math.pow(2,-10*b)+1};AC.AnchorPageScroller=Class.create();Object.extend(AC.AnchorPageScroller.prototype,AC.ViewMaster.Viewer.prototype);
Object.extend(AC.AnchorPageScroller.prototype,{triggerClassName:"scrollToAnchor",_triggerClicked:function(f){if(f&&f.type==="click"&&f.button===2){return
}var h=f.element();if(AC.Detector.isIEStrict()&&f.type==="mouseup"){if(h&&h.nodeName.toLowerCase()==="a"){h=h.down("."+this.triggerClassName)
}}else{while(h&&h.nodeName.toLowerCase()!="a"&&h.nodeName.toLowerCase()!="body"){h=h.parentNode
}}if(h&&h.href&&Element.Methods.hasClassName(h,this.triggerClassName)){var g=h.href.split("#");
if(g.length===2){Event.stop(f);this._onMouseScroll=this.cancelEffect.bind(this);
document.observe("mousewheel",this._onMouseScroll);document.observe("DOMMouseScroll",this._onMouseScroll);
this._onKeyDown=this.onKeyDown.bind(this);document.observe("keydown",this._onKeyDown);
this._currentDestination=g[1];var e={duration:0.375,transition:Effect.Transitions.customExponentialEaseOut,afterFinish:this.afterScroll.bind(this)};
e=Object.extend(e,typeof AnchorPageScrollerOptions=="undefined"?{}:AnchorPageScrollerOptions);
this._scrollingEffect=new Effect.ScrollTo(this._currentDestination,e);this.trackClick()
}}},onKeyDown:function(b){if(b.keyCode==32||b.keyCode==33||b.keyCode==34||b.keyCode==35||b.keyCode==36||b.keyCode==37||b.keyCode==38||b.keyCode==39||b.keyCode==40){this.cancelEffect()
}},cancelEffect:function(b){if(this._scrollingEffect){this._scrollingEffect.cancel();
this._scrollingEffect=null}if(this._onMouseScroll){document.stopObserving("mousewheel",this._onMouseScroll);
document.stopObserving("DOMMouseScroll",this._onMouseScroll);this._onMouseScroll=null
}if(this._onKeyDown){document.stopObserving("keydown",this._onKeyDown);this._onKeyDown=null
}this.afterScroll()},afterScroll:function(){if(this._currentDestination){var b=window.location.href.split("#");
b[1]=this._currentDestination;window.location.href=(b[0]+"#"+b[1]);if(typeof this.view.delegate.onScrollEnd==="function"){this.view.delegate.onScrollEnd(this,this._currentDestination)
}delete this._currentDestination}},sectionWithId:function(b){return null},trackClick:function(){var d="Page Scroller - "+AC.Tracking.pageName()+" - "+this._currentDestination,c=this._currentDestination.match(/top/)?"back to top":"contextual anchor link";
AC.Tracking.trackClick({prop3:d,prop25:c},this,"o",d)}});Event.onDOMReady(function(){AC.AnchorPageScroller.defaultAnchorScroller=new AC.AnchorPageScroller()
});