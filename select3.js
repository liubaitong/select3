(function ($, window) {
    var _tempval = {};
    $.fn.Select3 = function (opts) {

        var opts = $.extend({}, $.fn.Select3.defaults, opts), begin = false,
            _getRandom = function (n) {
                return Math.floor(Math.random() * 1000000 + 1)
            };

        return this.each(function () {

            var obj = $(this),
                data = opts.data,
                sid = "s3" + _getRandom(),
                sw = obj.css("width"),
                container=$(""),
                div = $("<div tabindex=99 class='select3' id=" + sid + " style='display: none'></div>");
            var p = obj.position();
            div.css("border", "1px solid silver").css("width", sw).css("position", "absolute").css("left", p.left + "px").css("top", (p.top + 25) + "px");
            div.css("height", 25 * opts.max + "px").css("overflow-y", "scroll").css("z-index", "9999").css("background-color", "#FFF");
            $.each(data, function (i, item) {
                //console.log(item['text']);
                $("<span><input type='checkbox' title='" + item['text'] + "' value='" + item['value'] + "'>" + item['text'] + "</span><br>").appendTo(div);
            })
            div.insertAfter(obj);
            //$("<span>Close</span>").insertAfter(div);
            obj.bind("click", function () {
                div.show("1000");

            })
            div.bind('blur',function () {
                div.hide("1000");
                //console.log("blur")
            })
            div.bind("click", "input", function (e) {
                // console.log(e);
                if (e.target.type === "checkbox") {
                    if (e.target.checked)
                        _tempval[e.target.value] = e.target.title;
                    else
                        delete _tempval[e.target.value];
                    obj.val("");
                    $.each(_tempval, function (i, item) {
                        obj.val(item + "," + obj.val())

                    })
                    //obj.val(obj.val())
                }
            })
            //            obj.on("click", function () {
            //                div.show("1000");
            //            })
            //            div.on("click", "input", function (e) {
            //                // console.log(e);
            //                if (e.target.type === "checkbox") {
            //                    if (e.target.checked)
            //                        _tempval[e.target.value] = e.target.title;
            //                    else
            //                        delete _tempval[e.target.value];
            //                    obj.val("");
            //                    $.each(_tempval, function (i, item) {
            //                        obj.val(item + "," + obj.val())

            //                    })
            //                    //obj.val(obj.val())
            //                }
            //            })

        })

    };
    var Methods = {
        GetSelected: function () {
            return _tempval;
        }

    }


    $.fn.Select3.defaults = {
        BrushColor: "#fff",
        BrushWidth: 5,
        LineJoin: "round",
        LineCap: "round",
        //mousedown
        drawReady: function (e) {

        }

    };
    $.extend($.fn.Select3, Methods);
})(jQuery, window)
