import {
  require_simple
} from "./chunk-PID7YAJR.js";
import {
  require_codemirror
} from "./chunk-DRZJ75CH.js";
import {
  computed,
  createBlock,
  createElementBlock,
  defineComponent,
  getCurrentInstance,
  markRaw,
  mergeProps,
  nextTick,
  normalizeClass,
  normalizeStyle,
  onBeforeUnmount,
  onMounted,
  openBlock,
  ref,
  resolveDynamicComponent,
  shallowRef,
  unref,
  watch
} from "./chunk-WLOKLJVF.js";
import {
  __commonJS,
  __toESM
} from "./chunk-BQOD6VY2.js";

// node_modules/.pnpm/codemirror@5.65.8/node_modules/codemirror/addon/merge/merge.js
var require_merge = __commonJS({
  "node_modules/.pnpm/codemirror@5.65.8/node_modules/codemirror/addon/merge/merge.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror", "diff_match_patch"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      var Pos = CodeMirror3.Pos;
      var svgNS = "http://www.w3.org/2000/svg";
      function DiffView(mv, type) {
        this.mv = mv;
        this.type = type;
        this.classes = type == "left" ? {
          chunk: "CodeMirror-merge-l-chunk",
          start: "CodeMirror-merge-l-chunk-start",
          end: "CodeMirror-merge-l-chunk-end",
          insert: "CodeMirror-merge-l-inserted",
          del: "CodeMirror-merge-l-deleted",
          connect: "CodeMirror-merge-l-connect"
        } : {
          chunk: "CodeMirror-merge-r-chunk",
          start: "CodeMirror-merge-r-chunk-start",
          end: "CodeMirror-merge-r-chunk-end",
          insert: "CodeMirror-merge-r-inserted",
          del: "CodeMirror-merge-r-deleted",
          connect: "CodeMirror-merge-r-connect"
        };
      }
      DiffView.prototype = {
        constructor: DiffView,
        init: function(pane, orig, options) {
          this.edit = this.mv.edit;
          ;
          (this.edit.state.diffViews || (this.edit.state.diffViews = [])).push(this);
          this.orig = CodeMirror3(pane, copyObj({ value: orig, readOnly: !this.mv.options.allowEditingOriginals }, copyObj(options)));
          if (this.mv.options.connect == "align") {
            if (!this.edit.state.trackAlignable)
              this.edit.state.trackAlignable = new TrackAlignable(this.edit);
            this.orig.state.trackAlignable = new TrackAlignable(this.orig);
          }
          this.lockButton.title = this.edit.phrase("Toggle locked scrolling");
          this.lockButton.setAttribute("aria-label", this.lockButton.title);
          this.orig.state.diffViews = [this];
          var classLocation = options.chunkClassLocation || "background";
          if (Object.prototype.toString.call(classLocation) != "[object Array]")
            classLocation = [classLocation];
          this.classes.classLocation = classLocation;
          this.diff = getDiff(asString(orig), asString(options.value), this.mv.options.ignoreWhitespace);
          this.chunks = getChunks(this.diff);
          this.diffOutOfDate = this.dealigned = false;
          this.needsScrollSync = null;
          this.showDifferences = options.showDifferences !== false;
        },
        registerEvents: function(otherDv) {
          this.forceUpdate = registerUpdate(this);
          setScrollLock(this, true, false);
          registerScroll(this, otherDv);
        },
        setShowDifferences: function(val) {
          val = val !== false;
          if (val != this.showDifferences) {
            this.showDifferences = val;
            this.forceUpdate("full");
          }
        }
      };
      function ensureDiff(dv) {
        if (dv.diffOutOfDate) {
          dv.diff = getDiff(dv.orig.getValue(), dv.edit.getValue(), dv.mv.options.ignoreWhitespace);
          dv.chunks = getChunks(dv.diff);
          dv.diffOutOfDate = false;
          CodeMirror3.signal(dv.edit, "updateDiff", dv.diff);
        }
      }
      var updating = false;
      function registerUpdate(dv) {
        var edit = { from: 0, to: 0, marked: [] };
        var orig = { from: 0, to: 0, marked: [] };
        var debounceChange, updatingFast = false;
        function update(mode) {
          updating = true;
          updatingFast = false;
          if (mode == "full") {
            if (dv.svg)
              clear(dv.svg);
            if (dv.copyButtons)
              clear(dv.copyButtons);
            clearMarks(dv.edit, edit.marked, dv.classes);
            clearMarks(dv.orig, orig.marked, dv.classes);
            edit.from = edit.to = orig.from = orig.to = 0;
          }
          ensureDiff(dv);
          if (dv.showDifferences) {
            updateMarks(dv.edit, dv.diff, edit, DIFF_INSERT, dv.classes);
            updateMarks(dv.orig, dv.diff, orig, DIFF_DELETE, dv.classes);
          }
          if (dv.mv.options.connect == "align")
            alignChunks(dv);
          makeConnections(dv);
          if (dv.needsScrollSync != null)
            syncScroll(dv, dv.needsScrollSync);
          updating = false;
        }
        function setDealign(fast) {
          if (updating)
            return;
          dv.dealigned = true;
          set(fast);
        }
        function set(fast) {
          if (updating || updatingFast)
            return;
          clearTimeout(debounceChange);
          if (fast === true)
            updatingFast = true;
          debounceChange = setTimeout(update, fast === true ? 20 : 250);
        }
        function change(_cm, change2) {
          if (!dv.diffOutOfDate) {
            dv.diffOutOfDate = true;
            edit.from = edit.to = orig.from = orig.to = 0;
          }
          setDealign(change2.text.length - 1 != change2.to.line - change2.from.line);
        }
        function swapDoc() {
          dv.diffOutOfDate = true;
          dv.dealigned = true;
          update("full");
        }
        dv.edit.on("change", change);
        dv.orig.on("change", change);
        dv.edit.on("swapDoc", swapDoc);
        dv.orig.on("swapDoc", swapDoc);
        if (dv.mv.options.connect == "align") {
          CodeMirror3.on(dv.edit.state.trackAlignable, "realign", setDealign);
          CodeMirror3.on(dv.orig.state.trackAlignable, "realign", setDealign);
        }
        dv.edit.on("viewportChange", function() {
          set(false);
        });
        dv.orig.on("viewportChange", function() {
          set(false);
        });
        update();
        return update;
      }
      function registerScroll(dv, otherDv) {
        dv.edit.on("scroll", function() {
          syncScroll(dv, true) && makeConnections(dv);
        });
        dv.orig.on("scroll", function() {
          syncScroll(dv, false) && makeConnections(dv);
          if (otherDv)
            syncScroll(otherDv, true) && makeConnections(otherDv);
        });
      }
      function syncScroll(dv, toOrig) {
        if (dv.diffOutOfDate) {
          if (dv.lockScroll && dv.needsScrollSync == null)
            dv.needsScrollSync = toOrig;
          return false;
        }
        dv.needsScrollSync = null;
        if (!dv.lockScroll)
          return true;
        var editor, other, now = +new Date();
        if (toOrig) {
          editor = dv.edit;
          other = dv.orig;
        } else {
          editor = dv.orig;
          other = dv.edit;
        }
        if (editor.state.scrollSetBy == dv && (editor.state.scrollSetAt || 0) + 250 > now)
          return false;
        var sInfo = editor.getScrollInfo();
        if (dv.mv.options.connect == "align") {
          targetPos = sInfo.top;
        } else {
          var halfScreen = 0.5 * sInfo.clientHeight, midY = sInfo.top + halfScreen;
          var mid = editor.lineAtHeight(midY, "local");
          var around = chunkBoundariesAround(dv.chunks, mid, toOrig);
          var off = getOffsets(editor, toOrig ? around.edit : around.orig);
          var offOther = getOffsets(other, toOrig ? around.orig : around.edit);
          var ratio = (midY - off.top) / (off.bot - off.top);
          var targetPos = offOther.top - halfScreen + ratio * (offOther.bot - offOther.top);
          var botDist, mix;
          if (targetPos > sInfo.top && (mix = sInfo.top / halfScreen) < 1) {
            targetPos = targetPos * mix + sInfo.top * (1 - mix);
          } else if ((botDist = sInfo.height - sInfo.clientHeight - sInfo.top) < halfScreen) {
            var otherInfo = other.getScrollInfo();
            var botDistOther = otherInfo.height - otherInfo.clientHeight - targetPos;
            if (botDistOther > botDist && (mix = botDist / halfScreen) < 1)
              targetPos = targetPos * mix + (otherInfo.height - otherInfo.clientHeight - botDist) * (1 - mix);
          }
        }
        other.scrollTo(sInfo.left, targetPos);
        other.state.scrollSetAt = now;
        other.state.scrollSetBy = dv;
        return true;
      }
      function getOffsets(editor, around) {
        var bot = around.after;
        if (bot == null)
          bot = editor.lastLine() + 1;
        return {
          top: editor.heightAtLine(around.before || 0, "local"),
          bot: editor.heightAtLine(bot, "local")
        };
      }
      function setScrollLock(dv, val, action) {
        dv.lockScroll = val;
        if (val && action != false)
          syncScroll(dv, DIFF_INSERT) && makeConnections(dv);
        (val ? CodeMirror3.addClass : CodeMirror3.rmClass)(dv.lockButton, "CodeMirror-merge-scrolllock-enabled");
      }
      function removeClass(editor, line, classes) {
        var locs = classes.classLocation;
        for (var i = 0; i < locs.length; i++) {
          editor.removeLineClass(line, locs[i], classes.chunk);
          editor.removeLineClass(line, locs[i], classes.start);
          editor.removeLineClass(line, locs[i], classes.end);
        }
      }
      function clearMarks(editor, arr, classes) {
        for (var i = 0; i < arr.length; ++i) {
          var mark = arr[i];
          if (mark instanceof CodeMirror3.TextMarker)
            mark.clear();
          else if (mark.parent)
            removeClass(editor, mark, classes);
        }
        arr.length = 0;
      }
      function updateMarks(editor, diff, state, type, classes) {
        var vp = editor.getViewport();
        editor.operation(function() {
          if (state.from == state.to || vp.from - state.to > 20 || state.from - vp.to > 20) {
            clearMarks(editor, state.marked, classes);
            markChanges(editor, diff, type, state.marked, vp.from, vp.to, classes);
            state.from = vp.from;
            state.to = vp.to;
          } else {
            if (vp.from < state.from) {
              markChanges(editor, diff, type, state.marked, vp.from, state.from, classes);
              state.from = vp.from;
            }
            if (vp.to > state.to) {
              markChanges(editor, diff, type, state.marked, state.to, vp.to, classes);
              state.to = vp.to;
            }
          }
        });
      }
      function addClass(editor, lineNr, classes, main, start, end) {
        var locs = classes.classLocation, line = editor.getLineHandle(lineNr);
        for (var i = 0; i < locs.length; i++) {
          if (main)
            editor.addLineClass(line, locs[i], classes.chunk);
          if (start)
            editor.addLineClass(line, locs[i], classes.start);
          if (end)
            editor.addLineClass(line, locs[i], classes.end);
        }
        return line;
      }
      function markChanges(editor, diff, type, marks, from, to, classes) {
        var pos = Pos(0, 0);
        var top = Pos(from, 0), bot = editor.clipPos(Pos(to - 1));
        var cls = type == DIFF_DELETE ? classes.del : classes.insert;
        function markChunk(start, end2) {
          var bfrom = Math.max(from, start), bto = Math.min(to, end2);
          for (var i2 = bfrom; i2 < bto; ++i2)
            marks.push(addClass(editor, i2, classes, true, i2 == start, i2 == end2 - 1));
          if (start == end2 && bfrom == end2 && bto == end2) {
            if (bfrom)
              marks.push(addClass(editor, bfrom - 1, classes, false, false, true));
            else
              marks.push(addClass(editor, bfrom, classes, false, true, false));
          }
        }
        var chunkStart = 0, pending = false;
        for (var i = 0; i < diff.length; ++i) {
          var part = diff[i], tp = part[0], str = part[1];
          if (tp == DIFF_EQUAL) {
            var cleanFrom = pos.line + (startOfLineClean(diff, i) ? 0 : 1);
            moveOver(pos, str);
            var cleanTo = pos.line + (endOfLineClean(diff, i) ? 1 : 0);
            if (cleanTo > cleanFrom) {
              if (pending) {
                markChunk(chunkStart, cleanFrom);
                pending = false;
              }
              chunkStart = cleanTo;
            }
          } else {
            pending = true;
            if (tp == type) {
              var end = moveOver(pos, str, true);
              var a = posMax(top, pos), b = posMin(bot, end);
              if (!posEq(a, b))
                marks.push(editor.markText(a, b, { className: cls }));
              pos = end;
            }
          }
        }
        if (pending)
          markChunk(chunkStart, pos.line + 1);
      }
      function makeConnections(dv) {
        if (!dv.showDifferences)
          return;
        if (dv.svg) {
          clear(dv.svg);
          var w = dv.gap.offsetWidth;
          attrs(dv.svg, "width", w, "height", dv.gap.offsetHeight);
        }
        if (dv.copyButtons)
          clear(dv.copyButtons);
        var vpEdit = dv.edit.getViewport(), vpOrig = dv.orig.getViewport();
        var outerTop = dv.mv.wrap.getBoundingClientRect().top;
        var sTopEdit = outerTop - dv.edit.getScrollerElement().getBoundingClientRect().top + dv.edit.getScrollInfo().top;
        var sTopOrig = outerTop - dv.orig.getScrollerElement().getBoundingClientRect().top + dv.orig.getScrollInfo().top;
        for (var i = 0; i < dv.chunks.length; i++) {
          var ch = dv.chunks[i];
          if (ch.editFrom <= vpEdit.to && ch.editTo >= vpEdit.from && ch.origFrom <= vpOrig.to && ch.origTo >= vpOrig.from)
            drawConnectorsForChunk(dv, ch, sTopOrig, sTopEdit, w);
        }
      }
      function getMatchingOrigLine(editLine, chunks) {
        var editStart = 0, origStart = 0;
        for (var i = 0; i < chunks.length; i++) {
          var chunk = chunks[i];
          if (chunk.editTo > editLine && chunk.editFrom <= editLine)
            return null;
          if (chunk.editFrom > editLine)
            break;
          editStart = chunk.editTo;
          origStart = chunk.origTo;
        }
        return origStart + (editLine - editStart);
      }
      function alignableFor(cm, chunks, isOrig) {
        var tracker = cm.state.trackAlignable;
        var start = cm.firstLine(), trackI = 0;
        var result = [];
        for (var i = 0; ; i++) {
          var chunk = chunks[i];
          var chunkStart = !chunk ? 1e9 : isOrig ? chunk.origFrom : chunk.editFrom;
          for (; trackI < tracker.alignable.length; trackI += 2) {
            var n = tracker.alignable[trackI] + 1;
            if (n <= start)
              continue;
            if (n <= chunkStart)
              result.push(n);
            else
              break;
          }
          if (!chunk)
            break;
          result.push(start = isOrig ? chunk.origTo : chunk.editTo);
        }
        return result;
      }
      function mergeAlignable(result, origAlignable, chunks, setIndex) {
        var rI = 0, origI = 0, chunkI = 0, diff = 0;
        outer:
          for (; ; rI++) {
            var nextR = result[rI], nextO = origAlignable[origI];
            if (!nextR && nextO == null)
              break;
            var rLine = nextR ? nextR[0] : 1e9, oLine = nextO == null ? 1e9 : nextO;
            while (chunkI < chunks.length) {
              var chunk = chunks[chunkI];
              if (chunk.origFrom <= oLine && chunk.origTo > oLine) {
                origI++;
                rI--;
                continue outer;
              }
              if (chunk.editTo > rLine) {
                if (chunk.editFrom <= rLine)
                  continue outer;
                break;
              }
              diff += chunk.origTo - chunk.origFrom - (chunk.editTo - chunk.editFrom);
              chunkI++;
            }
            if (rLine == oLine - diff) {
              nextR[setIndex] = oLine;
              origI++;
            } else if (rLine < oLine - diff) {
              nextR[setIndex] = rLine + diff;
            } else {
              var record = [oLine - diff, null, null];
              record[setIndex] = oLine;
              result.splice(rI, 0, record);
              origI++;
            }
          }
      }
      function findAlignedLines(dv, other) {
        var alignable = alignableFor(dv.edit, dv.chunks, false), result = [];
        if (other)
          for (var i = 0, j = 0; i < other.chunks.length; i++) {
            var n = other.chunks[i].editTo;
            while (j < alignable.length && alignable[j] < n)
              j++;
            if (j == alignable.length || alignable[j] != n)
              alignable.splice(j++, 0, n);
          }
        for (var i = 0; i < alignable.length; i++)
          result.push([alignable[i], null, null]);
        mergeAlignable(result, alignableFor(dv.orig, dv.chunks, true), dv.chunks, 1);
        if (other)
          mergeAlignable(result, alignableFor(other.orig, other.chunks, true), other.chunks, 2);
        return result;
      }
      function alignChunks(dv, force) {
        if (!dv.dealigned && !force)
          return;
        if (!dv.orig.curOp)
          return dv.orig.operation(function() {
            alignChunks(dv, force);
          });
        dv.dealigned = false;
        var other = dv.mv.left == dv ? dv.mv.right : dv.mv.left;
        if (other) {
          ensureDiff(other);
          other.dealigned = false;
        }
        var linesToAlign = findAlignedLines(dv, other);
        var aligners = dv.mv.aligners;
        for (var i = 0; i < aligners.length; i++)
          aligners[i].clear();
        aligners.length = 0;
        var cm = [dv.edit, dv.orig], scroll = [], offset = [];
        if (other)
          cm.push(other.orig);
        for (var i = 0; i < cm.length; i++) {
          scroll.push(cm[i].getScrollInfo().top);
          offset.push(-cm[i].getScrollerElement().getBoundingClientRect().top);
        }
        if (offset[0] != offset[1] || cm.length == 3 && offset[1] != offset[2])
          alignLines(cm, offset, [0, 0, 0], aligners);
        for (var ln = 0; ln < linesToAlign.length; ln++)
          alignLines(cm, offset, linesToAlign[ln], aligners);
        for (var i = 0; i < cm.length; i++)
          cm[i].scrollTo(null, scroll[i]);
      }
      function alignLines(cm, cmOffset, lines, aligners) {
        var maxOffset = -1e8, offset = [];
        for (var i = 0; i < cm.length; i++)
          if (lines[i] != null) {
            var off = cm[i].heightAtLine(lines[i], "local") - cmOffset[i];
            offset[i] = off;
            maxOffset = Math.max(maxOffset, off);
          }
        for (var i = 0; i < cm.length; i++)
          if (lines[i] != null) {
            var diff = maxOffset - offset[i];
            if (diff > 1)
              aligners.push(padAbove(cm[i], lines[i], diff));
          }
      }
      function padAbove(cm, line, size) {
        var above = true;
        if (line > cm.lastLine()) {
          line--;
          above = false;
        }
        var elt2 = document.createElement("div");
        elt2.className = "CodeMirror-merge-spacer";
        elt2.style.height = size + "px";
        elt2.style.minWidth = "1px";
        return cm.addLineWidget(line, elt2, { height: size, above, mergeSpacer: true, handleMouseEvents: true });
      }
      function drawConnectorsForChunk(dv, chunk, sTopOrig, sTopEdit, w) {
        var flip = dv.type == "left";
        var top = dv.orig.heightAtLine(chunk.origFrom, "local", true) - sTopOrig;
        if (dv.svg) {
          var topLpx = top;
          var topRpx = dv.edit.heightAtLine(chunk.editFrom, "local", true) - sTopEdit;
          if (flip) {
            var tmp = topLpx;
            topLpx = topRpx;
            topRpx = tmp;
          }
          var botLpx = dv.orig.heightAtLine(chunk.origTo, "local", true) - sTopOrig;
          var botRpx = dv.edit.heightAtLine(chunk.editTo, "local", true) - sTopEdit;
          if (flip) {
            var tmp = botLpx;
            botLpx = botRpx;
            botRpx = tmp;
          }
          var curveTop = " C " + w / 2 + " " + topRpx + " " + w / 2 + " " + topLpx + " " + (w + 2) + " " + topLpx;
          var curveBot = " C " + w / 2 + " " + botLpx + " " + w / 2 + " " + botRpx + " -1 " + botRpx;
          attrs(
            dv.svg.appendChild(document.createElementNS(svgNS, "path")),
            "d",
            "M -1 " + topRpx + curveTop + " L " + (w + 2) + " " + botLpx + curveBot + " z",
            "class",
            dv.classes.connect
          );
        }
        if (dv.copyButtons) {
          var copy = dv.copyButtons.appendChild(elt(
            "div",
            dv.type == "left" ? "\u21DD" : "\u21DC",
            "CodeMirror-merge-copy"
          ));
          var editOriginals = dv.mv.options.allowEditingOriginals;
          copy.title = dv.edit.phrase(editOriginals ? "Push to left" : "Revert chunk");
          copy.chunk = chunk;
          copy.style.top = (chunk.origTo > chunk.origFrom ? top : dv.edit.heightAtLine(chunk.editFrom, "local") - sTopEdit) + "px";
          copy.setAttribute("role", "button");
          copy.setAttribute("tabindex", "0");
          copy.setAttribute("aria-label", copy.title);
          if (editOriginals) {
            var topReverse = dv.edit.heightAtLine(chunk.editFrom, "local") - sTopEdit;
            var copyReverse = dv.copyButtons.appendChild(elt(
              "div",
              dv.type == "right" ? "\u21DD" : "\u21DC",
              "CodeMirror-merge-copy-reverse"
            ));
            copyReverse.title = "Push to right";
            copyReverse.chunk = {
              editFrom: chunk.origFrom,
              editTo: chunk.origTo,
              origFrom: chunk.editFrom,
              origTo: chunk.editTo
            };
            copyReverse.style.top = topReverse + "px";
            dv.type == "right" ? copyReverse.style.left = "2px" : copyReverse.style.right = "2px";
            copyReverse.setAttribute("role", "button");
            copyReverse.setAttribute("tabindex", "0");
            copyReverse.setAttribute("aria-label", copyReverse.title);
          }
        }
      }
      function copyChunk(dv, to, from, chunk) {
        if (dv.diffOutOfDate)
          return;
        var origStart = chunk.origTo > from.lastLine() ? Pos(chunk.origFrom - 1) : Pos(chunk.origFrom, 0);
        var origEnd = Pos(chunk.origTo, 0);
        var editStart = chunk.editTo > to.lastLine() ? Pos(chunk.editFrom - 1) : Pos(chunk.editFrom, 0);
        var editEnd = Pos(chunk.editTo, 0);
        var handler = dv.mv.options.revertChunk;
        if (handler)
          handler(dv.mv, from, origStart, origEnd, to, editStart, editEnd);
        else
          to.replaceRange(from.getRange(origStart, origEnd), editStart, editEnd);
      }
      var MergeView = CodeMirror3.MergeView = function(node, options) {
        if (!(this instanceof MergeView))
          return new MergeView(node, options);
        this.options = options;
        var origLeft = options.origLeft, origRight = options.origRight == null ? options.orig : options.origRight;
        var hasLeft = origLeft != null, hasRight = origRight != null;
        var panes = 1 + (hasLeft ? 1 : 0) + (hasRight ? 1 : 0);
        var wrap = [], left = this.left = null, right = this.right = null;
        var self = this;
        if (hasLeft) {
          left = this.left = new DiffView(this, "left");
          var leftPane = elt("div", null, "CodeMirror-merge-pane CodeMirror-merge-left");
          wrap.push(leftPane);
          wrap.push(buildGap(left));
        }
        var editPane = elt("div", null, "CodeMirror-merge-pane CodeMirror-merge-editor");
        wrap.push(editPane);
        if (hasRight) {
          right = this.right = new DiffView(this, "right");
          wrap.push(buildGap(right));
          var rightPane = elt("div", null, "CodeMirror-merge-pane CodeMirror-merge-right");
          wrap.push(rightPane);
        }
        (hasRight ? rightPane : editPane).className += " CodeMirror-merge-pane-rightmost";
        wrap.push(elt("div", null, null, "height: 0; clear: both;"));
        var wrapElt = this.wrap = node.appendChild(elt("div", wrap, "CodeMirror-merge CodeMirror-merge-" + panes + "pane"));
        this.edit = CodeMirror3(editPane, copyObj(options));
        if (left)
          left.init(leftPane, origLeft, options);
        if (right)
          right.init(rightPane, origRight, options);
        if (options.collapseIdentical)
          this.editor().operation(function() {
            collapseIdenticalStretches(self, options.collapseIdentical);
          });
        if (options.connect == "align") {
          this.aligners = [];
          alignChunks(this.left || this.right, true);
        }
        if (left)
          left.registerEvents(right);
        if (right)
          right.registerEvents(left);
        var onResize = function() {
          if (left)
            makeConnections(left);
          if (right)
            makeConnections(right);
        };
        CodeMirror3.on(window, "resize", onResize);
        var resizeInterval = setInterval(function() {
          for (var p = wrapElt.parentNode; p && p != document.body; p = p.parentNode) {
          }
          if (!p) {
            clearInterval(resizeInterval);
            CodeMirror3.off(window, "resize", onResize);
          }
        }, 5e3);
      };
      function buildGap(dv) {
        var lock = dv.lockButton = elt("div", null, "CodeMirror-merge-scrolllock");
        lock.setAttribute("role", "button");
        lock.setAttribute("tabindex", "0");
        var lockWrap = elt("div", [lock], "CodeMirror-merge-scrolllock-wrap");
        CodeMirror3.on(lock, "click", function() {
          setScrollLock(dv, !dv.lockScroll);
        });
        CodeMirror3.on(lock, "keyup", function(e) {
          e.key === "Enter" && setScrollLock(dv, !dv.lockScroll);
        });
        var gapElts = [lockWrap];
        if (dv.mv.options.revertButtons !== false) {
          dv.copyButtons = elt("div", null, "CodeMirror-merge-copybuttons-" + dv.type);
          var copyButtons = function(e) {
            var node = e.target || e.srcElement;
            if (!node.chunk)
              return;
            if (node.className == "CodeMirror-merge-copy-reverse") {
              copyChunk(dv, dv.orig, dv.edit, node.chunk);
              return;
            }
            copyChunk(dv, dv.edit, dv.orig, node.chunk);
          };
          CodeMirror3.on(dv.copyButtons, "click", copyButtons);
          CodeMirror3.on(dv.copyButtons, "keyup", function(e) {
            e.key === "Enter" && copyButtons(e);
          });
          gapElts.unshift(dv.copyButtons);
        }
        if (dv.mv.options.connect != "align") {
          var svg = document.createElementNS && document.createElementNS(svgNS, "svg");
          if (svg && !svg.createSVGRect)
            svg = null;
          dv.svg = svg;
          if (svg)
            gapElts.push(svg);
        }
        return dv.gap = elt("div", gapElts, "CodeMirror-merge-gap");
      }
      MergeView.prototype = {
        constructor: MergeView,
        editor: function() {
          return this.edit;
        },
        rightOriginal: function() {
          return this.right && this.right.orig;
        },
        leftOriginal: function() {
          return this.left && this.left.orig;
        },
        setShowDifferences: function(val) {
          if (this.right)
            this.right.setShowDifferences(val);
          if (this.left)
            this.left.setShowDifferences(val);
        },
        rightChunks: function() {
          if (this.right) {
            ensureDiff(this.right);
            return this.right.chunks;
          }
        },
        leftChunks: function() {
          if (this.left) {
            ensureDiff(this.left);
            return this.left.chunks;
          }
        }
      };
      function asString(obj) {
        if (typeof obj == "string")
          return obj;
        else
          return obj.getValue();
      }
      var dmp;
      function getDiff(a, b, ignoreWhitespace) {
        if (!dmp)
          dmp = new diff_match_patch();
        var diff = dmp.diff_main(a, b);
        for (var i = 0; i < diff.length; ++i) {
          var part = diff[i];
          if (ignoreWhitespace ? !/[^ \t]/.test(part[1]) : !part[1]) {
            diff.splice(i--, 1);
          } else if (i && diff[i - 1][0] == part[0]) {
            diff.splice(i--, 1);
            diff[i][1] += part[1];
          }
        }
        return diff;
      }
      function getChunks(diff) {
        var chunks = [];
        if (!diff.length)
          return chunks;
        var startEdit = 0, startOrig = 0;
        var edit = Pos(0, 0), orig = Pos(0, 0);
        for (var i = 0; i < diff.length; ++i) {
          var part = diff[i], tp = part[0];
          if (tp == DIFF_EQUAL) {
            var startOff = !startOfLineClean(diff, i) || edit.line < startEdit || orig.line < startOrig ? 1 : 0;
            var cleanFromEdit = edit.line + startOff, cleanFromOrig = orig.line + startOff;
            moveOver(edit, part[1], null, orig);
            var endOff = endOfLineClean(diff, i) ? 1 : 0;
            var cleanToEdit = edit.line + endOff, cleanToOrig = orig.line + endOff;
            if (cleanToEdit > cleanFromEdit) {
              if (i)
                chunks.push({
                  origFrom: startOrig,
                  origTo: cleanFromOrig,
                  editFrom: startEdit,
                  editTo: cleanFromEdit
                });
              startEdit = cleanToEdit;
              startOrig = cleanToOrig;
            }
          } else {
            moveOver(tp == DIFF_INSERT ? edit : orig, part[1]);
          }
        }
        if (startEdit <= edit.line || startOrig <= orig.line)
          chunks.push({
            origFrom: startOrig,
            origTo: orig.line + 1,
            editFrom: startEdit,
            editTo: edit.line + 1
          });
        return chunks;
      }
      function endOfLineClean(diff, i) {
        if (i == diff.length - 1)
          return true;
        var next = diff[i + 1][1];
        if (next.length == 1 && i < diff.length - 2 || next.charCodeAt(0) != 10)
          return false;
        if (i == diff.length - 2)
          return true;
        next = diff[i + 2][1];
        return (next.length > 1 || i == diff.length - 3) && next.charCodeAt(0) == 10;
      }
      function startOfLineClean(diff, i) {
        if (i == 0)
          return true;
        var last = diff[i - 1][1];
        if (last.charCodeAt(last.length - 1) != 10)
          return false;
        if (i == 1)
          return true;
        last = diff[i - 2][1];
        return last.charCodeAt(last.length - 1) == 10;
      }
      function chunkBoundariesAround(chunks, n, nInEdit) {
        var beforeE, afterE, beforeO, afterO;
        for (var i = 0; i < chunks.length; i++) {
          var chunk = chunks[i];
          var fromLocal = nInEdit ? chunk.editFrom : chunk.origFrom;
          var toLocal = nInEdit ? chunk.editTo : chunk.origTo;
          if (afterE == null) {
            if (fromLocal > n) {
              afterE = chunk.editFrom;
              afterO = chunk.origFrom;
            } else if (toLocal > n) {
              afterE = chunk.editTo;
              afterO = chunk.origTo;
            }
          }
          if (toLocal <= n) {
            beforeE = chunk.editTo;
            beforeO = chunk.origTo;
          } else if (fromLocal <= n) {
            beforeE = chunk.editFrom;
            beforeO = chunk.origFrom;
          }
        }
        return { edit: { before: beforeE, after: afterE }, orig: { before: beforeO, after: afterO } };
      }
      function collapseSingle(cm, from, to) {
        cm.addLineClass(from, "wrap", "CodeMirror-merge-collapsed-line");
        var widget = document.createElement("span");
        widget.className = "CodeMirror-merge-collapsed-widget";
        widget.title = cm.phrase("Identical text collapsed. Click to expand.");
        var mark = cm.markText(Pos(from, 0), Pos(to - 1), {
          inclusiveLeft: true,
          inclusiveRight: true,
          replacedWith: widget,
          clearOnEnter: true
        });
        function clear2() {
          mark.clear();
          cm.removeLineClass(from, "wrap", "CodeMirror-merge-collapsed-line");
        }
        if (mark.explicitlyCleared)
          clear2();
        CodeMirror3.on(widget, "click", clear2);
        mark.on("clear", clear2);
        CodeMirror3.on(widget, "click", clear2);
        return { mark, clear: clear2 };
      }
      function collapseStretch(size, editors) {
        var marks = [];
        function clear2() {
          for (var i2 = 0; i2 < marks.length; i2++)
            marks[i2].clear();
        }
        for (var i = 0; i < editors.length; i++) {
          var editor = editors[i];
          var mark = collapseSingle(editor.cm, editor.line, editor.line + size);
          marks.push(mark);
          mark.mark.on("clear", clear2);
        }
        return marks[0].mark;
      }
      function unclearNearChunks(dv, margin, off, clear2) {
        for (var i = 0; i < dv.chunks.length; i++) {
          var chunk = dv.chunks[i];
          for (var l = chunk.editFrom - margin; l < chunk.editTo + margin; l++) {
            var pos = l + off;
            if (pos >= 0 && pos < clear2.length)
              clear2[pos] = false;
          }
        }
      }
      function collapseIdenticalStretches(mv, margin) {
        if (typeof margin != "number")
          margin = 2;
        var clear2 = [], edit = mv.editor(), off = edit.firstLine();
        for (var l = off, e = edit.lastLine(); l <= e; l++)
          clear2.push(true);
        if (mv.left)
          unclearNearChunks(mv.left, margin, off, clear2);
        if (mv.right)
          unclearNearChunks(mv.right, margin, off, clear2);
        for (var i = 0; i < clear2.length; i++) {
          if (clear2[i]) {
            var line = i + off;
            for (var size = 1; i < clear2.length - 1 && clear2[i + 1]; i++, size++) {
            }
            if (size > margin) {
              var editors = [{ line, cm: edit }];
              if (mv.left)
                editors.push({ line: getMatchingOrigLine(line, mv.left.chunks), cm: mv.left.orig });
              if (mv.right)
                editors.push({ line: getMatchingOrigLine(line, mv.right.chunks), cm: mv.right.orig });
              var mark = collapseStretch(size, editors);
              if (mv.options.onCollapse)
                mv.options.onCollapse(mv, line, size, mark);
            }
          }
        }
      }
      function elt(tag, content, className, style) {
        var e = document.createElement(tag);
        if (className)
          e.className = className;
        if (style)
          e.style.cssText = style;
        if (typeof content == "string")
          e.appendChild(document.createTextNode(content));
        else if (content)
          for (var i = 0; i < content.length; ++i)
            e.appendChild(content[i]);
        return e;
      }
      function clear(node) {
        for (var count = node.childNodes.length; count > 0; --count)
          node.removeChild(node.firstChild);
      }
      function attrs(elt2) {
        for (var i = 1; i < arguments.length; i += 2)
          elt2.setAttribute(arguments[i], arguments[i + 1]);
      }
      function copyObj(obj, target) {
        if (!target)
          target = {};
        for (var prop in obj)
          if (obj.hasOwnProperty(prop))
            target[prop] = obj[prop];
        return target;
      }
      function moveOver(pos, str, copy, other) {
        var out = copy ? Pos(pos.line, pos.ch) : pos, at = 0;
        for (; ; ) {
          var nl = str.indexOf("\n", at);
          if (nl == -1)
            break;
          ++out.line;
          if (other)
            ++other.line;
          at = nl + 1;
        }
        out.ch = (at ? 0 : out.ch) + (str.length - at);
        if (other)
          other.ch = (at ? 0 : other.ch) + (str.length - at);
        return out;
      }
      var F_WIDGET = 1, F_WIDGET_BELOW = 2, F_MARKER = 4;
      function TrackAlignable(cm) {
        this.cm = cm;
        this.alignable = [];
        this.height = cm.doc.height;
        var self = this;
        cm.on("markerAdded", function(_, marker) {
          if (!marker.collapsed)
            return;
          var found = marker.find(1);
          if (found != null)
            self.set(found.line, F_MARKER);
        });
        cm.on("markerCleared", function(_, marker, _min, max) {
          if (max != null && marker.collapsed)
            self.check(max, F_MARKER, self.hasMarker);
        });
        cm.on("markerChanged", this.signal.bind(this));
        cm.on("lineWidgetAdded", function(_, widget, lineNo) {
          if (widget.mergeSpacer)
            return;
          if (widget.above)
            self.set(lineNo - 1, F_WIDGET_BELOW);
          else
            self.set(lineNo, F_WIDGET);
        });
        cm.on("lineWidgetCleared", function(_, widget, lineNo) {
          if (widget.mergeSpacer)
            return;
          if (widget.above)
            self.check(lineNo - 1, F_WIDGET_BELOW, self.hasWidgetBelow);
          else
            self.check(lineNo, F_WIDGET, self.hasWidget);
        });
        cm.on("lineWidgetChanged", this.signal.bind(this));
        cm.on("change", function(_, change) {
          var start = change.from.line, nBefore = change.to.line - change.from.line;
          var nAfter = change.text.length - 1, end = start + nAfter;
          if (nBefore || nAfter)
            self.map(start, nBefore, nAfter);
          self.check(end, F_MARKER, self.hasMarker);
          if (nBefore || nAfter)
            self.check(change.from.line, F_MARKER, self.hasMarker);
        });
        cm.on("viewportChange", function() {
          if (self.cm.doc.height != self.height)
            self.signal();
        });
      }
      TrackAlignable.prototype = {
        signal: function() {
          CodeMirror3.signal(this, "realign");
          this.height = this.cm.doc.height;
        },
        set: function(n, flags) {
          var pos = -1;
          for (; pos < this.alignable.length; pos += 2) {
            var diff = this.alignable[pos] - n;
            if (diff == 0) {
              if ((this.alignable[pos + 1] & flags) == flags)
                return;
              this.alignable[pos + 1] |= flags;
              this.signal();
              return;
            }
            if (diff > 0)
              break;
          }
          this.signal();
          this.alignable.splice(pos, 0, n, flags);
        },
        find: function(n) {
          for (var i = 0; i < this.alignable.length; i += 2)
            if (this.alignable[i] == n)
              return i;
          return -1;
        },
        check: function(n, flag, pred) {
          var found = this.find(n);
          if (found == -1 || !(this.alignable[found + 1] & flag))
            return;
          if (!pred.call(this, n)) {
            this.signal();
            var flags = this.alignable[found + 1] & ~flag;
            if (flags)
              this.alignable[found + 1] = flags;
            else
              this.alignable.splice(found, 2);
          }
        },
        hasMarker: function(n) {
          var handle = this.cm.getLineHandle(n);
          if (handle.markedSpans) {
            for (var i = 0; i < handle.markedSpans.length; i++)
              if (handle.markedSpans[i].marker.collapsed && handle.markedSpans[i].to != null)
                return true;
          }
          return false;
        },
        hasWidget: function(n) {
          var handle = this.cm.getLineHandle(n);
          if (handle.widgets) {
            for (var i = 0; i < handle.widgets.length; i++)
              if (!handle.widgets[i].above && !handle.widgets[i].mergeSpacer)
                return true;
          }
          return false;
        },
        hasWidgetBelow: function(n) {
          if (n == this.cm.lastLine())
            return false;
          var handle = this.cm.getLineHandle(n + 1);
          if (handle.widgets) {
            for (var i = 0; i < handle.widgets.length; i++)
              if (handle.widgets[i].above && !handle.widgets[i].mergeSpacer)
                return true;
          }
          return false;
        },
        map: function(from, nBefore, nAfter) {
          var diff = nAfter - nBefore, to = from + nBefore, widgetFrom = -1, widgetTo = -1;
          for (var i = 0; i < this.alignable.length; i += 2) {
            var n = this.alignable[i];
            if (n == from && this.alignable[i + 1] & F_WIDGET_BELOW)
              widgetFrom = i;
            if (n == to && this.alignable[i + 1] & F_WIDGET_BELOW)
              widgetTo = i;
            if (n <= from)
              continue;
            else if (n < to)
              this.alignable.splice(i--, 2);
            else
              this.alignable[i] += diff;
          }
          if (widgetFrom > -1) {
            var flags = this.alignable[widgetFrom + 1];
            if (flags == F_WIDGET_BELOW)
              this.alignable.splice(widgetFrom, 2);
            else
              this.alignable[widgetFrom + 1] = flags & ~F_WIDGET_BELOW;
          }
          if (widgetTo > -1 && nAfter)
            this.set(from + nAfter, F_WIDGET_BELOW);
        }
      };
      function posMin(a, b) {
        return (a.line - b.line || a.ch - b.ch) < 0 ? a : b;
      }
      function posMax(a, b) {
        return (a.line - b.line || a.ch - b.ch) > 0 ? a : b;
      }
      function posEq(a, b) {
        return a.line == b.line && a.ch == b.ch;
      }
      function findPrevDiff(chunks, start, isOrig) {
        for (var i = chunks.length - 1; i >= 0; i--) {
          var chunk = chunks[i];
          var to = (isOrig ? chunk.origTo : chunk.editTo) - 1;
          if (to < start)
            return to;
        }
      }
      function findNextDiff(chunks, start, isOrig) {
        for (var i = 0; i < chunks.length; i++) {
          var chunk = chunks[i];
          var from = isOrig ? chunk.origFrom : chunk.editFrom;
          if (from > start)
            return from;
        }
      }
      function goNearbyDiff(cm, dir) {
        var found = null, views = cm.state.diffViews, line = cm.getCursor().line;
        if (views)
          for (var i = 0; i < views.length; i++) {
            var dv = views[i], isOrig = cm == dv.orig;
            ensureDiff(dv);
            var pos = dir < 0 ? findPrevDiff(dv.chunks, line, isOrig) : findNextDiff(dv.chunks, line, isOrig);
            if (pos != null && (found == null || (dir < 0 ? pos > found : pos < found)))
              found = pos;
          }
        if (found != null)
          cm.setCursor(found, 0);
        else
          return CodeMirror3.Pass;
      }
      CodeMirror3.commands.goNextDiff = function(cm) {
        return goNearbyDiff(cm, 1);
      };
      CodeMirror3.commands.goPrevDiff = function(cm) {
        return goNearbyDiff(cm, -1);
      };
    });
  }
});

