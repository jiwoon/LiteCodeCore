﻿var TableInit = function () {
    var t = new Object();
    t.queryParams = function (params) {
        var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            pageSize: params.limit, //页面大小
            pageIndex: (params.offset === 0) ? 1 : (params.offset / params.limit) + 1, //页码
            //username: $("#txt_search_username").val()
        };
        return temp;
    };
   
    t.Init = function () {
        var tableindex = $('#SysApplicationTable')
            .dataGrid({
                url: '/SysManager/SysApplication/GetListViewModel', //请求后台的URL（*）
                queryParams: t.queryParams, //传递参数（*）
                columns: [
                    {
                        checkbox: true
                    }, {
                        field: 'ApplicationName',
                        title: '应用名称'
                    }, {
                        field: 'ApplicationUrl',
                        title: '网址'
                    }, {
                        field:'CreateTime',
                        title: '创建时间',
                        formatter: AppUI.dateTimeFormat
                    }, {
                        
                        title: '操作',
                        formatter: AppUI.dataGridActionFormat
                    }
                ]
            });
        return tableindex;
    }
    return t;
}
$(document).ready(function () {

    var _t = new TableInit();
    var tindex = _t.Init();
    $(document).on("click","#SysApplicationTable a[data-delete=1]",function () {
                
                var id = $(this).data("id");
                layer.confirm('你确定要删除？', {
                    btn: ['确定', '取消'] //按钮
                }, function (index, layero) {
                    
                    $.get("/SysManager/SysApplication/Delete/", { Id: id }, function () {
                        $("#SysApplicationTable").bootstrapTable('refresh');
                    });

                    layer.close(index);
                }, function (index, layero) {
                    
                    layer.close(index);
                });
            });
});
