startupUI([
    "ui/dialog/sketcher/sketcher_dialog.xml"
]).then(function () {
    $(".sketcherDialog .main .shape_list .rectArea").on(click, function () {
        System.cmdBegin(new CmdAddRect());
    });

    $(".sketcherDialog .main .shape_list .circleArea").on(click, function () {
        System.cmdBegin(new CmdAddCircle());
    });

    $(".sketcherDialog .main .shape_list .line").on(click, function () {
        System.cmdBegin(new CmdAddLine());
    });

    $(".sketcherDialog .main .shape_list .fillet").on(click, function () {
        layer.alert("尚未完成...");
        return;
    });


    //-- commons:
    $(".sketcherDialog .sketcherSettingBox .close").on(click, function () {
        hideSketcherSettingBox();
    });


    // ---- loop:
    $(".sketcherDialog .sketcherSettingBox .sketcherloop .delete").on(click, function () {
        var model = pickedModels();
        if (model) {
            layer.alert("尚未完成...");
        }
    });
    $(".sketcherDialog .sketcherSettingBox .sketcherloop .resume").on(click, function () {
        layer.alert("尚未完成...");

    });
    $(".sketcherDialog .sketcherSettingBox .sketcherloop .rebuild").on(click, function () {
        var area = pickedModels();
        layer.alert("尚未完成...");
    });

    $(".sketcherDialog .sketcherSettingBox .sketcherloop .makeOffset").on(click, function () {
        var area = pickedModels().find(function (model) {
            return model instanceof Loop;
        });

        if (!area) {
            layer.alert("当前没有选中区域");
            return;
        }

        return PopupValueInputDialogPromise("区域偏移", "请输入偏移值(mm)：", 100)
            .then(function (offset) {
                layer.alert("尚未完成...");
                return Promise.resolve({offset: offset, createNew: true});
            }).then(function () {
            });

    });


    //--   curve line:
    $(".sketcherDialog .sketcherSettingBox .sketchercurveline .delete").on(click, function () {
        var model = pickedModels();
        if (model) {

            layer.alert("尚未完成...");
        }
    });
    $(".sketcherDialog .sketcherSettingBox .sketchercurveline .toArc").on(click, function () {
        var lines = pickedModels();
        layer.alert("尚未完成...");
    });
    $(".sketcherDialog .sketcherSettingBox .sketchercurveline .split").on(click, function () {
        var line = pickedModels();
        var middle = line.middle, end = {x: line.end.x, y: line.end.y};
        line.end.x = middle.x, line.end.y = middle.y;
        layer.alert("尚未完成...");

    });
    $(".sketcherDialog .sketcherSettingBox .sketchercurveline .merge").on(click, function () {
        layer.alert("尚未完成...");
    });


    //----  curve arc:
    $(".sketcherDialog .sketcherSettingBox .sketchercurvearc .delete").on(click, function () {
        var model = pickedModels();
        if (model) {
            layer.alert("尚未完成...");

        }
    });
    $(".sketcherDialog .sketcherSettingBox .sketchercurvearc .toLine").on(click, function () {
        layer.alert("尚未完成...");

    });
    $(".sketcherDialog .sketcherSettingBox .sketchercurvearc .toHalfArc").on(click, function () {
        var arc = pickedModels();
        var mid = {x: 0, y: 0};
        layer.alert("尚未完成...");
        arc.mx = mid.x, arc.my = mid.y;
    });
    $(".sketcherDialog .sketcherSettingBox .sketchercurvearc .toQuarterArc").on(click, function () {
        var arc = pickedModels();
        var mid = {x: 0, y: 0};
        layer.alert("尚未完成...");
        arc.mx = mid.x, arc.my = mid.y;
    });
    $(".sketcherDialog .sketcherSettingBox .sketchercurvearc .toAngledArc").on(click, function () {
        var arc = pickedModels();
        PopupValueInputDialogPromise("圆心角值", "请输入圆心角角度值(0~360)：", 90)
            .then(function (angle) {
                angle = parseFloat(angle);
                if (!isFinite(angle) || angle < 0 || angle > 360) {
                    return layer.alert("无效的圆心角度");
                }
                var mid = {x: 0, y: 0};
                layer.alert("尚未完成...");
                arc.mx = mid.x, arc.my = mid.y;
            });
    });
    $(".sketcherDialog .sketcherSettingBox .sketchercurvearc .split").on(click, function () {
        layer.alert("尚未完成...");
    });
    $(".sketcherDialog .sketcherSettingBox .sketchercurvearc .merge").on(click, function () {
        layer.alert("尚未完成...");
    });
    $(".sketcherDialog .sketcherSettingBox .sketchercurvearc .flip").on(click, function () {
        var arc = pickedModels();
        var begin = arc.begin, end = arc.end, mid = arc.middle;
        var beginEnd_Mid = {x: (begin.x + end.x) / 2, y: (begin.y + end.y) / 2};
        arc.mx = beginEnd_Mid.x * 2 - mid.x, arc.my = beginEnd_Mid.y * 2 - mid.y;
        layer.alert("尚未完成...");
    });

});


function popUpSketcherDialogPromise(curves) {
    // build scene:
    for (var i = 0; i < (curves && curves.length - 1 || 0); ++i) {
        var p0 = curves[i], p1 = curves[i + 1];
        var curve = new CurveLine();
        curve.begin = p0, curve.end = p1;
        sceneAddModel(curve);
    }

    var layerIndex = layer.open({
        type: 1,
        title: "由草图生成区域（Alpha预览版）",
        skin: 'layui-layer-grey',
        shade: 0.2,
        shadeClose: false,
        maxmin: false,
        move: false,
        offset: ['60px', '250px'],
        area: [window.innerWidth - 500 + 'px', window.innerHeight - 120 + 'px'],
        content: $(".sketcherDialog"),
        success: function () {
            var parent = $(".sketcherDialog").parents(".layui-layer-grey");
            if (parent.draggable)parent.draggable({
                distance: 10, handle: ".layui-layer-title"
            }).css("z-index", 1000).find(".layui-layer-title").attr("style", "cursor:move;");

            $(".sketcherDialog .right").css("width", window.innerWidth - 770 + "px");
            if (!SketcherEditor_svg)initSketcherEditor();
            SketcherEditor_svg.show(sceneAllModels());
            buildArea();
            hideSketcherSettingBox();
        }, end: function () {
            hideSketcherSettingBox();
            $(".sketcherDialog").hide();
            sceneReset();
        }
    });
}


function showSketcherSettingBox(models) {
    $(".sketcherDialog .sketcherSettingBox").show();
    $(".sketcherDialog .sketcherSettingBox").children().hide();
    console.assert(models.length > 0);
    models.forEach(function (model) {
        $(".sketcherDialog .sketcherSettingBox .sketcher" + model.type.toLowerCase()).show();
    });
}

function hideSketcherSettingBox() {
    $(".sketcherDialog .sketcherSettingBox").hide();
}
