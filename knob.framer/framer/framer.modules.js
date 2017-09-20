require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"dragOnCircle":[function(require,module,exports){
var placeOnElipse;

exports.circleDrag = function(objectLayer, radius) {
  var angle, centerX, centerY, proxy;
  angle = 0;
  centerX = objectLayer.midX;
  centerY = objectLayer.midY + radius;
  proxy = objectLayer.copy();
  proxy.name = "proxy";
  proxy.opacity = 0;
  proxy.draggable = true;
  proxy.draggable.overdrag = false;
  proxy.draggable.momentum = false;
  proxy.draggable.constraints = {
    x: proxy.midX - radius - proxy.width / 2,
    y: proxy.y,
    width: radius * 2 + proxy.width,
    height: radius * 2 + proxy.width
  };
  proxy.onDrag(function(event, layer) {
    var radX, radY;
    radX = this.x - centerX;
    radY = this.y - centerY;
    angle = Math.atan2(radX, radY) * (180 / Math.PI);
    exports.dragAngle = 180 - angle;
    return placeOnElipse(objectLayer, centerX, centerY, angle, radius, radius);
  });
  return proxy.onDragEnd(function() {
    proxy.x = objectLayer.x;
    return proxy.y = objectLayer.y;
  });
};

placeOnElipse = function(newLayer, centerX, centerY, angle, radiusX, radiusY) {
  newLayer.midX = centerX - Math.sin((angle + 180) * Math.PI / 180) * radiusX;
  return newLayer.midY = centerY - Math.cos((angle + 180) * Math.PI / 180) * radiusY;
};


},{}],"input-framer/input":[function(require,module,exports){
var _inputStyle, calculatePixelRatio, growthRatio, imageHeight,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.keyboardLayer = new Layer({
  x: 0,
  y: Screen.height,
  width: Screen.width,
  height: 432,
  html: "<img style='width: 100%;' src='modules/keyboard.png'/>"
});

growthRatio = Screen.width / 732;

imageHeight = growthRatio * 432;

_inputStyle = Object.assign({}, Framer.LayerStyle, calculatePixelRatio = function(layer, value) {
  return (value * layer.context.pixelMultiplier) + "px";
}, {
  fontSize: function(layer) {
    return calculatePixelRatio(layer, layer._properties.fontSize);
  },
  lineHeight: function(layer) {
    return layer._properties.lineHeight + "em";
  },
  padding: function(layer) {
    var padding, paddingValue, paddingValues, pixelMultiplier;
    pixelMultiplier = layer.context.pixelMultiplier;
    padding = [];
    paddingValue = layer._properties.padding;
    if (Number.isInteger(paddingValue)) {
      return calculatePixelRatio(layer, paddingValue);
    }
    paddingValues = layer._properties.padding.split(" ");
    switch (paddingValues.length) {
      case 4:
        padding.top = parseFloat(paddingValues[0]);
        padding.right = parseFloat(paddingValues[1]);
        padding.bottom = parseFloat(paddingValues[2]);
        padding.left = parseFloat(paddingValues[3]);
        break;
      case 3:
        padding.top = parseFloat(paddingValues[0]);
        padding.right = parseFloat(paddingValues[1]);
        padding.bottom = parseFloat(paddingValues[2]);
        padding.left = parseFloat(paddingValues[1]);
        break;
      case 2:
        padding.top = parseFloat(paddingValues[0]);
        padding.right = parseFloat(paddingValues[1]);
        padding.bottom = parseFloat(paddingValues[0]);
        padding.left = parseFloat(paddingValues[1]);
        break;
      default:
        padding.top = parseFloat(paddingValues[0]);
        padding.right = parseFloat(paddingValues[0]);
        padding.bottom = parseFloat(paddingValues[0]);
        padding.left = parseFloat(paddingValues[0]);
    }
    return (padding.top * pixelMultiplier) + "px " + (padding.right * pixelMultiplier) + "px " + (padding.bottom * pixelMultiplier) + "px " + (padding.left * pixelMultiplier) + "px";
  }
});

exports.keyboardLayer.states = {
  shown: {
    y: Screen.height - imageHeight
  }
};

exports.keyboardLayer.states.animationOptions = {
  curve: "spring(500,50,15)"
};

exports.Input = (function(superClass) {
  extend(Input, superClass);

  Input.define("style", {
    get: function() {
      return this.input.style;
    },
    set: function(value) {
      return _.extend(this.input.style, value);
    }
  });

  Input.define("value", {
    get: function() {
      return this.input.value;
    },
    set: function(value) {
      return this.input.value = value;
    }
  });

  function Input(options) {
    if (options == null) {
      options = {};
    }
    if (options.setup == null) {
      options.setup = false;
    }
    if (options.width == null) {
      options.width = Screen.width;
    }
    if (options.clip == null) {
      options.clip = false;
    }
    if (options.height == null) {
      options.height = 60;
    }
    if (options.backgroundColor == null) {
      options.backgroundColor = options.setup ? "rgba(255, 60, 47, .5)" : "transparent";
    }
    if (options.fontSize == null) {
      options.fontSize = 30;
    }
    if (options.lineHeight == null) {
      options.lineHeight = 1;
    }
    if (options.padding == null) {
      options.padding = 10;
    }
    if (options.text == null) {
      options.text = "";
    }
    if (options.placeholder == null) {
      options.placeholder = "";
    }
    if (options.virtualKeyboard == null) {
      options.virtualKeyboard = Utils.isMobile() ? false : true;
    }
    if (options.type == null) {
      options.type = "text";
    }
    if (options.goButton == null) {
      options.goButton = false;
    }
    if (options.autoCorrect == null) {
      options.autoCorrect = "on";
    }
    if (options.autoComplete == null) {
      options.autoComplete = "on";
    }
    if (options.autoCapitalize == null) {
      options.autoCapitalize = "on";
    }
    if (options.spellCheck == null) {
      options.spellCheck = "on";
    }
    if (options.autofocus == null) {
      options.autofocus = false;
    }
    if (options.textColor == null) {
      options.textColor = "#000";
    }
    if (options.fontFamily == null) {
      options.fontFamily = "-apple-system";
    }
    if (options.fontWeight == null) {
      options.fontWeight = "500";
    }
    if (options.submit == null) {
      options.submit = false;
    }
    if (options.tabIndex == null) {
      options.tabIndex = 0;
    }
    Input.__super__.constructor.call(this, options);
    this._properties.fontSize = options.fontSize;
    this._properties.lineHeight = options.lineHeight;
    this._properties.padding = options.padding;
    if (options.placeholderColor != null) {
      this.placeholderColor = options.placeholderColor;
    }
    this.input = document.createElement("input");
    this.input.id = "input-" + (_.now());
    this.input.style.width = _inputStyle["width"](this);
    this.input.style.height = _inputStyle["height"](this);
    this.input.style.fontSize = _inputStyle["fontSize"](this);
    this.input.style.lineHeight = _inputStyle["lineHeight"](this);
    this.input.style.outline = "none";
    this.input.style.border = "none";
    this.input.style.backgroundColor = options.backgroundColor;
    this.input.style.padding = _inputStyle["padding"](this);
    this.input.style.fontFamily = options.fontFamily;
    this.input.style.color = options.textColor;
    this.input.style.fontWeight = options.fontWeight;
    this.input.value = options.text;
    this.input.type = options.type;
    this.input.placeholder = options.placeholder;
    this.input.setAttribute("tabindex", options.tabindex);
    this.input.setAttribute("autocorrect", options.autoCorrect);
    this.input.setAttribute("autocomplete", options.autoComplete);
    this.input.setAttribute("autocapitalize", options.autoCapitalize);
    if (options.autofocus === true) {
      this.input.setAttribute("autofocus", true);
    }
    this.input.setAttribute("spellcheck", options.spellCheck);
    this.form = document.createElement("form");
    if ((options.goButton && !options.submit) || !options.submit) {
      this.form.action = "#";
      this.form.addEventListener("submit", function(event) {
        return event.preventDefault();
      });
    }
    this.form.appendChild(this.input);
    this._element.appendChild(this.form);
    this.backgroundColor = "transparent";
    if (this.placeholderColor) {
      this.updatePlaceholderColor(options.placeholderColor);
    }
    if (!Utils.isMobile() && options.virtualKeyboard === true) {
      this.input.addEventListener("focus", function() {
        exports.keyboardLayer.bringToFront();
        return exports.keyboardLayer.stateCycle();
      });
      this.input.addEventListener("blur", function() {
        return exports.keyboardLayer.animate("default");
      });
    }
  }

  Input.prototype.updatePlaceholderColor = function(color) {
    var css;
    this.placeholderColor = color;
    if (this.pageStyle != null) {
      document.head.removeChild(this.pageStyle);
    }
    this.pageStyle = document.createElement("style");
    this.pageStyle.type = "text/css";
    css = "#" + this.input.id + "::-webkit-input-placeholder { color: " + this.placeholderColor + "; }";
    this.pageStyle.appendChild(document.createTextNode(css));
    return document.head.appendChild(this.pageStyle);
  };

  Input.prototype.focus = function() {
    return this.input.focus();
  };

  Input.prototype.onFocus = function(cb) {
    return this.input.addEventListener("focus", function() {
      return cb.apply(this);
    });
  };

  Input.prototype.onBlur = function(cb) {
    return this.input.addEventListener("blur", function() {
      return cb.apply(this);
    });
  };

  return Input;

})(Layer);


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hbWV6aXRvL2RldmVsb3BtZW50L2dpdGh1Yi9kcmFnT25DaXJjbGVGcmFtZXJKUy9rbm9iLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hbWV6aXRvL2RldmVsb3BtZW50L2dpdGh1Yi9kcmFnT25DaXJjbGVGcmFtZXJKUy9rbm9iLmZyYW1lci9tb2R1bGVzL2lucHV0LWZyYW1lci9pbnB1dC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYW1leml0by9kZXZlbG9wbWVudC9naXRodWIvZHJhZ09uQ2lyY2xlRnJhbWVySlMva25vYi5mcmFtZXIvbW9kdWxlcy9kcmFnT25DaXJjbGUuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIiwiZXhwb3J0cy5rZXlib2FyZExheWVyID0gbmV3IExheWVyXG5cdHg6MCwgeTpTY3JlZW4uaGVpZ2h0LCB3aWR0aDpTY3JlZW4ud2lkdGgsIGhlaWdodDo0MzJcblx0aHRtbDpcIjxpbWcgc3R5bGU9J3dpZHRoOiAxMDAlOycgc3JjPSdtb2R1bGVzL2tleWJvYXJkLnBuZycvPlwiXG5cbiNzY3JlZW4gd2lkdGggdnMuIHNpemUgb2YgaW1hZ2Ugd2lkdGhcbmdyb3d0aFJhdGlvID0gU2NyZWVuLndpZHRoIC8gNzMyXG5pbWFnZUhlaWdodCA9IGdyb3d0aFJhdGlvICogNDMyXG5cbiMgRXh0ZW5kcyB0aGUgTGF5ZXJTdHlsZSBjbGFzcyB3aGljaCBkb2VzIHRoZSBwaXhlbCByYXRpbyBjYWxjdWxhdGlvbnMgaW4gZnJhbWVyXG5faW5wdXRTdHlsZSA9XG5cdE9iamVjdC5hc3NpZ24oe30sIEZyYW1lci5MYXllclN0eWxlLFxuXHRcdGNhbGN1bGF0ZVBpeGVsUmF0aW8gPSAobGF5ZXIsIHZhbHVlKSAtPlxuXHRcdFx0KHZhbHVlICogbGF5ZXIuY29udGV4dC5waXhlbE11bHRpcGxpZXIpICsgXCJweFwiXG5cblx0XHRmb250U2l6ZTogKGxheWVyKSAtPlxuXHRcdFx0Y2FsY3VsYXRlUGl4ZWxSYXRpbyhsYXllciwgbGF5ZXIuX3Byb3BlcnRpZXMuZm9udFNpemUpXG5cblx0XHRsaW5lSGVpZ2h0OiAobGF5ZXIpIC0+XG5cdFx0XHQobGF5ZXIuX3Byb3BlcnRpZXMubGluZUhlaWdodCkgKyBcImVtXCJcblxuXHRcdHBhZGRpbmc6IChsYXllcikgLT5cblx0XHRcdHsgcGl4ZWxNdWx0aXBsaWVyIH0gPSBsYXllci5jb250ZXh0XG5cdFx0XHRwYWRkaW5nID0gW11cblx0XHRcdHBhZGRpbmdWYWx1ZSA9IGxheWVyLl9wcm9wZXJ0aWVzLnBhZGRpbmdcblxuXHRcdFx0IyBDaGVjayBpZiB3ZSBoYXZlIGEgc2luZ2xlIG51bWJlciBhcyBpbnRlZ2VyXG5cdFx0XHRpZiBOdW1iZXIuaXNJbnRlZ2VyKHBhZGRpbmdWYWx1ZSlcblx0XHRcdFx0cmV0dXJuIGNhbGN1bGF0ZVBpeGVsUmF0aW8obGF5ZXIsIHBhZGRpbmdWYWx1ZSlcblxuXHRcdFx0IyBJZiB3ZSBoYXZlIG11bHRpcGxlIHZhbHVlcyB0aGV5IGNvbWUgYXMgc3RyaW5nIChlLmcuIFwiMSAyIDMgNFwiKVxuXHRcdFx0cGFkZGluZ1ZhbHVlcyA9IGxheWVyLl9wcm9wZXJ0aWVzLnBhZGRpbmcuc3BsaXQoXCIgXCIpXG5cblx0XHRcdHN3aXRjaCBwYWRkaW5nVmFsdWVzLmxlbmd0aFxuXHRcdFx0XHR3aGVuIDRcblx0XHRcdFx0XHRwYWRkaW5nLnRvcCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1swXSlcblx0XHRcdFx0XHRwYWRkaW5nLnJpZ2h0ID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzFdKVxuXHRcdFx0XHRcdHBhZGRpbmcuYm90dG9tID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzJdKVxuXHRcdFx0XHRcdHBhZGRpbmcubGVmdCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1szXSlcblxuXHRcdFx0XHR3aGVuIDNcblx0XHRcdFx0XHRwYWRkaW5nLnRvcCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1swXSlcblx0XHRcdFx0XHRwYWRkaW5nLnJpZ2h0ID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzFdKVxuXHRcdFx0XHRcdHBhZGRpbmcuYm90dG9tID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzJdKVxuXHRcdFx0XHRcdHBhZGRpbmcubGVmdCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1sxXSlcblxuXHRcdFx0XHR3aGVuIDJcblx0XHRcdFx0XHRwYWRkaW5nLnRvcCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1swXSlcblx0XHRcdFx0XHRwYWRkaW5nLnJpZ2h0ID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzFdKVxuXHRcdFx0XHRcdHBhZGRpbmcuYm90dG9tID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzBdKVxuXHRcdFx0XHRcdHBhZGRpbmcubGVmdCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1sxXSlcblxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0cGFkZGluZy50b3AgPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMF0pXG5cdFx0XHRcdFx0cGFkZGluZy5yaWdodCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1swXSlcblx0XHRcdFx0XHRwYWRkaW5nLmJvdHRvbSA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1swXSlcblx0XHRcdFx0XHRwYWRkaW5nLmxlZnQgPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMF0pXG5cblx0XHRcdCMgUmV0dXJuIGFzIDQtdmFsdWUgc3RyaW5nIChlLmcgXCIxcHggMnB4IDNweCA0cHhcIilcblx0XHRcdFwiI3twYWRkaW5nLnRvcCAqIHBpeGVsTXVsdGlwbGllcn1weCAje3BhZGRpbmcucmlnaHQgKiBwaXhlbE11bHRpcGxpZXJ9cHggI3twYWRkaW5nLmJvdHRvbSAqIHBpeGVsTXVsdGlwbGllcn1weCAje3BhZGRpbmcubGVmdCAqIHBpeGVsTXVsdGlwbGllcn1weFwiXG5cdClcblxuZXhwb3J0cy5rZXlib2FyZExheWVyLnN0YXRlcyA9XG5cdHNob3duOlxuXHRcdHk6IFNjcmVlbi5oZWlnaHQgLSBpbWFnZUhlaWdodFxuXG5leHBvcnRzLmtleWJvYXJkTGF5ZXIuc3RhdGVzLmFuaW1hdGlvbk9wdGlvbnMgPVxuXHRjdXJ2ZTogXCJzcHJpbmcoNTAwLDUwLDE1KVwiXG5cbmNsYXNzIGV4cG9ydHMuSW5wdXQgZXh0ZW5kcyBMYXllclxuXHRAZGVmaW5lIFwic3R5bGVcIixcblx0XHRnZXQ6IC0+IEBpbnB1dC5zdHlsZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0Xy5leHRlbmQgQGlucHV0LnN0eWxlLCB2YWx1ZVxuXG5cdEBkZWZpbmUgXCJ2YWx1ZVwiLFxuXHRcdGdldDogLT4gQGlucHV0LnZhbHVlXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAaW5wdXQudmFsdWUgPSB2YWx1ZVxuXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdG9wdGlvbnMuc2V0dXAgPz0gZmFsc2Vcblx0XHRvcHRpb25zLndpZHRoID89IFNjcmVlbi53aWR0aFxuXHRcdG9wdGlvbnMuY2xpcCA/PSBmYWxzZVxuXHRcdG9wdGlvbnMuaGVpZ2h0ID89IDYwXG5cdFx0b3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPz0gaWYgb3B0aW9ucy5zZXR1cCB0aGVuIFwicmdiYSgyNTUsIDYwLCA0NywgLjUpXCIgZWxzZSBcInRyYW5zcGFyZW50XCJcblx0XHRvcHRpb25zLmZvbnRTaXplID89IDMwXG5cdFx0b3B0aW9ucy5saW5lSGVpZ2h0ID89IDFcblx0XHRvcHRpb25zLnBhZGRpbmcgPz0gMTBcblx0XHRvcHRpb25zLnRleHQgPz0gXCJcIlxuXHRcdG9wdGlvbnMucGxhY2Vob2xkZXIgPz0gXCJcIlxuXHRcdG9wdGlvbnMudmlydHVhbEtleWJvYXJkID89IGlmIFV0aWxzLmlzTW9iaWxlKCkgdGhlbiBmYWxzZSBlbHNlIHRydWVcblx0XHRvcHRpb25zLnR5cGUgPz0gXCJ0ZXh0XCJcblx0XHRvcHRpb25zLmdvQnV0dG9uID89IGZhbHNlXG5cdFx0b3B0aW9ucy5hdXRvQ29ycmVjdCA/PSBcIm9uXCJcblx0XHRvcHRpb25zLmF1dG9Db21wbGV0ZSA/PSBcIm9uXCJcblx0XHRvcHRpb25zLmF1dG9DYXBpdGFsaXplID89IFwib25cIlxuXHRcdG9wdGlvbnMuc3BlbGxDaGVjayA/PSBcIm9uXCJcblx0XHRvcHRpb25zLmF1dG9mb2N1cyA/PSBmYWxzZVxuXHRcdG9wdGlvbnMudGV4dENvbG9yID89IFwiIzAwMFwiXG5cdFx0b3B0aW9ucy5mb250RmFtaWx5ID89IFwiLWFwcGxlLXN5c3RlbVwiXG5cdFx0b3B0aW9ucy5mb250V2VpZ2h0ID89IFwiNTAwXCJcblx0XHRvcHRpb25zLnN1Ym1pdCA/PSBmYWxzZVxuXHRcdG9wdGlvbnMudGFiSW5kZXggPz0gMFxuXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cdFx0IyBBZGQgYWRkaXRpb25hbCBwcm9wZXJ0aWVzXG5cdFx0QF9wcm9wZXJ0aWVzLmZvbnRTaXplID0gb3B0aW9ucy5mb250U2l6ZVxuXHRcdEBfcHJvcGVydGllcy5saW5lSGVpZ2h0ID0gb3B0aW9ucy5saW5lSGVpZ2h0XG5cdFx0QF9wcm9wZXJ0aWVzLnBhZGRpbmcgPSBvcHRpb25zLnBhZGRpbmdcblxuXHRcdEBwbGFjZWhvbGRlckNvbG9yID0gb3B0aW9ucy5wbGFjZWhvbGRlckNvbG9yIGlmIG9wdGlvbnMucGxhY2Vob2xkZXJDb2xvcj9cblx0XHRAaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiaW5wdXRcIlxuXHRcdEBpbnB1dC5pZCA9IFwiaW5wdXQtI3tfLm5vdygpfVwiXG5cblx0XHQjIEFkZCBzdHlsaW5nIHRvIHRoZSBpbnB1dCBlbGVtZW50XG5cdFx0QGlucHV0LnN0eWxlLndpZHRoID0gX2lucHV0U3R5bGVbXCJ3aWR0aFwiXShAKVxuXHRcdEBpbnB1dC5zdHlsZS5oZWlnaHQgPSBfaW5wdXRTdHlsZVtcImhlaWdodFwiXShAKVxuXHRcdEBpbnB1dC5zdHlsZS5mb250U2l6ZSA9IF9pbnB1dFN0eWxlW1wiZm9udFNpemVcIl0oQClcblx0XHRAaW5wdXQuc3R5bGUubGluZUhlaWdodCA9IF9pbnB1dFN0eWxlW1wibGluZUhlaWdodFwiXShAKVxuXHRcdEBpbnB1dC5zdHlsZS5vdXRsaW5lID0gXCJub25lXCJcblx0XHRAaW5wdXQuc3R5bGUuYm9yZGVyID0gXCJub25lXCJcblx0XHRAaW5wdXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRAaW5wdXQuc3R5bGUucGFkZGluZyA9IF9pbnB1dFN0eWxlW1wicGFkZGluZ1wiXShAKVxuXHRcdEBpbnB1dC5zdHlsZS5mb250RmFtaWx5ID0gb3B0aW9ucy5mb250RmFtaWx5XG5cdFx0QGlucHV0LnN0eWxlLmNvbG9yID0gb3B0aW9ucy50ZXh0Q29sb3Jcblx0XHRAaW5wdXQuc3R5bGUuZm9udFdlaWdodCA9IG9wdGlvbnMuZm9udFdlaWdodFxuXG5cdFx0QGlucHV0LnZhbHVlID0gb3B0aW9ucy50ZXh0XG5cdFx0QGlucHV0LnR5cGUgPSBvcHRpb25zLnR5cGVcblx0XHRAaW5wdXQucGxhY2Vob2xkZXIgPSBvcHRpb25zLnBsYWNlaG9sZGVyXG5cdFx0QGlucHV0LnNldEF0dHJpYnV0ZSBcInRhYmluZGV4XCIsIG9wdGlvbnMudGFiaW5kZXhcblx0XHRAaW5wdXQuc2V0QXR0cmlidXRlIFwiYXV0b2NvcnJlY3RcIiwgb3B0aW9ucy5hdXRvQ29ycmVjdFxuXHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJhdXRvY29tcGxldGVcIiwgb3B0aW9ucy5hdXRvQ29tcGxldGVcblx0XHRAaW5wdXQuc2V0QXR0cmlidXRlIFwiYXV0b2NhcGl0YWxpemVcIiwgb3B0aW9ucy5hdXRvQ2FwaXRhbGl6ZVxuXHRcdGlmIG9wdGlvbnMuYXV0b2ZvY3VzID09IHRydWVcblx0XHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJhdXRvZm9jdXNcIiwgdHJ1ZVxuXHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJzcGVsbGNoZWNrXCIsIG9wdGlvbnMuc3BlbGxDaGVja1xuXHRcdEBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImZvcm1cIlxuXG5cdFx0aWYgKG9wdGlvbnMuZ29CdXR0b24gJiYgIW9wdGlvbnMuc3VibWl0KSB8fCAhb3B0aW9ucy5zdWJtaXRcblx0XHRcdEBmb3JtLmFjdGlvbiA9IFwiI1wiXG5cdFx0XHRAZm9ybS5hZGRFdmVudExpc3RlbmVyIFwic3VibWl0XCIsIChldmVudCkgLT5cblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG5cdFx0QGZvcm0uYXBwZW5kQ2hpbGQgQGlucHV0XG5cdFx0QF9lbGVtZW50LmFwcGVuZENoaWxkIEBmb3JtXG5cblx0XHRAYmFja2dyb3VuZENvbG9yID0gXCJ0cmFuc3BhcmVudFwiXG5cdFx0QHVwZGF0ZVBsYWNlaG9sZGVyQ29sb3Igb3B0aW9ucy5wbGFjZWhvbGRlckNvbG9yIGlmIEBwbGFjZWhvbGRlckNvbG9yXG5cblx0XHQjb25seSBzaG93IGhvbm9yIHZpcnR1YWwga2V5Ym9hcmQgb3B0aW9uIHdoZW4gbm90IG9uIG1vYmlsZSxcblx0XHQjb3RoZXJ3aXNlIGlnbm9yZVxuXHRcdGlmICFVdGlscy5pc01vYmlsZSgpICYmIG9wdGlvbnMudmlydHVhbEtleWJvYXJkIGlzIHRydWVcblx0XHRcdEBpbnB1dC5hZGRFdmVudExpc3RlbmVyIFwiZm9jdXNcIiwgLT5cblx0XHRcdFx0ZXhwb3J0cy5rZXlib2FyZExheWVyLmJyaW5nVG9Gcm9udCgpXG5cdFx0XHRcdGV4cG9ydHMua2V5Ym9hcmRMYXllci5zdGF0ZUN5Y2xlKClcblx0XHRcdEBpbnB1dC5hZGRFdmVudExpc3RlbmVyIFwiYmx1clwiLCAtPlxuXHRcdFx0XHRleHBvcnRzLmtleWJvYXJkTGF5ZXIuYW5pbWF0ZShcImRlZmF1bHRcIilcblxuXHR1cGRhdGVQbGFjZWhvbGRlckNvbG9yOiAoY29sb3IpIC0+XG5cdFx0QHBsYWNlaG9sZGVyQ29sb3IgPSBjb2xvclxuXHRcdGlmIEBwYWdlU3R5bGU/XG5cdFx0XHRkb2N1bWVudC5oZWFkLnJlbW92ZUNoaWxkIEBwYWdlU3R5bGVcblx0XHRAcGFnZVN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcInN0eWxlXCJcblx0XHRAcGFnZVN0eWxlLnR5cGUgPSBcInRleHQvY3NzXCJcblx0XHRjc3MgPSBcIiMje0BpbnB1dC5pZH06Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIgeyBjb2xvcjogI3tAcGxhY2Vob2xkZXJDb2xvcn07IH1cIlxuXHRcdEBwYWdlU3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUgY3NzKVxuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQgQHBhZ2VTdHlsZVxuXG5cdGZvY3VzOiAoKSAtPlxuXHRcdEBpbnB1dC5mb2N1cygpXG5cblx0b25Gb2N1czogKGNiKSAtPlxuXHRcdEBpbnB1dC5hZGRFdmVudExpc3RlbmVyIFwiZm9jdXNcIiwgLT5cblx0XHRcdGNiLmFwcGx5KEApXG5cblx0b25CbHVyOiAoY2IpIC0+XG5cdFx0QGlucHV0LmFkZEV2ZW50TGlzdGVuZXIgXCJibHVyXCIsIC0+XG5cdFx0XHRjYi5hcHBseShAKVxuIiwiI2F1dGhvciBTZXJnaXkgVm9yb25vdiB0d2l0dGVyLmNvbS9tYW1leml0byBkcmliYmJsZS5jb20vbWFtZXppdG9cbiNkb25lIGZvciBGcmFtZXIgTG9uZG9uIGZyYW1lcmxvbmRvbi5jb21cblxuXG5leHBvcnRzLmNpcmNsZURyYWc9KG9iamVjdExheWVyLCByYWRpdXMpLT5cblx0YW5nbGU9MFxuXHRjZW50ZXJYPW9iamVjdExheWVyLm1pZFhcblx0Y2VudGVyWT1vYmplY3RMYXllci5taWRZK3JhZGl1c1xuXHRwcm94eT1vYmplY3RMYXllci5jb3B5KClcblx0cHJveHkubmFtZT1cInByb3h5XCJcblx0cHJveHkub3BhY2l0eT0wXG5cdHByb3h5LmRyYWdnYWJsZT10cnVlXG5cdHByb3h5LmRyYWdnYWJsZS5vdmVyZHJhZz1mYWxzZVxuXHRwcm94eS5kcmFnZ2FibGUubW9tZW50dW09ZmFsc2VcblxuXHRwcm94eS5kcmFnZ2FibGUuY29uc3RyYWludHM9XG5cdFx0eDpwcm94eS5taWRYLXJhZGl1cy1wcm94eS53aWR0aC8yXG5cdFx0eTpwcm94eS55XG5cdFx0d2lkdGg6cmFkaXVzKjIrcHJveHkud2lkdGhcblx0XHRoZWlnaHQ6cmFkaXVzKjIrcHJveHkud2lkdGhcblx0cHJveHkub25EcmFnIChldmVudCwgbGF5ZXIpIC0+XG5cdFx0cmFkWD10aGlzLngtY2VudGVyWFxuXHRcdHJhZFk9dGhpcy55LWNlbnRlcllcblx0XHRhbmdsZT1NYXRoLmF0YW4yKHJhZFgscmFkWSkqKDE4MC9NYXRoLlBJKVxuXHRcdGV4cG9ydHMuZHJhZ0FuZ2xlPTE4MC1hbmdsZVxuXHRcdHBsYWNlT25FbGlwc2Ugb2JqZWN0TGF5ZXIsIGNlbnRlclgsIGNlbnRlclksIGFuZ2xlLCByYWRpdXMsIHJhZGl1c1xuXHRwcm94eS5vbkRyYWdFbmQgLT5cblx0XHRwcm94eS54PW9iamVjdExheWVyLnhcblx0XHRwcm94eS55PW9iamVjdExheWVyLnlcblxuXG5cblxuXG5wbGFjZU9uRWxpcHNlPShuZXdMYXllciwgY2VudGVyWCwgY2VudGVyWSwgYW5nbGUsIHJhZGl1c1gsIHJhZGl1c1kpLT5cblx0bmV3TGF5ZXIubWlkWD1jZW50ZXJYLU1hdGguc2luKChhbmdsZSsxODApICAqIE1hdGguUEkgLyAxODApKnJhZGl1c1hcblx0bmV3TGF5ZXIubWlkWT1jZW50ZXJZLU1hdGguY29zKChhbmdsZSsxODApICAqIE1hdGguUEkgLyAxODApKnJhZGl1c1lcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBR0FBO0FESUEsSUFBQTs7QUFBQSxPQUFPLENBQUMsVUFBUixHQUFtQixTQUFDLFdBQUQsRUFBYyxNQUFkO0FBQ2xCLE1BQUE7RUFBQSxLQUFBLEdBQU07RUFDTixPQUFBLEdBQVEsV0FBVyxDQUFDO0VBQ3BCLE9BQUEsR0FBUSxXQUFXLENBQUMsSUFBWixHQUFpQjtFQUN6QixLQUFBLEdBQU0sV0FBVyxDQUFDLElBQVosQ0FBQTtFQUNOLEtBQUssQ0FBQyxJQUFOLEdB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
