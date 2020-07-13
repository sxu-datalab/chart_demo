//原来的url2
// var _url = "http://127.0.0.1:8000/";//"http://172.21.201.144:8080/author/";//朱老师
// var imgurl = "http://127.0.0.1:8000/image?dk=";
var _url = "http://172.21.201.141:8000/";//"http://172.21.201.144:8080/author/";//朱老师
var imgurl = "http://172.21.201.141:8000/image?dk=";
var pagenum = 5;
var layer = new Object();
var indddddlin = '';
layui.use(['layer', 'form'], function(){
    layer = layui.layer
        ,form = layui.form;
    $(document).ajaxStart(function () {
            indddddlin = layer.load(1, {
                shade: [0.1,'#fff'] //0.1透明度的白色背景
            });
        }
    ).ajaxStop(function () {
        layer.close(indddddlin);
    });
});
//快速检索的本地存储
// if(localStorage.getItem("serHistory") === undefined){
//     localStorage.setItem("serHistory",JSON.stringify("[]"));
// }
var serHistory = {};
if(localStorage.getItem("serHistory") == undefined){
    localStorage.setItem("serHistory","[]");
    // console.log('合作了');
}
serHistory.data = JSON.parse(localStorage.getItem("serHistory"));

serHistory.addData = function (str) {
    if (serHistory.data.includes(str)){
        let linind = serHistory.data.indexOf(str);
        serHistory.data.splice(linind,1);
    }
        if(serHistory.data.length<9){
            serHistory.data.push(str);
        }else{
            serHistory.data.shift();
            serHistory.data.push(str);

            // for(let i=0;i<9;i++){
            //     serHistory.data[i] = serHistory.data[i+1];
            //     console.log(serHistory.data);
            // }
            // serHistory[9] = str;
        }
        localStorage.setItem("serHistory",JSON.stringify(serHistory.data))
};

var advanceInput = ["key1","key2","key3","AN","PN","PA","AU","IPC"];
var advanceT_K = {
    "key1":"包含全部关键字",
    "key2":"包含至少一个关键字",
    "key3":"不包含关键字",
    "AN":"申请（专利）号",
    "PN":"公开（公告）号",
    "PA":"申请（专利权）人",
    "AU":"申请（专利权）人",
    "IPC":"国际专利分类号（IPC）",
}
var gpObj ={
    PA : "",
    IPC : "",
    LS : "",
    LSE : "",
    AN : "",
    PN : "",
    AU : "",
    AD : "",
    PD : "",
    ADDR : "",
    PC : "",
    CTN : "",
    AGC : "",
    AGT : "",
    CDN : "",
    CDD : "",
    PFD : "",
    PF : "",
    COUNTRY : ""
};
var paraObj ={
    topic : "标题",
    author : "作者",
    title : "标题",
    PA : "申请人（专利权）人",
    IPC : "国际专利分类号",
    LS : "法律状态",
    LSE : "历史法律事件",
    AN : "申请号",
    PN : "公开（公告）号",
    AU : "发明人",
    AD : "申请日",
    PD : "公开（公告）日",
    ADDR : "申请（专利权）人地址",
    PC : "国省代码",
    CTN : "引证专利号",
    AGC : "专利代理机构",
    AGT : "代理人",
    CDN : "被引证专利号",
    CDD : "被引证数",
    PFD : "同族专利数",
    PF : "同族专利",
    COUNTRY : "中外专利"
};

