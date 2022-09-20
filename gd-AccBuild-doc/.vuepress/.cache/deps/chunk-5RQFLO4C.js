import {
  require_codemirror
} from "./chunk-DRZJ75CH.js";
import {
  __commonJS
} from "./chunk-BQOD6VY2.js";

// node_modules/.pnpm/codemirror@5.65.8/node_modules/codemirror/addon/fold/foldcode.js
var require_foldcode = __commonJS({
  "node_modules/.pnpm/codemirror@5.65.8/node_modules/codemirror/addon/fold/foldcode.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror2) {
      "use strict";
      function doFold(cm, pos, options, force) {
        if (options && options.call) {
          var finder = options;
          options = null;
        } else {
          var finder = getOption(cm, options, "rangeFinder");
        }
        if (typeof pos == "number")
          pos = CodeMirror2.Pos(pos, 0);
        var minSize = getOption(cm, options, "minFoldSize");
        function getRange(allowFolded) {
          var range2 = finder(cm, pos);
          if (!range2 || range2.to.line - range2.from.line < minSize)
            return null;
          if (force === "fold")
            return range2;
          var marks = cm.findMarksAt(range2.from);
          for (var i = 0; i < marks.length; ++i) {
            if (marks[i].__isFold) {
              if (!allowFolded)
                return null;
              range2.cleared = true;
              marks[i].clear();
            }
          }
          return range2;
        }
        var range = getRange(true);
        if (getOption(cm, options, "scanUp"))
          while (!range && pos.line > cm.firstLine()) {
            pos = CodeMirror2.Pos(pos.line - 1, 0);
            range = getRange(false);
          }
        if (!range || range.cleared || force === "unfold")
          return;
        var myWidget = makeWidget(cm, options, range);
        CodeMirror2.on(myWidget, "mousedown", function(e) {
          myRange.clear();
          CodeMirror2.e_preventDefault(e);
        });
        var myRange = cm.markText(range.from, range.to, {
          replacedWith: myWidget,
          clearOnEnter: getOption(cm, options, "clearOnEnter"),
          __isFold: true
        });
        myRange.on("clear", function(from, to) {
          CodeMirror2.signal(cm, "unfold", cm, from, to);
        });
        CodeMirror2.signal(cm, "fold", cm, range.from, range.to);
      }
      function makeWidget(cm, options, range) {
        var widget = getOption(cm, options, "widget");
        if (typeof widget == "function") {
          widget = widget(range.from, range.to);
        }
        if (typeof widget == "string") {
          var text = document.createTextNode(widget);
          widget = document.createElement("span");
          widget.appendChild(text);
          widget.className = "CodeMirror-foldmarker";
        } else if (widget) {
          widget = widget.cloneNode(true);
        }
        return widget;
      }
      CodeMirror2.newFoldFunction = function(rangeFinder, widget) {
        return function(cm, pos) {
          doFold(cm, pos, { rangeFinder, widget });
        };
      };
      CodeMirror2.defineExtension("foldCode", function(pos, options, force) {
        doFold(this, pos, options, force);
      });
      CodeMirror2.defineExtension("isFolded", function(pos) {
        var marks = this.findMarksAt(pos);
        for (var i = 0; i < marks.length; ++i)
          if (marks[i].__isFold)
            return true;
      });
      CodeMirror2.commands.toggleFold = function(cm) {
        cm.foldCode(cm.getCursor());
      };
      CodeMirror2.commands.fold = function(cm) {
        cm.foldCode(cm.getCursor(), null, "fold");
      };
      CodeMirror2.commands.unfold = function(cm) {
        cm.foldCode(cm.getCursor(), { scanUp: false }, "unfold");
      };
      CodeMirror2.commands.foldAll = function(cm) {
        cm.operation(function() {
          for (var i = cm.firstLine(), e = cm.lastLine(); i <= e; i++)
            cm.foldCode(CodeMirror2.Pos(i, 0), { scanUp: false }, "fold");
        });
      };
      CodeMirror2.commands.unfoldAll = function(cm) {
        cm.operation(function() {
          for (var i = cm.firstLine(), e = cm.lastLine(); i <= e; i++)
            cm.foldCode(CodeMirror2.Pos(i, 0), { scanUp: false }, "unfold");
        });
      };
      CodeMirror2.registerHelper("fold", "combine", function() {
        var funcs = Array.prototype.slice.call(arguments, 0);
        return function(cm, start) {
          for (var i = 0; i < funcs.length; ++i) {
            var found = funcs[i](cm, start);
            if (found)
              return found;
          }
        };
      });
      CodeMirror2.registerHelper("fold", "auto", function(cm, start) {
        var helpers = cm.getHelpers(start, "fold");
        for (var i = 0; i < helpers.length; i++) {
          var cur = helpers[i](cm, start);
          if (cur)
            return cur;
        }
      });
      var defaultOptions = {
        rangeFinder: CodeMirror2.fold.auto,
        widget: "\u2194",
        minFoldSize: 0,
        scanUp: false,
        clearOnEnter: true
      };
      CodeMirror2.defineOption("foldOptions", null);
      function getOption(cm, options, name) {
        if (options && options[name] !== void 0)
          return options[name];
        var editorOptions = cm.options.foldOptions;
        if (editorOptions && editorOptions[name] !== void 0)
          return editorOptions[name];
        return defaultOptions[name];
      }
      CodeMirror2.defineExtension("foldOption", function(options, name) {
        return getOption(this, options, name);
      });
    });
  }
});

export {
  require_foldcode
};
//# sourceMappingURL=chunk-5RQFLO4C.js.map
