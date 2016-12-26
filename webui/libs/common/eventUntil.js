
var EventUtil = {

    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on", + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },

    getEvent: function(event) {
        return event ? window.event;
    },

    getTarget: function(event) {
        return event.target || event.srcElement;
    },

    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on", + type, handler);
        } else {
            element["on" + type] = null;
        }
    }
};

// demo
// var list = document.getElementById("switch_sites");
// EventUtil.addHandler(list, "click", function(event) {
//
//     event = EventUtil.getEvent(event);
//     var target = EventUtil.getTarget(event);
//     var uls = target.parentNode.parentNode;
//
//     switch(target) {
//         case "uls.getElementsByTagName("li")[0].getElementsByTagName("a")[0]":
//         alert(target.nodeValue);
//         break;
//
//         case "uls.getElementsByTagName("li")[1].getElementsByTagName("a")[0]":
//         alert(target.nodeValue);
//         break;
//
//         case "uls.getElementsByTagName("li")[2].getElementsByTagName("a")[0]":
//         alert(target.nodeValue);
//         break;
//
//     }
// });
