$(document).ready(function(){
  var line1 = [['Cup Holder Pinion Bob', 7], ['Generic Fog Lamp', 9], ['HDTV Receiver', 15], 
  ['8 Track Control Module', 12], [' Sludge Pump Fourier Modulator', 3], 
  ['Transcender/Spice Rack', 6], ['Hair Spray Danger Indicator', 18]];
 
  var plot1 = $.jqplot('chart1', [line1], {
    title: 'Concern vs. Occurrance',
    series:[{renderer:$.jqplot.BarRenderer}],
    axesDefaults: {
        tickRenderer: $.jqplot.CanvasAxisTickRenderer ,
        tickOptions: {
		  fontFamily: 'Georgia',
          angle: -30,
          fontSize: '10pt'
        }
    },
    axes: {
      xaxis: {
        renderer: $.jqplot.CategoryAxisRenderer
      }
    }
  });
  
$(document).ready(function(){
  var line1 = [['Cup Holder Pinion Bob', 7], ['Generic Fog Lamp', 9], ['HDTV Receiver', 15], 
  ['8 Track Control Module', 12], [' Sludge Pump Fourier Modulator', 3], 
  ['Transcender/Spice Rack', 6], ['Hair Spray Danger Indicator', 18]];
  var line2 = [['Nickle', 28], ['Aluminum', 13], ['Xenon', 54], ['Silver', 70], 
  ['Sulfer', -15], ['Silicon', 14], ['Vanadium', 23]];
 
  var plot2 = $.jqplot('chart2', [line1, line2], {
	  title:"More Options",
    series:[{renderer:$.jqplot.BarRenderer}, {xaxis:'x2axis', yaxis:'y2axis'}],
    axesDefaults: {
        tickRenderer: $.jqplot.CanvasAxisTickRenderer ,
        tickOptions: {
          angle: 90
        }
    },
    axes: {
      xaxis: {
        renderer: $.jqplot.CategoryAxisRenderer,
        tickOptions: {
          labelPosition: 'end',
		  angle: -30,
        }
      },
      x2axis: {
        tickOptions: {
		  labelPosition: 'start',
		  angle: 90,
        },
        renderer: $.jqplot.CategoryAxisRenderer
      },
      yaxis: {
        autoscale:false,
        tickRenderer: $.jqplot.				CanvasAxisTickRenderer,
        tickOptions: {
          labelPosition: 'start'
        }
      },
      y2axis: {
        autoscale:false,
       }
    }
  });
}); 

$(document).ready(function(){
    var s1 = [200, 600, 700, 1000];
    var s2 = [460, -210, 690, 820];
    var s3 = [-260, -440, 320, 200,1300];    
	// ticks数组必须和s系列匹配，这里我故意多画一个，
    var ticks = ['May', 'June', 'July', 'August','Otc'];
     
    var plot3 = $.jqplot('chart3', [s1, s2, s3], {
		
	//seriesDefaults 是所有的数据都会应用的选项
        seriesDefaults:{
            renderer:$.jqplot.BarRenderer,
            rendererOptions: {fillToZero: true},
	//不开fillToZero，会比较难看，每个数据条的起点会和最低的那个对齐，也就是起点都变低。而不是适应方向
			pointLabels: { show: true, location: 'n', edgeTolerance: -12 },
	//值得注意的是location选项，这里w就是west，老外居然想到东南西北，所以这里有8方向可以选
	//edgeTolerance边缘公差，允许标签超过网格线的距离，-为往外，+为网内
			shadowAngle: 45,
			//阴影角度，我习惯性45，比较有立体感
			rendererOptions: {
                //barDirection: 'horizontal'
			//默认是水平的。去掉注释，图会走样哈！，当然，你可以再次修改x，y轴来让它变成水平的表。
            }
        },
        series:[
            {label:'住店'},
            {label:'注册费'},
            {label:'机票'},
			{label:'打酱油'},
			//这里虽然多了一个打酱油，但是图例里不会增加，因为我只有3组数据
        ],
        //图例放外面，图就会自动缩小给图例让位~当然也可以放里面，
        legend: {
            show: true,
            placement: 'outsideGrid'// 如果选'insideGrid'图例会覆盖到图上
        },
        axes: {
            xaxis: {
                renderer: $.jqplot.CategoryAxisRenderer,
                ticks: ticks
            },
            // pad选项控制柱子到坐标轴的距离，默认是1.2，不要太大，这样图会显得很空，数据会很挤
                yaxis: {
                pad: 1.05,
                tickOptions: {formatString: '$%d'}
				//formatString 可以让定制单位，这里是美元符号！
            }
        }
    });
});

$(document).ready(function(){
    var s1 = [200, 600, 700, 600];
    var s2 = [460, 800, 690, 820];
    var s3 = [600, 440, 320, 200];    
    var ticks = ['May', 'June', 'July', 'August',];
     var plot4 = $.jqplot('chart4', [s1, s2, s3], {
		captureRightClick: true,
		//捕获鼠标动作
		stackSeries: true,
		//堆栈的样式
        seriesDefaults:{
			 

            renderer:$.jqplot.BarRenderer,
            rendererOptions: {fillToZero: true},
			pointLabels: { show: true, location: 'n', edgeTolerance: -12 },
			//shadowAngle: 45,
			rendererOptions: {
				 barMargin: 10,
          highlightMouseDown: true
            }
        },
        series:[
            {label:'通讯',color:'#5FAB78'},
            {label:'礼金',color:'#EE1452'},
            {label:'食品',color:'#3388EF'},
       ],
	   
            legend: {
            show: true,
            placement: 'outsideGrid'// 如果选'insideGrid'图例会覆盖到图上
        },
        axes: {
            xaxis: {
                renderer: $.jqplot.CategoryAxisRenderer,
                ticks: ticks
            },
                yaxis: {
                pad: 1.05,
                tickOptions: {formatString: '%d'}				
            }
        }
    }
	
	);

 $('#chart4').bind('jqplotDataClick', 
    function (ev, seriesIndex, pointIndex, data,seriesLabel) {
      $('#info').html('series: '+seriesIndex+', point: '+pointIndex+', Data'+data[0]);
    });
});
  
});
