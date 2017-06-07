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
            var checkico=document.createElement("b");
            checkico.className="checkico";
            input.setAttribute("type","text");
            inputTD.className="inputword";
            inputTD.appendChild(input);
            inputTD.appendChild(checkico);
            lines[i].appendChild(inputTD);
    }
    //默写检查函数
    var clientinput=document.getElementsByTagName("input");
    var correctword=document.getElementsByClassName("word");
    var correctphonetic=document.getElementsByClassName("phonetic");
    var checks=document.getElementsByClassName("checkico");
    for(var i=0;i<clientinput.length;i++){
        clientinput[i].index=i;
        clientinput[i].onkeyup=function (e) {
            if(e.keyCode==13){
                if(this.value==correctword[this.index].innerHTML){
                    correctword[this.index].style.visibility="visible";
                    correctphonetic[this.index].style.visibility="visible";
                    checks[this.index].innerHTML="√";
                    clientinput[this.index+1].focus();//光标定位到下一个输入框
                }
                else{
                    checks[this.index].innerHTML="×";
                }
            }
        }
    }


    //翻页控制部分
     theTable = document.getElementById("wordlist");
     totalPage = document.getElementById("spanTotalPage");
    pageNum = document.getElementById("spanPageNum");


     spanPre = document.getElementById("spanPre");
    spanNext = document.getElementById("spanNext");
    spanFirst = document.getElementById("spanFirst");
    spanLast = document.getElementById("spanLast");


    numberRowsInTable = theTable.rows.length;
   pageSize = 30;
    page = 1;
    hide();
}



//下一页
function next() {


    hideTable();


    currentRow = pageSize * page;
    maxRow = currentRow + pageSize;
    if (maxRow > numberRowsInTable) maxRow = numberRowsInTable;
    for (var i = currentRow; i < maxRow; i++) {
        theTable.rows[i].style.display = '';
    }
    page++;


    if (maxRow == numberRowsInTable) { nextText(); lastText(); }
    showPage();
    preLink();
    firstLink();
}


//上一页
function pre() {


    hideTable();


    page--;


    currentRow = pageSize * page;
    maxRow = currentRow - pageSize;
    if (currentRow > numberRowsInTable) currentRow = numberRowsInTable;
    for (var i = maxRow; i < currentRow; i++) {
        theTable.rows[i].style.display = '';
    }




    if (maxRow == 0) { preText(); firstText(); }
    showPage();
    nextLink();
    lastLink();
}


//第一页
function first() {
    hideTable();
    page = 1;
    for (var i = 0; i < pageSize; i++) {
        theTable.rows[i].style.display = '';
    }
    showPage();


    preText();
    nextLink();
    lastLink();
}


//最后一页
function last() {
    hideTable();
    page = pageCount();
    currentRow = pageSize * (page - 1);
    for (var i = currentRow; i < numberRowsInTable; i++) {
        theTable.rows[i].style.display = '';
    }
    showPage();


    preLink();
    nextText();
    firstLink();
}


function hideTable() {
    for (var i = 0; i < numberRowsInTable; i++) {
        theTable.rows[i].style.display = 'none';
    }
}


function showPage() {
    pageNum.innerHTML = page;
}


//总共页数
function pageCount() {
    var count = 0;
    if (numberRowsInTable % pageSize != 0) count = 1;
    return parseInt(numberRowsInTable / pageSize) + count;
}


//显示链接
function preLink() { spanPre.innerHTML = "<a href='javascript:pre();'>上一页</a>"; }
function preText() { spanPre.innerHTML = "上一页"; }


function nextLink() { spanNext.innerHTML = "<a href='javascript:next();'>下一页</a>"; }
function nextText() { spanNext.innerHTML = "下一页"; }


function firstLink() { spanFirst.innerHTML = "<a href='javascript:first();'>第一页</a>"; }
function firstText() { spanFirst.innerHTML = "第一页"; }


function lastLink() { spanLast.innerHTML = "<a href='javascript:last();'>最后一页</a>"; }
function lastText() { spanLast.innerHTML = "最后一页"; }


//隐藏表格
function hide() {
    for (var i = pageSize; i < numberRowsInTable; i++) {
        theTable.rows[i].style.display = 'none';
    }


    totalPage.innerHTML = pageCount();
    pageNum.innerHTML = '1';


    nextLink();
    lastLink();
}



