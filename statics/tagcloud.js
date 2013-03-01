    function zoom(){
    
    }
    

    window.onload=function(){
        
      var tags=document.getElementById("tags");
      var tag=tags.getElementsByTagName("a");

      function rand(num){
       return parseInt(Math.random()*num+1);
      }
      function randomcolor(){
        
        var str=Math.ceil(Math.random()*16777215).toString(16);
        if(str.length<6){
          str="0"+str;
        }
        return str;
      }
      for( len=tag.length,i=len;i--;){
        tag_weight = tag[i].getAttribute("count_value")
        tag[i].className="color"+rand(5);
        tag[i].style.zIndex=rand(8);
        //alert(Number(tag[i].getAttribute("count_value")))
        tag[i].style.fontSize=Number(tag_weight)*3+ 12 +"px";
       // tag[i].style.background="#"+randomcolor();
        //tag[i].style.color="#"+randomcolor();
        tag[i].onmouseover=function(){
          this.style.fontSize = parseInt(this.style.fontSize) +5+ "px";
          this.style.background="#FF6633";
        }
        tag[i].onmouseout=function(){
          this.style.background="";
          this.style.fontSize = parseInt(this.style.fontSize) - 5+ "px";
        }
      }
}      