// node_modules/.pnpm/diff-match-patch@1.0.5/node_modules/diff-match-patch/index.js
var require_diff_match_patch = __commonJS({
  "node_modules/.pnpm/diff-match-patch@1.0.5/node_modules/diff-match-patch/index.js"(exports, module) {
    var diff_match_patch2 = function() {
      this.Diff_Timeout = 1;
      this.Diff_EditCost = 4;
      this.Match_Threshold = 0.5;
      this.Match_Distance = 1e3;
      this.Patch_DeleteThreshold = 0.5;
      this.Patch_Margin = 4;
      this.Match_MaxBits = 32;
    };
    var DIFF_DELETE2 = -1;
    var DIFF_INSERT2 = 1;
    var DIFF_EQUAL2 = 0;
    diff_match_patch2.Diff = function(op, text) {
      return [op, text];
    };
    diff_match_patch2.prototype.diff_main = function(text1, text2, opt_checklines, opt_deadline) {
      if (typeof opt_deadline == "undefined") {
        if (this.Diff_Timeout <= 0) {
          opt_deadline = Number.MAX_VALUE;
        } else {
          opt_deadline = new Date().getTime() + this.Diff_Timeout * 1e3;
        }
      }
      var deadline = opt_deadline;
      if (text1 == null || text2 == null) {
        throw new Error("Null input. (diff_main)");
      }
      if (text1 == text2) {
        if (text1) {
          return [new diff_match_patch2.Diff(DIFF_EQUAL2, text1)];
        }
        return [];
      }
      if (typeof opt_checklines == "undefined") {
        opt_checklines = true;
      }
      var checklines = opt_checklines;
      var commonlength = this.diff_commonPrefix(text1, text2);
      var commonprefix = text1.substring(0, commonlength);
      text1 = text1.substring(commonlength);
      text2 = text2.substring(commonlength);
      commonlength = this.diff_commonSuffix(text1, text2);
      var commonsuffix = text1.substring(text1.length - commonlength);
      text1 = text1.substring(0, text1.length - commonlength);
      text2 = text2.substring(0, text2.length - commonlength);
      var diffs = this.diff_compute_(text1, text2, checklines, deadline);
      if (commonprefix) {
        diffs.unshift(new diff_match_patch2.Diff(DIFF_EQUAL2, commonprefix));
      }
      if (commonsuffix) {
        diffs.push(new diff_match_patch2.Diff(DIFF_EQUAL2, commonsuffix));
      }
      this.diff_cleanupMerge(diffs);
      return diffs;
    };
    diff_match_patch2.prototype.diff_compute_ = function(text1, text2, checklines, deadline) {
      var diffs;
      if (!text1) {
        return [new diff_match_patch2.Diff(DIFF_INSERT2, text2)];
      }
      if (!text2) {
        return [new diff_match_patch2.Diff(DIFF_DELETE2, text1)];
      }
      var longtext = text1.length > text2.length ? text1 : text2;
      var shorttext = text1.length > text2.length ? text2 : text1;
      var i = longtext.indexOf(shorttext);
      if (i != -1) {
        diffs = [
          new diff_match_patch2.Diff(DIFF_INSERT2, longtext.substring(0, i)),
          new diff_match_patch2.Diff(DIFF_EQUAL2, shorttext),
          new diff_match_patch2.Diff(
            DIFF_INSERT2,
            longtext.substring(i + shorttext.length)
          )
        ];
        if (text1.length > text2.length) {
          diffs[0][0] = diffs[2][0] = DIFF_DELETE2;
        }
        return diffs;
      }
      if (shorttext.length == 1) {
        return [
          new diff_match_patch2.Diff(DIFF_DELETE2, text1),
          new diff_match_patch2.Diff(DIFF_INSERT2, text2)
        ];
      }
      var hm = this.diff_halfMatch_(text1, text2);
      if (hm) {
        var text1_a = hm[0];
        var text1_b = hm[1];
        var text2_a = hm[2];
        var text2_b = hm[3];
        var mid_common = hm[4];
        var diffs_a = this.diff_main(text1_a, text2_a, checklines, deadline);
        var diffs_b = this.diff_main(text1_b, text2_b, checklines, deadline);
        return diffs_a.concat(
          [new diff_match_patch2.Diff(DIFF_EQUAL2, mid_common)],
          diffs_b
        );
      }
      if (checklines && text1.length > 100 && text2.length > 100) {
        return this.diff_lineMode_(text1, text2, deadline);
      }
      return this.diff_bisect_(text1, text2, deadline);
    };
    diff_match_patch2.prototype.diff_lineMode_ = function(text1, text2, deadline) {
      var a = this.diff_linesToChars_(text1, text2);
      text1 = a.chars1;
      text2 = a.chars2;
      var linearray = a.lineArray;
      var diffs = this.diff_main(text1, text2, false, deadline);
      this.diff_charsToLines_(diffs, linearray);
      this.diff_cleanupSemantic(diffs);
      diffs.push(new diff_match_patch2.Diff(DIFF_EQUAL2, ""));
      var pointer = 0;
      var count_delete = 0;
      var count_insert = 0;
      var text_delete = "";
      var text_insert = "";
      while (pointer < diffs.length) {
        switch (diffs[pointer][0]) {
          case DIFF_INSERT2:
            count_insert++;
            text_insert += diffs[pointer][1];
            break;
          case DIFF_DELETE2:
            count_delete++;
            text_delete += diffs[pointer][1];
            break;
          case DIFF_EQUAL2:
            if (count_delete >= 1 && count_insert >= 1) {
              diffs.splice(
                pointer - count_delete - count_insert,
                count_delete + count_insert
              );
              pointer = pointer - count_delete - count_insert;
              var subDiff = this.diff_main(text_delete, text_insert, false, deadline);
              for (var j = subDiff.length - 1; j >= 0; j--) {
                diffs.splice(pointer, 0, subDiff[j]);
              }
              pointer = pointer + subDiff.length;
            }
            count_insert = 0;
            count_delete = 0;
            text_delete = "";
            text_insert = "";
            break;
        }
        pointer++;
      }
      diffs.pop();
      return diffs;
    };
    diff_match_patch2.prototype.diff_bisect_ = function(text1, text2, deadline) {
      var text1_length = text1.length;
      var text2_length = text2.length;
      var max_d = Math.ceil((text1_length + text2_length) / 2);
      var v_offset = max_d;
      var v_length = 2 * max_d;
      var v1 = new Array(v_length);
      var v2 = new Array(v_length);
      for (var x = 0; x < v_length; x++) {
        v1[x] = -1;
        v2[x] = -1;
      }
      v1[v_offset + 1] = 0;
      v2[v_offset + 1] = 0;
      var delta = text1_length - text2_length;
      var front = delta % 2 != 0;
      var k1start = 0;
      var k1end = 0;
      var k2start = 0;
      var k2end = 0;
      for (var d = 0; d < max_d; d++) {
        if (new Date().getTime() > deadline) {
          break;
        }
        for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
          var k1_offset = v_offset + k1;
          var x1;
          if (k1 == -d || k1 != d && v1[k1_offset - 1] < v1[k1_offset + 1]) {
            x1 = v1[k1_offset + 1];
          } else {
            x1 = v1[k1_offset - 1] + 1;
          }
          var y1 = x1 - k1;
          while (x1 < text1_length && y1 < text2_length && text1.charAt(x1) == text2.charAt(y1)) {
            x1++;
            y1++;
          }
          v1[k1_offset] = x1;
          if (x1 > text1_length) {
            k1end += 2;
          } else if (y1 > text2_length) {
            k1start += 2;
          } else if (front) {
            var k2_offset = v_offset + delta - k1;
            if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] != -1) {
              var x2 = text1_length - v2[k2_offset];
              if (x1 >= x2) {
                return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
              }
            }
          }
        }
        for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
          var k2_offset = v_offset + k2;
          var x2;
          if (k2 == -d || k2 != d && v2[k2_offset - 1] < v2[k2_offset + 1]) {
            x2 = v2[k2_offset + 1];
          } else {
            x2 = v2[k2_offset - 1] + 1;
          }
          var y2 = x2 - k2;
          while (x2 < text1_length && y2 < text2_length && text1.charAt(text1_length - x2 - 1) == text2.charAt(text2_length - y2 - 1)) {
            x2++;
            y2++;
          }
          v2[k2_offset] = x2;
          if (x2 > text1_length) {
            k2end += 2;
          } else if (y2 > text2_length) {
            k2start += 2;
          } else if (!front) {
            var k1_offset = v_offset + delta - k2;
            if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] != -1) {
              var x1 = v1[k1_offset];
              var y1 = v_offset + x1 - k1_offset;
              x2 = text1_length - x2;
              if (x1 >= x2) {
                return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
              }
            }
          }
        }
      }
      return [
        new diff_match_patch2.Diff(DIFF_DELETE2, text1),
        new diff_match_patch2.Diff(DIFF_INSERT2, text2)
      ];
    };
    diff_match_patch2.prototype.diff_bisectSplit_ = function(text1, text2, x, y, deadline) {
      var text1a = text1.substring(0, x);
      var text2a = text2.substring(0, y);
      var text1b = text1.substring(x);
      var text2b = text2.substring(y);
      var diffs = this.diff_main(text1a, text2a, false, deadline);
      var diffsb = this.diff_main(text1b, text2b, false, deadline);
      return diffs.concat(diffsb);
    };
    diff_match_patch2.prototype.diff_linesToChars_ = function(text1, text2) {
      var lineArray = [];
      var lineHash = {};
      lineArray[0] = "";
      function diff_linesToCharsMunge_(text) {
        var chars = "";
        var lineStart = 0;
        var lineEnd = -1;
        var lineArrayLength = lineArray.length;
        while (lineEnd < text.length - 1) {
          lineEnd = text.indexOf("\n", lineStart);
          if (lineEnd == -1) {
            lineEnd = text.length - 1;
          }
          var line = text.substring(lineStart, lineEnd + 1);
          if (lineHash.hasOwnProperty ? lineHash.hasOwnProperty(line) : lineHash[line] !== void 0) {
            chars += String.fromCharCode(lineHash[line]);
          } else {
            if (lineArrayLength == maxLines) {
              line = text.substring(lineStart);
              lineEnd = text.length;
            }
            chars += String.fromCharCode(lineArrayLength);
            lineHash[line] = lineArrayLength;
            lineArray[lineArrayLength++] = line;
          }
          lineStart = lineEnd + 1;
        }
        return chars;
      }
      var maxLines = 4e4;
      var chars1 = diff_linesToCharsMunge_(text1);
      maxLines = 65535;
      var chars2 = diff_linesToCharsMunge_(text2);
      return { chars1, chars2, lineArray };
    };
    diff_match_patch2.prototype.diff_charsToLines_ = function(diffs, lineArray) {
      for (var i = 0; i < diffs.length; i++) {
        var chars = diffs[i][1];
        var text = [];
        for (var j = 0; j < chars.length; j++) {
          text[j] = lineArray[chars.charCodeAt(j)];
        }
        diffs[i][1] = text.join("");
      }
    };
    diff_match_patch2.prototype.diff_commonPrefix = function(text1, text2) {
      if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
        return 0;
      }
      var pointermin = 0;
      var pointermax = Math.min(text1.length, text2.length);
      var pointermid = pointermax;
      var pointerstart = 0;
      while (pointermin < pointermid) {
        if (text1.substring(pointerstart, pointermid) == text2.substring(pointerstart, pointermid)) {
          pointermin = pointermid;
          pointerstart = pointermin;
        } else {
          pointermax = pointermid;
        }
        pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
      }
      return pointermid;
    };
    diff_match_patch2.prototype.diff_commonSuffix = function(text1, text2) {
      if (!text1 || !text2 || text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)) {
        return 0;
      }
      var pointermin = 0;
      var pointermax = Math.min(text1.length, text2.length);
      var pointermid = pointermax;
      var pointerend = 0;
      while (pointermin < pointermid) {
        if (text1.substring(text1.length - pointermid, text1.length - pointerend) == text2.substring(text2.length - pointermid, text2.length - pointerend)) {
          pointermin = pointermid;
          pointerend = pointermin;
        } else {
          pointermax = pointermid;
        }
        pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
      }
      return pointermid;
    };
    diff_match_patch2.prototype.diff_commonOverlap_ = function(text1, text2) {
      var text1_length = text1.length;
      var text2_length = text2.length;
      if (text1_length == 0 || text2_length == 0) {
        return 0;
      }
      if (text1_length > text2_length) {
        text1 = text1.substring(text1_length - text2_length);
      } else if (text1_length < text2_length) {
        text2 = text2.substring(0, text1_length);
      }
      var text_length = Math.min(text1_length, text2_length);
      if (text1 == text2) {
        return text_length;
      }
      var best = 0;
      var length = 1;
      while (true) {
        var pattern = text1.substring(text_length - length);
        var found = text2.indexOf(pattern);
        if (found == -1) {
          return best;
        }
        length += found;
        if (found == 0 || text1.substring(text_length - length) == text2.substring(0, length)) {
          best = length;
          length++;
        }
      }
    };
    diff_match_patch2.prototype.diff_halfMatch_ = function(text1, text2) {
      if (this.Diff_Timeout <= 0) {
        return null;
      }
      var longtext = text1.length > text2.length ? text1 : text2;
      var shorttext = text1.length > text2.length ? text2 : text1;
      if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
        return null;
      }
      var dmp = this;
      function diff_halfMatchI_(longtext2, shorttext2, i) {
        var seed = longtext2.substring(i, i + Math.floor(longtext2.length / 4));
        var j = -1;
        var best_common = "";
        var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
        while ((j = shorttext2.indexOf(seed, j + 1)) != -1) {
          var prefixLength = dmp.diff_commonPrefix(
            longtext2.substring(i),
            shorttext2.substring(j)
          );
          var suffixLength = dmp.diff_commonSuffix(
            longtext2.substring(0, i),
            shorttext2.substring(0, j)
          );
          if (best_common.length < suffixLength + prefixLength) {
            best_common = shorttext2.substring(j - suffixLength, j) + shorttext2.substring(j, j + prefixLength);
            best_longtext_a = longtext2.substring(0, i - suffixLength);
            best_longtext_b = longtext2.substring(i + prefixLength);
            best_shorttext_a = shorttext2.substring(0, j - suffixLength);
            best_shorttext_b = shorttext2.substring(j + prefixLength);
          }
        }
        if (best_common.length * 2 >= longtext2.length) {
          return [
            best_longtext_a,
            best_longtext_b,
            best_shorttext_a,
            best_shorttext_b,
            best_common
          ];
        } else {
          return null;
        }
      }
      var hm1 = diff_halfMatchI_(
        longtext,
        shorttext,
        Math.ceil(longtext.length / 4)
      );
      var hm2 = diff_halfMatchI_(
        longtext,
        shorttext,
        Math.ceil(longtext.length / 2)
      );
      var hm;
      if (!hm1 && !hm2) {
        return null;
      } else if (!hm2) {
        hm = hm1;
      } else if (!hm1) {
        hm = hm2;
      } else {
        hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
      }
      var text1_a, text1_b, text2_a, text2_b;
      if (text1.length > text2.length) {
        text1_a = hm[0];
        text1_b = hm[1];
        text2_a = hm[2];
        text2_b = hm[3];
      } else {
        text2_a = hm[0];
        text2_b = hm[1];
        text1_a = hm[2];
        text1_b = hm[3];
      }
      var mid_common = hm[4];
      return [text1_a, text1_b, text2_a, text2_b, mid_common];
    };
    diff_match_patch2.prototype.diff_cleanupSemantic = function(diffs) {
      var changes = false;
      var equalities = [];
      var equalitiesLength = 0;
      var lastEquality = null;
      var pointer = 0;
      var length_insertions1 = 0;
      var length_deletions1 = 0;
      var length_insertions2 = 0;
      var length_deletions2 = 0;
      while (pointer < diffs.length) {
        if (diffs[pointer][0] == DIFF_EQUAL2) {
          equalities[equalitiesLength++] = pointer;
          length_insertions1 = length_insertions2;
          length_deletions1 = length_deletions2;
          length_insertions2 = 0;
          length_deletions2 = 0;
          lastEquality = diffs[pointer][1];
        } else {
          if (diffs[pointer][0] == DIFF_INSERT2) {
            length_insertions2 += diffs[pointer][1].length;
          } else {
            length_deletions2 += diffs[pointer][1].length;
          }
          if (lastEquality && lastEquality.length <= Math.max(length_insertions1, length_deletions1) && lastEquality.length <= Math.max(
            length_insertions2,
            length_deletions2
          )) {
            diffs.splice(
              equalities[equalitiesLength - 1],
              0,
              new diff_match_patch2.Diff(DIFF_DELETE2, lastEquality)
            );
            diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT2;
            equalitiesLength--;
            equalitiesLength--;
            pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
            length_insertions1 = 0;
            length_deletions1 = 0;
            length_insertions2 = 0;
            length_deletions2 = 0;
            lastEquality = null;
            changes = true;
          }
        }
        pointer++;
      }
      if (changes) {
        this.diff_cleanupMerge(diffs);
      }
      this.diff_cleanupSemanticLossless(diffs);
      pointer = 1;
      while (pointer < diffs.length) {
        if (diffs[pointer - 1][0] == DIFF_DELETE2 && diffs[pointer][0] == DIFF_INSERT2) {
          var deletion = diffs[pointer - 1][1];
          var insertion = diffs[pointer][1];
          var overlap_length1 = this.diff_commonOverlap_(deletion, insertion);
          var overlap_length2 = this.diff_commonOverlap_(insertion, deletion);
          if (overlap_length1 >= overlap_length2) {
            if (overlap_length1 >= deletion.length / 2 || overlap_length1 >= insertion.length / 2) {
              diffs.splice(pointer, 0, new diff_match_patch2.Diff(
                DIFF_EQUAL2,
                insertion.substring(0, overlap_length1)
              ));
              diffs[pointer - 1][1] = deletion.substring(0, deletion.length - overlap_length1);
              diffs[pointer + 1][1] = insertion.substring(overlap_length1);
              pointer++;
            }
          } else {
            if (overlap_length2 >= deletion.length / 2 || overlap_length2 >= insertion.length / 2) {
              diffs.splice(pointer, 0, new diff_match_patch2.Diff(
                DIFF_EQUAL2,
                deletion.substring(0, overlap_length2)
              ));
              diffs[pointer - 1][0] = DIFF_INSERT2;
              diffs[pointer - 1][1] = insertion.substring(0, insertion.length - overlap_length2);
              diffs[pointer + 1][0] = DIFF_DELETE2;
              diffs[pointer + 1][1] = deletion.substring(overlap_length2);
              pointer++;
            }
          }
          pointer++;
        }
        pointer++;
      }
    };
    diff_match_patch2.prototype.diff_cleanupSemanticLossless = function(diffs) {
      function diff_cleanupSemanticScore_(one, two) {
        if (!one || !two) {
          return 6;
        }
        var char1 = one.charAt(one.length - 1);
        var char2 = two.charAt(0);
        var nonAlphaNumeric1 = char1.match(diff_match_patch2.nonAlphaNumericRegex_);
        var nonAlphaNumeric2 = char2.match(diff_match_patch2.nonAlphaNumericRegex_);
        var whitespace1 = nonAlphaNumeric1 && char1.match(diff_match_patch2.whitespaceRegex_);
        var whitespace2 = nonAlphaNumeric2 && char2.match(diff_match_patch2.whitespaceRegex_);
        var lineBreak1 = whitespace1 && char1.match(diff_match_patch2.linebreakRegex_);
        var lineBreak2 = whitespace2 && char2.match(diff_match_patch2.linebreakRegex_);
        var blankLine1 = lineBreak1 && one.match(diff_match_patch2.blanklineEndRegex_);
        var blankLine2 = lineBreak2 && two.match(diff_match_patch2.blanklineStartRegex_);
        if (blankLine1 || blankLine2) {
          return 5;
        } else if (lineBreak1 || lineBreak2) {
          return 4;
        } else if (nonAlphaNumeric1 && !whitespace1 && whitespace2) {
          return 3;
        } else if (whitespace1 || whitespace2) {
          return 2;
        } else if (nonAlphaNumeric1 || nonAlphaNumeric2) {
          return 1;
        }
        return 0;
      }
      var pointer = 1;
      while (pointer < diffs.length - 1) {
        if (diffs[pointer - 1][0] == DIFF_EQUAL2 && diffs[pointer + 1][0] == DIFF_EQUAL2) {
          var equality1 = diffs[pointer - 1][1];
          var edit = diffs[pointer][1];
          var equality2 = diffs[pointer + 1][1];
          var commonOffset = this.diff_commonSuffix(equality1, edit);
          if (commonOffset) {
            var commonString = edit.substring(edit.length - commonOffset);
            equality1 = equality1.substring(0, equality1.length - commonOffset);
            edit = commonString + edit.substring(0, edit.length - commonOffset);
            equality2 = commonString + equality2;
          }
          var bestEquality1 = equality1;
          var bestEdit = edit;
          var bestEquality2 = equality2;
          var bestScore = diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2);
          while (edit.charAt(0) === equality2.charAt(0)) {
            equality1 += edit.charAt(0);
            edit = edit.substring(1) + equality2.charAt(0);
            equality2 = equality2.substring(1);
            var score = diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2);
            if (score >= bestScore) {
              bestScore = score;
              bestEquality1 = equality1;
              bestEdit = edit;
              bestEquality2 = equality2;
            }
          }
          if (diffs[pointer - 1][1] != bestEquality1) {
            if (bestEquality1) {
              diffs[pointer - 1][1] = bestEquality1;
            } else {
              diffs.splice(pointer - 1, 1);
              pointer--;
            }
            diffs[pointer][1] = bestEdit;
            if (bestEquality2) {
              diffs[pointer + 1][1] = bestEquality2;
            } else {
              diffs.splice(pointer + 1, 1);
              pointer--;
            }
          }
        }
        pointer++;
      }
    };
    diff_match_patch2.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/;
    diff_match_patch2.whitespaceRegex_ = /\s/;
    diff_match_patch2.linebreakRegex_ = /[\r\n]/;
    diff_match_patch2.blanklineEndRegex_ = /\n\r?\n$/;
    diff_match_patch2.blanklineStartRegex_ = /^\r?\n\r?\n/;
    diff_match_patch2.prototype.diff_cleanupEfficiency = function(diffs) {
      var changes = false;
      var equalities = [];
      var equalitiesLength = 0;
      var lastEquality = null;
      var pointer = 0;
      var pre_ins = false;
      var pre_del = false;
      var post_ins = false;
      var post_del = false;
      while (pointer < diffs.length) {
        if (diffs[pointer][0] == DIFF_EQUAL2) {
          if (diffs[pointer][1].length < this.Diff_EditCost && (post_ins || post_del)) {
            equalities[equalitiesLength++] = pointer;
            pre_ins = post_ins;
            pre_del = post_del;
            lastEquality = diffs[pointer][1];
          } else {
            equalitiesLength = 0;
            lastEquality = null;
          }
          post_ins = post_del = false;
        } else {
          if (diffs[pointer][0] == DIFF_DELETE2) {
            post_del = true;
          } else {
            post_ins = true;
          }
          if (lastEquality && (pre_ins && pre_del && post_ins && post_del || lastEquality.length < this.Diff_EditCost / 2 && pre_ins + pre_del + post_ins + post_del == 3)) {
            diffs.splice(
              equalities[equalitiesLength - 1],
              0,
              new diff_match_patch2.Diff(DIFF_DELETE2, lastEquality)
            );
            diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT2;
            equalitiesLength--;
            lastEquality = null;
            if (pre_ins && pre_del) {
              post_ins = post_del = true;
              equalitiesLength = 0;
            } else {
              equalitiesLength--;
              pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
              post_ins = post_del = false;
            }
            changes = true;
          }
        }
        pointer++;
      }
      if (changes) {
        this.diff_cleanupMerge(diffs);
      }
    };
    diff_match_patch2.prototype.diff_cleanupMerge = function(diffs) {
      diffs.push(new diff_match_patch2.Diff(DIFF_EQUAL2, ""));
      var pointer = 0;
      var count_delete = 0;
      var count_insert = 0;
      var text_delete = "";
      var text_insert = "";
      var commonlength;
      while (pointer < diffs.length) {
        switch (diffs[pointer][0]) {
          case DIFF_INSERT2:
            count_insert++;
            text_insert += diffs[pointer][1];
            pointer++;
            break;
          case DIFF_DELETE2:
            count_delete++;
            text_delete += diffs[pointer][1];
            pointer++;
            break;
          case DIFF_EQUAL2:
            if (count_delete + count_insert > 1) {
              if (count_delete !== 0 && count_insert !== 0) {
                commonlength = this.diff_commonPrefix(text_insert, text_delete);
                if (commonlength !== 0) {
                  if (pointer - count_delete - count_insert > 0 && diffs[pointer - count_delete - count_insert - 1][0] == DIFF_EQUAL2) {
                    diffs[pointer - count_delete - count_insert - 1][1] += text_insert.substring(0, commonlength);
                  } else {
                    diffs.splice(0, 0, new diff_match_patch2.Diff(
                      DIFF_EQUAL2,
                      text_insert.substring(0, commonlength)
                    ));
                    pointer++;
                  }
                  text_insert = text_insert.substring(commonlength);
                  text_delete = text_delete.substring(commonlength);
                }
                commonlength = this.diff_commonSuffix(text_insert, text_delete);
                if (commonlength !== 0) {
                  diffs[pointer][1] = text_insert.substring(text_insert.length - commonlength) + diffs[pointer][1];
                  text_insert = text_insert.substring(0, text_insert.length - commonlength);
                  text_delete = text_delete.substring(0, text_delete.length - commonlength);
                }
              }
              pointer -= count_delete + count_insert;
              diffs.splice(pointer, count_delete + count_insert);
              if (text_delete.length) {
                diffs.splice(
                  pointer,
                  0,
                  new diff_match_patch2.Diff(DIFF_DELETE2, text_delete)
                );
                pointer++;
              }
              if (text_insert.length) {
                diffs.splice(
                  pointer,
                  0,
                  new diff_match_patch2.Diff(DIFF_INSERT2, text_insert)
                );
                pointer++;
              }
              pointer++;
            } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL2) {
              diffs[pointer - 1][1] += diffs[pointer][1];
              diffs.splice(pointer, 1);
            } else {
              pointer++;
            }
            count_insert = 0;
            count_delete = 0;
            text_delete = "";
            text_insert = "";
            break;
        }
      }
      if (diffs[diffs.length - 1][1] === "") {
        diffs.pop();
      }
      var changes = false;
      pointer = 1;
      while (pointer < diffs.length - 1) {
        if (diffs[pointer - 1][0] == DIFF_EQUAL2 && diffs[pointer + 1][0] == DIFF_EQUAL2) {
          if (diffs[pointer][1].substring(diffs[pointer][1].length - diffs[pointer - 1][1].length) == diffs[pointer - 1][1]) {
            diffs[pointer][1] = diffs[pointer - 1][1] + diffs[pointer][1].substring(0, diffs[pointer][1].length - diffs[pointer - 1][1].length);
            diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
            diffs.splice(pointer - 1, 1);
            changes = true;
          } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) == diffs[pointer + 1][1]) {
            diffs[pointer - 1][1] += diffs[pointer + 1][1];
            diffs[pointer][1] = diffs[pointer][1].substring(diffs[pointer + 1][1].length) + diffs[pointer + 1][1];
            diffs.splice(pointer + 1, 1);
            changes = true;
          }
        }
        pointer++;
      }
      if (changes) {
        this.diff_cleanupMerge(diffs);
      }
    };
    diff_match_patch2.prototype.diff_xIndex = function(diffs, loc) {
      var chars1 = 0;
      var chars2 = 0;
      var last_chars1 = 0;
      var last_chars2 = 0;
      var x;
      for (x = 0; x < diffs.length; x++) {
        if (diffs[x][0] !== DIFF_INSERT2) {
          chars1 += diffs[x][1].length;
        }
        if (diffs[x][0] !== DIFF_DELETE2) {
          chars2 += diffs[x][1].length;
        }
        if (chars1 > loc) {
          break;
        }
        last_chars1 = chars1;
        last_chars2 = chars2;
      }
      if (diffs.length != x && diffs[x][0] === DIFF_DELETE2) {
        return last_chars2;
      }
      return last_chars2 + (loc - last_chars1);
    };
    diff_match_patch2.prototype.diff_prettyHtml = function(diffs) {
      var html = [];
      var pattern_amp = /&/g;
      var pattern_lt = /</g;
      var pattern_gt = />/g;
      var pattern_para = /\n/g;
      for (var x = 0; x < diffs.length; x++) {
        var op = diffs[x][0];
        var data = diffs[x][1];
        var text = data.replace(pattern_amp, "&amp;").replace(pattern_lt, "&lt;").replace(pattern_gt, "&gt;").replace(pattern_para, "&para;<br>");
        switch (op) {
          case DIFF_INSERT2:
            html[x] = '<ins style="background:#e6ffe6;">' + text + "</ins>";
            break;
          case DIFF_DELETE2:
            html[x] = '<del style="background:#ffe6e6;">' + text + "</del>";
            break;
          case DIFF_EQUAL2:
            html[x] = "<span>" + text + "</span>";
            break;
        }
      }
      return html.join("");
    };
    diff_match_patch2.prototype.diff_text1 = function(diffs) {
      var text = [];
      for (var x = 0; x < diffs.length; x++) {
        if (diffs[x][0] !== DIFF_INSERT2) {
          text[x] = diffs[x][1];
        }
      }
      return text.join("");
    };
    diff_match_patch2.prototype.diff_text2 = function(diffs) {
      var text = [];
      for (var x = 0; x < diffs.length; x++) {
        if (diffs[x][0] !== DIFF_DELETE2) {
          text[x] = diffs[x][1];
        }
      }
      return text.join("");
    };
    diff_match_patch2.prototype.diff_levenshtein = function(diffs) {
      var levenshtein = 0;
      var insertions = 0;
      var deletions = 0;
      for (var x = 0; x < diffs.length; x++) {
        var op = diffs[x][0];
        var data = diffs[x][1];
        switch (op) {
          case DIFF_INSERT2:
            insertions += data.length;
            break;
          case DIFF_DELETE2:
            deletions += data.length;
            break;
          case DIFF_EQUAL2:
            levenshtein += Math.max(insertions, deletions);
            insertions = 0;
            deletions = 0;
            break;
        }
      }
      levenshtein += Math.max(insertions, deletions);
      return levenshtein;
    };
    diff_match_patch2.prototype.diff_toDelta = function(diffs) {
      var text = [];
      for (var x = 0; x < diffs.length; x++) {
        switch (diffs[x][0]) {
          case DIFF_INSERT2:
            text[x] = "+" + encodeURI(diffs[x][1]);
            break;
          case DIFF_DELETE2:
            text[x] = "-" + diffs[x][1].length;
            break;
          case DIFF_EQUAL2:
            text[x] = "=" + diffs[x][1].length;
            break;
        }
      }
      return text.join("	").replace(/%20/g, " ");
    };
    diff_match_patch2.prototype.diff_fromDelta = function(text1, delta) {
      var diffs = [];
      var diffsLength = 0;
      var pointer = 0;
      var tokens = delta.split(/\t/g);
      for (var x = 0; x < tokens.length; x++) {
        var param = tokens[x].substring(1);
        switch (tokens[x].charAt(0)) {
          case "+":
            try {
              diffs[diffsLength++] = new diff_match_patch2.Diff(DIFF_INSERT2, decodeURI(param));
            } catch (ex) {
              throw new Error("Illegal escape in diff_fromDelta: " + param);
            }
            break;
          case "-":
          case "=":
            var n = parseInt(param, 10);
            if (isNaN(n) || n < 0) {
              throw new Error("Invalid number in diff_fromDelta: " + param);
            }
            var text = text1.substring(pointer, pointer += n);
            if (tokens[x].charAt(0) == "=") {
              diffs[diffsLength++] = new diff_match_patch2.Diff(DIFF_EQUAL2, text);
            } else {
              diffs[diffsLength++] = new diff_match_patch2.Diff(DIFF_DELETE2, text);
            }
            break;
          default:
            if (tokens[x]) {
              throw new Error("Invalid diff operation in diff_fromDelta: " + tokens[x]);
            }
        }
      }
      if (pointer != text1.length) {
        throw new Error("Delta length (" + pointer + ") does not equal source text length (" + text1.length + ").");
      }
      return diffs;
    };
    diff_match_patch2.prototype.match_main = function(text, pattern, loc) {
      if (text == null || pattern == null || loc == null) {
        throw new Error("Null input. (match_main)");
      }
      loc = Math.max(0, Math.min(loc, text.length));
      if (text == pattern) {
        return 0;
      } else if (!text.length) {
        return -1;
      } else if (text.substring(loc, loc + pattern.length) == pattern) {
        return loc;
      } else {
        return this.match_bitap_(text, pattern, loc);
      }
    };
    diff_match_patch2.prototype.match_bitap_ = function(text, pattern, loc) {
      if (pattern.length > this.Match_MaxBits) {
        throw new Error("Pattern too long for this browser.");
      }
      var s = this.match_alphabet_(pattern);
      var dmp = this;
      function match_bitapScore_(e, x) {
        var accuracy = e / pattern.length;
        var proximity = Math.abs(loc - x);
        if (!dmp.Match_Distance) {
          return proximity ? 1 : accuracy;
        }
        return accuracy + proximity / dmp.Match_Distance;
      }
      var score_threshold = this.Match_Threshold;
      var best_loc = text.indexOf(pattern, loc);
      if (best_loc != -1) {
        score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
        best_loc = text.lastIndexOf(pattern, loc + pattern.length);
        if (best_loc != -1) {
          score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
        }
      }
      var matchmask = 1 << pattern.length - 1;
      best_loc = -1;
      var bin_min, bin_mid;
      var bin_max = pattern.length + text.length;
      var last_rd;
      for (var d = 0; d < pattern.length; d++) {
        bin_min = 0;
        bin_mid = bin_max;
        while (bin_min < bin_mid) {
          if (match_bitapScore_(d, loc + bin_mid) <= score_threshold) {
            bin_min = bin_mid;
          } else {
            bin_max = bin_mid;
          }
          bin_mid = Math.floor((bin_max - bin_min) / 2 + bin_min);
        }
        bin_max = bin_mid;
        var start = Math.max(1, loc - bin_mid + 1);
        var finish = Math.min(loc + bin_mid, text.length) + pattern.length;
        var rd = Array(finish + 2);
        rd[finish + 1] = (1 << d) - 1;
        for (var j = finish; j >= start; j--) {
          var charMatch = s[text.charAt(j - 1)];
          if (d === 0) {
            rd[j] = (rd[j + 1] << 1 | 1) & charMatch;
          } else {
            rd[j] = (rd[j + 1] << 1 | 1) & charMatch | ((last_rd[j + 1] | last_rd[j]) << 1 | 1) | last_rd[j + 1];
          }
          if (rd[j] & matchmask) {
            var score = match_bitapScore_(d, j - 1);
            if (score <= score_threshold) {
              score_threshold = score;
              best_loc = j - 1;
              if (best_loc > loc) {
                start = Math.max(1, 2 * loc - best_loc);
              } else {
                break;
              }
            }
          }
        }
        if (match_bitapScore_(d + 1, loc) > score_threshold) {
          break;
        }
        last_rd = rd;
      }
      return best_loc;
    };
    diff_match_patch2.prototype.match_alphabet_ = function(pattern) {
      var s = {};
      for (var i = 0; i < pattern.length; i++) {
        s[pattern.charAt(i)] = 0;
      }
      for (var i = 0; i < pattern.length; i++) {
        s[pattern.charAt(i)] |= 1 << pattern.length - i - 1;
      }
      return s;
    };
    diff_match_patch2.prototype.patch_addContext_ = function(patch, text) {
      if (text.length == 0) {
        return;
      }
      if (patch.start2 === null) {
        throw Error("patch not initialized");
      }
      var pattern = text.substring(patch.start2, patch.start2 + patch.length1);
      var padding = 0;
      while (text.indexOf(pattern) != text.lastIndexOf(pattern) && pattern.length < this.Match_MaxBits - this.Patch_Margin - this.Patch_Margin) {
        padding += this.Patch_Margin;
        pattern = text.substring(
          patch.start2 - padding,
          patch.start2 + patch.length1 + padding
        );
      }
      padding += this.Patch_Margin;
      var prefix = text.substring(patch.start2 - padding, patch.start2);
      if (prefix) {
        patch.diffs.unshift(new diff_match_patch2.Diff(DIFF_EQUAL2, prefix));
      }
      var suffix = text.substring(
        patch.start2 + patch.length1,
        patch.start2 + patch.length1 + padding
      );
      if (suffix) {
        patch.diffs.push(new diff_match_patch2.Diff(DIFF_EQUAL2, suffix));
      }
      patch.start1 -= prefix.length;
      patch.start2 -= prefix.length;
      patch.length1 += prefix.length + suffix.length;
      patch.length2 += prefix.length + suffix.length;
    };
    diff_match_patch2.prototype.patch_make = function(a, opt_b, opt_c) {
      var text1, diffs;
      if (typeof a == "string" && typeof opt_b == "string" && typeof opt_c == "undefined") {
        text1 = a;
        diffs = this.diff_main(text1, opt_b, true);
        if (diffs.length > 2) {
          this.diff_cleanupSemantic(diffs);
          this.diff_cleanupEfficiency(diffs);
        }
      } else if (a && typeof a == "object" && typeof opt_b == "undefined" && typeof opt_c == "undefined") {
        diffs = a;
        text1 = this.diff_text1(diffs);
      } else if (typeof a == "string" && opt_b && typeof opt_b == "object" && typeof opt_c == "undefined") {
        text1 = a;
        diffs = opt_b;
      } else if (typeof a == "string" && typeof opt_b == "string" && opt_c && typeof opt_c == "object") {
        text1 = a;
        diffs = opt_c;
      } else {
        throw new Error("Unknown call format to patch_make.");
      }
      if (diffs.length === 0) {
        return [];
      }
      var patches = [];
      var patch = new diff_match_patch2.patch_obj();
      var patchDiffLength = 0;
      var char_count1 = 0;
      var char_count2 = 0;
      var prepatch_text = text1;
      var postpatch_text = text1;
      for (var x = 0; x < diffs.length; x++) {
        var diff_type = diffs[x][0];
        var diff_text = diffs[x][1];
        if (!patchDiffLength && diff_type !== DIFF_EQUAL2) {
          patch.start1 = char_count1;
          patch.start2 = char_count2;
        }
        switch (diff_type) {
          case DIFF_INSERT2:
            patch.diffs[patchDiffLength++] = diffs[x];
            patch.length2 += diff_text.length;
            postpatch_text = postpatch_text.substring(0, char_count2) + diff_text + postpatch_text.substring(char_count2);
            break;
          case DIFF_DELETE2:
            patch.length1 += diff_text.length;
            patch.diffs[patchDiffLength++] = diffs[x];
            postpatch_text = postpatch_text.substring(0, char_count2) + postpatch_text.substring(char_count2 + diff_text.length);
            break;
          case DIFF_EQUAL2:
            if (diff_text.length <= 2 * this.Patch_Margin && patchDiffLength && diffs.length != x + 1) {
              patch.diffs[patchDiffLength++] = diffs[x];
              patch.length1 += diff_text.length;
              patch.length2 += diff_text.length;
            } else if (diff_text.length >= 2 * this.Patch_Margin) {
              if (patchDiffLength) {
                this.patch_addContext_(patch, prepatch_text);
                patches.push(patch);
                patch = new diff_match_patch2.patch_obj();
                patchDiffLength = 0;
                prepatch_text = postpatch_text;
                char_count1 = char_count2;
              }
            }
            break;
        }
        if (diff_type !== DIFF_INSERT2) {
          char_count1 += diff_text.length;
        }
        if (diff_type !== DIFF_DELETE2) {
          char_count2 += diff_text.length;
        }
      }
      if (patchDiffLength) {
        this.patch_addContext_(patch, prepatch_text);
        patches.push(patch);
      }
      return patches;
    };
    diff_match_patch2.prototype.patch_deepCopy = function(patches) {
      var patchesCopy = [];
      for (var x = 0; x < patches.length; x++) {
        var patch = patches[x];
        var patchCopy = new diff_match_patch2.patch_obj();
        patchCopy.diffs = [];
        for (var y = 0; y < patch.diffs.length; y++) {
          patchCopy.diffs[y] = new diff_match_patch2.Diff(patch.diffs[y][0], patch.diffs[y][1]);
        }
        patchCopy.start1 = patch.start1;
        patchCopy.start2 = patch.start2;
        patchCopy.length1 = patch.length1;
        patchCopy.length2 = patch.length2;
        patchesCopy[x] = patchCopy;
      }
      return patchesCopy;
    };
    diff_match_patch2.prototype.patch_apply = function(patches, text) {
      if (patches.length == 0) {
        return [text, []];
      }
      patches = this.patch_deepCopy(patches);
      var nullPadding = this.patch_addPadding(patches);
      text = nullPadding + text + nullPadding;
      this.patch_splitMax(patches);
      var delta = 0;
      var results = [];
      for (var x = 0; x < patches.length; x++) {
        var expected_loc = patches[x].start2 + delta;
        var text1 = this.diff_text1(patches[x].diffs);
        var start_loc;
        var end_loc = -1;
        if (text1.length > this.Match_MaxBits) {
          start_loc = this.match_main(
            text,
            text1.substring(0, this.Match_MaxBits),
            expected_loc
          );
          if (start_loc != -1) {
            end_loc = this.match_main(
              text,
              text1.substring(text1.length - this.Match_MaxBits),
              expected_loc + text1.length - this.Match_MaxBits
            );
            if (end_loc == -1 || start_loc >= end_loc) {
              start_loc = -1;
            }
          }
        } else {
          start_loc = this.match_main(text, text1, expected_loc);
        }
        if (start_loc == -1) {
          results[x] = false;
          delta -= patches[x].length2 - patches[x].length1;
        } else {
          results[x] = true;
          delta = start_loc - expected_loc;
          var text2;
          if (end_loc == -1) {
            text2 = text.substring(start_loc, start_loc + text1.length);
          } else {
            text2 = text.substring(start_loc, end_loc + this.Match_MaxBits);
          }
          if (text1 == text2) {
            text = text.substring(0, start_loc) + this.diff_text2(patches[x].diffs) + text.substring(start_loc + text1.length);
          } else {
            var diffs = this.diff_main(text1, text2, false);
            if (text1.length > this.Match_MaxBits && this.diff_levenshtein(diffs) / text1.length > this.Patch_DeleteThreshold) {
              results[x] = false;
            } else {
              this.diff_cleanupSemanticLossless(diffs);
              var index1 = 0;
              var index2;
              for (var y = 0; y < patches[x].diffs.length; y++) {
                var mod = patches[x].diffs[y];
                if (mod[0] !== DIFF_EQUAL2) {
                  index2 = this.diff_xIndex(diffs, index1);
                }
                if (mod[0] === DIFF_INSERT2) {
                  text = text.substring(0, start_loc + index2) + mod[1] + text.substring(start_loc + index2);
                } else if (mod[0] === DIFF_DELETE2) {
                  text = text.substring(0, start_loc + index2) + text.substring(start_loc + this.diff_xIndex(
                    diffs,
                    index1 + mod[1].length
                  ));
                }
                if (mod[0] !== DIFF_DELETE2) {
                  index1 += mod[1].length;
                }
              }
            }
          }
        }
      }
      text = text.substring(nullPadding.length, text.length - nullPadding.length);
      return [text, results];
    };
    diff_match_patch2.prototype.patch_addPadding = function(patches) {
      var paddingLength = this.Patch_Margin;
      var nullPadding = "";
      for (var x = 1; x <= paddingLength; x++) {
        nullPadding += String.fromCharCode(x);
      }
      for (var x = 0; x < patches.length; x++) {
        patches[x].start1 += paddingLength;
        patches[x].start2 += paddingLength;
      }
      var patch = patches[0];
      var diffs = patch.diffs;
      if (diffs.length == 0 || diffs[0][0] != DIFF_EQUAL2) {
        diffs.unshift(new diff_match_patch2.Diff(DIFF_EQUAL2, nullPadding));
        patch.start1 -= paddingLength;
        patch.start2 -= paddingLength;
        patch.length1 += paddingLength;
        patch.length2 += paddingLength;
      } else if (paddingLength > diffs[0][1].length) {
        var extraLength = paddingLength - diffs[0][1].length;
        diffs[0][1] = nullPadding.substring(diffs[0][1].length) + diffs[0][1];
        patch.start1 -= extraLength;
        patch.start2 -= extraLength;
        patch.length1 += extraLength;
        patch.length2 += extraLength;
      }
      patch = patches[patches.length - 1];
      diffs = patch.diffs;
      if (diffs.length == 0 || diffs[diffs.length - 1][0] != DIFF_EQUAL2) {
        diffs.push(new diff_match_patch2.Diff(DIFF_EQUAL2, nullPadding));
        patch.length1 += paddingLength;
        patch.length2 += paddingLength;
      } else if (paddingLength > diffs[diffs.length - 1][1].length) {
        var extraLength = paddingLength - diffs[diffs.length - 1][1].length;
        diffs[diffs.length - 1][1] += nullPadding.substring(0, extraLength);
        patch.length1 += extraLength;
        patch.length2 += extraLength;
      }
      return nullPadding;
    };
    diff_match_patch2.prototype.patch_splitMax = function(patches) {
      var patch_size = this.Match_MaxBits;
      for (var x = 0; x < patches.length; x++) {
        if (patches[x].length1 <= patch_size) {
          continue;
        }
        var bigpatch = patches[x];
        patches.splice(x--, 1);
        var start1 = bigpatch.start1;
        var start2 = bigpatch.start2;
        var precontext = "";
        while (bigpatch.diffs.length !== 0) {
          var patch = new diff_match_patch2.patch_obj();
          var empty = true;
          patch.start1 = start1 - precontext.length;
          patch.start2 = start2 - precontext.length;
          if (precontext !== "") {
            patch.length1 = patch.length2 = precontext.length;
            patch.diffs.push(new diff_match_patch2.Diff(DIFF_EQUAL2, precontext));
          }
          while (bigpatch.diffs.length !== 0 && patch.length1 < patch_size - this.Patch_Margin) {
            var diff_type = bigpatch.diffs[0][0];
            var diff_text = bigpatch.diffs[0][1];
            if (diff_type === DIFF_INSERT2) {
              patch.length2 += diff_text.length;
              start2 += diff_text.length;
              patch.diffs.push(bigpatch.diffs.shift());
              empty = false;
            } else if (diff_type === DIFF_DELETE2 && patch.diffs.length == 1 && patch.diffs[0][0] == DIFF_EQUAL2 && diff_text.length > 2 * patch_size) {
              patch.length1 += diff_text.length;
              start1 += diff_text.length;
              empty = false;
              patch.diffs.push(new diff_match_patch2.Diff(diff_type, diff_text));
              bigpatch.diffs.shift();
            } else {
              diff_text = diff_text.substring(
                0,
                patch_size - patch.length1 - this.Patch_Margin
              );
              patch.length1 += diff_text.length;
              start1 += diff_text.length;
              if (diff_type === DIFF_EQUAL2) {
                patch.length2 += diff_text.length;
                start2 += diff_text.length;
              } else {
                empty = false;
              }
              patch.diffs.push(new diff_match_patch2.Diff(diff_type, diff_text));
              if (diff_text == bigpatch.diffs[0][1]) {
                bigpatch.diffs.shift();
              } else {
                bigpatch.diffs[0][1] = bigpatch.diffs[0][1].substring(diff_text.length);
              }
            }
          }
          precontext = this.diff_text2(patch.diffs);
          precontext = precontext.substring(precontext.length - this.Patch_Margin);
          var postcontext = this.diff_text1(bigpatch.diffs).substring(0, this.Patch_Margin);
          if (postcontext !== "") {
            patch.length1 += postcontext.length;
            patch.length2 += postcontext.length;
            if (patch.diffs.length !== 0 && patch.diffs[patch.diffs.length - 1][0] === DIFF_EQUAL2) {
              patch.diffs[patch.diffs.length - 1][1] += postcontext;
            } else {
              patch.diffs.push(new diff_match_patch2.Diff(DIFF_EQUAL2, postcontext));
            }
          }
          if (!empty) {
            patches.splice(++x, 0, patch);
          }
        }
      }
    };
    diff_match_patch2.prototype.patch_toText = function(patches) {
      var text = [];
      for (var x = 0; x < patches.length; x++) {
        text[x] = patches[x];
      }
      return text.join("");
    };
    diff_match_patch2.prototype.patch_fromText = function(textline) {
      var patches = [];
      if (!textline) {
        return patches;
      }
      var text = textline.split("\n");
      var textPointer = 0;
      var patchHeader = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;
      while (textPointer < text.length) {
        var m = text[textPointer].match(patchHeader);
        if (!m) {
          throw new Error("Invalid patch string: " + text[textPointer]);
        }
        var patch = new diff_match_patch2.patch_obj();
        patches.push(patch);
        patch.start1 = parseInt(m[1], 10);
        if (m[2] === "") {
          patch.start1--;
          patch.length1 = 1;
        } else if (m[2] == "0") {
          patch.length1 = 0;
        } else {
          patch.start1--;
          patch.length1 = parseInt(m[2], 10);
        }
        patch.start2 = parseInt(m[3], 10);
        if (m[4] === "") {
          patch.start2--;
          patch.length2 = 1;
        } else if (m[4] == "0") {
          patch.length2 = 0;
        } else {
          patch.start2--;
          patch.length2 = parseInt(m[4], 10);
        }
        textPointer++;
        while (textPointer < text.length) {
          var sign = text[textPointer].charAt(0);
          try {
            var line = decodeURI(text[textPointer].substring(1));
          } catch (ex) {
            throw new Error("Illegal escape in patch_fromText: " + line);
          }
          if (sign == "-") {
            patch.diffs.push(new diff_match_patch2.Diff(DIFF_DELETE2, line));
          } else if (sign == "+") {
            patch.diffs.push(new diff_match_patch2.Diff(DIFF_INSERT2, line));
          } else if (sign == " ") {
            patch.diffs.push(new diff_match_patch2.Diff(DIFF_EQUAL2, line));
          } else if (sign == "@") {
            break;
          } else if (sign === "") {
          } else {
            throw new Error('Invalid patch mode "' + sign + '" in: ' + line);
          }
          textPointer++;
        }
      }
      return patches;
    };
    diff_match_patch2.patch_obj = function() {
      this.diffs = [];
      this.start1 = null;
      this.start2 = null;
      this.length1 = 0;
      this.length2 = 0;
    };
    diff_match_patch2.patch_obj.prototype.toString = function() {
      var coords1, coords2;
      if (this.length1 === 0) {
        coords1 = this.start1 + ",0";
      } else if (this.length1 == 1) {
        coords1 = this.start1 + 1;
      } else {
        coords1 = this.start1 + 1 + "," + this.length1;
      }
      if (this.length2 === 0) {
        coords2 = this.start2 + ",0";
      } else if (this.length2 == 1) {
        coords2 = this.start2 + 1;
      } else {
        coords2 = this.start2 + 1 + "," + this.length2;
      }
      var text = ["@@ -" + coords1 + " +" + coords2 + " @@\n"];
      var op;
      for (var x = 0; x < this.diffs.length; x++) {
        switch (this.diffs[x][0]) {
          case DIFF_INSERT2:
            op = "+";
            break;
          case DIFF_DELETE2:
            op = "-";
            break;
          case DIFF_EQUAL2:
            op = " ";
            break;
        }
        text[x + 1] = op + encodeURI(this.diffs[x][1]) + "\n";
      }
      return text.join("").replace(/%20/g, " ");
    };
    module.exports = diff_match_patch2;
    module.exports["diff_match_patch"] = diff_match_patch2;
    module.exports["DIFF_DELETE"] = DIFF_DELETE2;
    module.exports["DIFF_INSERT"] = DIFF_INSERT2;
    module.exports["DIFF_EQUAL"] = DIFF_EQUAL2;
  }
});

