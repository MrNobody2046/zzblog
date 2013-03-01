
function CheckForm(){ 
    var comment_form = document.getElementById("comment_form")
    var comment_name = comment_form.elements[0]
    var comment_email = comment_form.elements[1]
    var comment_homepage = comment_form.elements[2];
    var comment_content = comment_form.elements[3];
    var error = ""
    need_name = is_empty(comment_name);
    correct_email = not_email(comment_email);
    content_toolittle = comment_content.value.length < 6;
    content_toolong = comment_content.value.length > 200;
    if (need_name){error += "请输入昵称！\n"}
    if (correct_email){error += "请输入正确到Email地址！\n"}
    if (content_toolittle){error += "嗯，多写一点吧\n"}
    if (content_toolong){error += "字数太多，再改改呗！\n"}    
    if (need_name||correct_email||content_toolittle||content_toolong){
    alert(error);
    return false;
    }
    else{return  true;}
    }

   
function is_empty(field)
    {with (field){
    if (value==null||value==""){return true;}
    else{return false;}
    }
}
    
function not_email(field){
    with (field){
    apos=value.indexOf("@")
    dotpos=value.lastIndexOf(".")
    if (apos<1||dotpos-apos<2)
    {return true}
      //{alert(alerttxt);return false}
    else {return false}
    }
}
