/*
*-------------------------��ȡDOM�ڵ㷽��---------------------
*/

function $(id) {
	return document.getElementById(id);
};

function getByClass(className, context) {
/*
 * ����˵����
 * �����������ڵ�����Ĭ��document������ȡcontext������ΪclassNa�Ľڵ�
 */
	context = context || document;
	if(context.getElementsByClassName) {
		return context.getElementsByClassName(className);
	} else {
		var nodes = [];
		var tags = context.getElementsByTagName('*');
		for(var i=0, len=tags.length; i<len; i++) {
			if(hasClass(tags[i], className)) {
				nodes.push(tags[i]);
			}
		}
		return nodes;
	}
}

function hasClass(node, className) {
/*
 * ����˵����
 * ����ڵ㼰һ�����������ýڵ��Ƿ��д��������
 */
	var names = node.className.split(/\s+/);
	for(var i=0, len=names.length; i<len; i++) {
		if(names[i] == className) {
			return true;
		}
	}
	return false;
}

/*function firstChild(node) {//��ȡnode�ڵ�ĵ�һ��Ԫ�ؽڵ�
	if(node.firstChild) {
		if(node.firstChild.nodeType == 1) {
			return node.firstChild;
		} else {
			var first = node.firstChild;
			while(first = first.nextSibling) {
				if(first.nodeType == 1) {
					return first;
				};
			};
			return null;
		}
	} else {
		return null;
	}
}*/

function getChildNode(superNode, index) {
/*
 * ����˵����
 * ���븸Ԫ�ؽڵ㣬����index˳������ӽڵ㣬��1��ʼ��ע�⣺ֻ���Ԫ�ؽڵ㣩
 * ���������index��index��0���򷵻������ӽڵ�
 */
	if(!superNode.childNodes) return;
	//if (typeof index !== 'number') { alert('��������������'); return; }
	index = Number(index) || 0;
	var subNodes = [];
	var result = null;
	
	for(var i=0, len=superNode.childNodes.length; i<len; i++) {//�õ�������Ԫ�ؽڵ�
		var node = superNode.childNodes[i];
		if(node.nodeType == 1) {
			subNodes.push(node);
		} else {
			continue;
		}
	}
	
	if(index === 0) {
		result = subNodes;
	} else {
		for(var i= 0; i<subNodes.length; i++) {
			subNodes[i].flag = i + 1;
			if(subNodes[i].flag == index) {
				result = subNodes[i];
				break;
			};
		}
	}
	
	return result? result : alert('�����������ֵ��Ӧ���ӽڵ㲻���ڣ�');
}

/*
*---------------------��������---------------------------
*/

function animate(o,start,alter,dur,fx) {
/*
 * ����˵����
 * ���ö���
 * o:Ҫ���ö����Ķ���
 * start:��ʼ�Ķ���
 * alter:�ܵĶ���
 * dur:���������೤ʱ��
 * fx:��������
 */
	var curTime=0;
	var t=setInterval(function () {
		if (curTime>=dur) clearInterval(t);
		for (var i in start) {
			o.style[i]=fx(start[i],alter[i],curTime,dur)+"px";
		}
		curTime+=200;
		
	},50);
	return function () {
		    (t);
	};
}

function opacityAnimate(obj, start, alter, dur, fx) {
/*
 * ����˵����
 * ���ö����͸��������startΪ������㣬alterΪ�����յ㣬durΪ�ܱ仯ʱ�䣬
 * fxΪ�������ͣ�Linear��ʾ���١�Quad��ʾ����
 */
	var curTime = 0;

	var intervalId = setInterval(function() {
		if(curTime >= dur) {
			clearInterval(intervalId);
		}
		setOpacity(obj, fx(start, alter, curTime, dur));
		curTime += 50;
	}, 50);
}