// node_modules/.pnpm/codemirror-editor-vue3@2.1.7/node_modules/codemirror-editor-vue3/dist/codemirror-editor-vue3.es.js
var import_codemirror2 = __toESM(require_codemirror());
var import_merge2 = __toESM(require_merge());
var import_diff_match_patch = __toESM(require_diff_match_patch());
var import_simple = __toESM(require_simple());
import "F:/MyWorkSpace_program/lowcode-nocode/\u6587\u6863/gd-AccBuild-doc/node_modules/.pnpm/codemirror@5.65.8/node_modules/codemirror/lib/codemirror.css";
import "F:/MyWorkSpace_program/lowcode-nocode/\u6587\u6863/gd-AccBuild-doc/node_modules/.pnpm/codemirror@5.65.8/node_modules/codemirror/addon/merge/merge.css";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
!window.CodeMirror && (window.CodeMirror = import_codemirror2.default);
var CodeMirror$1 = window.CodeMirror || import_codemirror2.default;
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
var _sfc_main$3 = defineComponent({
  name: "DefaultMode",
  props: {
    name: {
      type: String,
      default: `cm-textarea-${+new Date()}`
    },
    value: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    options: {
      type: Object,
      default: () => ({})
    },
    cminstance: {
      type: Object,
      default: () => null
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
  emits: {
    ready: (instance) => instance,
    "update:cminstance": (instance) => instance
  },
  setup(props, { emit }) {
    const textarea = ref();
    const _cminstance = ref(null);
    const initialize = () => {
      _cminstance.value = markRaw(CodeMirror$1.fromTextArea(textarea.value, props.options));
      emit("update:cminstance", _cminstance.value);
      const unwatch = watch(() => props.cminstance, (val) => {
        var _a;
        val && ((_a = props.cminstance) == null ? void 0 : _a.setValue(props.value || props.content));
        emit("ready", unref(_cminstance));
        unwatch == null ? void 0 : unwatch();
      }, { deep: true });
    };
    onMounted(() => {
      initialize();
    });
    return {
      textarea,
      initialize
    };
  }
});
var _hoisted_1$2 = ["name", "placeholder"];
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("textarea", {
    ref: "textarea",
    name: _ctx.$props.name,
    placeholder: _ctx.$props.placeholder
  }, null, 8, _hoisted_1$2);
}
var Default = _export_sfc(_sfc_main$3, [["render", _sfc_render$2]]);
window.diff_match_patch = import_diff_match_patch.default;
window.DIFF_DELETE = -1;
window.DIFF_INSERT = 1;
window.DIFF_EQUAL = 0;
var _sfc_main$2 = defineComponent({
  name: "MergeMode",
  props: {
    options: {
      type: Object,
      default: () => ({})
    },
    cminstance: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:cminstance", "ready"],
  setup(props, { emit }) {
    const _cminstance = ref();
    const mergeView = ref();
    const initialize = () => {
      _cminstance.value = markRaw(CodeMirror$1.MergeView(mergeView.value, props.options));
      emit("update:cminstance", _cminstance.value);
      emit("ready", _cminstance);
    };
    onMounted(() => {
      initialize();
    });
    return {
      mergeView,
      initialize
    };
  }
});
var _hoisted_1$1 = { ref: "mergeView" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$1, null, 512);
}
var Merge = _export_sfc(_sfc_main$2, [["render", _sfc_render$1]]);
var logErrorType;
(function(logErrorType2) {
  logErrorType2["info"] = "info";
  logErrorType2["warning"] = "warning";
  logErrorType2["error"] = "error";
})(logErrorType || (logErrorType = {}));
function getLocalTime() {
  const date = new Date();
  const h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const m = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const s = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  return `${h}:${m}:${s}`;
}
function createLinkMark(attrs) {
  return `#link#${JSON.stringify(attrs)}#link#`;
}
function getLinkMarks(value) {
  const linkRegexp = /#link#(.+)#link#/g;
  const result = [];
  let indexObj;
  indexObj = linkRegexp.exec(value);
  while (indexObj) {
    const node = document.createElement("a");
    const attrs = JSON.parse(indexObj[1]);
    const keyAndValues = Object.entries(attrs);
    for (const [_key, _value] of keyAndValues) {
      node.setAttribute(_key, _value);
    }
    node.className = "editor_custom_link";
    node.innerHTML = "logDownload";
    result.push({
      start: indexObj.index,
      end: indexObj.index + indexObj[0].length,
      node
    });
    indexObj = linkRegexp.exec(value);
  }
  return result;
}
function createLogMark(text = "", type = "info") {
  return `#log<${type}>log#${text}#log<${type}>log#`;
}
function getLogMark(value) {
  const result = [];
  function match() {
    const logRegexp = /#log<(\w*)>log#((.|\r\n|\n)*?)#log<(\w*)>log#/g;
    let indexObj;
    indexObj = logRegexp.exec(value);
    while (indexObj) {
      const text = indexObj[0].replace(/\r\n/g, "\n");
      const textArr = text.split("\n");
      const content = indexObj[2].replace(/\r\n/g, "\n");
      const contentArr = content.split("\n");
      const node = document.createElement("span");
      const type = indexObj[1];
      node.className = `c-editor--log__${type}`;
      let offset = 0;
      for (let i = 0; i < textArr.length; i++) {
        const textItem = textArr[i];
        const contentItem = contentArr[i];
        const cloneNode = node.cloneNode(false);
        cloneNode.innerText = contentItem;
        result.push({
          start: indexObj.index + offset,
          end: indexObj.index + offset + textItem.length,
          node: cloneNode
        });
        offset = offset + textItem.length + 1;
      }
      indexObj = logRegexp.exec(value);
    }
  }
  match();
  return result;
}
function createLog(log, type) {
  const now = getLocalTime();
  return `[${now}] <${type}> ${log}`;
}
function createTitle(title, symbolLength, symbol) {
  const arr = new Array(Math.max(symbolLength || 15, 5));
  const wrapText = arr.join(symbol || "=");
  return `${wrapText}${title}${wrapText}`;
}
var startRegex = [
  {
    regex: /(\[.*?\])([ \t]*)(<error>[ \t])(.+)/,
    token: ["tag", "", "error.strong", "error.strong"],
    sol: true
  },
  {
    regex: /(\[.*?\])([ \t]*)(<info>)(.+)(.?)/,
    token: ["tag", "", "bracket", "bracket", "hr"],
    sol: true
  },
  {
    regex: /(\[.*?\])([ \t]*)(<warning>)(.+)(.?)/,
    token: ["tag", "", "comment", "comment", "hr"],
    sol: true
  }
];
CodeMirror$1.defineSimpleMode("fclog", {
  start: [
    ...startRegex,
    {
      regex: /.*/,
      token: "hr"
    }
  ],
  error: [
    ...startRegex,
    {
      regex: /.*/,
      token: "error.strong"
    }
  ],
  info: [
    ...startRegex,
    {
      regex: /.*/,
      token: "bracket"
    }
  ],
  warning: [
    ...startRegex,
    {
      regex: /.*\[/,
      token: "comment"
    }
  ]
});
CodeMirror$1.defineSimpleMode("log", {
  start: [
    {
      regex: /^[=]+[^=]*[=]+/,
      token: "strong"
    },
    {
      regex: /([^\w])([A-Z][\w]*)/,
      token: ["", "string"]
    },
    {
      regex: /(^[A-Z][\w]*)/,
      token: "string"
    }
  ]
});
var _sfc_main$1 = defineComponent({
  name: "CodemirrorFclog",
  props: {
    value: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: `cm-textarea-${+new Date()}`
    },
    options: {
      type: Object,
      default: () => ({})
    },
    cminstance: {
      type: Object,
      default: () => ({})
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
  emits: ["update:cminstance", "ready"],
  setup(props, { emit }) {
    const textarea = ref();
    const _cminstance = ref(null);
    const renderTextMark = (cminstance = props.cminstance) => {
      const marks = cminstance.getAllMarks();
      marks.forEach((mark) => mark.clear());
      const value = cminstance.getValue();
      const linkMarks = [].concat(getLinkMarks(value)).concat(getLogMark(value));
      for (let _i = 0; _i < linkMarks.length; _i++) {
        const mark = linkMarks[_i];
        cminstance.markText(cminstance.posFromIndex(mark.start), cminstance.posFromIndex(mark.end), { replacedWith: mark.node });
      }
    };
    const initialize = () => {
      var _a;
      _cminstance.value = markRaw(CodeMirror$1.fromTextArea(textarea.value, props.options));
      emit("update:cminstance", unref(_cminstance));
      (_a = _cminstance.value) == null ? void 0 : _a.on("change", renderTextMark);
    };
    watch(() => props.cminstance, (val) => {
      var _a;
      if (val) {
        renderTextMark(props.cminstance);
        (_a = props.cminstance) == null ? void 0 : _a.setValue(props.value);
        emit("ready", _cminstance);
      }
    }, { deep: true, immediate: true });
    onMounted(() => {
      initialize();
    });
    return {
      initialize,
      textarea
    };
  }
});
var _hoisted_1 = ["name", "placeholder"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("textarea", {
    ref: "textarea",
    name: _ctx.$props.name,
    placeholder: _ctx.$props.placeholder
  }, null, 8, _hoisted_1);
}
var FcLog = _export_sfc(_sfc_main$1, [["render", _sfc_render]]);
var componentEventMap = {
  "update:value": (value) => value,
  change: (value, cm) => ({ value, cm }),
  input: (value) => value,
  ready: (cm) => cm
};
var cmEvts = [
  "changes",
  "scroll",
  "beforeChange",
  "cursorActivity",
  "keyHandled",
  "inputRead",
  "electricInput",
  "beforeSelectionChange",
  "viewportChange",
  "swapDoc",
  "gutterClick",
  "gutterContextMenu",
  "focus",
  "blur",
  "refresh",
  "optionChange",
  "scrollCursorIntoView",
  "update"
];
var getCmEvts = () => {
  const result = {};
  cmEvts.forEach((name) => {
    result[name] = (...args) => args;
  });
  return result;
};
var emitOptions = __spreadValues(__spreadValues({}, componentEventMap), getCmEvts());
var DEFAULT_OPTIONS = {
  mode: "text",
  theme: "default",
  lineNumbers: true,
  smartIndent: true,
  indentUnit: 2
};
function scrollToEnd(cm) {
  Promise.resolve().then(() => {
    const nowScrollInfo = cm.getScrollInfo();
    cm.scrollTo(nowScrollInfo.left, nowScrollInfo.height);
  });
}
var useEvents = ({
  props,
  cminstance,
  emit,
  internalInstance,
  content
}) => {
  const realCm = computed(() => {
    var _a;
    return props.merge ? (_a = unref(cminstance)) == null ? void 0 : _a.editor() : unref(cminstance);
  });
  const getBindEvents = () => {
    const evts = [];
    Object.keys(internalInstance == null ? void 0 : internalInstance.vnode.props).forEach((v) => {
      if (v.startsWith("on")) {
        const e = v.replace(v[2], v[2].toLowerCase()).slice(2);
        !componentEventMap[e] && evts.push(e);
      }
    });
    return evts;
  };
  const listenerEvents = () => {
    realCm.value.on("change", (cm) => {
      const currentVal = cm.getValue();
      if (currentVal === content.value)
        return;
      content.value = currentVal;
      content.value && emit("update:value", content.value || "");
      content.value && emit("input", content.value || "");
      Promise.resolve().then(() => {
        emit("change", content.value, cm);
      });
      props.keepCursorInEnd && scrollToEnd(cm);
    });
    const tmpEvents = {};
    const bindEvts = getBindEvents();
    bindEvts.filter((e) => !tmpEvents[e] && (tmpEvents[e] = true)).forEach((event) => {
      realCm.value.on(event, (...args) => {
        emit(event, ...args);
      });
    });
  };
  return {
    listenerEvents
  };
};
function useViewControl({
  props,
  cminstance,
  presetRef
}) {
  const containerWidth = ref(null);
  const containerHeight = ref(null);
  const realCm = computed(() => {
    var _a;
    return props.merge ? (_a = unref(cminstance)) == null ? void 0 : _a.editor() : unref(cminstance);
  });
  const refresh = () => {
    nextTick(() => {
      var _a;
      (_a = realCm.value) == null ? void 0 : _a.refresh();
    });
  };
  const resize = (width = props.width, height = props.height) => {
    var _a;
    containerWidth.value = String(width).replace("px", "");
    containerHeight.value = String(height).replace("px", "");
    const cmHeight = containerHeight.value;
    (_a = realCm.value) == null ? void 0 : _a.setSize(containerWidth.value, cmHeight);
  };
  const destroy = () => {
    var _a;
    const element = (_a = realCm.value) == null ? void 0 : _a.getWrapperElement();
    element == null ? void 0 : element.remove();
  };
  const reload = () => {
    var _a, _b, _c;
    const history = (_a = realCm.value) == null ? void 0 : _a.getDoc().getHistory();
    (_b = presetRef.value) == null ? void 0 : _b.initialize();
    destroy();
    (_c = realCm.value) == null ? void 0 : _c.getDoc().setHistory(history);
  };
  const isStyleChaotic = () => {
    const gutterEl = document.querySelector(".CodeMirror-gutters");
    const gutterElLeft = gutterEl == null ? void 0 : gutterEl.style.left.replace("px", "");
    return gutterElLeft !== "0";
  };
  const reviseStyle = () => {
    refresh();
    if (!isStyleChaotic())
      return;
    const timer = setInterval(() => {
      isStyleChaotic() ? refresh() : clearInterval(timer);
    }, 60);
    const clearTimer = setTimeout(() => {
      clearInterval(timer);
      clearTimeout(clearTimer);
    }, 400);
  };
  return {
    reload,
    refresh,
    resize,
    destroy,
    containerHeight,
    reviseStyle
  };
}
var _sfc_main = defineComponent({
  props: {
    value: {
      type: String,
      default: ""
    },
    options: {
      type: Object,
      default: () => DEFAULT_OPTIONS
    },
    globalOptions: {
      type: Object,
      default: () => DEFAULT_OPTIONS
    },
    placeholder: {
      type: String,
      default: ""
    },
    border: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: null
    },
    height: {
      type: [String, Number],
      default: null
    },
    originalStyle: {
      type: Boolean,
      default: false
    },
    keepCursorInEnd: {
      type: Boolean,
      default: false
    },
    merge: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ""
    },
    marker: {
      type: Function,
      default: () => null
    },
    unseenLines: {
      type: Array,
      default: () => []
    }
  },
  emits: emitOptions,
  setup(__props, { expose, emit }) {
    var _a, _b;
    const props = __props;
    if (typeof Object.assign !== "function") {
      Object.defineProperty(Object, "assign", {
        value(target, varArgs) {
          if (target == null) {
            throw new TypeError("Cannot convert undefined or null to object");
          }
          const to = Object(target);
          for (let index2 = 1; index2 < arguments.length; index2++) {
            const nextSource = arguments[index2];
            if (nextSource != null) {
              for (const nextKey in nextSource) {
                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                  to[nextKey] = nextSource[nextKey];
                }
              }
            }
          }
          return to;
        },
        writable: true,
        configurable: true
      });
    }
    const cminstance = ref(null);
    const content = ref("");
    const presetModeName = shallowRef(Default);
    const cmOptions = ref(__spreadValues(__spreadValues(__spreadValues({}, DEFAULT_OPTIONS), props.globalOptions), props.options));
    const internalInstance = getCurrentInstance();
    const instanceName = props.name || ((_b = (_a = internalInstance == null ? void 0 : internalInstance.parent) == null ? void 0 : _a.type) == null ? void 0 : _b.name) || void 0;
    const presetRef = ref(null);
    const realCminstance = computed(() => {
      var _a2;
      return props.merge ? (_a2 = unref(cminstance)) == null ? void 0 : _a2.editor() : unref(cminstance);
    });
    const { refresh, resize, destroy, containerHeight, reviseStyle } = useViewControl({
      props,
      cminstance,
      presetRef
    });
    const { listenerEvents } = useEvents({
      props,
      cminstance,
      emit,
      internalInstance,
      content
    });
    const unseenLineMarkers = () => {
      if (props.unseenLines !== void 0 && props.marker !== void 0) {
        props.unseenLines.forEach((line) => {
          var _a2, _b2;
          const info = (_a2 = cminstance.value) == null ? void 0 : _a2.lineInfo(line);
          (_b2 = cminstance.value) == null ? void 0 : _b2.setGutterMarker(line, "breakpoints", (info == null ? void 0 : info.gutterMarkers) ? null : props.marker());
        });
      }
    };
    const onCodeChange = (newVal) => {
      var _a2, _b2;
      const CM_VALUE = (_a2 = cminstance.value) == null ? void 0 : _a2.getValue();
      if (newVal !== CM_VALUE) {
        (_b2 = cminstance.value) == null ? void 0 : _b2.setValue(newVal);
        content.value = newVal;
        reviseStyle();
      }
      unseenLineMarkers();
    };
    const ready = () => {
      listenerEvents();
      unseenLineMarkers();
      resize(props.width, props.height);
      emit("ready", cminstance.value);
      watch([() => props.width, () => props.height], ([width, height]) => {
        resize(width, height);
      }, { deep: true });
    };
    const handlePresetModeName = () => {
      if (props.options.mode === "fclog" || props.options.mode === "log") {
        presetModeName.value = FcLog;
        return;
      }
      if (props.merge) {
        presetModeName.value = Merge;
        return;
      }
      presetModeName.value = Default;
    };
    watch(() => props.options, (val) => {
      var _a2;
      for (const key in props.options) {
        (_a2 = realCminstance.value) == null ? void 0 : _a2.setOption(key, unref(val[key]));
      }
    }, { deep: true });
    watch(() => props.value, (val) => {
      onCodeChange(val);
    });
    watch(() => props.placeholder, (val) => {
      var _a2;
      (_a2 = realCminstance.value) == null ? void 0 : _a2.setOption("placeholder", val);
    });
    watch(() => props.merge, (val) => {
      handlePresetModeName();
    }, { immediate: true });
    onBeforeUnmount(() => {
      destroy();
    });
    expose({
      cminstance,
      resize,
      refresh,
      destroy
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["codemirror-container", {
          merge: _ctx.$props.merge,
          bordered: _ctx.$props.border || _ctx.$props.merge && !props.originalStyle,
          "width-auto": !_ctx.$props.width || _ctx.$props.width == "100%",
          "height-auto": !_ctx.$props.height || _ctx.$props.height == "100%",
          "original-style": props.originalStyle
        }]),
        style: normalizeStyle({
          height: unref(containerHeight) + "px"
        })
      }, [
        (openBlock(), createBlock(resolveDynamicComponent(unref(presetModeName)), mergeProps({
          ref_key: "presetRef",
          ref: presetRef,
          cminstance: cminstance.value,
          "onUpdate:cminstance": _cache[0] || (_cache[0] = ($event) => cminstance.value = $event),
          style: { "height": "100%" }
        }, __spreadProps(__spreadValues(__spreadValues({}, _ctx.$props), _ctx.$attrs), {
          options: cmOptions.value,
          name: unref(instanceName),
          content: content.value
        }), { onReady: ready }), null, 16, ["cminstance"]))
      ], 6);
    };
  }
});
var install = (app, config) => {
  if (config) {
    if (config.options) {
      _sfc_main.props.globalOptions.default = () => config.options;
    }
  }
  app.component((config == null ? void 0 : config.componentName) || "Codemirror", _sfc_main);
  return app;
};
var CodeMirror2 = window.CodeMirror || CodeMirror$1;
var GlobalCmComponent = install;
function styleInject(css, ref2) {
  if (ref2 === void 0) {
    ref2 = {};
  }
  var insertAt = ref2.insertAt;
  if (!css || typeof document === "undefined") {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}
styleInject(`.codemirror-container {
  position: relative;
  display: inline-block;
  height: 100%;
  width: fit-content;
  font-size: 12px;
  overflow: hidden;
}
.codemirror-container.bordered {
  border-radius: 4px;
  border: 1px solid #dddddd;
}
.codemirror-container.width-auto {
  width: 100%;
}
.codemirror-container.height-auto {
  height: 100%;
}
.codemirror-container.height-auto .CodeMirror,
.codemirror-container.height-auto .cm-s-default {
  height: 100% !important;
}
.codemirror-container .editor_custom_link {
  cursor: pointer;
  color: #1474f1;
  text-decoration: underline;
}
.codemirror-container .editor_custom_link:hover {
  color: #04b4fa;
}
.codemirror-container:not(.original-style) .CodeMirror-lines .CodeMirror-placeholder.CodeMirror-line-like {
  color: #666;
}
.codemirror-container:not(.original-style) .CodeMirror,
.codemirror-container:not(.original-style) .CodeMirror-merge-pane {
  height: 100%;
  font-family: consolas !important;
}
.codemirror-container:not(.original-style) .CodeMirror-merge,
.codemirror-container:not(.original-style) .CodeMirror-merge-right .CodeMirror {
  height: 100%;
  border: none !important;
}
.codemirror-container:not(.original-style) .c-editor--log__error {
  color: #bb0606;
  font-weight: bold;
}
.codemirror-container:not(.original-style) .c-editor--log__info {
  color: #333333;
  font-weight: bold;
}
.codemirror-container:not(.original-style) .c-editor--log__warning {
  color: #ee9900;
}
.codemirror-container:not(.original-style) .c-editor--log__success {
  color: #669600;
}
.codemirror-container:not(.original-style) .cm-header,
.codemirror-container:not(.original-style) .cm-strong {
  font-weight: bold;
}
`);

// dep:codemirror-editor-vue3
var codemirror_editor_vue3_default = _sfc_main;
export {
  CodeMirror2 as CodeMirror,
  GlobalCmComponent,
  _sfc_main as VueCodemirror,
  createLinkMark,
  createLog,
  createLogMark,
  createTitle,
  codemirror_editor_vue3_default as default,
  getLinkMarks,
  getLocalTime,
  getLogMark,
  logErrorType
};
//# sourceMappingURL=codemirror-editor-vue3.js.map