layui.use('layer', function() { //独立版的layer无需执行这一句
    layer = layui.layer;
});
//var url_ = "http://172.21.201.141:8000/";//"http://172.21.201.141:8000/";//Jack
var sq = {
    url : _url,
    _data: {},
    _your_api : "",
    _fun : function () {
      console.log("没有传入处理函数");
    },
    _error : function () {
      console.log("出错了，但是没有传入错误处理函数");
    },
    setdata : function (js_obj) {
        this._data = js_obj;
        return this;
    },
    setapi : function (your_api) {
        this._your_api = your_api;
        return this;
    },
    sucessFun : function (your_fun) {
        //load1 = layer.load(2, {shade: false});
        this._fun = your_fun;
        return this;
    },
    errorFun : function (your_fun) {
        this._error = your_fun;
        return this;
    },
    run : function () {
        $.ajax({
            url: this.url+this._your_api,
            type : "POST",
            data : this._data,
            async:true,
            dataType : "JSON",
            xhrFields   : {withCredentials: true},
            success: function(result){
                console.log("sucess!!!!!");
                // layer.close(load1);
               // console.log('res, res.status', result)
                switch (parseInt(result.status)){
                    case 0 :
                        sq.msg(result.msg);
                        break;
                    case 1 :
                        sq._fun(result);
                        break;
                    default :
                        //console.log(result);
                        console.log("未知status！");
                        break;

                }
            },
            error:function (xhr){
               // layer.close(load1);
                console.log(xhr);
                sq._error();
            }
        })
    },
    unidecode : function(s){
        return window.unescape(s.replace(/\\/g, "%")).split("&&&");
    },

    decode : function (s) {
        window.unescape = window.unescape || window.decodeURI
        var data = Base64.decode(s);
        // var ss = data;
        // if(data == '' || typeof data == 'undefined') return '请输入十六进制unicode';
        // data = data.split("\\u");
        // var str ='';
        // for(var i=0;i<data.length;i++){
        //     str+=String.fromCharCode(parseInt(data[i],16).toString(10));
        // }

        return window.unescape(data.replace(/\\/g, "%")).split("&&&");
    },
    unicodeDecode : function (s) {
        window.unescape = window.unescape || window.decodeURI;
        return window.unescape((s).replace(/\\/g, "%")).split("&&&");
    },
    tips : function (s) {
        console.log($("#myip"));
        if($("#myip")){
            var tiphtml = '<div id="mytip" style="position: fixed;bottom: -40px;left: 0;right:0;height:40px;background-color: rgba(0,0,0,0.5);color: #FFF;text-align:center;line-height: 40px;">'+s+'</div>';
            $("body").append(tiphtml);
        }
        $("#mytip").animate({bottom:"0px"},"slow",function () {
                $("#mytip").animate({bottom:"-40px"},"slow",function () {
                    //$("body").remove($("#mytip"));
                });
            });
    },
    getAjaxDate : function(url1,opinion,fun){
        $.ajax({
            url: _url+url1,
            type : "POST",
            data : opinion,
            dataType : "json",
            xhrFields: {
                //允许带上凭据
                withCredentials: true
            },
            crossDomain: true,
            success: function(result){
                //注意layer关闭的时候验证码框的问题！
                //layer.closeAll();
                console.log("%c%s","color:#443312;background-color:#d1c9b8;font-size:10px;padding:10px;","Loading date success:"+JSON.stringify(opinion));
                console.log("%c%s","color:#999;background-color:#efefef;font-size:10px;padding:10px;","Loading date success:"+JSON.stringify(result));
                //alert(JSON.stringify(result));
                checkRetno(result,opinion.type,fun);
            },
            error:function (xhr){
                // alert("正在测试："+JSON.stringify(xhr))
                // layer.closeAll();
                console.log(xhr);
            }
        });
        function checkRetno(result,type,fun){
            //alert("正在测试："+JSON.stringify(result))
            switch (parseInt(result.status)){

                case 100 :
                    sq.open(result.msg);
                    break;
                case 10 :
                    console.log("没有数据");
                    break;
                case 60 :
                    sq.open(result.src);
                    break;
                case 0 :
                    sq.msg(result.msg);
                    // console.log(result.msg);
                    break;
                case 1 :
                    fun(result);
                    break;
                default :
                    console.log("["+type+"]:出错了！");
                    break;
            }
        }
    },
    GETAjaxDate : function(url1,opinion,fun){
        $.ajax({
            url: _url+url1,
            type : "GET",
            data : opinion,
            dataType : "json",
            xhrFields: {
                //允许带上凭据
                withCredentials: true
            },
            crossDomain: true,
            success: function(result){
                //注意layer关闭的时候验证码框的问题！
                //layer.closeAll();
                console.log("%c%s","color:#443312;background-color:#d1c9b8;font-size:10px;padding:10px;","Loading date success:"+JSON.stringify(opinion));
                console.log("%c%s","color:#999;background-color:#efefef;font-size:10px;padding:10px;","Loading date success:"+JSON.stringify(result));
                //alert(JSON.stringify(result));
                checkRetno(result,opinion.type,fun);
            },
            error:function (xhr){
                // alert("正在测试："+JSON.stringify(xhr))
                // layer.closeAll();
                console.log(xhr);
            }
        });
        function checkRetno(result,type,fun){
            //alert("正在测试："+JSON.stringify(result))
            switch (parseInt(result.status)){

                case 100 :
                    sq.open(result.msg);
                    break;
                case 10 :
                    console.log("没有数据");
                    break;
                case 60 :
                    sq.open(result.src);
                    break;
                case 0 :
                    sq.msg(result.msg);
                    // console.log(result.msg);
                    break;
                case 1 :
                    fun(result);
                    break;
                default :
                    console.log("["+type+"]:出错了！");
                    break;
            }
        }
    },
    openDataPage :function (s,title) {
        this.violet("打开了："+s,"color:#FF00FF;background-color:#79008f;font-size:12px;padding:10px;");
        layer.open({
            type: 2,
            skin: 'layui-layer-molv',
            title: title,
            shadeClose: true,
            shade: 0.618,
            maxmin: true, //开启最大化最小化按钮
            area: ['90%', '450px'],
            content: s
        });
    },
    openImg :function (s,st) {
        sq.violet("打开了："+s,"color:#FF00FF;background-color:#79008f;font-size:12px;padding:10px;");
        layer.open({
            type: 2,
            skin: 'layui-layer-molv',
            title: st,
            shadeClose: true,
            shade: 0.618,
            maxmin: true, //开启最大化最小化按钮
            area: ['90%', '90%'],
            content: s
        });
    },
    openImgCanRotate :function (s,st) {
        sq.violet("打开了："+s,"color:#FF00FF;background-color:#79008f;font-size:12px;padding:10px;");
        layer.open({
            type: 2,
            skin: 'layui-layer-molv',
            title: st,
            shadeClose: true,
            shade: 0.618,
            maxmin: true, //开启最大化最小化按钮
            area: ['800px', '450px'],
            content: "iframewindow/imgrotate.html#u="+s
        });
    },
    msg : function (s) {
        layui.use(['layer'], function(){
            layer = layui.layer;
            layer.msg(s);
        });
    },
    open :function (s){
        window.location.href = s;
    },
    log :function (s,css) {
        css = (css == undefined) ? "color:#fff7d3;background-color:#ff4f49;font-size:12px;padding:10px;" : css;
        // console.log(window.location.href+"\n--------------------------------------------");
        //console.log(css);
        console.log("%c%s",css,s);
    },
    green :function (s,css) {
        css = (css == undefined) ? "color:#fff7d3;background-color:#33a600;font-size:12px;padding:10px;" : css;
        // console.log(window.location.href+"\n--------------------------------------------");
        //console.log(css);
        console.log("%c%s",css,s);
    },
    blue :function (s,css) {
        css = (css == undefined) ? "color:#fff7d3;background-color:#00768f;font-size:12px;padding:10px;" : css;
        //console.log(window.location.href+"\n--------------------------------------------");
        //console.log(css);
        console.log("%c%s",css,s);
    },
    violet :function (s,css) {
        css = (css == undefined) ? "color:#fff7d3;background-color:#79008f;font-size:12px;padding:10px;" : css;
        //console.log(window.location.href+"\n--------------------------------------------");
        //console.log(css);
        console.log("%c%s",css,s);
    },
    red :function (s,css) {
        css = (css == undefined) ? "color:#fff7d3;background-color:#990000;font-size:12px;padding:10px;" : css;
        //console.log(window.location.href+"\n--------------------------------------------");
        //console.log(css);
        console.log("%c%s",css,s);
    },
    yellow :function (s,css) {
        css = (css == undefined) ? "color:#222222;background-color:#FFFF00;font-size:12px;padding:10px;" : css;
        //console.log(window.location.href+"\n--------------------------------------------");
        //console.log(css);
        console.log("%c%s",css,s);
    },
    getHashStringArgs : function() {
        var hashStrings = (window.location.hash.length > 0 ? window.location.hash.substring(1) : "");
        var hashArgs = {};
        var items = hashStrings.length > 0 ? hashStrings.split("&") : [];
        var _item = null;
        var _name = null;
        var value = null;
        var i = 0;
        var len = items.length;
        for (i = 0; i < len; i++) {
            var _item = items[i].split("=");
            // console.log(_item);
            _name = decodeURIComponent(_item[0]);
            value = decodeURIComponent(_item[1]);
            if (_name.length > 0) {
                hashArgs[_name] = value;
            }
        }
        return hashArgs;
    },
    existence:function (s) {
        try{
            JSON.parse(localStorage.getItem(s));
            if(localStorage.getItem(s) == undefined){
                return false;
            }else{
                return true;
            }
        }catch(error) {
            localStorage.removeItem(s);
            return false;
        }
    },
    roleindex : function (id) {
        for(var i = 0;i<roleList.length;i++){
            if(roleList[i].id == id){
                return i;
            }
        }
        return -1;
    },
    isundefinde :function (str) {
        if(str == undefined){
            return "";
        }else{
            return str;
        }
    },
    fmtDate:function (time,type) {
        var date;
        date = (parseInt(time) >100000) ? new Date(time * 1000) : new Date(time);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        switch (type){
            case 0 :
                return y + '-' + m + '-' + d;
            case 1 :
                return y + '/' + m + '/' + d;
            case 2 :
                return y + '年' + m + '月' + d+"日";
            case 3 :
                return m + '-' + d;
            case 4 :
                return m + '月' + d+"日";
            default :
                return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
        }
    },
    voidReplace : function (testValue,displayStr,replacedValue) {
        if(displayStr == undefined){
            if((testValue == undefined)||(testValue == null)){
                return "";
            }else{
                return testValue;
            }
        }
        if(replacedValue == undefined){
            if((testValue == undefined)||(testValue == null)){
                return displayStr;
            }else{
                return testValue;
            }
        }else{
            if((testValue == undefined)||(testValue == null)||(testValue == replacedValue)){
                return displayStr;
            }else{
                return testValue;
            }
        }
    },
    hasimg : function (str) {
        if(str == null){
            return "../images/no.png";
        }else if(str == undefined){
            return "../images/no.png";
        }else{
            return imgurl+str;
        }
    },
    category : function (id) {
        id = parseInt(id);
        var cate = JSON.parse(localStorage.getItem("tree"));
        for(var i = 0;i<cate.length;i++){
            if(cate[i].id == id){
                return cate[i].level_name;
            }
            if(cate[i]){
                for(var j = 0 ;j<cate[i].son.length;j++){
                    if(cate[i].son[j].id == id){
                        return cate[i].son[j].level_name;
                    }
                    if(cate[i].son[j].son) {
                        //console.log(cate[i].son[j].son);
                        for (var k = 0; k < cate[i].son[j].son.length; k++) {
                            if (cate[i].son[j].son[k].id == id) {
                                return cate[i].son[j].son[k].level_name;
                            }
                            if(cate[i].son[j].son[k].son) {
                                //console.log(cate[i].son[j].son);
                                for (var l = 0; l < cate[i].son[j].son[k].son.length; l++) {
                                    if (cate[i].son[j].son[k].son[l].id == id) {
                                        return cate[i].son[j].son[k].son[l].level_name;
                                    }
                                    if(cate[i].son[j].son[k].son[l].son) {
                                        //console.log(cate[i].son[j].son);
                                        for (var m = 0; m < cate[i].son[j].son[k].son[l].son.length; m++) {
                                            if (cate[i].son[j].son[k].son[l].son[m].id == id) {
                                                return cate[i].son[j].son[k].son[l].son[m].level_name;
                                            }
                                            if(cate[i].son[j].son[k].son[l].son[m].son) {
                                                //console.log(cate[i].son[j].son);
                                                for (var n = 0; n < cate[i].son[j].son[k].son[l].son[m].son.length; n++) {
                                                    if (cate[i].son[j].son[k].son[l].son[m].son[n].id == id) {
                                                        return cate[i].son[j].son[k].son[l].son[m].son[n].level_name;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return "无";
    },
    unescapeHTML: function(a){
        a = "" + a;
        return a.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
    },
    page : function(o){
        if(o.size == undefined){
            o.size = 20;
        }
        // sq.violet(JSON.stringify(o))
        if($("#pageDiv").html() == undefined){
            $(o.bro).after('<div style="text-align: center;"><div id="pageDiv"></div></div>');
            //sq.green(o);
        }
        sq.green(sq.whatNumber(o.page));
        layui.use(['laypage', 'layer'], function(){
            var laypage = layui.laypage;
            laypage.render({
                elem: 'pageDiv'
                ,count: sq.whatNumber(o.count)
                ,limit: o.size
                ,page : sq.whatNumber(o.page)
                ,curr : sq.whatNumber(o.page)
                ,layout: ['count', 'prev', 'page', 'next',  'refresh', 'skip']
                ,jump: function(obj,first){
                    //console.log(obj);
                    if(!first){
                        o.jump(obj);
                    }


                }
            });
        });
    },
    showTax : function (s) {
        if(parseInt(s) == 1){
            return "<span style='color: #007DDB;font-size: 10px; font-weight: bold;margin-right: 3px;'>税</span>"
        }else{
            return "";
        }
    },
    whatNumber : function(s){
        return ((s == undefined) || (s == null) || (s == NaN)) ? 0 : parseFloat(s);
    },
    showTrans : function (s) {
        if(parseInt(s) >0){
            return "<span style='color: #FF5722;font-size: 10px;font-weight: bold;cursor: pointer;' title='"+s+"元'>运</span>"
        }else{
            return "";
        }
    },
    loadExcel : function (sourceID,successfun) {
        var X;
        try{
            X = XLSX;
            console.log($("#"+sourceID).change)

        }catch(e){
            $.getScript('../js/jszip.js',function(){
                $.getScript('../js/xlsx.js',function(){
                    X = XLSX;
                });
            });
        }
        $("#"+sourceID).change(
            function handleFile(e) {
                do_file(e.target.files);
            });
        var do_file = (function() {
            return function do_file(files) {
                var f = files[0];
                var reader = new FileReader();
                reader.onload = function(e) {
                    var data = e.target.result;
                    var result = {};
                    data = X.read(data, {type: 'binary'});
                    data.SheetNames.forEach(function(sheetName) {
                        var roa = X.utils.sheet_to_json(data.Sheets[sheetName], {header:1});
                        if(roa.length) result[sheetName] = roa;
                    });
                    successfun(result);
                };
                reader.readAsBinaryString(f);
            };
        })();
    },
    saveExcel : function (obj,filename,sheetName) {
        sheetName = (sheetName) ? sheetName : "Sheet1";
        var X;
        try{
            X = XLSX;
            console.log($("#"+sourceID).change)

        }catch(e){
            $.getScript('../../js/jszip.js',function(){
                $.getScript('../../js/xlsx.js',function(){
                    X = XLSX;
                });
            });
        }

        var data = obj;
        var ws_name = sheetName; //Excel第一个sheet的名称
        var wb = X.utils.book_new(), ws = X.utils.aoa_to_sheet(data);
        X.utils.book_append_sheet(wb, ws, ws_name);  //将数据添加到工作薄
        X.writeFile(wb, filename); //导出Excel
    },
    uploadFunction : function (o) {
        console.log(o);
        $(o.container).html('<div class="layui-upload"><button type="button" class="layui-btn layui-btn-danger" id="'+o.uploadImgBT+'">上传图片</button></div>')
        layui.use('upload', function () {
            upload = layui.upload;

            //普通图片上传
            var uploadInst = upload.render({
                elem: "#"+o.uploadImgBT
                , url: '../action/upload.php'
                , before: function (obj) {
                    if(o.preview != undefined){
                        obj.preview(function (index, file, result) {
                            $(o.preview).html('<img src="'+result+'" style="width: 60px;" />'); //图片链接（base64）
                        });
                    }
                }
                , done: function (res) {
                    //如果上传失败
                    if (res.code != 1) {
                        return layer.msg('上传失败');
                    }
                    if (res.code == 1) {
                        o.success(res.src);
                    }
                    //上传成功
                }
                , error: function () {
                    if(o.error != undefined){
                        o.error();
                    }
                }
            });
        });
    },
    //form表单弹层
    inputWindow : function (param) {
        layui.use(['layer','form'], function() {
            layer = layui.layer;
            var form = layui.form
            var str = "";
            var obj = {
                title:{
                    text:"标题",//标题
                    bgColor:"#0056a7",//弹窗背景色
                    titleColor:"#FFFFFF"//弹窗文字颜色
                },
                width : "400px",
                closeBtn:1,
                shadeClose:true,
                button :{
                    sure:{
                        bgColor:"#0056a7",
                        titleColor:"#FFF"
                    }
                },
                form:{

                },
                sure : function (rel) {
                    console.log(rel);
                }
            };
            for(var key in param){
                if(typeof(obj[key]) == "object"){
                    for(sonKey in param[key]){
                        obj[key][sonKey] = param[key][sonKey];
                    }
                }else{
                    obj[key] = param[key];
                }
            }
            var forms = obj.form;
            obj.button = (obj.button == undefined) ? {} : obj.button;
            for(var key in forms){
                switch(forms[key].type){
                    case "select" :
                        var optionStr = "";
                        for(var i = 0;i<forms[key].value.length;i++){
                            optionStr += '<option value="'+forms[key].value[i].value+'">'+forms[key].value[i].label+'</option>'
                        }
                        str += '<div class="layui-form-item">' +
                            '    <label class="layui-form-label">'+forms[key].label+'</label>' +
                            '    <div class="layui-input-block">' +
                            '<select id="'+ key +'" name="'+ key +'">' +
                            optionStr +
                            '</select>'+
                            '    </div>' +
                            '  </div>';
                        break;
                    case "textarea" :
                        var optionStr = "";
                        str += '<div class="layui-form-item">' +
                            '    <label class="layui-form-label">'+forms[key].label+'</label>' +
                            '    <div class="layui-input-block">' +
                            '<textarea id="'+key+'" name="'+key+'" value="'+forms[key].value+'" autocomplete="off" placeholder="'+forms[key].tip+'" class="layui-textarea"></textarea>'+
                            '    </div>' +
                            '  </div>';
                        break;
                    default :
                        str += '<div class="layui-form-item">' +
                            '    <label class="layui-form-label">'+forms[key].label+'</label>' +
                            '    <div class="layui-input-block">' +
                            '      <input type="'+forms[key].type+'" id="'+key+'" name="'+key+'" value="'+forms[key].value+'" autocomplete="off" placeholder="'+forms[key].tip+'" class="layui-input">' +
                            '    </div>' +
                            '  </div>';
                        break;
                }
            }
            layer.open({
                type: 1,
                title:sq.voidReplace(obj.title.text,"提示"),
                skin: 'layui-layer-demo', //样式类名
                closeBtn: sq.voidReplace(obj.closeBtn,1), //不显示关闭按钮
                anim: 2,
                area:[obj.width,"auto"],
                shadeClose: sq.voidReplace(obj.shadeClose,true), //开启遮罩关闭
                content: "<div class='layui-form sq-form-content'>"+str+"" +
                "<div class='sq-form-btContent'>" +
                "<button class='layui-btn' id='sureBT'>确定</button>" +
                "<button class='layui-btn layui-btn-primary' id='cancelBT'>取消</button>" +
                "</div>" +
                "</div>"
            });
            form.render('select');
            $(".layui-layer-title").css("background-color",sq.voidReplace(obj.title.bgColor,"#333"));
            $(".layui-layer-title").css("color",sq.voidReplace(obj.title.titleColor,"#FFF"));
            $("#sureBT").css("background-color",sq.voidReplace(obj.button.sure.bgColor,"#666"));
            $("#sureBT").css("color",sq.voidReplace(obj.button.sure.titleColor,"#FFF"));
            $("#sureBT").click(function(){
                var relData = new Object();
                for(var key in forms){
                    if(!sq.voidReplace(forms[key].allowNull,false)){
                        if($("#"+key).val().length<1){
                            return layer.msg("<strong style='color: #FFB800;'>"+forms[key].label+"</strong>不能为空！");
                        }
                    }
                    relData[key] = $("#"+key).val();
                }
                obj.sure(relData);
                layer.closeAll();
            });
            $("#cancelBT").click(function(){
                layer.closeAll();
            });
        })
    }
};

var formula = {
    gpObj : {
        PA : "",
        IPC : "",
        LS : "",
        LSE : "",
        AN : "",
        PN : "",
        AU : "",
        AD : "",
        PD : "",
        ADDR : "",
        PC : "",
        CTN : "",
        AGC : "",
        AGT : "",
        CDN : "",
        CDD : "",
        PFD : "",
        PF : "",
        AB : "",
        COUNTRY : ""
    },
    paraObj : {
        topic : "标题",
        author : "作者",
        title : "标题",
        PA : "申请人（专利权）人",
        IPC : "国际专利分类号",
        LS : "法律状态",
        LSE : "历史法律事件",
        AN : "申请号",
        PN : "公开（公告）号",
        AU : "发明人",
        AD : "申请日",
        PD : "公开（公告）日",
        ADDR : "申请（专利权）人地址",
        PC : "国省代码",
        CTN : "引证专利号",
        AGC : "专利代理机构",
        AGT : "代理人",
        CDN : "被引证专利号",
        CDD : "被引证数",
        PFD : "同族专利数",
        PF : "同族专利",
        AB : "摘要",
        COUNTRY : "中外专利"
    },
    getFormular:function () {
        _and = "";
        var i = 0;
        var str = "";
        var gpObj = formula.gpObj;
        for(var k in gpObj) {
            if((gpObj[k] != "")&&(gpObj[k] != undefined)){
                // if(gpObj[k].substring(0,1) == "\""){
                //     gpObj[k] = gpObj[k].substring(1,gpObj[k].length-1);
                // }
                if(i == 0){
                    str +=""+ k+"=\""+formula.encodeUnicode(gpObj[k]).replace(/"/g,"").replace(/u/g, '').replace(/\'/g, '').replace(/\\/g, "\\\\u").replace(/\\uxb7/g, '\\u00b7')+"\"";
                    //sq.violet(str);
                    //str = str.replace("AND(","(");
                    //sq.green(str);
                }else{
                    str +=" AND " + k + "=\""+formula.encodeUnicode(gpObj[k]).replace(/u/g, '').replace(/"/g,"").replace(/\'/g, '').replace(/\\/g, "\\\\u").replace(/\\uxb7/g, '\\u00b7')+"\"";
                }
                i++;
            }

            //console.log(k,":",gpObj[k]);
        }
        return str;
    },
    getFormularNoUnicode:function () {
        _and = "";
        var i = 0;
        var str = "";
        var gpObj = formula.gpObj;
        for(var k in gpObj) {
            if((gpObj[k] != "")&&(gpObj[k] != undefined)){
                // if(gpObj[k].substring(0,1) == "\""){
                //     gpObj[k] = gpObj[k].substring(1,gpObj[k].length-1);
                // }
                if(i == 0){
                    str +=""+ k+"=\""+gpObj[k].replace(/"/g,"")+"\"";
                    //sq.violet(str);
                    //str = str.replace("AND(","(");
                    //sq.green(str);
                }else{
                    str +=" AND " + k + "=\""+gpObj[k].replace(/"/g,"")+"\"";
                }
                i++;
            }

            //console.log(k,":",gpObj[k]);
        }
        return str;
    },
    getSpecificFormular : function(key,value,related){
        var a = value.split(',');
        var str = "";
        var beginstr =" ";
        var endstr =" ";
        for(var i=0,len=a.length;i<len;i++){
            if(i == 0){beginstr="("}else{beginstr=" "}
            if(i==len-1){endstr=")"}else{endstr=" "+related}
            str += beginstr+""+key+"=\""+a[i].replace(/"/g, '') + "\""+endstr;
        }
       return str;
    },
    encodeUnicode : function(str) {
        if(formula.funcChina(str)){
        var res = [];
        for ( var i=0; i<str.length; i++ ) {
            res[i] = ( "00" + str.charCodeAt(i).toString(16) ).slice(-4);
        }
        var str = "\\\\u" + res.join("\\\\u");
        return '"'+str.replace(/\\\\u0022/g,"")+'"';
        }
        return str;
    },
    funcChina : function(str){
        var obj = str;
        if(/.*[\u4e00-\u9fa5]+.*$/.test(obj))
        {
            return true;
        }
        return false;
    },
getFormularObj : function (str) {
        sq.violet("123123dsdsd")
        var str = moveSpace(str.replace(/\n/g," "));
        //str = str.replace('u', '').replace('\'', '').replace('\\', '\\u').replace('\\uxb7', '\\u00b7');
        //str = dqmBase64(str);
        function moveSpace(str) {
            str = str.replace(/  /g," ");
            if(str.indexOf("  ") > -1){
                str = moveSpace(str)
            }
            return str;
        }
        function dqmBase64(str) {
            var dqm = {begin:-1,end:-1};
            var strDQM = [];
            var countDQM = 0;
            for(var i=0;i<str.length;i++){
                if(str[i] == "\""){
                    if(countDQM % 2 == 0){
                        dqm.begin = i+1;
                    }else{
                        dqm.end = i;
                        strDQM.push(str.substring(dqm.begin,dqm.end));
                        init();
                    }
                    countDQM++;
                }
            }
            function init() {
                dqm =  {begin:-1,end:-1};
            }
            for(var i=0;i<strDQM.length;i++){
               // console.log(sq.decode(strDQM[i])[0]);
                str = str.replace(strDQM[i],encodeURIComponent(Base64.encode(strDQM[i])));
            }
            return str;
        }
        function handleArray(a,str) {
            var obj = "";
            for(var i=0;i<a.length;i++){
                //str = str.replace("("+a[i][2]+")",handleArray(a[i][1],a[i][2]));
                str = str.replace("("+a[i][2]+")",a[i][0]);
            }
            if(str.indexOf(" OR ") > -1){
                obj = tranORNode(str.replace("(", "").replace(")", "")).replace(":undefined", "").replace("\"\"", "\"").replace('}"', "}").replace(']"', "]");
            }else if(str.indexOf(" AND ") > -1){
                obj = tranANDNode(str.replace("(", "").replace(")", "")).replace(":undefined", "").replace("\"\"", "\"").replace('}"', "}").replace(']"', "]");
            }else if(str.indexOf("NOT ") > -1){
                obj = tranNOTNode(str.replace("(", "").replace(")", "")).replace(":undefined", "").replace("\"\"", "\"").replace('}"', "}").replace(']"', "]");
            }else{
                obj = turnToNode(str);
            }
            for(var i=0;i<a.length;i++){
                obj = obj.replace(a[i][0],handleArray(a[i][1],a[i][2]));
            }
            return obj
        }
        function handle(str) {
            var obj = new Object();
            var a = {begin:-1,end:-1};
            var count = 0;
            var strArray = [];
            for(var i=0;i<str.length;i++){
                if(str[i] == "("){
                    if(count == 0){ a.begin = i+1;}
                    count++;
                }
                if(str[i] == ")"){
                    count--;
                    if(count == 0){
                        a.end = i;
                        if(str.indexOf("(") !=-1){
                            strArray.push(["sq"+parseInt(Math.random()*10000000000),handle(str.substring(a.begin,a.end)),str.substring(a.begin,a.end)]);
                        }else{
                            return str;
                        }
                        init();
                    }
                }
            }
            function init() {
                count = 0;
                a =  {begin:-1,end:-1};
            }
            //sq.yellow(111)
            return strArray;
        }
        function tranORNode(str) {
            if(str.indexOf(" OR ") > -1){
                var a = str.split(" OR ");
                var tp = "";
                for(var i=0;i<a.length-1;i++){
                    if(i==0){
                        tp = '{"bool":{"should":['+turnToNode(a[i]," AND ")+','+turnToNode(a[i+1]," AND ")+']}}';
                    }else{
                        tp = '{"bool":{"should":['+tp+','+turnToNode(a[i+1]," AND ")+']}}';
                    }
                }
                return tp;
            }else{
                tranANDNode(str);
            }
        }
        function tranANDNode(str) {
            if(str.indexOf(" AND ") > -1){
                var a = str.split(" AND ");
                var tp = "";
                for(var i=0;i<a.length-1;i++){
                    if(i==0){
                        tp = '{"bool":{"must":['+turnToNode(a[i],"NOT ")+','+turnToNode(a[i+1],"NOT ")+']}}';
                    }else{
                        tp = '{"bool":{"must":['+tp+','+turnToNode(a[i+1],"NOT ")+']}}';
                    }
                }
                return tp;
            }else{
                tranNOTNode(str)
            }
        }
        function tranNOTNode(str) {
            if(str.indexOf("NOT ") != -1){
                var a = str.split("NOT ");
                var tp = "";
                for(var i=0;i<a.length-1;i++){
                    if(i==0){
                        tp = '{"bool":{"must_not":['+turnToNode(a[i+1],"Nothing")+']}}';
                    }
                }
                sq.violet(tp);
                return tp;
            }
        }
        function turnToNode(str,op) {
            if(str.indexOf(op) != -1){
                switch (op){
                    case " OR " :
                        return tranORNode(str);
                    case " AND " :
                        return tranANDNode(str);
                    case "NOT " :
                        return tranNOTNode(str);
                }
            }else if(str.indexOf("NOT ") != -1){
                return tranNOTNode(str);
            }else{
                var a = str.split("=");
                if(str.indexOf("=") == -1){
                    return str;
                }
                if(a[0] == "topic"){
                    return '{"multi_match":{"query":'+formula.encodeUnicode(a[1])+',"fields":["AB","TI","CLM"]}}';
                }
                if((a[0] == "PD")||(a[0] == "AD")){
                    var _a1 = a[1].replace(/"/g,"").split("-");
                   // sq.blue(JSON.stringify(_a1))
                    return '{"range":{"'+a[0]+'":{"from":"'+_a1[0]+'","to":"'+_a1[1]+'"}}}';
                }
                if(["PA","AGC","LS","AGT","ADDR","AU","PC"].indexOf(a[0]) != -1){
                    return '{"term":{"'+a[0]+'.keyword":'+formula.encodeUnicode(a[1])+"}}";
                }
                if(["TI","AB","FT","CLM"].indexOf(a[0]) != -1){
                    return '{"match":{"'+a[0]+'":'+formula.encodeUnicode(a[1])+"}}";
                }

                return '{"match":{"'+a[0]+'":'+formula.encodeUnicode(a[1])+"}}";
            }
        }
        var obj = handle(str);
        return handleArray(obj,str);
    }
}