var setOpacity = (document.documentElement.filters) ? function(obj, val) {
/*
 * ����˵����
 * ���ò������obj��opicity͸����Ϊָ��ֵval
 */
	obj.style.filter = "filter: alpha(opacity=" + val + ")";
} : function(obj, val) {
	obj.style.opacity = val/100;
}

var Tween = {
/*
 * ����˵����
 * �����˶�
 * curTime:��ǰʱ��,�������Ѿ������˶೤ʱ��,��ʼʱ��Ϊ0
 * start:��ʼֵ
 * alter:�ܵı仯��
 * dur:���������೤ʱ��
 */
	Linear:function (start,alter,curTime,dur) {return start+curTime/dur*alter;},//��򵥵����Ա仯,�������˶�
	Quad:{//���η�����
		easeIn:function (start,alter,curTime,dur) {
			return start+Math.pow(curTime/dur,2)*alter;
		},
		easeOut:function (start,alter,curTime,dur) {
			var progress =curTime/dur;
			return start-(Math.pow(progress,2)-2*progress)*alter;
		},
		easeInOut:function (start,alter,curTime,dur) {
			var progress =curTime/dur*2;
			return (progress<1?Math.pow(progress,2):-((--progress)*(progress-2) - 1))*alter/2+start;
		}
	},
	Cubic:{//���η�����
		easeIn:function (start,alter,curTime,dur) {
			return start+Math.pow(curTime/dur,3)*alter;
		},
		easeOut:function (start,alter,curTime,dur) {
			var progress =curTime/dur;
			return start-(Math.pow(progress,3)-Math.pow(progress,2)+1)*alter;
		},
		easeInOut:function (start,alter,curTime,dur) {
			var progress =curTime/dur*2;
			return (progress<1?Math.pow(progress,3):((progress-=2)*Math.pow(progress,2) + 2))*alter/2+start;
		}
	},
	Quart:{//�Ĵη�����
		easeIn:function (start,alter,curTime,dur) {
			return start+Math.pow(curTime/dur,4)*alter;
		},
		easeOut:function (start,alter,curTime,dur) {
			var progress =curTime/dur;
			return start-(Math.pow(progress,4)-Math.pow(progress,3)-1)*alter;
		},
		easeInOut:function (start,alter,curTime,dur) {
			var progress =curTime/dur*2;
			return (progress<1?Math.pow(progress,4):-((progress-=2)*Math.pow(progress,3) - 2))*alter/2+start;
		}
	},
	Quint:{//��η�����
		easeIn:function (start,alter,curTime,dur) {
			return start+Math.pow(curTime/dur,5)*alter;
		},
		easeOut:function (start,alter,curTime,dur) {
			var progress =curTime/dur;
			return start-(Math.pow(progress,5)-Math.pow(progress,4)+1)*alter;
		},
		easeInOut:function (start,alter,curTime,dur) {
			var progress =curTime/dur*2;
			return (progress<1?Math.pow(progress,5):((progress-=2)*Math.pow(progress,4) +2))*alter/2+start;
		}
	},
	Sine :{//�������߻���
		easeIn:function (start,alter,curTime,dur) {
			return start-(Math.cos(curTime/dur*Math.PI/2)-1)*alter;
		},
		easeOut:function (start,alter,curTime,dur) {
			return start+Math.sin(curTime/dur*Math.PI/2)*alter;
		},
		easeInOut:function (start,alter,curTime,dur) {
			return start-(Math.cos(curTime/dur*Math.PI/2)-1)*alter/2;
		}
	},
	Expo: {//ָ�����߻���
		easeIn:function (start,alter,curTime,dur) {
			return curTime?(start+alter*Math.pow(2,10*(curTime/dur-1))):start;
		},
		easeOut:function (start,alter,curTime,dur) {
			return (curTime==dur)?(start+alter):(start-(Math.pow(2,-10*curTime/dur)+1)*alter);
		},
		easeInOut:function (start,alter,curTime,dur) {
			if (!curTime) {return start;}
			if (curTime==dur) {return start+alter;}
			var progress =curTime/dur*2;
			if (progress < 1) {
				return alter/2*Math.pow(2,10* (progress-1))+start;
			} else {
				return alter/2* (-Math.pow(2, -10*--progress) + 2) +start;
			}
		}
	},
	Circ :{//Բ�����߻���
		easeIn:function (start,alter,curTime,dur) {
			return start-alter*Math.sqrt(-Math.pow(curTime/dur,2));
		},
		easeOut:function (start,alter,curTime,dur) {
			return start+alter*Math.sqrt(1-Math.pow(curTime/dur-1));
		},
		easeInOut:function (start,alter,curTime,dur) {
			var progress =curTime/dur*2;
			return (progress<1?1-Math.sqrt(1-Math.pow(progress,2)):(Math.sqrt(1 - Math.pow(progress-2,2)) + 1))*alter/2+start;
		}
	},
	Elastic: {//ָ��˥�����������߻���
		easeIn:function (start,alter,curTime,dur,extent,cycle) {
			if (!curTime) {return start;}
			if ((curTime==dur)==1) {return start+alter;}
			if (!cycle) {cycle=dur*0.3;}
			var s;
			if (!extent || extent< Math.abs(alter)) {
				extent=alter;
				s = cycle/4;
			} else {s=cycle/(Math.PI*2)*Math.asin(alter/extent);}
			return start-extent*Math.pow(2,10*(curTime/dur-1)) * Math.sin((curTime-dur-s)*(2*Math.PI)/cycle);
		},
		easeOut:function (start,alter,curTime,dur,extent,cycle) {
			if (!curTime) {return start;}
			if (curTime==dur) {return start+alter;}
			if (!cycle) {cycle=dur*0.3;}
			var s;
			if (!extent || extent< Math.abs(alter)) {
				extent=alter;
				s =cycle/4;
			} else {s=cycle/(Math.PI*2)*Math.asin(alter/extent);}
			return start+alter+extent*Math.pow(2,-curTime/dur*10)*Math.sin((curTime-s)*(2*Math.PI)/cycle);
		},
		easeInOut:function (start,alter,curTime,dur,extent,cycle) {
			if (!curTime) {return start;}
			if (curTime==dur) {return start+alter;}
			if (!cycle) {cycle=dur*0.45;}
			var s;
			if (!extent || extent< Math.abs(alter)) {
				extent=alter;
				s =cycle/4;
			} else {s=cycle/(Math.PI*2)*Math.asin(alter/extent);}
			var progress = curTime/dur*2;
			if (progress<1) {
				return start-0.5*extent*Math.pow(2,10*(progress-=1))*Math.sin( (progress*dur-s)*(2*Math.PI)/cycle);
			} else {
				return start+alter+0.5*extent*Math.pow(2,-10*(progress-=1)) * Math.sin( (progress*dur-s)*(2*Math.PI)/cycle);
			}
		}
	},
	Back:{
		easeIn: function (start,alter,curTime,dur,s){
			if (typeof s == "undefined") {s = 1.70158;}
			return start+alter*(curTime/=dur)*curTime*((s+1)*curTime - s);
		},
		easeOut: function (start,alter,curTime,dur,s) {
			if (typeof s == "undefined") {s = 1.70158;}
			return start+alter*((curTime=curTime/dur-1)*curTime*((s+1)*curTime + s) + 1);
		},
		easeInOut: function (start,alter,curTime,dur,s){
			if (typeof s == "undefined") {s = 1.70158;}
			if ((curTime/=dur/2) < 1) {
				return start+alter/2*(Math.pow(curTime,2)*(((s*=(1.525))+1)*curTime- s));
			}
			return start+alter/2*((curTime-=2)*curTime*(((s*=(1.525))+1)*curTime+ s)+2);
		}
	},
	/*����
	*/
	Bounce:{
		easeIn: function(start,alter,curTime,dur){
			return start+alter-Tween.Bounce.easeOut(0,alter,dur-curTime,dur);
		},
		easeOut: function(start,alter,curTime,dur){
			if ((curTime/=dur) < (1/2.75)) {
				return alter*(7.5625*Math.pow(curTime,2))+start;
			} else if (curTime < (2/2.75)) {
				return alter*(7.5625*(curTime-=(1.5/2.75))*curTime + .75)+start;
			} else if (curTime< (2.5/2.75)) {
				return alter*(7.5625*(curTime-=(2.25/2.75))*curTime + .9375)+start;
			} else {
				return alter*(7.5625*(curTime-=(2.625/2.75))*curTime + .984375)+start;
			}
		},
		easeInOut: function (start,alter,curTime,dur){
			if (curTime< dur/2) {
				return Tween.Bounce.easeIn(0,alter,curTime*2,dur) *0.5+start;
			} else {
				return Tween.Bounce.easeOut(0,alter,curTime*2-dur,dur) *0.5 + alter*0.5 +start;
			}
		}
	}
};

