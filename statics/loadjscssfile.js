// JavaScript Document
function IE(filename,filetype){

    if(filetype == "js"){
        var fileref = document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src",filename);
		//alert("js")
    }else if(filetype){
    
        var fileref = document.createElement('link');
        fileref.setAttribute("rel","stylesheet");
        fileref.setAttribute("type","text/css");
        fileref.setAttribute("href",filename);
    }
   if(typeof fileref != "undefined"){
        document.getElementsByTagName("head")[0].appendChild(fileref);
		//alert(fileref.tagName);
    }
    
}

function loadjscssfile(filename,filetype){

    if(filetype == "js"){
        var fileref = document.createElement('script');
		fileref.type= "text/javascript";
		fileref.src = filename;
        //fileref.setAttribute("type","text/javascript");
        //fileref.setAttribute("src",filename);
		//alert("js")
    }else if(filetype){
    
        var fileref = document.createElement('link');
		fileref.rel = "stylesheet";
		fileref.type = "text/css";
		fileref.href = filename;
        //fileref.setAttribute("rel","stylesheet");
        //fileref.setAttribute("type","text/css");
        //fileref.setAttribute("href",filename);
    }
   if(typeof fileref != "undefined"){
        document.getElementsByTagName("HEAD")[0].appendChild(fileref);
		//alert(fileref.tagName);
    }
    
}
 


loadjscssfile("/statics/XRegExp.js","js")
loadjscssfile("/statics/shCore.js","js")
loadjscssfile("/statics/shBrushGroovy.js","js")
loadjscssfile("/statics/shLegacy.js","js")
loadjscssfile("/statics/shCore.css","css")
loadjscssfile("/statics/shCoreDefault.css","css")

function HighLight(){
SyntaxHighlighter.config.clipboardSwf = 'clipboard.swf';
dp.SyntaxHighlighter.HighlightAll('code');
//alert("OK");
}


