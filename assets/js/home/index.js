!function () {
    let btnCreate = document.querySelector('#btn-create');

    btnCreate.onclick = function(){
        $.ajax({
            url:"/createGit",
            data: {username: new Date().getTime()},
            dataType:"json",
            type:"post",
            success:function (data) {
                console.log('crete', data)
                alert('创建分支成功');
                getBranchesInfo();
            },
            error:function (err) {
                console.log(err);
            }
        });
    }

    getBranchesInfo();

    function getBranchesInfo(){
        $.ajax({
            url:"/gitInfo",
            data:{},
            dataType:"json",
            type:"get",
            success:function (data) {
                data = data.data;
                console.log(data);
                let items=[
                    [{v: data.head, f: data.head}, '']
                ];
                data.content.forEach(function (elem) {
                    items.push([elem, data.head]);
                });

                drawChart(items);

            },
            error:function (err) {
                console.log(err);
            }
        });
    }

    function drawChart(myData) {
        myData = myData ? myData : [];
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('string', 'Manager');

        // For each orgchart box, provide the name, manager, and tooltip to show.
        data.addRows(myData);
        var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
        // Draw the chart, setting the allowHtml option to true for the tooltips.
        chart.draw(data, {allowHtml:true});
    }
}()