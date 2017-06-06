/**
 * Created by lcz on 2017/6/6.
 */
window.onload=function () {
    //配置xml文件
        if(window.XMLHttpRequest){
            var xmlHttp=new XMLHttpRequest();
        }
        else {
            // code for IE6, IE5
            xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlHttp.open("GET","words-xml/wordlist.xml",false);
        xmlHttp.send();
        xmlDoc=xmlHttp.responseXML;
    //提取xml数据
        var wordlist=document.getElementById("wordlist");
        var words=xmlDoc.getElementsByTagName("word");
        var phonetics=xmlDoc.getElementsByTagName("phonetic");
        var transes=xmlDoc.getElementsByTagName("trans");
    //创建表格的行节点
        for(var n=0;n<words.length;n++){
            var line=document.createElement("tr");
            line.className="line";
            wordlist.appendChild(line);
        }
        var lines=document.getElementsByClassName("line");
    //创建单词单元格
        for(var i=0; i<words.length; i++){
            var word=document.createElement("td");
            word.innerHTML=words[i].innerHTML;
            word.className="word";
            lines[i].appendChild(word);
        }
    //创建音标单元格
        for(var i=0;i<phonetics.length;i++){
            var phonetic=document.createElement("td");
            phonetic.innerHTML=phonetics[i].firstChild.nodeValue;
            phonetic.className="phonetic";
            lines[i].appendChild(phonetic);
        }
    //创建释义单元格
        for(var i=0;i<transes.length;i++){
            var trans=document.createElement("td");

            //创建正则（提取关键释义）
            var pattern=/\w+[.].+?(\s|$)/gi;//gi表示全文匹配，正则用两个反斜杠
            var str=transes[i].firstChild.nodeValue;
            var mean=str.match(pattern);

            trans.innerHTML=mean;
            trans.className="trans";
            lines[i].appendChild(trans);
        }
    //创建书写框
    for(var i=0;i<words.length;i++){
            var inputTD=document.createElement("td");
            var input=document.createElement("input");
            input.setAttribute("type","text");
            inputTD.className="inputword";
            inputTD.appendChild(input);
            lines[i].appendChild(inputTD);
    }
    }