function Player(btns, scrollContent, imgHeight, timeout, hoverClass) {
/*
 * btns:��ť������������
 * scrollContent:ҡ�����Ŀ飬һ��DOM����������ol
 * imgHeight:ÿһ��ͼƬ�ĸ߶ȣ���Ȼ�������ĳ����ҹ��������ﴫ��ÿһ��ͼƬ�Ŀ���Ψһ��Ҫע�����ÿһ��ͼƬ���߱�����ͬ��ͼƬ�����ɵ���
 * timeout:�л��ٶȿ�����Ĭ��Ϊ1.5ms
 * hoverClass:ÿһ����ť����ʱ������
*/
	hoverClass = hoverClass || 'active';
	timeout = timeout || 1200;
	this.btns = btns;
	this.scrollContent = scrollContent;
	this.hoverClass = hoverClass;
	this.timeout = timeout;
	this.imgHeight = imgHeight;


	var _this = this;
	for(var i=0; i<btns.length; i++) {
		this.btns[i].index = i;
		btns[i].onmouseover = function() {
			_this.stop();
			_this.invoke(this.index);
		}
		btns[i].onmouseout = function() {
			_this.start();
		}
	}
	this.invoke(0);
}

Player.prototype = {
	constructor : Player,
	start : function() {
		var _this = this;
		this.stop();
		this.intervalId = setInterval(function() {
			_this.next();
		}, this.timeout);
	},
	stop: function() {
		clearInterval(this.intervalId);
	},
	invoke: function(n) {
		this.pointer = n;
		if(this.pointer >= this.btns.length-1) {

			this.flag = 1
		}
		if(this.pointer <= 0){
		    this.flag = 0		
		}
		this.clearHover();
		this.btns[this.pointer].className = this.hoverClass;
		//this.scrollContent.style.top = parseInt(-this.imgHeight * this.pointer) + 'px';
		var startVal = parseInt(this.scrollContent.style.left) || 0;
		var alterVal = (parseInt(-startVal - this.imgHeight * this.pointer));
		this.animateIterval && this.animateIterval();//���������л�ʱ����
		this.animateIterval=animate(this.scrollContent, {left : startVal},{left : alterVal}, 5000, Tween.Quad.easeIn);
		//����Ĭ������ÿ��ͼ��������ʱ����1s
	},
	next: function() {
	    if(this.flag){
		this.invoke(this.pointer - 1);
		}
		else{
		this.invoke(this.pointer + 1);
		}
	},
	clearHover: function() {
		for(var i=0; i<this.btns.length; i++) {
			this.btns[i].className = '';
		};
	}
}

window.onload = function() {
	var btns = getByClass('btns', $('slider'))[0].getElementsByTagName('li');
	var player = getByClass('player', $('slider'))[0];
	var player = new Player(btns, player,1000,5000, undefined);
	player.start();
	//player.invoke(2);
}

