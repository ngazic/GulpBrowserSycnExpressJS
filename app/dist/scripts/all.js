"use strict";function ajaxCall(t,e){$.ajax({url:"/test/",dataType:"json",data:{query:t,currentPage:e},type:"POST",success:function(t){var e=$("#foods-table-body"),a=$("#totalFoodList"),n=$("#fromDb");e.empty(),console.log(t),a.text(t.offset+"/"+t.total);var o,d=t.result;n.text(t.fromDb);for(var r=0;r<d.length;r++)(o=$("<tr/>")).append("<td>"+d[r].name+"</td>"),o.append("<td>"+d[r].category+"</td>"),o.append("<td>"+d[r].manu+"</td>"),e.append(o)}})}$(document).ready(function(){for(var e=$(".pagination a"),a=document.getElementsByName("currentPage")[0],t=0;t<e.length;t++)e[t].addEventListener("click",function(t){a.value=t.target.text;var e=document.getElementsByName("query")[0].value;$(".pagination a.active")[0].classList.remove("active"),t.target.classList.add("active"),ajaxCall(e,0<a.value?a.value-1:a)});$("#querySubmit").click(function(){$(".pagination a.active")[0].classList.remove("active"),e[0].classList.add("active");var t=document.getElementsByName("query")[0].value,o=$("#foods-table-body"),d=$("#totalFoodList"),r=$("#fromDb");$.ajax({url:"/test/",dataType:"json",data:{query:t,currentPage:0},type:"POST",success:function(t){o.empty(),d.text(t.offset+"/"+t.total);var e,a=t.result;r.text(t.fromDb);for(var n=0;n<a.length;n++)(e=$("<tr/>")).append("<td>"+a[n].name+"</td>"),e.append("<td>"+a[n].category+"</td>"),e.append("<td>"+a[n].manu+"</td>"),o.append(e)}})})});