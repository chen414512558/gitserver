function loginAndRegist(data, url, cb) {
    $.ajax({
        url,
        data,
        dataType:"json",
        type:"post",
    }).then((data)=>{
        if (!data.code) {
            data = data.data;
            cb && cb();
        } else {
            alert(data.message);
        }
    }).catch(e=>{
        alert('哦噢，出错了！');
    })
}

var $form = $('.mycenter');
$('#login').on('click', (ele)=>{
    ele.stopPropagation();
    loginAndRegist($form.serialize(), '', ()=>{
        alert('成功');
        window.location.href = window.document.referrer;
    })
});
$('#regist').on('click', (ele)=>{
    ele.stopPropagation();
    loginAndRegist($form.serialize(), '/login/regist', ()=>{
        alert('成功');
        window.location.href = window.document.referrer;
    })
});
