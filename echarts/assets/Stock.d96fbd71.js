var t=Object.defineProperty,e=Object.prototype.hasOwnProperty,s=Object.getOwnPropertySymbols,a=Object.prototype.propertyIsEnumerable,r=(e,s,a)=>s in e?t(e,s,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[s]=a;import{m as i,n}from"./index.a14010b3.js";import{d as o}from"./debounce.24fbb78c.js";const c={data:()=>({chartInstance:null,allData:[],currentIndex:0,timerId:null}),computed:((t,i)=>{for(var n in i||(i={}))e.call(i,n)&&r(t,n,i[n]);if(s)for(var n of s(i))a.call(i,n)&&r(t,n,i[n]);return t})({},i(["theme"])),watch:{theme(){this.chartInstance.dispose(),this.initChart(),this.screenAdapter(),this.updateChart()}},created(){},mounted(){this.initChart(),this.getData(),window.addEventListener("resize",o(this.screenAdapter,100)),this.screenAdapter()},destroyed(){window.removeEventListener("resize",o(this.screenAdapter,100)),clearInterval(this.timerId)},methods:{initChart(){this.chartInstance=this.$echarts.init(this.$refs.ref,this.theme);this.chartInstance.setOption({title:{text:"▎库存和销量分析",left:20,top:20}}),this.chartInstance.on("mouseover",(()=>{clearInterval(this.timerId)}))},async getData(){const{data:t}=await this.$http.get("/stock");this.allData=t,this.updateChart()},updateChart(){const t=[["18%","40%"],["50%","40%"],["82%","40%"],["34%","75%"],["66%","75%"]],e=[["#4FF778","#0BA82C"],["#E5DD45","#E8B11C"],["#E8821C","#E55445"],["#5052EE","#AB6EE5"],["#23E5E5","#2E72BF"]],s=5*this.currentIndex,a=5*(this.currentIndex+1),r={series:this.allData.slice(s,a).map(((s,a)=>({type:"pie",center:t[a],avoidLabelOverlap:!1,hoverAnimation:!1,silent:!0,labelLine:{normal:{show:!1},emphasis:{show:!1}},data:[{name:s.name+"\n\n"+s.sales,value:s.sales,itemStyle:{color:new this.$echarts.graphic.LinearGradient(0,1,0,0,[{offset:0,color:e[a][0]},{offset:1,color:e[a][1]}])},label:{show:!0,color:e[a][0],position:"center"}},{value:s.stock,itemStyle:{color:"#333843"}}]})))};this.chartInstance.setOption(r)},screenAdapter(){const t=this.$refs.ref.offsetWidth/100*3.6,e=2.8*t;let s={type:"pie",radius:[1.125*e,e],label:{fontSize:t/2}},a=[];for(let i=0;i<5;i++)a.push(s);const r={title:{textStyle:{fontSize:t}},series:a};this.chartInstance.setOption(r),this.chartInstance.resize()}}},h={};var l=n(c,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"com-container"},[e("div",{ref:"ref",staticClass:"com-chart"})])}),[],!1,(function(t){for(let e in h)this[e]=h[e]}),"34e5b028",null,null).exports;export{l as S};