$(document).ready(function(){ 
            var piedata = [['FireFox:3783', 3783], ['IE 9:856', 856], ['IE other:1635', 1635], ['Chrome:2321', 2321], ['Safari:456', 456], ['Opera:612', 612]]; 
            var pie = $.jqplot('chart1', [piedata], {
                title:"PieChart",
				seriesColors: [ "#579575", "#d8b83f", "#ff5800", "#0085cc","#4bb2c5", "#c5b47f", "#EAA228"], 
                series:[{ 
					fontFamily : '微软雅黑',
                    renderer: $.jqplot.PieRenderer,
                    rendererOptions: {
						diameter: 250,						//饼图的直径
                        sliceMargin: 1,//饼的每个部分之间的距离
                        showDataLabels: true,
                        dataLabelNudge: 35,
						shadow:false,
						//为饼的每个部分的边框设置阴影，以突出其立体效果
                    } 
                }],
                legend: {
                    show: true
                }
            });           
        });
		
$(document).ready(function(){
 
            var piedata = [['FireFox:3783', 3783], ['IE 9:856', 856], ['IE other:1635', 1635], ['Chrome:2321', 2321], ['Safari:456', 456], ['Opera:612', 612]];
 
            var pie = $.jqplot('chart2', [piedata], {
                title:"AfterLunch",
seriesColors: [ "#579575", "#d8b83f", "#ff5800", "#0085cc","#4bb2c5", "#c5b47f", "#EAA228"], 
                series:[{ 
					showTooltip: true,
                    renderer: $.jqplot.PieRenderer,
                    rendererOptions: {
						diameter: 250,//饼图的直径
                        sliceMargin: 1,//饼的每个部分之间的距离
                        showDataLabels: true,
                        dataLabelNudge: 35,
						shadow:false,
						//为饼的每个部分的边框设置阴影，以突出其立体效果
						fill:false,//关掉这里就变成空心的
						lineWidth: 5
                    } 					
                }],
				cursor: { show: true,},
                legend: {
					style: 'crosshair',
                    show: true,
					showTooltip: true,
                }
            }); 
        });
$(document).ready(function(){ 
            var piedata = [['FireFox:3783', 3783], ['IE 9:856', 856], ['IE other:1635', 1635], ['Chrome:2321', 2321], ['Safari:456', 456], ['Opera:612', 612]]; 
			var piedata2 = [['FireFox:3783', 2500], ['IE 9:856', 785], ['IE other:1635', 253], ['Chrome:2321', 2321], ['Safari:456', 502], ['Opera:612', 850]];
            var pie = $.jqplot('chart3', [piedata,piedata2], {
                title:"PieChart",
				seriesColors: [ "#579575", "#d8b83f", "#ff5800", "#0085cc","#4bb2c5", "#c5b47f", "#EAA228"], 
                seriesDefaults:{ 
                    renderer: $.jqplot.DonutRenderer,
                    rendererOptions: {
						startAngle: -90,
						//diameter: 250,去掉注释，会叠加而不是分为内外两层
                        sliceMargin: 1,//饼的每个部分之间的距离
                        showDataLabels: true,
                       dataLabelNudge: 12,//标签到每一部分的距离
						shadow:false,
						//为饼的每个部分的边框设置阴影，以突出其立体效果
						dataLabels: 'value'
                    } 
                },
                legend: {
                    show: true
                }
            });           
        });
		
$(document).ready(function(){
 
    var arr = [[11, 123, 1236, "Acura"], [45, 92, 1067, "Alfa Romeo"], 
    [24, 104, 1176, "AM General"], [50, 23, 610, "Aston Martin Lagonda"], 
    [18, 17, 539, "Audi"], [7, 89, 864, "BMW"], [2, 13, 1026, "Bugatti"]];
     
    var plot1 = $.jqplot('chart4',[arr],{
        title: 'Bubble Chart with Gradient Fills',
        seriesDefaults:{
            renderer: $.jqplot.BubbleRenderer,            }
    });
});


$(document).ready(function(){
     
    var arr = [[11, 123, 1236, "Acura"], [45, 92, 1067, "Alfa Romeo"], 
    [24, 104, 1176, "AM General"], [50, 23, 610, "Aston Martin Lagonda"], 
    [18, 17, 539, "Audi"], [7, 89, 864, "BMW"], [2, 13, 1026, "Bugatti"]];
     
    var plot2 = $.jqplot('chart5',[arr],{
        title: 'Transparent Bubbles',
        seriesDefaults:{
            renderer: $.jqplot.BubbleRenderer,
            rendererOptions: {
                bubbleAlpha: 0.6,
                highlightAlpha: 0.8,
				bubbleGradients: true
            },
            shadow: true,
            shadowAlpha: 0.05
        }
    });    
});

$(document).ready(function(){
   
  var arr = [[11, 123, 1236, "Acura"], [45, 92, 1067, "Alfa Romeo"], 
  [24, 104, 1176, "AM General"], [50, 23, 610, "Aston Martin Lagonda"], 
  [18, 17, 539, "Audi"], [7, 89, 864, "BMW"], [2, 13, 1026, "Bugatti"]];
   
  var plot1b = $.jqplot('chart6',[arr],{
    title: 'Tooltip and Custom Legend Highlighting',
    seriesDefaults:{
      renderer: $.jqplot.BubbleRenderer,
      rendererOptions: {
        bubbleAlpha: 0.6,
        highlightAlpha: 0.8,
        showLabels: false
      },
      shadow: true,
      shadowAlpha: 0.05
    }
  });
   
  // Legend is a simple table in the html.
  // Dynamically populate it with the labels from each data value.
  $.each(arr, function(index, val) {
    $('#legend1b').append('<tr><td>'+val[3]+'</td><td>'+val[2]+'</td></tr>');
  });
   
  // Now bind function to the highlight event to show the tooltip
  // and highlight the row in the legend. 
  $('#chart6').bind('jqplotDataHighlight', 
    function (ev, seriesIndex, pointIndex, data, radius) {    
      var chart_left = $('#chart6').offset().left,
        chart_top = $('#chart6').offset().top,
        x = plot1b.axes.xaxis.u2p(data[0]),  // convert x axis unita to pixels
        y = plot1b.axes.yaxis.u2p(data[1]);  // convert y axis units to pixels
      var color = 'rgb(50%,50%,100%)';
      $('#tooltip1b').css({left:chart_left+x+radius+5, top:chart_top+y});
      $('#tooltip1b').html('<span style="font-size:14px;font-weight:bold;color:' + 
      color + ';">' + data[3] + '</span><br />' + 'x: ' + data[0] + 
      '<br />' + 'y: ' + data[1] + '<br />' + 'r: ' + data[2]);
      $('#tooltip1b').show();
      $('#legend1b tr').css('background-color', '#ffffff');
      $('#legend1b tr').eq(pointIndex+1).css('background-color', color);
    });
   
  // Bind a function to the unhighlight event to clean up after highlighting.
  $('#chart6').bind('jqplotDataUnhighlight', 
      function (ev, seriesIndex, pointIndex, data) {
          $('#tooltip1b').empty();
          $('#tooltip1b').hide();
          $('#legend1b tr').css('background-color', '#ffffff');
      });
});