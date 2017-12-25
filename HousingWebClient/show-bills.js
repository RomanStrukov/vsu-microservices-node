
$(document).ready(function () {
    $.mask.definitions['3'] = '[0-3]';
    $.mask.definitions['5'] = '[0-5]';
    var mygrid = $("#list").jqGrid({
        url: 'http://umka.azurewebsites.net/api/SensorsData/ViewInfo/',
        datatype: 'json',
        myType: 'GET',
        colNames: ['Id', 'Date', 'Device Name', 'Sensor Name', 'Value'],
        colModel: [
          { name: 'Id', index: '_id', width: 30, editable: false, hidden: true },
          {
              name: 'Date', width: 250, editable: false, 
              formatter: "date",
              formatoptions: { srcformat: "ISO8601Long", newformat: "m/d/Y h:i A" }
          },
          { name: 'DeviceName', width: 250, editable: false },
          { name: 'SensorName', width: 250, editable: false },
          { name: 'Value', width: 150, editable: false }
          ],


        width: 'auto',
        height: 'auto',
        pager: $('#pager'),
        rowNum: 15,
        rowList: [15, 50, 100],
        gridview: true,
        loadui: true,
        imgpath: '~/jqGrid/css/images'
    })
       .navGrid('#pager', { add: false, edit: false, del: false }
       //updateDialog('PUT'),
       //updateDialog('POST'),
       //updateDialog('DELETE')
        );
})

function myformat(rowObject) {
    return '<font face="times, serif" size="3.5">' + rowObject + '</font>';
}

/*
function updateDialog(action) {
    return {
        url: "/api/SensorsData/"
            , closeAfterAdd: true
            , closeAfterEdit: true
            , afterShowForm: function (formId) { }
            , modal: true
            , onclickSubmit: function (params) {
                var list = $("#list");
                var selectedRow = list.getGridParam("selrow");
                rowData = list.getRowData(selectedRow);
                params.url += rowData.Id;
                params.mtype = action;
            }
            , width: "300"
    };
    };
*/


function updateDialog(action) {
    return {
        url: "http://umka.azurewebsites.net/api/SensorsData/ViewInfo/"
        , closeAfterAdd: true
        , closeAfterEdit: true
        , afterShowForm: function (formId) { }
        , modal: true
        , onclickSubmit: function (params) {
            var list = $("#list");
            var selectedRow = list.getGridParam("selrow");
            rowData = list.getRowData(selectedRow);
            params.url += rowData.id;
            params.mtype = action;
        }
        , width: "300"
    };
}



