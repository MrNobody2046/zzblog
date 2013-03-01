$.jqplot('chart1',   [[[1, 2],[3,5.12],[5,13.1],[7,33.6],[9,85.9],[11,219.9]]],
{ title:'chart1',
  axes:{yaxis:{renderer: $.jqplot.LogAxisRenderer}},
 series:[{color:'#5FAB78'}]
});

$.jqplot('chart2',  [[[1, 2],[3,5.12],[9,85.9],[11,219.9]],[[5,13.1],[7,33.6]],[[11,11],[22,34.6]]],
{ title:'chart2',
  axes:{yaxis:{renderer: $.jqplot.LogAxisRenderer, tickDistribution:'power'}},
  series:[{color:'#5FAB78'},{color:'#EE1452'},{color:'#0000EF'}]
});

$(document).ready(function(){
  var plot3 = $.jqplot ('chart3', [[0,7,9,1,4,6,8,2,5],[[1,2,3],[3,4]]], {
      // 坐标图对应的HTML容器ID，传入的数组，一维数会自动自增下标。
      title: 'chart3',
        // x轴标签允许旋转文本
		//坐标默认用canvas来渲染显示，I不支持canvas的浏览器可以修改这里
      axesDefaults: {
        labelRenderer: $.jqplot.CanvasAxisLabelRenderer
      },
      // 所有坐标轴的选项都在axes里面，最多支持9维坐标函数
	//Allowable axes are xaxis, x2axis, yaxis, y2axis, y3axis, ...  
	      axes: {
        // 如果所有的坐标轴都要同一组设置，就写在这里。
        xaxis: {
            label: "x轴标签",
          //为了演示效果，我把一些选项加到x轴上。
            pad:2 ,
		  // 避免数据点落到边缘，如果这里填0，我的第一个点0就会落在轴上，非常不美观
		    min:0,
			max:4,
			numberTicks:10,
			//分10段，可以看到jQPlot自动为我分了十段
        	showTicks: true,
			// wether or not to show the tick labels,
        	showTickMarks: true,
		    // wether or not to show the tick marks
			tickOptions: {
            mark: 'cross',
			// 'outside', 'inside' or 'cross',轴标签的位置
            showMark: true,
            showGridline: true,
			// 网格线
            markSize: 12,  
			// 网格线越过x轴的像素。                     
            show: true,
			// 
            showLabel: true,    
			// 是否显示标签
            formatString: '',   
			// 自定义下标，这里留空，下标显示数字
        }
        },
        yaxis: {
          label: "y轴标签"
        },

      }
    });
});


$(document).ready(function(){
  //jQuery选择器
  var cosPoints = [];
  for (var i=0; i<2*Math.PI; i+=0.4){ 
    cosPoints.push([i, Math.cos(i)]); 
  }
  var sinPoints = []; 
  for (var i=0; i<2*Math.PI; i+=0.4){ 
     sinPoints.push([i, 2*Math.sin(i-.8)]); 
  }
  var powPoints1 = []; 
  for (var i=0; i<2*Math.PI; i+=0.4) { 
      powPoints1.push([i, 2.5 + Math.pow(i/4, 2)]); 
  }
  var powPoints2 = []; 
  for (var i=0; i<2*Math.PI; i+=0.4) { 
      powPoints2.push([i, -2.5 - Math.pow(i/4, 2)]); 
  }
  //用几个简单的循环生成的数据
 
  var plot4 = $.jqplot('chart4', [cosPoints, sinPoints, powPoints1, powPoints2], 
    { 
      title:'chart4', 
      series:[ 
          { //下面这些属性，对应的是线
			lineWidth:2, 
			show: true,     // wether to render the series.
			xaxis: 'xaxis', // either 'xaxis' or 'x2axis'.
			yaxis: 'yaxis', // either 'yaxis' or 'y2axis'.
			label: '红', 
			color: '#FF0000',  
			lineWidth: 5, // 让它宽一点
			shadow: true,   // show shadow or not.
			shadowAngle: 45,    // angle (degrees) of the shadow, clockwise from x axis.
			shadowOffset: 4.25, // offset from the line of the shadow.
			shadowDepth: 3,     // Number of strokes to make when drawing shadow.  Each
								// stroke offset by shadowOffset from the last.
			shadowAlpha: 2,   // Opacity of the shadow.
			showLine: true,     // whether to render the line segments or not.
			showMarker: false,   // render the data point markers or not.
			fill: false,        // fill under the line,
			fillAndStroke: true,       // *stroke a line at top of fill area.
			fillColor: '#EEEEEE',       // *custom fill color for filled lines (default is line color).
			fillAlpha: 0.01,       // *custom alpha to apply to fillColor.
			renderer: $.jqplot.LineRenderer,    // renderer used to draw the series.
			rendererOptions: {}, // options passed to the renderer.  LineRenderer has no options.
			markerRenderer: $.jqplot.MarkerRenderer,    // renderer to use to draw the data
            //下面的属性对应点
            markerOptions: { 
            show: true,// 只显示标记
            style: 'filledCircle',  // circle, diamond, square, filledCircle.
                                    // filledDiamond or filledSquare.
            lineWidth: 2,       // width of the stroke drawing the marker.
            size: 9,            // size (diameter, edge length, etc.) of the marker.
            color: '#FF0000',   // color of marker, set to color of line by default.
            shadow: true,
			// wether to draw shadow on marker or not.
            shadowAngle: 45,
			// angle of the shadow.  Clockwise from x axis.
            shadowOffset:2,
			// offset from the line of the shadow,
            shadowDepth: 3,
			// Number of strokes to make when drawing shadow.  Each stroke
			// offset by shadowOffset from the last.
            shadowAlpha:110.07
			// Opacity of the shadow
	        },
		  },
          {
            showLine:false, 
            markerOptions: { size: 7, style:"x" }
          },
          { 
            markerOptions: { style:"circle" }
          }, 
          {
            lineWidth:5, 
            markerOptions: { style:"filledSquare", size:10 }
          }
      ]
    }
  );
});