var Jc=Object.defineProperty;var Qc=(i,e,t)=>e in i?Jc(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var V=(i,e,t)=>Qc(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const At={metaLeft:"MONTHLY DESIGN",metaRight:"JULY 2001 TO 2026",subtitle:["From Information Architecture","to the Architecture of Agency"],subtitleKo:"정보의 구조에서 결정의 구조로",pivot:["정보를 어떻게 배치할 것인가에서","무엇을 누가 정할 것인가로."],hint:"스크롤하세요",s2text:["그냥 켜면 되는 시스템은 없습니다.","어디까지 맡길지는 매번 정해야 합니다."],s3text:["결정은 한 곳에서 내려지지 않습니다.","여러 손을 거쳐 만들어집니다."],s4text:["잘못되면 누구 이름이 불립니까?","“AI가 정했다”는 답이 되지 않습니다."],agency:{label:"AGENCY",sub:"intent · values · judgment"},finalQuestion:"이 문제를 푸는 데 AI가 정말 필요한지 물어야 합니다.",finalFooter:["지도는 완성되지 않습니다.","누가 정하는지는 계속 바뀝니다."],credit:"재해석 — 월간 《디자인》 2001년 7월호 특집 「가상공간의 지도제작자들」",timeline:[{year:"1969",label:"Internet"},{year:"1991",label:"Web"},{year:"1999",label:"Social Web"},{year:"2004",label:"Platform Era"},{year:"2010",label:"Mobile Cloud"},{year:"2022",label:"AI Inflection"},{year:"2026",label:"Agency Era"}],srSummary:"네 장면으로 이어지는 인터랙티브 스크롤 포스터입니다. 첫 장면은 2001년식 인터넷 지도로, 연구·미디어·문화·인프라·거버넌스·시장·커뮤니티 군집이 가는 선으로 이어집니다. 둘째 장면에서 같은 노드들이 추상화된 세계지도 위에 내려앉고, 데이터·주의·자원·결정·책임이 여러 국소 중심 사이를 흐르며 충돌 지점이 표시됩니다. 셋째 장면에서 지도는 행위성의 구조가 됩니다. 인간, 모델, 데이터, 기억, 도구, 인터페이스, 정책, 기관이 위임·제약·평가·중단·기록 같은 방향 있는 관계로 이어지고, 이어서 같은 행위자들이 자동화 정도와 책임 소재라는 두 축 위로 다시 정렬됩니다. 넷째 장면은 출발에서 결과에 이르는 결정 경로들입니다. 자동, 위임, 인간 결정, 공동 결정, 중단, 검토가 놓이고, 결과에서 인간과 기관으로 책임이 역추적됩니다. 마지막에는 이 문제를 푸는 데 AI가 정말 필요한지 묻는 한 문장이 남습니다."},ko=[{id:"signal",t:"SIGNAL",s:"",pos:{x:.68,y:.08}},{id:"amplify",t:"AMPLIFY",s:"",pos:{x:.08,y:.18}},{id:"filter",t:"FILTER",s:"",pos:{x:.63,y:.56}},{id:"conflict",t:"CONFLICT",s:"",pos:{x:.22,y:.45}},{id:"emerge",t:"EMERGE",s:"",pos:{x:.85,y:.8}},{id:"control",t:"CONTROL",s:"",pos:{x:.42,y:.06}}],jc=[{title:"지도 읽기 — 2001",rows:[{cls:"ck-communities",kind:"dot",text:"node — 활동이 일어나는 자리"},{cls:"lg-neutral",kind:"line",text:"link — 사이트 간 참조"},{cls:"lg-drift",kind:"line",text:"flow — 이동 중인 트래픽"}]},{title:"무엇이 움직이는가",rows:[{cls:"ek-data",kind:"line",text:"data"},{cls:"ek-attention",kind:"line",text:"attention"},{cls:"ek-resource",kind:"line",text:"resources"},{cls:"ek-decision",kind:"line",text:"decisions"},{cls:"ek-responsibility",kind:"line",text:"responsibility"},{cls:"lg-x",kind:"x",text:"conflict"}]},{title:"누가 누구에게 작용하는가",rows:[{cls:"ek-enables",kind:"line",text:"enables"},{cls:"ek-informs",kind:"line",text:"informs"},{cls:"ek-delegates",kind:"line",text:"delegates"},{cls:"ek-constrains",kind:"line",text:"constrains"},{cls:"ek-evaluates",kind:"line",text:"evaluates"},{cls:"ek-overrides",kind:"line",text:"overrides"},{cls:"ek-records",kind:"line",text:"records"},{cls:"ek-accountable",kind:"line",text:"accountable — 책임을 진다"}]},{title:"결과는 어떤 경로로 생기는가",rows:[{cls:"ek-desired",kind:"line",text:"desired — 검토된 길"},{cls:"ek-automated",kind:"line",text:"automated — 검토 없는 길"},{cls:"ek-delegated",kind:"line",text:"delegated"},{cls:"ek-override",kind:"line",text:"override"},{cls:"ek-feedback",kind:"line",text:"feedback"},{cls:"ek-responsibility4",kind:"line",text:"responsibility — 역추적"}]}],ed=[{at:"HUMAN",text:"책임 — HUMAN",dy:48},{at:"INSTITUTION",text:"책임 — INSTITUTION",dy:48}];function Hn(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const Wt=[{id:"research",label:"Research",cls:"ck-research",anchor:{x:.63,y:.17},world:{x:.7,y:.22},spread:.08,count:7,labelDy:-30},{id:"media",label:"Media",cls:"ck-media",anchor:{x:.76,y:.1},world:{x:.17,y:.28},spread:.078,count:6,labelDy:-30},{id:"culture",label:"Culture",cls:"ck-culture",anchor:{x:.9,y:.3},world:{x:.85,y:.67},spread:.072,count:6,labelDy:-30},{id:"infrastructure",label:"Infrastructure",cls:"ck-infrastructure",anchor:{x:.24,y:.66},world:{x:.82,y:.3},spread:.09,count:7,labelDy:32},{id:"governance",label:"Governance",cls:"ck-governance",anchor:{x:.62,y:.36},world:{x:.49,y:.19},spread:.068,count:5,labelDy:-30},{id:"markets",label:"Markets",cls:"ck-markets",anchor:{x:.84,y:.58},world:{x:.26,y:.62},spread:.078,count:6,labelDy:32},{id:"communities",label:"Communities",cls:"ck-communities",anchor:{x:.52,y:.78},world:{x:.5,y:.48},spread:.095,count:7,labelDy:32}],Xs={research:"MODEL",media:"INTERFACE",culture:"MEMORY",infrastructure:"TOOL",governance:"POLICY",markets:"INSTITUTION",communities:"HUMAN"},ca=i=>Wt.find(e=>e.id===i),Wn=i=>({pos:ca(i).anchor,label:"",sub:"",note:"",style:"dot"}),Xn=(i,e)=>({pos:ca(i).world,label:ca(i).label,sub:"",note:e,style:"center"}),tr=[{id:"MODEL",cls:"ck-research",s1:Wn("research"),s2:Xn("research","모델이 만들어지는 곳. 시장이 돈을 대고, 정책이 테두리를 정합니다."),s3:{pos:{x:.74,y:.26},label:"MODEL",sub:"inference · prediction",note:"추론하고 예측하고 시뮬레이션합니다. 규모에서는 확신에 차 있지만, 보여준 적 없는 위험은 보지 못합니다.",style:"actor"},s4:{pos:{x:.32,y:.26},label:"DELEGATE",sub:"to model or system",note:"일을 모델이나 시스템에 넘깁니다. 속도를 얻고, 검토하지 않으면 시야를 잃습니다.",style:"stage"}},{id:"HUMAN",cls:"ck-communities",s1:Wn("communities"),s2:Xn("communities","결과를 실제로 겪는 곳. 가장 늦게 의견을 묻는 곳."),s3:{pos:{x:.22,y:.28},label:"HUMAN",sub:"intent · values · judgment",note:"의도를 세우고 판단을 쥡니다. 일은 위임할 수 있어도 책임은 위임되지 않습니다.",style:"actor"},s4:{pos:{x:.34,y:.64},label:"DECIDE",sub:"as human",note:"사람이 판단하고 서명합니다. 가장 느린 길이자, 저자가 가장 분명한 길.",style:"stage"}},{id:"INTERFACE",cls:"ck-media",s1:Wn("media"),s2:Xn("media","주의가 배분되는 곳. 무엇이 퍼질지가 여기서 정해집니다."),s3:{pos:{x:.26,y:.8},label:"INTERFACE",sub:"interaction → action",note:"상호작용이 행동이 되는 자리. 기본값은 조용한 결정입니다.",style:"actor"},s4:{pos:{x:.55,y:.44},label:"DECIDE",sub:"together",note:"사람과 시스템이 함께 결정합니다. 판단은 나뉘지만 책임은 나뉘지 않습니다.",style:"stage"}},{id:"MEMORY",cls:"ck-culture",s1:Wn("culture"),s2:Xn("culture","공유된 기억. 플랫폼보다 오래 남는 느린 신호들."),s3:{pos:{x:.78,y:.78},label:"MEMORY",sub:"context · history",note:"맥락과 이력. 무엇이 기억되는가가 무엇을 결정할 수 있는가를 제한합니다.",style:"actor"}},{id:"TOOL",cls:"ck-infrastructure",s1:Wn("infrastructure"),s2:Xn("infrastructure","배관과 연산. 고장 나기 전까지는 보이지 않습니다."),s3:{pos:{x:.52,y:.88},label:"TOOL",sub:"systems · automation",note:"주어진 틀 안에서 정확히 실행합니다. 왜 실행되는지는 알지 못합니다.",style:"actor"}},{id:"POLICY",cls:"ck-governance",s1:Wn("governance"),s2:Xn("governance","규칙이 쓰이는 곳. 대개 일이 벌어진 뒤에 쓰입니다."),s3:{pos:{x:.1,y:.53},label:"POLICY",sub:"rules · priorities · constraints",note:"미리 쓰인 규칙과 우선순위. 사람이 검토하거나, 아무도 검토하지 않거나.",style:"actor"},s4:{pos:{x:.7,y:.24},label:"OVERRIDE",sub:"challenge or stop",note:"이의를 제기하거나 멈출 권한. 제때 행사할 수 있어야 실재합니다.",style:"stage"}},{id:"INSTITUTION",cls:"ck-markets",s1:Wn("markets"),s2:Xn("markets","자원이 움직이는 곳. 속도는 보상받고, 부담은 미뤄집니다."),s3:{pos:{x:.42,y:.1},label:"INSTITUTION",sub:"structures · incentives",note:"구조와 유인. 느리게 움직이고 뒤집기 어렵습니다. 책임이 최종적으로 내려앉는 곳.",style:"actor"},s4:{pos:{x:.72,y:.7},label:"REVIEW",sub:"evaluate consequences",note:"결과를 살피고 기록합니다. 위임을 견딜 만하게 만드는 고리.",style:"stage"}},{id:"DATA",cls:"ck-data",s3:{pos:{x:.88,y:.52},label:"DATA",sub:"observations · traces",note:"관측과 흔적. 애초에 부분적입니다. 무엇을 기록할지 누군가 골랐습니다.",style:"actor"}},{id:"START",cls:"ck-terminal",s4:{pos:{x:.05,y:.5},label:"START",sub:"",note:"결정을 요구하는 상황.",style:"terminal"}},{id:"OUTCOME",cls:"ck-terminal",s4:{pos:{x:.94,y:.48},label:"OUTCOME",sub:"in the world",note:"세계에 생긴 변화. 이름이 불리든 아니든, 저자가 있습니다.",style:"terminal"}}],ri=new Map(tr.map(i=>[i.id,i]));function zt(i,e){const t=ri.get(i);return[t.s1,t.s2,t.s3,t.s4][e-1].pos}const br=i=>({x:Math.min(.98,Math.max(.02,i.x)),y:Math.min(.98,Math.max(.02,i.y))}),Xt=(()=>{const i=Hn(20010726),e=[];let t=0;for(const n of Wt)for(let s=0;s<n.count;s++){const r=i()*Math.PI*2,a=n.spread*(.35+.75*i()),o=br({x:n.anchor.x+Math.cos(r)*a,y:n.anchor.y+Math.sin(r)*a*.85}),l=i()*Math.PI*2,c=n.spread*(.5+1.1*i()),h=br({x:n.world.x+Math.cos(l)*c,y:n.world.y+Math.sin(l)*c*.8}),u=t%5===0,d=br(u?{x:.88+(i()-.5)*.05,y:.52+(i()-.5)*.07}:{x:.5+(h.x-.5)*1.12,y:.5+(h.y-.5)*1.12});e.push({id:`f${t}`,cluster:n.id,cls:n.cls,p1:o,p2:h,p3:d,appear:.025+i()*.1,r:1.8+i()*1.6,drift:i()<.3}),t++}return e})(),jl=new Map(Xt.map(i=>[i.id,i])),co={HUMAN:{x:.04,y:.97},INSTITUTION:{x:.32,y:.74},POLICY:{x:.19,y:.6},INTERFACE:{x:.5,y:.45},MEMORY:{x:.34,y:.14},DATA:{x:.55,y:.01},TOOL:{x:.82,y:.3},MODEL:{x:.99,y:.06}};function td(i){const e=co[i];return e?{x:.1+e.x*.7,y:.88-e.y*.72}:null}const da=(()=>{const i=Hn(77),e=[];for(const n of Xt)e.push({from:n.id,to:Xs[n.cluster],kind:"intra",appear:Math.min(.16,n.appear+.02),drift:!1});for(const n of Wt){const s=Xt.filter(r=>r.cluster===n.id);for(let r=0;r+2<s.length;r+=3)e.push({from:s[r].id,to:s[r+2].id,kind:"intra",appear:.06+i()*.08,drift:!1})}[["research","media"],["media","culture"],["research","governance"],["infrastructure","governance"],["governance","markets"],["markets","culture"],["communities","media"],["communities","governance"],["infrastructure","research"],["communities","markets"]].forEach(([n,s],r)=>{e.push({from:Xs[n],to:Xs[s],kind:"inter",appear:.095+r*.008,drift:!0})});for(let n=0;n<6;n++){const s=Xt[Math.floor(i()*Xt.length)],r=Xt[Math.floor(i()*Xt.length)];s.id===r.id||s.cluster===r.cluster||e.push({from:s.id,to:r.id,kind:"inter",appear:.13+i()*.04,drift:i()<.5})}return e})(),ha=[{a:"TOOL",b:"MODEL",type:"data",curv:-.06,w:[.285,.325]},{a:"MEMORY",b:"INTERFACE",type:"data",curv:.14,w:[.295,.34]},{a:"TOOL",b:"INTERFACE",type:"data",curv:.1,w:[.305,.35]},{a:"INTERFACE",b:"HUMAN",type:"attention",curv:.08,w:[.315,.355]},{a:"INTERFACE",b:"INSTITUTION",type:"attention",curv:-.05,w:[.325,.365]},{a:"HUMAN",b:"MEMORY",type:"attention",curv:-.07,w:[.33,.37]},{a:"INSTITUTION",b:"MODEL",type:"resource",curv:.1,w:[.345,.385]},{a:"INSTITUTION",b:"TOOL",type:"resource",curv:.14,w:[.355,.395]},{a:"HUMAN",b:"INSTITUTION",type:"resource",curv:.05,w:[.36,.4]},{a:"POLICY",b:"TOOL",type:"decision",curv:-.08,w:[.375,.415]},{a:"POLICY",b:"INSTITUTION",type:"decision",curv:.06,w:[.385,.425]},{a:"HUMAN",b:"POLICY",type:"decision",curv:.07,w:[.39,.43]},{a:"MODEL",b:"POLICY",type:"responsibility",curv:-.05,w:[.405,.445]},{a:"INSTITUTION",b:"POLICY",type:"responsibility",curv:-.09,w:[.41,.45]}],nr=[{x:.33,y:.4},{x:.6,y:.26},{x:.46,y:.41}],ir=[{a:"DATA",b:"MODEL",type:"informs",group:0,curv:.05},{a:"MEMORY",b:"MODEL",type:"informs",group:0,curv:.12},{a:"DATA",b:"HUMAN",type:"informs",group:0,curv:-.34},{a:"TOOL",b:"MODEL",type:"enables",group:0,curv:-.1},{a:"INTERFACE",b:"HUMAN",type:"enables",group:0,curv:.06},{a:"HUMAN",b:"MODEL",type:"delegates",group:1,curv:.06},{a:"HUMAN",b:"TOOL",type:"delegates",group:1,curv:-.16},{a:"MODEL",b:"TOOL",type:"delegates",group:1,curv:.08},{a:"POLICY",b:"MODEL",type:"constrains",group:2,curv:.18},{a:"POLICY",b:"TOOL",type:"constrains",group:2,curv:-.1},{a:"INSTITUTION",b:"POLICY",type:"enables",group:2,curv:-.08},{a:"HUMAN",b:"MODEL",type:"evaluates",group:2,curv:.15},{a:"HUMAN",b:"MODEL",type:"overrides",group:3,curv:.26},{a:"INTERFACE",b:"MEMORY",type:"records",group:3,curv:.12},{a:"TOOL",b:"DATA",type:"records",group:3,curv:-.1},{a:"HUMAN",b:"INSTITUTION",type:"accountable",group:3,curv:-.14}],ho=[[.545,.59],[.585,.63],[.625,.67],[.665,.715]],ua=[{id:"automated",type:"automated",anchors:["START",{x:.15,y:.36},"MODEL",{x:.66,y:.32},"OUTCOME"],w:[.775,.82],label:"automated — 빠르지만 검토 없음",labelAt:.62},{id:"desired",type:"desired",anchors:["START","HUMAN","INTERFACE","INSTITUTION","OUTCOME"],w:[.795,.85],label:"desired — 느리지만 검토됨",labelAt:.42},{id:"delegated",type:"delegated",anchors:["START","MODEL","INTERFACE","OUTCOME"],w:[.815,.86],label:"delegated — 위임",labelAt:.55},{id:"override",type:"override",anchors:["MODEL",{x:.5,y:.15},"POLICY",{x:.53,y:.42},"HUMAN"],w:[.835,.88],label:"override — 중단",labelAt:.35},{id:"feedback",type:"feedback",anchors:["OUTCOME",{x:.87,y:.67},"INSTITUTION",{x:.52,y:.74},"HUMAN"],w:[.855,.895],label:"feedback — 되먹임",labelAt:.5},{id:"responsibility",type:"responsibility",anchors:["START",{x:.19,y:.6},"HUMAN",{x:.54,y:.62},"INSTITUTION","OUTCOME"],w:[.875,.925],reverse:!0,label:"responsibility — 역추적된 책임",labelAt:.5}];function _e(i,e,t){const n=document.createElement(i);return e&&(n.className=e),t!==void 0&&(n.textContent=t),n}const nd="http://www.w3.org/2000/svg";function it(i,e){const t=document.createElementNS(nd,i);return e&&t.setAttribute("class",e),t}function lt(i,e){const t=String(Math.round(e*100)/100);i.dataset.o!==t&&(i.dataset.o=t,i.style.opacity=t,i.style.visibility=e<=.01?"hidden":"visible")}const kn=i=>i<0?0:i>1?1:i,Yt=(i,e,t)=>i+(e-i)*t,fa=(i,e,t)=>({x:Yt(i.x,e.x,t),y:Yt(i.y,e.y,t)}),fe=(i,e,t)=>t<=e?i>=t?1:0:kn((i-e)/(t-e)),ct=i=>i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2,uo=i=>1-Math.pow(1-i,3),wt=(i,e,t,n,s)=>Math.min(fe(i,e,t),1-fe(i,n,s)),Go=[.662,.706],hs=[.668,.716];function Ri(i){return wt(i,Go[0],Go[1],.722,.756)}class id{constructor(){V(this,"gAxis");V(this,"xAxis");V(this,"yAxis");V(this,"ticks",[]);V(this,"box");V(this,"xLabel");V(this,"yLabel");V(this,"lastKey","")}mount(e,t){this.gAxis=it("g","g-axis"),this.xAxis=it("line","axis-line"),this.yAxis=it("line","axis-line"),this.gAxis.append(this.xAxis,this.yAxis);for(let n=0;n<8;n++){const s=it("line","axis-tick");this.gAxis.appendChild(s),this.ticks.push(s)}e.svg.insertBefore(this.gAxis,e.svg.firstChild),this.box=_e("div","axis-caption"),this.box.appendChild(_e("div","axis-title","다시 정렬 — 같은 행위자, 다른 축")),e.textLayer.appendChild(this.box),this.xLabel=_e("div","axis-x-label"),this.xLabel.appendChild(_e("span","","HUMAN-RUN")),this.xLabel.appendChild(_e("span","axis-arrow","———— 자동화 정도 ————▸")),this.xLabel.appendChild(_e("span","","AUTOMATED")),e.textLayer.appendChild(this.xLabel),this.yLabel=_e("div","axis-y-label","▲ 책임을 진다   ·   지지 않는다 ▼"),e.textLayer.appendChild(this.yLabel)}update(e){const t=wt(e.p,hs[0],hs[0]+.016,hs[1]-.016,hs[1]);if(this.gAxis.style.opacity=t.toFixed(2),this.gAxis.style.display=t<=.01?"none":"",lt(this.box,t),lt(this.xLabel,t),lt(this.yLabel,t),t<=.01)return;const n=e.proj({x:.06,y:.94}),s=e.proj({x:.96,y:.94}),r=e.proj({x:.06,y:.08}),a=`${e.rectKey}|${Math.round(t*20)}`;if(a!==this.lastKey){this.lastKey=a;const h=(u,d,f)=>{u.setAttribute("x1",d.x.toFixed(1)),u.setAttribute("y1",d.y.toFixed(1)),u.setAttribute("x2",f.x.toFixed(1)),u.setAttribute("y2",f.y.toFixed(1))};h(this.xAxis,n,s),h(this.yAxis,n,r),this.ticks.forEach((u,d)=>{if(d<4){const f=e.proj({x:.06+(d+1)/5*.9,y:.94});h(u,f,{x:f.x,y:f.y+5})}else{const f=e.proj({x:.06,y:.94-(d-3)/5*.86});h(u,{x:f.x-5,y:f.y},f)}})}const o=e.proj({x:.06,y:.02});this.box.style.transform=`translate(${o.x.toFixed(1)}px, ${(o.y-34).toFixed(1)}px)`;const l=e.proj({x:.5,y:.94});this.xLabel.style.transform=`translate(${l.x.toFixed(1)}px, ${(l.y+16).toFixed(1)}px) translateX(-50%)`;const c=e.proj({x:.015,y:.5});this.yLabel.style.transform=`translate(${(c.x-14).toFixed(1)}px, ${c.y.toFixed(1)}px) translate(-50%, -50%) rotate(-90deg)`}}new Set(Object.keys(co));function es(i,e,t,n=24){const s=(i.x+e.x)/2,r=(i.y+e.y)/2,a=e.x-i.x,o=e.y-i.y,l=Math.hypot(a,o)||1,c=s+-o/l*t,h=r+a/l*t,u=[];for(let d=0;d<=n;d++){const f=d/n,_=1-f;u.push({x:_*_*i.x+2*_*f*c+f*f*e.x,y:_*_*i.y+2*_*f*h+f*f*e.y})}return u}function fo(i,e=48){if(i.length<2)return i.slice();const t=[],n=s=>i[Math.max(0,Math.min(i.length-1,s))];for(let s=0;s<=e;s++){const r=s/e*(i.length-1),a=Math.min(i.length-2,Math.floor(r)),o=r-a,l=n(a-1),c=n(a),h=n(a+1),u=n(a+2),d=o*o,f=d*o;t.push({x:.5*(2*c.x+(-l.x+h.x)*o+(2*l.x-5*c.x+4*h.x-u.x)*d+(-l.x+3*c.x-3*h.x+u.x)*f),y:.5*(2*c.y+(-l.y+h.y)*o+(2*l.y-5*c.y+4*h.y-u.y)*d+(-l.y+3*c.y-3*h.y+u.y)*f)})}return t}function ts(i,e,t){const n=i.length-1,s=kn(e)*n,r=Math.min(n-1,Math.floor(s)),a=s-r,o=t(i[r]),l=t(i[r+1]);return{x:Yt(o.x,l.x,a),y:Yt(o.y,l.y,a),angle:Math.atan2(l.y-o.y,l.x-o.x)*180/Math.PI}}function sd(i,e,t,n){if(t-e<=.002)return"";const s=i.length-1,r=kn(e)*s,a=kn(t)*s,o=d=>{const f=Math.min(s-1,Math.floor(d)),_=d-f;return{x:Yt(i[f].x,i[f+1].x,_),y:Yt(i[f].y,i[f+1].y,_)}},l=d=>{const f=n(d);return`${f.x.toFixed(1)} ${f.y.toFixed(1)}`},c=[`M ${l(o(r))}`],h=Math.ceil(r),u=Math.floor(a);for(let d=h;d<=u;d++)c.push(`L ${l(i[d])}`);return a>u&&c.push(`L ${l(o(a))}`),c.join(" ")}const pa="http://www.w3.org/2000/svg";function po(i,e,t,n,s=1){const r=document.createElementNS(pa,"path");r.setAttribute("class",e),i.appendChild(r);let a=null;return a=document.createElementNS(pa,"path"),a.setAttribute("class",`arrow ${e}`),a.setAttribute("d",`M0 0 L${-7*s} ${2.7*s} L${-7*s} ${-2.7*s} Z`),i.appendChild(a),{path:r,arrow:a,pts:t,lastGeom:"",lastOpacity:-1,hidden:!1,drawnT0:0,drawnT1:0}}function Ii(i,e,t){const n=e.opacity>.01&&e.t1-e.t0>.002;if(i.drawnT0=e.t0,i.drawnT1=e.t1,!n){i.hidden||(i.path.style.display="none",i.arrow&&(i.arrow.style.display="none"),i.hidden=!0);return}i.hidden&&(i.path.style.display="",i.hidden=!1);const s=`${e.t0.toFixed(3)}|${e.t1.toFixed(3)}|${e.rectKey}`;if(s!==i.lastGeom&&(i.lastGeom=s,i.path.setAttribute("d",sd(i.pts,e.t0,e.t1,t)),i.arrow))if(e.arrowAtStart?e.t0<.015:e.t1>.985){const o=ts(i.pts,e.arrowAtStart?Math.max(e.t0,.001):e.t1,t),l=e.arrowAtStart?o.angle+180:o.angle;i.arrow.style.display="",i.arrow.setAttribute("transform",`translate(${o.x.toFixed(1)} ${o.y.toFixed(1)}) rotate(${l.toFixed(1)})`)}else i.arrow.style.display="none";const r=Math.round(e.opacity*100)/100;r!==i.lastOpacity&&(i.lastOpacity=r,i.path.style.opacity=String(r),i.arrow&&(i.arrow.style.opacity=String(r)))}function ec(i,e,t,n,s=2){const r=document.createElementNS(pa,"circle");return r.setAttribute("class",`particle ${e}`),r.setAttribute("r",String(s)),r.style.display="none",i.appendChild(r),{el:r,phase:t,speed:n}}function tc(i,e,t,n){const s=e.drawnT1-e.drawnT0;if(e.hidden||s<.25||e.lastOpacity<.3){i.el.style.display!=="none"&&(i.el.style.display="none");return}const r=i.phase+t*i.speed,a=e.drawnT0+(r-Math.floor(r))*s,o=ts(e.pts,a,n);i.el.style.display!==""&&(i.el.style.display=""),i.el.setAttribute("cx",o.x.toFixed(1)),i.el.setAttribute("cy",o.y.toFixed(1)),i.el.style.opacity=String(Math.min(.85,e.lastOpacity))}const rd=620,sr=[.2,.3],Di=[.44,.54],rr=[.72,.8],Tr=[.16,.385,.64,.875,.985],Ho=[.28,.51,.77,.94],Vo=720;function nc(i){const e=ct(fe(i,sr[0],sr[1])),t=ct(fe(i,Di[0],Di[1])),n=ct(fe(i,rr[0],rr[1]));return[1-e,e*(1-t),t*(1-n),n]}function Ys(i,e){const t=(i.appear-.025)/.1,n=ct(fe(e,Di[0]+t*.04,Di[1]-.03+t*.03));if(n>0)return fa(i.p2,i.p3,n);const s=ct(fe(e,sr[0]+t*.04,sr[1]-.03+t*.03));return s>=1?i.p2:s>0?fa(i.p1,i.p2,s):i.p1}function ar(i,e){const t=fe(e,i.appear,i.appear+.03),n=1-.88*ct(fe(e,Di[0],Di[1])),s=1-fe(e,rr[0],rr[0]+.06);return t*n*s}function ns(i,e){const t=nc(e),n=[i.s1,i.s2,i.s3,i.s4];let s=0,r=0,a=0,o=-1,l=0;for(let c=0;c<4;c++){const h=n[c],u=t[c];!h||u<=0||(s+=u,r+=h.pos.x*u,a+=h.pos.y*u,u>l&&(l=u,o=c))}return s<.02||o<0?null:{pos:{x:r/s,y:a/s},opacity:Math.min(1,s*1.15),spec:n[o],sceneIdx:o}}const is=(i,e)=>0;function ad(i,e,t){return kn(t)>=.5?e:i}class Ui{constructor(e,t){V(this,"last",null);this.el=e}set(e,t,n,s){const r=ad(e,t,n);r!==this.last&&(this.last=r,this.el.textContent=r,this.el.style.visibility=r===""?"hidden":"visible")}window(e,t,n,s,r,a,o){t<=n?this.set("","",1,o):t<s?this.set("",e,fe(t,n,s),o):t<=r?this.set(e,e,1,o):this.set(e,"",fe(t,r,a),o)}}class od{constructor(){V(this,"majors",[]);V(this,"rels",[]);V(this,"agencyZone")}mount(e,t){tr.forEach((n,s)=>{const r=_e("button",`major ${n.cls}`);r.type="button",r.dataset.id=n.id;const a=_e("span","m-ring"),o=_e("span","m-label"),l=_e("span","m-sub");r.append(a,o,l),e.htmlLayer.appendChild(r),this.majors.push({def:n,btn:r,labelScr:new Ui(o,101+s),subScr:new Ui(l,131+s),lastSpec:null,lastInteractive:!1,hidden:!0}),r.style.display="none"}),this.agencyZone=_e("div","agency-zone"),this.agencyZone.appendChild(_e("div","az-label",At.agency.label)),this.agencyZone.appendChild(_e("div","az-sub",At.agency.sub)),e.htmlLayer.appendChild(this.agencyZone);for(const n of ir){const s=es(zt(n.a,3),zt(n.b,3),n.curv,28),r=po(e.gRels,`ek-${n.type}`,s);this.rels.push({def:n,handle:r,lastState:""})}}update(e){const{p:t}=e;this.majors.forEach((r,a)=>{const o=ns(r.def,t);let l=o?o.opacity:0,c=1;if(o&&o.sceneIdx===0&&(c=ct(fe(t,.02+a*.004,.04+a*.004)),l*=c),o&&!r.def.s4&&t>.72&&(l*=1-fe(t,.722,.752)),o&&t>.93){const M=r.def.id==="HUMAN"||r.def.id==="INSTITUTION"||r.def.id==="OUTCOME"||r.def.id==="START";l*=M?1-fe(t,.928,.962):1-fe(t,.922,.948)}if(!o||l<=.02){r.hidden||(r.btn.style.display="none",r.hidden=!0);return}r.hidden&&(r.btn.style.display="",r.hidden=!1),r.lastSpec!==o.spec&&(r.lastSpec=o.spec,r.btn.dataset.style=o.spec.style,r.btn.dataset.note=o.spec.note,r.btn.dataset.label=o.spec.label||r.def.id,r.btn.setAttribute("aria-label",o.spec.note?`${o.spec.label||r.def.id}. ${o.spec.note}`:r.def.id)),this.renderMajorText(r,e);let h=o.pos;const u=Ri(t);if(u>.001){const M=td(r.def.id);M&&(h=fa(h,M,u))}r.btn.classList.toggle("is-sorted",u>.4);const d=e.proj(h,e.depthOf(r.def.id)),f=c<1?` scale(${(.3+.7*c).toFixed(3)})`:"";r.btn.style.transform=`translate(${d.x.toFixed(1)}px, ${d.y.toFixed(1)}px) translate(-50%, -50%)${f}`,r.btn.style.opacity=l.toFixed(2);const _=o.spec.note!==""&&l>.45&&o.sceneIdx>=1&&t<.945;_!==r.lastInteractive&&(r.lastInteractive=_,r.btn.tabIndex=_?0:-1,r.btn.style.pointerEvents=_?"auto":"none",r.btn.setAttribute("aria-hidden",_?"false":"true")),r.btn.classList.toggle("is-selected",e.selection===r.def.id)});const n=wt(t,.5,.56,.7,.765);if(lt(this.agencyZone,n),n>.01){const r=e.proj({x:.485,y:.46}),a=Math.min(e.w,e.h)*(e.mobile?.34:.3);this.agencyZone.style.width=`${a.toFixed(0)}px`,this.agencyZone.style.height=`${a.toFixed(0)}px`,this.agencyZone.style.transform=`translate(${(r.x-a/2).toFixed(1)}px, ${(r.y-a/2).toFixed(1)}px)`}if(e.webgl)return;const s=t>.5&&t<.82;for(const r of this.rels){if(!s){Ii(r.handle,{t0:0,t1:0,opacity:0,rectKey:e.rectKey},e.proj);continue}const a=ho[r.def.group],o=ct(fe(t,.535+r.def.group*.008,.575+r.def.group*.008)),l=ct(fe(t,.72,.785)),c=t>=a[0]&&t<=a[1]+.012,h=t>a[1]+.012,u=e.selection===r.def.a||e.selection===r.def.b,d=e.selection?u?"active":"latent":c?"active":h?"past":"latent";d!==r.lastState&&(r.lastState=d,r.handle.path.classList.toggle("is-latent",d==="latent"),r.handle.path.classList.toggle("is-past",d==="past"),r.handle.arrow&&(r.handle.arrow.classList.toggle("is-latent",d==="latent"),r.handle.arrow.classList.toggle("is-past",d==="past")));let f=o>0?d==="active"?.95:d==="past"?.55:.4:0;f*=1-fe(t,.74,.79),f*=1-.82*Ri(t),e.selection&&!u&&(f*=.5),Ii(r.handle,{t0:l,t1:o,opacity:f,rectKey:e.rectKey},e.proj)}}renderMajorText(e,t){const n=is(t.p,t.t),s=[e.def.s1,e.def.s2,e.def.s3,e.def.s4];let r=-1,a=-1;for(let h=0;h<4;h++)s[h]&&t.mix[h]>.001&&(r<0?r=h:a=h);if(r<0)return;const o=s[r];if(a<0){e.labelScr.set(o.label,o.label,1,n),e.subScr.set(o.sub,o.sub,1,n);return}const l=s[a],c=ct(fe(t.mix[a]/(t.mix[r]+t.mix[a]),.25,.75));e.labelScr.set(o.label,l.label,c,n),e.subScr.set(o.sub,l.sub,c,n)}ambient(e){for(const n of this.majors)n.hidden||this.renderMajorText(n,e);if(e.webgl||e.p<=.5||e.p>=.82)return;const t=`${(-(e.t*6)).toFixed(1)}px`;for(const n of this.rels)n.handle.hidden||(n.handle.path.style.strokeDashoffset=t)}}class ld{constructor(){V(this,"popup");V(this,"popupTitle");V(this,"popupNote");V(this,"hoverId",null);V(this,"stickyId",null);V(this,"ctx")}mount(e,t){this.ctx=t,this.popup=_e("div","annot"),this.popup.setAttribute("role","note"),this.popup.style.visibility="hidden",this.popupTitle=_e("div","annot-title"),this.popupNote=_e("div","annot-note"),this.popup.append(this.popupTitle,this.popupNote),e.annotLayer.appendChild(this.popup);const n=s=>s instanceof Element?s.closest(".major"):null;e.htmlLayer.addEventListener("pointerover",s=>{if(s.pointerType!=="mouse")return;const r=n(s.target);r!=null&&r.dataset.id&&(this.hoverId=r.dataset.id,this.apply())}),e.htmlLayer.addEventListener("pointerout",s=>{s.pointerType==="mouse"&&n(s.target)&&(this.hoverId=null,this.apply())}),e.htmlLayer.addEventListener("click",s=>{const r=n(s.target);r!=null&&r.dataset.id&&(this.stickyId=this.stickyId===r.dataset.id?null:r.dataset.id,this.apply())}),e.htmlLayer.addEventListener("focusin",s=>{const r=n(s.target);r!=null&&r.dataset.id&&(this.hoverId=r.dataset.id,this.apply())}),e.htmlLayer.addEventListener("focusout",()=>{this.hoverId=null,this.apply()}),e.stage.addEventListener("click",s=>{!n(s.target)&&this.stickyId&&(this.stickyId=null,this.apply())}),document.addEventListener("keydown",s=>{s.key==="Escape"&&(this.stickyId||this.hoverId)&&(this.stickyId=null,this.hoverId=null,this.apply())})}apply(){this.ctx.setSelection(this.stickyId??this.hoverId)}update(e){const t=e.selection;if(!t){this.popup.style.visibility="hidden";return}const n=ri.get(t),s=n?ns(n,e.p):null;if(!n||!s||s.opacity<.4||s.spec.note===""||e.p>.945){this.stickyId=null,this.hoverId=null,this.ctx.setSelection(null),this.popup.style.visibility="hidden";return}this.popupTitle.textContent=s.spec.label||n.id,this.popupNote.textContent=s.spec.note,this.popup.style.visibility="visible"}}class cd{constructor(){V(this,"routes",[]);V(this,"chips",[]);V(this,"particles",[])}mount(e,t){ua.forEach((n,s)=>{const r=n.anchors.map(u=>typeof u=="string"?zt(u,4):u),a=fo(r,56),o=n.type==="responsibility"?"ek-responsibility4":`ek-${n.type}`,l=po(e.gRoutes,o,a,!0,n.type==="responsibility"?1.3:1),c=_e("div","route-tag",n.label);e.htmlLayer.appendChild(c);const h=new Set(n.anchors.filter(u=>typeof u=="string"));this.routes.push({def:n,handle:l,tag:c,touches:h}),this.particles.push(ec(e.gRoutes,o,s*.29%1,.04+s%2*.014))});for(const n of ed){const s=_e("div","chip",n.text);e.htmlLayer.appendChild(s),this.chips.push({el:s,def:n})}}update(e){const{p:t}=e,n=t>.74;if(e.webgl){this.routes.forEach(s=>{const r=n&&t>s.def.w[1]?fe(t,s.def.w[1],s.def.w[1]+.014)*(1-fe(t,.925,.955)):0;if(lt(s.tag,r),r>.01){const a=ts(s.handle.pts,s.def.labelAt,e.proj);s.tag.style.transform=`translate(${a.x.toFixed(1)}px, ${(a.y-12).toFixed(1)}px) translate(-50%, -50%)`}}),this.updateChips(e,n);return}for(const s of this.routes){if(!n){Ii(s.handle,{t0:0,t1:0,opacity:0,rectKey:e.rectKey},e.proj),lt(s.tag,0);continue}const r=ct(fe(t,s.def.w[0],s.def.w[1])),a=s.def.reverse?1-r:0,o=s.def.reverse?1:r;let l=r>0?.92:0;const c=s.def.type==="responsibility"?.5:.9;l*=1-c*fe(t,.93,.975),e.selection&&!s.touches.has(e.selection)&&(l*=.25),Ii(s.handle,{t0:a,t1:o,opacity:l,rectKey:e.rectKey,arrowAtStart:s.def.reverse},e.proj);const h=fe(t,s.def.w[1],s.def.w[1]+.014)*(1-fe(t,.925,.955))*(l>.3?1:.3);if(lt(s.tag,h),h>.01){const u=ts(s.handle.pts,s.def.labelAt,e.proj);s.tag.style.transform=`translate(${u.x.toFixed(1)}px, ${(u.y-12).toFixed(1)}px) translate(-50%, -50%)`}}this.updateChips(e,n)}updateChips(e,t){for(const n of this.chips){const s=t?fe(e.p,.9,.928)*(1-fe(e.p,.935,.962)):0;if(lt(n.el,s),s>.01){const r=e.proj(zt(n.def.at,4),e.depthOf(n.def.at));n.el.style.transform=`translate(${r.x.toFixed(1)}px, ${(r.y+n.def.dy).toFixed(1)}px) translate(-50%, 0)`}}}ambient(e){if(e.webgl||e.p<=.74)return;const t=`${(-(e.t*7)).toFixed(1)}px`;this.routes.forEach((n,s)=>{n.handle.hidden||(n.handle.path.style.strokeDashoffset=t),tc(this.particles[s],n.handle,e.t,e.proj)})}}const or=["111,166,224","143,209,79","232,148,92","219,193,82","167,159,201","224,118,104","156,153,143"],lr=["143,209,79","111,190,52","182,236,106","212,240,96","94,160,44"],Wo=[.02,.2],Xo=[.12,.24],qs=.24;function ic(i,e,t=!1){if(i>=qs)return"";const n=ct(fe(i,Wo[0],Wo[1])),s=ct(fe(i,Xo[0],Xo[1]));let r=1.11-.61*n;return t&&(r/=1.11),`translateY(${(-1.3*e*s).toFixed(1)}px) perspective(1100px) rotateY(${(-32*n).toFixed(2)}deg) scale(${r.toFixed(3)})`}function dd(){const i=Hn(20010701),e=-.35*Math.PI,t=1.72*Math.PI,n=[];for(let r=0;r<620;r++){const a=i(),o=e+t*a+(i()-.5)*.02,l=.5+.55*a;n.push({ang:o,r0:.16+i()*.04,r1:(.45+.6*i())*l+.3,alpha:.22+i()*.4,w:.45+i()*.4,shade:Math.floor(i()*lr.length)})}const s=[];for(let r=0;r<26;r++){const a=r/25,o=e+t*(a+(i()-.5)*.02),l=(.55+.45*i())*(.5+.55*a)+.32,c=[],h=2+Math.floor(i()*3);for(let u=0;u<h;u++){const d=(i()-.5)*.09,f=(i()-.5)*.09,_=10+Math.floor(i()*16);for(let M=0;M<_;M++)c.push({dx:d+(i()-.5)*.07,dy:f+(i()-.5)*.07,r:.6+i()*1.7,shade:Math.floor(i()*lr.length),phase:i()*Math.PI*2})}s.push({ang:o,rad:l,dots:c})}return{filaments:n,blobs:s}}const Yn=(i,e,t)=>({x:e.x+(i()-.5)*2*t,y:e.y+(i()-.5)*2*t});function us(i,e,t,n,s){const r=(e.x+t.x)/2,a=(e.y+t.y)/2,o=t.x-e.x,l=t.y-e.y,c=Math.hypot(o,l)||1,h=(i()-.5)*2*n;return{a:e,ctrl:{x:r+-l/c*h,y:a+o/c*h},b:t,delay:i()*.5,span:.4+i()*.2,trail:.12+i()*.14,color:or[s%or.length],width:.7+i()*.9,alpha:.16+i()*.26}}const Yo=(i,e)=>{const t=1-e;return{x:t*t*i.a.x+2*t*e*i.ctrl.x+e*e*i.b.x,y:t*t*i.a.y+2*t*e*i.ctrl.y+e*e*i.b.y}};function hd(){const i=Hn(20260728),e=["HUMAN","MODEL","DATA","MEMORY","TOOL","INTERFACE","POLICY","INSTITUTION"],t=[];for(let o=0;o<150;o++){const l=Wt[o%Wt.length],c=Yn(i,l.anchor,.07),h=i()*Math.PI*2,u=.45+i()*.55,d={x:c.x+Math.cos(h)*u,y:c.y+Math.sin(h)*u};t.push(us(i,d,c,.12,o%Wt.length))}const n=[];for(let o=0;o<220;o++){const l=Wt[o%Wt.length];n.push(us(i,Yn(i,l.anchor,.08),Yn(i,l.world,.09),.22,o%Wt.length))}const s=[];for(let o=0;o<220;o++){const l=Wt[Math.floor(i()*Wt.length)],c=e[o%e.length],h=ri.get(c).s3.pos;s.push(us(i,Yn(i,l.world,.13),Yn(i,h,.045),.2,o%or.length))}const r=zt("OUTCOME",4),a=[];for(let o=0;o<190;o++){const l=e[o%e.length],c=ri.get(l),h=Yn(i,c.s4?c.s4.pos:c.s3.pos,.09);a.push(us(i,h,Yn(i,r,.03),.16,o%or.length))}return[{w0:.004,w1:.055,streaks:t},{w0:.24,w1:.35,streaks:n},{w0:.43,w1:.555,streaks:s},{w0:.71,w1:.815,streaks:a}]}class ud{constructor(){V(this,"canvas");V(this,"c2d");V(this,"phases",[]);V(this,"burst");V(this,"sizeKey","");V(this,"lastFrameKey","");V(this,"lastTransform","");V(this,"playing",!1);V(this,"filmT",0);V(this,"bloomStart",0);V(this,"lastTickMs",0);V(this,"lastP",0);V(this,"playLabel")}mount(e,t){this.canvas=document.createElement("canvas"),this.canvas.className="film-canvas",this.canvas.setAttribute("aria-hidden","true"),e.stage.insertBefore(this.canvas,e.svg.parentElement),this.c2d=this.canvas.getContext("2d"),this.phases=hd(),this.burst=dd(),this.playLabel=document.createElement("div"),this.playLabel.className="film-play-label",this.playLabel.textContent="탭하면 재생",e.textLayer.appendChild(this.playLabel),e.stage.addEventListener("click",n=>{if(this.lastP>=qs)return;const s=n.target;s instanceof Element&&(s.closest(".major")||s.closest(".annot"))||(this.playing=!this.playing,this.lastTickMs=performance.now(),this.playLabel.textContent=this.playing?"재생 중 — 탭하면 정지":"탭하면 재생",this.lastFrameKey="")})}resize(e){const t=Math.min(2,window.devicePixelRatio||1),n=`${e.w}x${e.h}@${t}`;n!==this.sizeKey&&(this.sizeKey=n,this.canvas.width=Math.round(e.w*t),this.canvas.height=Math.round(e.h*t),this.c2d.setTransform(t,0,0,t,0,0),this.lastFrameKey="")}update(e){this.resize(e);const t=e.p;this.lastP=t;const n=t<qs,s=ic(t,e.h);s!==this.lastTransform&&(this.lastTransform=s,this.canvas.style.transform=s);const r=n&&!e.reduced?1-fe(t,.03,.06):0;this.playLabel.style.opacity=r.toFixed(2),this.playLabel.style.visibility=r<=.01?"hidden":"visible",this.bloomStart===0&&(this.bloomStart=performance.now());const a=n?`${Math.floor(this.filmT*30)}.${Math.floor(this.bloomProgress()*60)}`:"0",o=`${t.toFixed(5)}|${e.rectKey}|${a}`;if(o===this.lastFrameKey)return;this.lastFrameKey=o;const l=this.c2d,c=e.w,h=e.h;l.clearRect(0,0,c,h),l.lineCap="round";const u=e.reduced?0:1-ct(fe(t,.02,.13));n&&this.renderBurst(l,c,h,e.reduced,u);const d=e.reduced?void 0:this.phases.find(f=>t>f.w0&&t<f.w1&&f.w0>=.2&&!n);if(d){const f=Math.min(fe(t,d.w0,d.w0+.025),1-fe(t,d.w1-.025,d.w1));if(f>.01){const _=fe(t,d.w0,d.w1);for(const M of d.streaks){const m=ct(fe(_,M.delay,M.delay+M.span));if(m<=0||m>=1)continue;const p=Math.min(1,m*(1+M.trail)),A=Math.max(0,m*(1+M.trail)-M.trail);if(p-A<.005)continue;l.strokeStyle=`rgba(${M.color},${(M.alpha*f).toFixed(3)})`,l.lineWidth=M.width,l.beginPath();const w=5;for(let T=0;T<=w;T++){const E=e.proj(Yo(M,A+(p-A)*T/w));T===0?l.moveTo(E.x,E.y):l.lineTo(E.x,E.y)}l.stroke();const S=e.proj(Yo(M,p));l.fillStyle=`rgba(${M.color},${(Math.min(.75,M.alpha+.25)*f).toFixed(3)})`,l.beginPath(),l.arc(S.x,S.y,M.width*1.1,0,Math.PI*2),l.fill()}}}}renderBurst(e,t,n,s,r){r>.005&&(e.fillStyle=`rgba(3,5,2,${(.985*r).toFixed(3)})`,e.fillRect(0,0,t,n));const a=s?1:this.bloomProgress(),o=this.filmT*.1,l=t*.66,c=n*.62,h=Math.hypot(t,n)*.3*(.92+.08*a),u=1.05,d=Math.sin(u),f=Math.cos(u),_=950,M=(w,S)=>{const T=w+o,E=Math.cos(T)*S*h,R=Math.sin(T)*S*h,x=-R*d,b=R*f,D=_/(_+b);return{x:l+E*D,y:c+x*D,s:D}};for(const w of this.burst.filaments){const S=M(w.ang,w.r0),T=M(w.ang,w.r0+(w.r1-w.r0)*a);e.strokeStyle=`rgba(${lr[w.shade]},${(w.alpha*(.35+.65*a)).toFixed(3)})`,e.lineWidth=w.w*(.7+.5*T.s),e.beginPath(),e.moveTo(S.x,S.y),e.lineTo(T.x,T.y),e.stroke()}const m=fe(a,.45,1);if(m>0)for(const w of this.burst.blobs){const S=M(w.ang,w.rad*(.85+.15*a));for(const T of w.dots){const E=s?1:.7+.3*Math.sin(this.filmT*1.4+T.phase);e.fillStyle=`rgba(${lr[T.shade]},${(.75*m*E).toFixed(3)})`;const R=T.r*S.s*(.6+.4*m);e.beginPath(),e.arc(S.x+T.dx*h*S.s,S.y+T.dy*h*S.s*f,R,0,Math.PI*2),e.fill()}}const p=Math.hypot(t,n)*.052*(.25+.75*a),A=e.createRadialGradient(l,c,p*.1,l,c,p);A.addColorStop(0,"rgba(168,217,108,0.95)"),A.addColorStop(.75,"rgba(134,197,64,0.9)"),A.addColorStop(1,"rgba(95,163,50,0)"),e.fillStyle=A,e.beginPath(),e.ellipse(l,c,p,p*.82,0,0,Math.PI*2),e.fill(),e.strokeStyle=`rgba(246,244,239,${(.25*Math.max(.35,r)).toFixed(3)})`,e.lineWidth=1,e.strokeRect(.5,.5,t-1,n-1)}bloomProgress(){return this.bloomStart===0?0:uo(kn((performance.now()-this.bloomStart-120)/1800))}ambient(e){const t=performance.now();this.playing&&!e.reduced&&this.lastP<qs&&(this.filmT+=Math.min(.1,(t-this.lastTickMs)/1e3)),this.lastTickMs=t,this.update(e)}}const fs=[.648,.75];class fd{constructor(){V(this,"box");V(this,"dataVal");V(this,"opened",0);V(this,"lastReadout","")}mount(e,t){this.box=_e("div","triad"),this.box.appendChild(_e("div","triad-title","서로 바뀝니다 — AI × 바이브코딩"));const n=_e("div","triad-rows"),s=(r,a)=>{const o=_e("div","triad-row");o.appendChild(_e("span","triad-k",r));const l=_e("span","triad-v",a);return o.appendChild(l),n.appendChild(o),l};s("FORM","2001년 표지를 다시 그린 화면"),s("CODE","이 화면을 만드는 소스"),this.dataVal=s("DATA","당신이 방금 만든 기록"),this.box.appendChild(n),this.box.appendChild(_e("div","triad-note","설명하면 코드가 되고, 실행하면 데이터가 되고, 그 데이터가 다시 화면이 됩니다. 이 작업도 그렇게 만들어졌습니다.")),e.textLayer.appendChild(this.box)}render(e){const t=wt(e.p,fs[0],fs[0]+.03,fs[1]-.025,fs[1]);if(lt(this.box,t),t<=.01)return;this.opened===0&&(this.opened=e.t);const n=Math.max(0,Math.round(e.t-this.opened)),s=`스크롤 ${Math.round(e.p*100)}% · 머문 시간 ${n}초`;s!==this.lastReadout&&(this.lastReadout=s,this.dataVal.textContent=s)}update(e){this.render(e)}ambient(e){this.render(e)}}class pd{constructor(){V(this,"lines",[]);V(this,"dots",[]);V(this,"lives",[]);V(this,"labels",[]);V(this,"gEdges");V(this,"gField")}mount(e,t){this.gEdges=e.gEdges1,this.gField=e.gField;for(const s of da){const r=it("line",`e1-${s.kind}${s.drift?" e1-drift":""}`);this.gEdges.appendChild(r),this.lines.push({el:r,def:s,lastKey:"",hidden:!1})}const n=Hn(9091);for(const s of Xt){const r=it("circle",`fnode ${s.cls}`);r.setAttribute("r",s.r.toFixed(1)),this.gField.appendChild(r),this.dots.push({el:r,def:s,lastKey:"",hidden:!1}),this.lives.push({amp:1.2+n()*1.8,fx:.5+n()*.9,fy:.5+n()*.9,px:n()*Math.PI*2,py:n()*Math.PI*2,period:5+n()*6,phase:n()})}Wt.forEach((s,r)=>{const a=_e("div","cluster-label",s.label);e.htmlLayer.appendChild(a),this.labels.push({el:a,idx:r})})}endpointPos(e,t){const n=jl.get(e);if(n)return Ys(n,t);const s=ri.get(e);if(s){const r=ns(s,t);return r?r.pos:null}return null}update(e){const{p:t}=e;if(e.webgl){this.updateLabels(e);return}const n=t<.27;for(const s of this.lines){if(!n){s.hidden||(s.el.style.display="none",s.hidden=!0);continue}const r=fe(t,s.def.appear,s.def.appear+.045),a=fe(t,.195,.25),o=r*(1-a)*(s.def.kind==="intra"?.55:.8);if(o<=.01){s.hidden||(s.el.style.display="none",s.hidden=!0);continue}s.hidden&&(s.el.style.display="",s.hidden=!1);const l=this.endpointPos(s.def.from,t),c=this.endpointPos(s.def.to,t);if(!l||!c)continue;const h=e.proj(l),u=e.proj(c),d=Yt(h.x,u.x,r),f=Yt(h.y,u.y,r),_=Yt(h.x,u.x,a),M=Yt(h.y,u.y,a),m=`${_.toFixed(1)},${M.toFixed(1)},${d.toFixed(1)},${f.toFixed(1)},${o.toFixed(2)}`;m!==s.lastKey&&(s.lastKey=m,s.el.setAttribute("x1",_.toFixed(1)),s.el.setAttribute("y1",M.toFixed(1)),s.el.setAttribute("x2",d.toFixed(1)),s.el.setAttribute("y2",f.toFixed(1)),s.el.style.opacity=o.toFixed(2))}for(const s of this.dots){const r=ar(s.def,t);if(r<=.01){s.hidden||(s.el.style.display="none",s.hidden=!0);continue}s.hidden&&(s.el.style.display="",s.hidden=!1);const a=e.proj(Ys(s.def,t)),o=`${a.x.toFixed(1)},${a.y.toFixed(1)},${r.toFixed(2)}`;o!==s.lastKey&&(s.lastKey=o,s.el.setAttribute("cx",a.x.toFixed(1)),s.el.setAttribute("cy",a.y.toFixed(1)),s.el.style.opacity=r.toFixed(2))}this.updateLabels(e)}updateLabels(e){const{p:t}=e;for(const{el:n,idx:s}of this.labels){const r=Wt[s],a=.075+s*.014,o=wt(t,a,a+.03,.2,.25);if(lt(n,o),o>.01){const l=e.proj(r.anchor,e.depthOf(Xs[r.id]));n.style.transform=`translate(${l.x.toFixed(1)}px, ${(l.y+r.labelDy).toFixed(1)}px) translate(-50%, -50%)`}}}ambient(e){if(e.p>=.27)return;const t=`${(-(e.p*320+e.t*7)).toFixed(1)}px`;for(const r of this.lines)r.def.drift&&!r.hidden&&(r.el.style.strokeDashoffset=t);const n=e.t,s=1-fe(e.p,.19,.25);s<=0||this.dots.forEach((r,a)=>{if(r.hidden)return;const o=ar(r.def,e.p);if(o<=.01)return;const l=this.lives[a],c=(n/l.period+l.phase)%1,h=Math.min(fe(c,0,.16),1-fe(c,.78,1)),u=e.proj(Ys(r.def,e.p)),d=l.amp*s;r.el.setAttribute("cx",(u.x+Math.cos(n*l.fx+l.px)*d).toFixed(1)),r.el.setAttribute("cy",(u.y+Math.sin(n*l.fy+l.py)*d).toFixed(1));const f=1-s*(1-h);r.el.setAttribute("r",(r.def.r*(.4+.75*f)).toFixed(2)),r.el.style.opacity=(o*(.08+.92*f)).toFixed(2),r.lastKey=""})}}const $s=["HUMAN","INSTITUTION","POLICY","MODEL","DATA","MEMORY","TOOL","INTERFACE"],md={HUMAN:"HUM",INSTITUTION:"INST",POLICY:"POL",MODEL:"MOD",DATA:"DATA",MEMORY:"MEM",TOOL:"TOOL",INTERFACE:"IF"},ps=[.575,.735],Ar=46,ui=74,ms=62,gd=i=>i/$s.length*Math.PI*2-Math.PI/2;class _d{constructor(){V(this,"box");V(this,"chords",[]);V(this,"rimDots",new Map);V(this,"lastState",new WeakMap)}mount(e,t){this.box=_e("div","ring"),this.box.setAttribute("role","img"),this.box.setAttribute("aria-label","인접 링: 여덟 행위자를 원주에 놓고, 관계를 유형별 현으로 이어 그린 도표."),this.box.appendChild(_e("div","ring-title","인접 관계 — 누가 누구에게"));const n=it("svg","ring-svg");n.setAttribute("viewBox","0 0 148 124"),n.setAttribute("aria-hidden","true");const s=it("circle","ring-rim");s.setAttribute("cx",String(ui)),s.setAttribute("cy",String(ms)),s.setAttribute("r",String(Ar)),n.appendChild(s);for(const r of ir){const a=$s.indexOf(r.a),o=$s.indexOf(r.b);if(a<0||o<0)continue;const l=this.point(a),c=this.point(o),u=.15+.55*(Math.abs((a-o+8)%8-4)/4),d=it("path",`ring-chord ek-${r.type}`);d.setAttribute("d",`M ${l.x.toFixed(1)} ${l.y.toFixed(1)} Q ${(ui+(l.x+c.x-2*ui)*u).toFixed(1)} ${(ms+(l.y+c.y-2*ms)*u).toFixed(1)} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`),n.appendChild(d),this.chords.push({el:d,rel:r})}$s.forEach((r,a)=>{const o=this.point(a),l=it("circle","ring-node");l.setAttribute("cx",o.x.toFixed(1)),l.setAttribute("cy",o.y.toFixed(1)),l.setAttribute("r","2.6"),n.appendChild(l),this.rimDots.set(r,l);const c=this.point(a,Ar+11),h=it("text","ring-label");h.setAttribute("x",c.x.toFixed(1)),h.setAttribute("y",(c.y+2.6).toFixed(1)),h.setAttribute("text-anchor",c.x>ui+3?"start":c.x<ui-3?"end":"middle"),h.textContent=md[r],n.appendChild(h)}),this.box.appendChild(n),e.textLayer.appendChild(this.box)}point(e,t=Ar){const n=gd(e);return{x:ui+Math.cos(n)*t,y:ms+Math.sin(n)*t}}update(e){const{p:t}=e,n=wt(t,ps[0],ps[0]+.025,ps[1]-.025,ps[1]);if(lt(this.box,n),!(n<=.01)){for(const s of this.chords){const r=ho[s.rel.group],a=fe(t,.575+s.rel.group*.01,.61+s.rel.group*.01),o=e.selection===s.rel.a||e.selection===s.rel.b,l=e.selection?o:t>=r[0]&&t<=r[1]+.012,c=`${a>.5?1:0}${l?"a":"l"}`;this.lastState.get(s.el)!==c&&(this.lastState.set(s.el,c),s.el.style.opacity=a<=.02?"0":l?"0.95":"0.3",s.el.classList.toggle("is-latent",!l))}for(const[s,r]of this.rimDots)r.classList.toggle("is-selected",e.selection===s)}}}const ma=[{a:"DATA",b:"MODEL",curv:.05,verbs:["FETCH traces","PULL signals","SAMPLE observations"],cls:"ck-data"},{a:"MEMORY",b:"MODEL",curv:.12,verbs:["LOAD context","RECALL history"],cls:"ck-culture"},{a:"TOOL",b:"MODEL",curv:-.1,verbs:["STREAM telemetry","FEED events"],cls:"ck-infrastructure"},{a:"HUMAN",b:"MODEL",curv:.06,verbs:["DELEGATE task","SET objective"],cls:"ck-communities"},{a:"MODEL",b:"TOOL",curv:.08,verbs:["RUN inference","RUN ranking","RUN anomaly-scan","EVAL policy-check"],cls:"ck-research"},{a:"TOOL",b:"DATA",curv:-.1,verbs:["WRITE result","RECORD outcome"],cls:"ck-infrastructure"}],gs=[.505,.64],_s=6,xd=30,vd=.5;function qo(i){const e=Hn((i+13)*48271),t=ma[Math.floor(e()*ma.length)],n=1+Math.floor(e()*5),s=t.verbs[Math.floor(e()*t.verbs.length)],r=60+Math.floor(e()*900);return`A${n} · ${s} — ${t.a}→${t.b} · ${r}ms`}class Md{constructor(){V(this,"log");V(this,"lines",[]);V(this,"routePts",[]);V(this,"pulses",[]);V(this,"modelRing",null);V(this,"ringPulsed",!1)}mount(e,t){this.log=_e("div","ops-log"),this.log.setAttribute("aria-hidden","true"),this.log.appendChild(_e("div","ops-title","오퍼레이션 — 시뮬레이션 기록"));for(let n=0;n<_s;n++){const s=_e("div","ops-line");s.style.opacity=(.4+.6*(n/(_s-1))).toFixed(2),this.log.appendChild(s),this.lines.push(new Ui(s,151+n))}e.textLayer.appendChild(this.log),ma.forEach((n,s)=>{this.routePts.push(es(zt(n.a,3),zt(n.b,3),n.curv,24));for(let r=0;r<2;r++){const a=it("circle",`op-pulse ${n.cls}`);a.setAttribute("r","2.4"),a.style.display="none",e.gRels.appendChild(a),this.pulses.push({el:a,route:s,phase:s*.37+r*.5,speed:.38+s%3*.07})}}),this.modelRing=e.htmlLayer.querySelector('[data-id="MODEL"] .m-ring')}render(e){const t=wt(e.p,gs[0],gs[0]+.03,gs[1]-.025,gs[1]);if(lt(this.log,t),t<=.01){for(const o of this.pulses)o.el.style.display!=="none"&&(o.el.style.display="none");this.ringPulsed&&this.modelRing&&(this.modelRing.style.transform="",this.ringPulsed=!1);return}const n=e.p*xd+e.t*vd,s=Math.floor(n),r=n-s,a=is(e.p,e.t);this.lines.forEach((o,l)=>{const c=s-(_s-1-l);if(c<0)o.set("","",1,a);else if(l===_s-1)o.set("",qo(c),fe(r,.05,.6),a);else{const h=qo(c);o.set(h,h,1,a)}});for(const o of this.pulses){const l=n*o.speed+o.phase,c=l-Math.floor(l),h=ts(this.routePts[o.route],c,e.proj);o.el.style.display!==""&&(o.el.style.display=""),o.el.setAttribute("cx",h.x.toFixed(1)),o.el.setAttribute("cy",h.y.toFixed(1)),o.el.style.opacity=(t*(.4+.6*Math.sin(Math.PI*c))).toFixed(2)}if(this.modelRing){const o=Math.max(0,1-r*2.4);o>0?(this.modelRing.style.transform=`scale(${(1+.24*o*t).toFixed(3)})`,this.ringPulsed=!0):this.ringPulsed&&(this.modelRing.style.transform="",this.ringPulsed=!1)}}update(e){this.render(e)}ambient(e){this.render(e)}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const mo="185",Sd=0,$o=1,yd=2,Ks=1,Ed=2,Qi=3,Gn=0,kt=1,yn=2,bn=0,Ci=1,Ko=2,Zo=3,Jo=4,bd=5,ti=100,Td=101,Ad=102,wd=103,Rd=104,Cd=200,Pd=201,Ld=202,Id=203,ga=204,_a=205,Dd=206,Ud=207,Nd=208,Fd=209,Od=210,Bd=211,zd=212,kd=213,Gd=214,xa=0,va=1,Ma=2,Ni=3,Sa=4,ya=5,Ea=6,ba=7,sc=0,Hd=1,Vd=2,fn=0,rc=1,ac=2,oc=3,lc=4,cc=5,dc=6,hc=7,uc=300,ai=301,Fi=302,wr=303,Rr=304,xr=306,Ta=1e3,En=1001,Aa=1002,Rt=1003,Wd=1004,xs=1005,It=1006,Cr=1007,ii=1008,Jt=1009,fc=1010,pc=1011,ss=1012,go=1013,mn=1014,hn=1015,An=1016,_o=1017,xo=1018,rs=1020,mc=35902,gc=35899,_c=1021,xc=1022,nn=1023,wn=1026,si=1027,vc=1028,vo=1029,oi=1030,Mo=1031,So=1033,Zs=33776,Js=33777,Qs=33778,js=33779,wa=35840,Ra=35841,Ca=35842,Pa=35843,La=36196,Ia=37492,Da=37496,Ua=37488,Na=37489,cr=37490,Fa=37491,Oa=37808,Ba=37809,za=37810,ka=37811,Ga=37812,Ha=37813,Va=37814,Wa=37815,Xa=37816,Ya=37817,qa=37818,$a=37819,Ka=37820,Za=37821,Ja=36492,Qa=36494,ja=36495,eo=36283,to=36284,dr=36285,no=36286,Xd=3200,Qo=0,Yd=1,Bn="",Kt="srgb",hr="srgb-linear",ur="linear",Ze="srgb",fi=7680,jo=519,qd=512,$d=513,Kd=514,yo=515,Zd=516,Jd=517,Eo=518,Qd=519,el=35044,tl="300 es",un=2e3,fr=2001;function jd(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function pr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function eh(){const i=pr("canvas");return i.style.display="block",i}const nl={};function il(...i){const e="THREE."+i.shift();console.log(e,...i)}function Mc(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Pe(...i){i=Mc(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function We(...i){i=Mc(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Pi(...i){const e=i.join(" ");e in nl||(nl[e]=!0,Pe(...i))}function th(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const nh={[xa]:va,[Ma]:Ea,[Sa]:ba,[Ni]:ya,[va]:xa,[Ea]:Ma,[ba]:Sa,[ya]:Ni};class ci{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Pt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Pr=Math.PI/180,io=180/Math.PI;function as(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Pt[i&255]+Pt[i>>8&255]+Pt[i>>16&255]+Pt[i>>24&255]+"-"+Pt[e&255]+Pt[e>>8&255]+"-"+Pt[e>>16&15|64]+Pt[e>>24&255]+"-"+Pt[t&63|128]+Pt[t>>8&255]+"-"+Pt[t>>16&255]+Pt[t>>24&255]+Pt[n&255]+Pt[n>>8&255]+Pt[n>>16&255]+Pt[n>>24&255]).toLowerCase()}function Ge(i,e,t){return Math.max(e,Math.min(t,i))}function ih(i,e){return(i%e+e)%e}function Lr(i,e,t){return(1-t)*i+t*e}function Vi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Bt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Ao=class Ao{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ge(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ge(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Ao.prototype.isVector2=!0;let $e=Ao;class zi{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],d=r[a+0],f=r[a+1],_=r[a+2],M=r[a+3];if(u!==M||l!==d||c!==f||h!==_){let m=l*d+c*f+h*_+u*M;m<0&&(d=-d,f=-f,_=-_,M=-M,m=-m);let p=1-o;if(m<.9995){const A=Math.acos(m),w=Math.sin(A);p=Math.sin(p*A)/w,o=Math.sin(o*A)/w,l=l*p+d*o,c=c*p+f*o,h=h*p+_*o,u=u*p+M*o}else{l=l*p+d*o,c=c*p+f*o,h=h*p+_*o,u=u*p+M*o;const A=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=A,c*=A,h*=A,u*=A}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[a],d=r[a+1],f=r[a+2],_=r[a+3];return e[t]=o*_+h*u+l*f-c*d,e[t+1]=l*_+h*d+c*u-o*f,e[t+2]=c*_+h*f+o*d-l*u,e[t+3]=h*_-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),u=o(r/2),d=l(n/2),f=l(s/2),_=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*_,this._y=c*f*u-d*h*_,this._z=c*h*_+d*f*u,this._w=c*h*u-d*f*_;break;case"YXZ":this._x=d*h*u+c*f*_,this._y=c*f*u-d*h*_,this._z=c*h*_-d*f*u,this._w=c*h*u+d*f*_;break;case"ZXY":this._x=d*h*u-c*f*_,this._y=c*f*u+d*h*_,this._z=c*h*_+d*f*u,this._w=c*h*u-d*f*_;break;case"ZYX":this._x=d*h*u-c*f*_,this._y=c*f*u+d*h*_,this._z=c*h*_-d*f*u,this._w=c*h*u+d*f*_;break;case"YZX":this._x=d*h*u+c*f*_,this._y=c*f*u+d*h*_,this._z=c*h*_-d*f*u,this._w=c*h*u-d*f*_;break;case"XZY":this._x=d*h*u-c*f*_,this._y=c*f*u-d*h*_,this._z=c*h*_+d*f*u,this._w=c*h*u+d*f*_;break;default:Pe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ge(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const wo=class wo{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(sl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(sl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),h=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ge(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ir.copy(this).projectOnVector(e),this.sub(Ir)}reflect(e){return this.sub(Ir.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ge(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};wo.prototype.isVector3=!0;let N=wo;const Ir=new N,sl=new zi,Ro=class Ro{constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],_=n[8],M=s[0],m=s[3],p=s[6],A=s[1],w=s[4],S=s[7],T=s[2],E=s[5],R=s[8];return r[0]=a*M+o*A+l*T,r[3]=a*m+o*w+l*E,r[6]=a*p+o*S+l*R,r[1]=c*M+h*A+u*T,r[4]=c*m+h*w+u*E,r[7]=c*p+h*S+u*R,r[2]=d*M+f*A+_*T,r[5]=d*m+f*w+_*E,r[8]=d*p+f*S+_*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,_=t*u+n*d+s*f;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/_;return e[0]=u*M,e[1]=(s*c-h*n)*M,e[2]=(o*n-s*a)*M,e[3]=d*M,e[4]=(h*t-s*l)*M,e[5]=(s*r-o*t)*M,e[6]=f*M,e[7]=(n*l-c*t)*M,e[8]=(a*t-n*r)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Pi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Dr.makeScale(e,t)),this}rotate(e){return Pi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Dr.makeRotation(-e)),this}translate(e,t){return Pi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Dr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Ro.prototype.isMatrix3=!0;let Ie=Ro;const Dr=new Ie,rl=new Ie().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),al=new Ie().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function sh(){const i={enabled:!0,workingColorSpace:hr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Ze&&(s.r=Tn(s.r),s.g=Tn(s.g),s.b=Tn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ze&&(s.r=Li(s.r),s.g=Li(s.g),s.b=Li(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Bn?ur:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Pi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Pi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[hr]:{primaries:e,whitePoint:n,transfer:ur,toXYZ:rl,fromXYZ:al,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Kt},outputColorSpaceConfig:{drawingBufferColorSpace:Kt}},[Kt]:{primaries:e,whitePoint:n,transfer:Ze,toXYZ:rl,fromXYZ:al,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Kt}}}),i}const ke=sh();function Tn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Li(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let pi;class rh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{pi===void 0&&(pi=pr("canvas")),pi.width=e.width,pi.height=e.height;const s=pi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=pi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=pr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Tn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Tn(t[n]/255)*255):t[n]=Tn(t[n]);return{data:t,width:e.width,height:e.height}}else return Pe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let ah=0;class bo{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ah++}),this.uuid=as(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ur(s[a].image)):r.push(Ur(s[a]))}else r=Ur(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Ur(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?rh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Pe("Texture: Unable to serialize Texture."),{})}let oh=0;const Nr=new N;class Ut extends ci{constructor(e=Ut.DEFAULT_IMAGE,t=Ut.DEFAULT_MAPPING,n=En,s=En,r=It,a=ii,o=nn,l=Jt,c=Ut.DEFAULT_ANISOTROPY,h=Bn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:oh++}),this.uuid=as(),this.name="",this.source=new bo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new $e(0,0),this.repeat=new $e(1,1),this.center=new $e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ie,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Nr).x}get height(){return this.source.getSize(Nr).y}get depth(){return this.source.getSize(Nr).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Pe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Pe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==uc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ta:e.x=e.x-Math.floor(e.x);break;case En:e.x=e.x<0?0:1;break;case Aa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ta:e.y=e.y-Math.floor(e.y);break;case En:e.y=e.y<0?0:1;break;case Aa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ut.DEFAULT_IMAGE=null;Ut.DEFAULT_MAPPING=uc;Ut.DEFAULT_ANISOTROPY=1;const Co=class Co{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],_=l[9],M=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-M)<.01&&Math.abs(_-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+M)<.1&&Math.abs(_+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(c+1)/2,S=(f+1)/2,T=(p+1)/2,E=(h+d)/4,R=(u+M)/4,x=(_+m)/4;return w>S&&w>T?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=E/n,r=R/n):S>T?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=E/s,r=x/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=R/r,s=x/r),this.set(n,s,r,t),this}let A=Math.sqrt((m-_)*(m-_)+(u-M)*(u-M)+(d-h)*(d-h));return Math.abs(A)<.001&&(A=1),this.x=(m-_)/A,this.y=(u-M)/A,this.z=(d-h)/A,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this.w=Ge(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this.w=Ge(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ge(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Co.prototype.isVector4=!0;let dt=Co;class lh extends ci{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:It,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new dt(0,0,e,t),this.scissorTest=!1,this.viewport=new dt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new Ut(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:It,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new bo(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class pn extends lh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Sc extends Ut{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=En,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class ch extends Ut{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=En,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const _r=class _r{constructor(e,t,n,s,r,a,o,l,c,h,u,d,f,_,M,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,h,u,d,f,_,M,m)}set(e,t,n,s,r,a,o,l,c,h,u,d,f,_,M,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=_,p[11]=M,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new _r().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/mi.setFromMatrixColumn(e,0).length(),r=1/mi.setFromMatrixColumn(e,1).length(),a=1/mi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=a*h,f=a*u,_=o*h,M=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+_*c,t[5]=d-M*c,t[9]=-o*l,t[2]=M-d*c,t[6]=_+f*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,_=c*h,M=c*u;t[0]=d+M*o,t[4]=_*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-_,t[6]=M+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,_=c*h,M=c*u;t[0]=d-M*o,t[4]=-a*u,t[8]=_+f*o,t[1]=f+_*o,t[5]=a*h,t[9]=M-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*h,f=a*u,_=o*h,M=o*u;t[0]=l*h,t[4]=_*c-f,t[8]=d*c+M,t[1]=l*u,t[5]=M*c+d,t[9]=f*c-_,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*c,_=o*l,M=o*c;t[0]=l*h,t[4]=M-d*u,t[8]=_*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+_,t[10]=d-M*u}else if(e.order==="XZY"){const d=a*l,f=a*c,_=o*l,M=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+M,t[5]=a*h,t[9]=f*u-_,t[2]=_*u-f,t[6]=o*h,t[10]=M*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(dh,e,hh)}lookAt(e,t,n){const s=this.elements;return Ht.subVectors(e,t),Ht.lengthSq()===0&&(Ht.z=1),Ht.normalize(),In.crossVectors(n,Ht),In.lengthSq()===0&&(Math.abs(n.z)===1?Ht.x+=1e-4:Ht.z+=1e-4,Ht.normalize(),In.crossVectors(n,Ht)),In.normalize(),vs.crossVectors(Ht,In),s[0]=In.x,s[4]=vs.x,s[8]=Ht.x,s[1]=In.y,s[5]=vs.y,s[9]=Ht.y,s[2]=In.z,s[6]=vs.z,s[10]=Ht.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],_=n[2],M=n[6],m=n[10],p=n[14],A=n[3],w=n[7],S=n[11],T=n[15],E=s[0],R=s[4],x=s[8],b=s[12],D=s[1],P=s[5],B=s[9],$=s[13],Q=s[2],z=s[6],K=s[10],G=s[14],J=s[3],ee=s[7],he=s[11],ge=s[15];return r[0]=a*E+o*D+l*Q+c*J,r[4]=a*R+o*P+l*z+c*ee,r[8]=a*x+o*B+l*K+c*he,r[12]=a*b+o*$+l*G+c*ge,r[1]=h*E+u*D+d*Q+f*J,r[5]=h*R+u*P+d*z+f*ee,r[9]=h*x+u*B+d*K+f*he,r[13]=h*b+u*$+d*G+f*ge,r[2]=_*E+M*D+m*Q+p*J,r[6]=_*R+M*P+m*z+p*ee,r[10]=_*x+M*B+m*K+p*he,r[14]=_*b+M*$+m*G+p*ge,r[3]=A*E+w*D+S*Q+T*J,r[7]=A*R+w*P+S*z+T*ee,r[11]=A*x+w*B+S*K+T*he,r[15]=A*b+w*$+S*G+T*ge,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],_=e[3],M=e[7],m=e[11],p=e[15],A=l*f-c*d,w=o*f-c*u,S=o*d-l*u,T=a*f-c*h,E=a*d-l*h,R=a*u-o*h;return t*(M*A-m*w+p*S)-n*(_*A-m*T+p*E)+s*(_*w-M*T+p*R)-r*(_*S-M*E+m*R)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],_=e[12],M=e[13],m=e[14],p=e[15],A=t*o-n*a,w=t*l-s*a,S=t*c-r*a,T=n*l-s*o,E=n*c-r*o,R=s*c-r*l,x=h*M-u*_,b=h*m-d*_,D=h*p-f*_,P=u*m-d*M,B=u*p-f*M,$=d*p-f*m,Q=A*$-w*B+S*P+T*D-E*b+R*x;if(Q===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const z=1/Q;return e[0]=(o*$-l*B+c*P)*z,e[1]=(s*B-n*$-r*P)*z,e[2]=(M*R-m*E+p*T)*z,e[3]=(d*E-u*R-f*T)*z,e[4]=(l*D-a*$-c*b)*z,e[5]=(t*$-s*D+r*b)*z,e[6]=(m*S-_*R-p*w)*z,e[7]=(h*R-d*S+f*w)*z,e[8]=(a*B-o*D+c*x)*z,e[9]=(n*D-t*B-r*x)*z,e[10]=(_*E-M*S+p*A)*z,e[11]=(u*S-h*E-f*A)*z,e[12]=(o*b-a*P-l*x)*z,e[13]=(t*P-n*b+s*x)*z,e[14]=(M*w-_*T-m*A)*z,e[15]=(h*T-u*w+d*A)*z,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,_=r*u,M=a*h,m=a*u,p=o*u,A=l*c,w=l*h,S=l*u,T=n.x,E=n.y,R=n.z;return s[0]=(1-(M+p))*T,s[1]=(f+S)*T,s[2]=(_-w)*T,s[3]=0,s[4]=(f-S)*E,s[5]=(1-(d+p))*E,s[6]=(m+A)*E,s[7]=0,s[8]=(_+w)*R,s[9]=(m-A)*R,s[10]=(1-(d+M))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=mi.set(s[0],s[1],s[2]).length();const o=mi.set(s[4],s[5],s[6]).length(),l=mi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Qt.copy(this);const c=1/a,h=1/o,u=1/l;return Qt.elements[0]*=c,Qt.elements[1]*=c,Qt.elements[2]*=c,Qt.elements[4]*=h,Qt.elements[5]*=h,Qt.elements[6]*=h,Qt.elements[8]*=u,Qt.elements[9]*=u,Qt.elements[10]*=u,t.setFromRotationMatrix(Qt),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=un,l=!1){const c=this.elements,h=2*r/(t-e),u=2*r/(n-s),d=(t+e)/(t-e),f=(n+s)/(n-s);let _,M;if(l)_=r/(a-r),M=a*r/(a-r);else if(o===un)_=-(a+r)/(a-r),M=-2*a*r/(a-r);else if(o===fr)_=-a/(a-r),M=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=un,l=!1){const c=this.elements,h=2/(t-e),u=2/(n-s),d=-(t+e)/(t-e),f=-(n+s)/(n-s);let _,M;if(l)_=1/(a-r),M=a/(a-r);else if(o===un)_=-2/(a-r),M=-(a+r)/(a-r);else if(o===fr)_=-1/(a-r),M=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=_,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};_r.prototype.isMatrix4=!0;let ht=_r;const mi=new N,Qt=new ht,dh=new N(0,0,0),hh=new N(1,1,1),In=new N,vs=new N,Ht=new N,ol=new ht,ll=new zi;class li{constructor(e=0,t=0,n=0,s=li.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Ge(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ge(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ge(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ge(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ge(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ge(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Pe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ol.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ol,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ll.setFromEuler(this),this.setFromQuaternion(ll,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}li.DEFAULT_ORDER="XYZ";class yc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let uh=0;const cl=new N,gi=new zi,_n=new ht,Ms=new N,Wi=new N,fh=new N,ph=new zi,dl=new N(1,0,0),hl=new N(0,1,0),ul=new N(0,0,1),fl={type:"added"},mh={type:"removed"},_i={type:"childadded",child:null},Fr={type:"childremoved",child:null};class Nt extends ci{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:uh++}),this.uuid=as(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Nt.DEFAULT_UP.clone();const e=new N,t=new li,n=new zi,s=new N(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ht},normalMatrix:{value:new Ie}}),this.matrix=new ht,this.matrixWorld=new ht,this.matrixAutoUpdate=Nt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return gi.setFromAxisAngle(e,t),this.quaternion.multiply(gi),this}rotateOnWorldAxis(e,t){return gi.setFromAxisAngle(e,t),this.quaternion.premultiply(gi),this}rotateX(e){return this.rotateOnAxis(dl,e)}rotateY(e){return this.rotateOnAxis(hl,e)}rotateZ(e){return this.rotateOnAxis(ul,e)}translateOnAxis(e,t){return cl.copy(e).applyQuaternion(this.quaternion),this.position.add(cl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(dl,e)}translateY(e){return this.translateOnAxis(hl,e)}translateZ(e){return this.translateOnAxis(ul,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(_n.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ms.copy(e):Ms.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Wi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_n.lookAt(Wi,Ms,this.up):_n.lookAt(Ms,Wi,this.up),this.quaternion.setFromRotationMatrix(_n),s&&(_n.extractRotation(s.matrixWorld),gi.setFromRotationMatrix(_n),this.quaternion.premultiply(gi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(We("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(fl),_i.child=e,this.dispatchEvent(_i),_i.child=null):We("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(mh),Fr.child=e,this.dispatchEvent(Fr),Fr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),_n.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),_n.multiply(e.parent.matrixWorld)),e.applyMatrix4(_n),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(fl),_i.child=e,this.dispatchEvent(_i),_i.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wi,e,fh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wi,ph,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),_=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),_.length>0&&(n.nodes=_)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Nt.DEFAULT_UP=new N(0,1,0);Nt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ss extends Nt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const gh={type:"move"};class Or{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ss,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ss,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ss,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const M of e.hand.values()){const m=t.getJointPose(M,n),p=this._getHandJoint(c,M);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,_=.005;c.inputState.pinching&&d>f+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(gh)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ss;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Ec={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Dn={h:0,s:0,l:0},ys={h:0,s:0,l:0};function Br(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Be{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Kt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ke.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=ke.workingColorSpace){return this.r=e,this.g=t,this.b=n,ke.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=ke.workingColorSpace){if(e=ih(e,1),t=Ge(t,0,1),n=Ge(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Br(a,r,e+1/3),this.g=Br(a,r,e),this.b=Br(a,r,e-1/3)}return ke.colorSpaceToWorking(this,s),this}setStyle(e,t=Kt){function n(r){r!==void 0&&parseFloat(r)<1&&Pe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Pe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Pe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Kt){const n=Ec[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Pe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Tn(e.r),this.g=Tn(e.g),this.b=Tn(e.b),this}copyLinearToSRGB(e){return this.r=Li(e.r),this.g=Li(e.g),this.b=Li(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Kt){return ke.workingToColorSpace(Lt.copy(this),e),Math.round(Ge(Lt.r*255,0,255))*65536+Math.round(Ge(Lt.g*255,0,255))*256+Math.round(Ge(Lt.b*255,0,255))}getHexString(e=Kt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ke.workingColorSpace){ke.workingToColorSpace(Lt.copy(this),t);const n=Lt.r,s=Lt.g,r=Lt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=ke.workingColorSpace){return ke.workingToColorSpace(Lt.copy(this),t),e.r=Lt.r,e.g=Lt.g,e.b=Lt.b,e}getStyle(e=Kt){ke.workingToColorSpace(Lt.copy(this),e);const t=Lt.r,n=Lt.g,s=Lt.b;return e!==Kt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Dn),this.setHSL(Dn.h+e,Dn.s+t,Dn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Dn),e.getHSL(ys);const n=Lr(Dn.h,ys.h,t),s=Lr(Dn.s,ys.s,t),r=Lr(Dn.l,ys.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Lt=new Be;Be.NAMES=Ec;class _h extends Nt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new li,this.environmentIntensity=1,this.environmentRotation=new li,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const jt=new N,xn=new N,zr=new N,vn=new N,xi=new N,vi=new N,pl=new N,kr=new N,Gr=new N,Hr=new N,Vr=new dt,Wr=new dt,Xr=new dt;class tn{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),jt.subVectors(e,t),s.cross(jt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){jt.subVectors(s,t),xn.subVectors(n,t),zr.subVectors(e,t);const a=jt.dot(jt),o=jt.dot(xn),l=jt.dot(zr),c=xn.dot(xn),h=xn.dot(zr),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,_=(a*h-o*l)*d;return r.set(1-f-_,_,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,vn)===null?!1:vn.x>=0&&vn.y>=0&&vn.x+vn.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,vn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,vn.x),l.addScaledVector(a,vn.y),l.addScaledVector(o,vn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return Vr.setScalar(0),Wr.setScalar(0),Xr.setScalar(0),Vr.fromBufferAttribute(e,t),Wr.fromBufferAttribute(e,n),Xr.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Vr,r.x),a.addScaledVector(Wr,r.y),a.addScaledVector(Xr,r.z),a}static isFrontFacing(e,t,n,s){return jt.subVectors(n,t),xn.subVectors(e,t),jt.cross(xn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return jt.subVectors(this.c,this.b),xn.subVectors(this.a,this.b),jt.cross(xn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return tn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return tn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return tn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return tn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return tn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;xi.subVectors(s,n),vi.subVectors(r,n),kr.subVectors(e,n);const l=xi.dot(kr),c=vi.dot(kr);if(l<=0&&c<=0)return t.copy(n);Gr.subVectors(e,s);const h=xi.dot(Gr),u=vi.dot(Gr);if(h>=0&&u<=h)return t.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(xi,a);Hr.subVectors(e,r);const f=xi.dot(Hr),_=vi.dot(Hr);if(_>=0&&f<=_)return t.copy(r);const M=f*c-l*_;if(M<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(n).addScaledVector(vi,o);const m=h*_-f*u;if(m<=0&&u-h>=0&&f-_>=0)return pl.subVectors(r,s),o=(u-h)/(u-h+(f-_)),t.copy(s).addScaledVector(pl,o);const p=1/(m+M+d);return a=M*p,o=d*p,t.copy(n).addScaledVector(xi,a).addScaledVector(vi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class os{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(en.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(en.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=en.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,en):en.fromBufferAttribute(r,a),en.applyMatrix4(e.matrixWorld),this.expandByPoint(en);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Es.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Es.copy(n.boundingBox)),Es.applyMatrix4(e.matrixWorld),this.union(Es)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,en),en.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Xi),bs.subVectors(this.max,Xi),Mi.subVectors(e.a,Xi),Si.subVectors(e.b,Xi),yi.subVectors(e.c,Xi),Un.subVectors(Si,Mi),Nn.subVectors(yi,Si),qn.subVectors(Mi,yi);let t=[0,-Un.z,Un.y,0,-Nn.z,Nn.y,0,-qn.z,qn.y,Un.z,0,-Un.x,Nn.z,0,-Nn.x,qn.z,0,-qn.x,-Un.y,Un.x,0,-Nn.y,Nn.x,0,-qn.y,qn.x,0];return!Yr(t,Mi,Si,yi,bs)||(t=[1,0,0,0,1,0,0,0,1],!Yr(t,Mi,Si,yi,bs))?!1:(Ts.crossVectors(Un,Nn),t=[Ts.x,Ts.y,Ts.z],Yr(t,Mi,Si,yi,bs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,en).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(en).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Mn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Mn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Mn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Mn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Mn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Mn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Mn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Mn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Mn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Mn=[new N,new N,new N,new N,new N,new N,new N,new N],en=new N,Es=new os,Mi=new N,Si=new N,yi=new N,Un=new N,Nn=new N,qn=new N,Xi=new N,bs=new N,Ts=new N,$n=new N;function Yr(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){$n.fromArray(i,r);const o=s.x*Math.abs($n.x)+s.y*Math.abs($n.y)+s.z*Math.abs($n.z),l=e.dot($n),c=t.dot($n),h=n.dot($n);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const _t=new N,As=new $e;let xh=0;class xt extends ci{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:xh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=el,this.updateRanges=[],this.gpuType=hn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)As.fromBufferAttribute(this,t),As.applyMatrix3(e),this.setXY(t,As.x,As.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix3(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix4(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyNormalMatrix(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.transformDirection(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Vi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Bt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Vi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Vi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Vi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Vi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),n=Bt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),n=Bt(n,this.array),s=Bt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),n=Bt(n,this.array),s=Bt(s,this.array),r=Bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==el&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class bc extends xt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Tc extends xt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class sn extends xt{constructor(e,t,n){super(new Float32Array(e),t,n)}}const vh=new os,Yi=new N,qr=new N;class ki{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):vh.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Yi.subVectors(e,this.center);const t=Yi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Yi,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(qr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Yi.copy(e.center).add(qr)),this.expandByPoint(Yi.copy(e.center).sub(qr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Mh=0;const $t=new ht,$r=new Nt,Ei=new N,Vt=new os,qi=new os,Et=new N;class bt extends ci{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Mh++}),this.uuid=as(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(jd(e)?Tc:bc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ie().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return $t.makeRotationFromQuaternion(e),this.applyMatrix4($t),this}rotateX(e){return $t.makeRotationX(e),this.applyMatrix4($t),this}rotateY(e){return $t.makeRotationY(e),this.applyMatrix4($t),this}rotateZ(e){return $t.makeRotationZ(e),this.applyMatrix4($t),this}translate(e,t,n){return $t.makeTranslation(e,t,n),this.applyMatrix4($t),this}scale(e,t,n){return $t.makeScale(e,t,n),this.applyMatrix4($t),this}lookAt(e){return $r.lookAt(e),$r.updateMatrix(),this.applyMatrix4($r.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ei).negate(),this.translate(Ei.x,Ei.y,Ei.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new sn(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Pe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new os);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){We("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Vt.setFromBufferAttribute(r),this.morphTargetsRelative?(Et.addVectors(this.boundingBox.min,Vt.min),this.boundingBox.expandByPoint(Et),Et.addVectors(this.boundingBox.max,Vt.max),this.boundingBox.expandByPoint(Et)):(this.boundingBox.expandByPoint(Vt.min),this.boundingBox.expandByPoint(Vt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&We('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ki);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){We("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){const n=this.boundingSphere.center;if(Vt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];qi.setFromBufferAttribute(o),this.morphTargetsRelative?(Et.addVectors(Vt.min,qi.min),Vt.expandByPoint(Et),Et.addVectors(Vt.max,qi.max),Vt.expandByPoint(Et)):(Vt.expandByPoint(qi.min),Vt.expandByPoint(qi.max))}Vt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Et.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Et));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Et.fromBufferAttribute(o,c),l&&(Ei.fromBufferAttribute(e,c),Et.add(Ei)),s=Math.max(s,n.distanceToSquared(Et))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&We('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){We("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new xt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let x=0;x<n.count;x++)o[x]=new N,l[x]=new N;const c=new N,h=new N,u=new N,d=new $e,f=new $e,_=new $e,M=new N,m=new N;function p(x,b,D){c.fromBufferAttribute(n,x),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,D),d.fromBufferAttribute(r,x),f.fromBufferAttribute(r,b),_.fromBufferAttribute(r,D),h.sub(c),u.sub(c),f.sub(d),_.sub(d);const P=1/(f.x*_.y-_.x*f.y);isFinite(P)&&(M.copy(h).multiplyScalar(_.y).addScaledVector(u,-f.y).multiplyScalar(P),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-_.x).multiplyScalar(P),o[x].add(M),o[b].add(M),o[D].add(M),l[x].add(m),l[b].add(m),l[D].add(m))}let A=this.groups;A.length===0&&(A=[{start:0,count:e.count}]);for(let x=0,b=A.length;x<b;++x){const D=A[x],P=D.start,B=D.count;for(let $=P,Q=P+B;$<Q;$+=3)p(e.getX($+0),e.getX($+1),e.getX($+2))}const w=new N,S=new N,T=new N,E=new N;function R(x){T.fromBufferAttribute(s,x),E.copy(T);const b=o[x];w.copy(b),w.sub(T.multiplyScalar(T.dot(b))).normalize(),S.crossVectors(E,b);const P=S.dot(l[x])<0?-1:1;a.setXYZW(x,w.x,w.y,w.z,P)}for(let x=0,b=A.length;x<b;++x){const D=A[x],P=D.start,B=D.count;for(let $=P,Q=P+B;$<Q;$+=3)R(e.getX($+0)),R(e.getX($+1)),R(e.getX($+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new xt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new N,r=new N,a=new N,o=new N,l=new N,c=new N,h=new N,u=new N;if(e)for(let d=0,f=e.count;d<f;d+=3){const _=e.getX(d+0),M=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,M),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,_),l.fromBufferAttribute(n,M),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(M,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Et.fromBufferAttribute(e,t),Et.normalize(),e.setXYZ(t,Et.x,Et.y,Et.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,_=0;for(let M=0,m=l.length;M<m;M++){o.isInterleavedBufferAttribute?f=l[M]*o.data.stride+o.offset:f=l[M]*h;for(let p=0;p<h;p++)d[_++]=c[f++]}return new xt(d,h,u)}if(this.index===null)return Pe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new bt,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Sh=0;class Gi extends ci{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Sh++}),this.uuid=as(),this.name="",this.type="Material",this.blending=Ci,this.side=Gn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ga,this.blendDst=_a,this.blendEquation=ti,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Be(0,0,0),this.blendAlpha=0,this.depthFunc=Ni,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fi,this.stencilZFail=fi,this.stencilZPass=fi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Pe(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Pe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ci&&(n.blending=this.blending),this.side!==Gn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ga&&(n.blendSrc=this.blendSrc),this.blendDst!==_a&&(n.blendDst=this.blendDst),this.blendEquation!==ti&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ni&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==jo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==fi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==fi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==fi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Be().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new $e().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new $e().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Sn=new N,Kr=new N,ws=new N,Fn=new N,Zr=new N,Rs=new N,Jr=new N;class To{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Sn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Sn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Sn.copy(this.origin).addScaledVector(this.direction,t),Sn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Kr.copy(e).add(t).multiplyScalar(.5),ws.copy(t).sub(e).normalize(),Fn.copy(this.origin).sub(Kr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(ws),o=Fn.dot(this.direction),l=-Fn.dot(ws),c=Fn.lengthSq(),h=Math.abs(1-a*a);let u,d,f,_;if(h>0)if(u=a*l-o,d=a*o-l,_=r*h,u>=0)if(d>=-_)if(d<=_){const M=1/h;u*=M,d*=M,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-_?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=_?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Kr).addScaledVector(ws,d),f}intersectSphere(e,t){Sn.subVectors(e.center,this.origin);const n=Sn.dot(this.direction),s=Sn.dot(Sn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Sn)!==null}intersectTriangle(e,t,n,s,r){Zr.subVectors(t,e),Rs.subVectors(n,e),Jr.crossVectors(Zr,Rs);let a=this.direction.dot(Jr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Fn.subVectors(this.origin,e);const l=o*this.direction.dot(Rs.crossVectors(Fn,Rs));if(l<0)return null;const c=o*this.direction.dot(Zr.cross(Fn));if(c<0||l+c>a)return null;const h=-o*Fn.dot(Jr);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ac extends Gi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new li,this.combine=sc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ml=new ht,Kn=new To,Cs=new ki,gl=new N,Ps=new N,Ls=new N,Is=new N,Qr=new N,Ds=new N,_l=new N,Us=new N;class Rn extends Nt{constructor(e=new bt,t=new Ac){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Ds.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(Qr.fromBufferAttribute(u,e),a?Ds.addScaledVector(Qr,h):Ds.addScaledVector(Qr.sub(t),h))}t.add(Ds)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Cs.copy(n.boundingSphere),Cs.applyMatrix4(r),Kn.copy(e.ray).recast(e.near),!(Cs.containsPoint(Kn.origin)===!1&&(Kn.intersectSphere(Cs,gl)===null||Kn.origin.distanceToSquared(gl)>(e.far-e.near)**2))&&(ml.copy(r).invert(),Kn.copy(e.ray).applyMatrix4(ml),!(n.boundingBox!==null&&Kn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Kn)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,M=d.length;_<M;_++){const m=d[_],p=a[m.materialIndex],A=Math.max(m.start,f.start),w=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let S=A,T=w;S<T;S+=3){const E=o.getX(S),R=o.getX(S+1),x=o.getX(S+2);s=Ns(this,p,e,n,c,h,u,E,R,x),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,f.start),M=Math.min(o.count,f.start+f.count);for(let m=_,p=M;m<p;m+=3){const A=o.getX(m),w=o.getX(m+1),S=o.getX(m+2);s=Ns(this,a,e,n,c,h,u,A,w,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,M=d.length;_<M;_++){const m=d[_],p=a[m.materialIndex],A=Math.max(m.start,f.start),w=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let S=A,T=w;S<T;S+=3){const E=S,R=S+1,x=S+2;s=Ns(this,p,e,n,c,h,u,E,R,x),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,f.start),M=Math.min(l.count,f.start+f.count);for(let m=_,p=M;m<p;m+=3){const A=m,w=m+1,S=m+2;s=Ns(this,a,e,n,c,h,u,A,w,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function yh(i,e,t,n,s,r,a,o){let l;if(e.side===kt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Gn,o),l===null)return null;Us.copy(o),Us.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Us);return c<t.near||c>t.far?null:{distance:c,point:Us.clone(),object:i}}function Ns(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Ps),i.getVertexPosition(l,Ls),i.getVertexPosition(c,Is);const h=yh(i,e,t,n,Ps,Ls,Is,_l);if(h){const u=new N;tn.getBarycoord(_l,Ps,Ls,Is,u),s&&(h.uv=tn.getInterpolatedAttribute(s,o,l,c,u,new $e)),r&&(h.uv1=tn.getInterpolatedAttribute(r,o,l,c,u,new $e)),a&&(h.normal=tn.getInterpolatedAttribute(a,o,l,c,u,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new N,materialIndex:0};tn.getNormal(Ps,Ls,Is,d.normal),h.face=d,h.barycoord=u}return h}class Eh extends Ut{constructor(e=null,t=1,n=1,s,r,a,o,l,c=Rt,h=Rt,u,d){super(null,a,o,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const jr=new N,bh=new N,Th=new Ie;class jn{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=jr.subVectors(n,t).cross(bh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(jr),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Th.getNormalMatrix(e),s=this.coplanarPoint(jr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Zn=new ki,Ah=new $e(.5,.5),Fs=new N;class wc{constructor(e=new jn,t=new jn,n=new jn,s=new jn,r=new jn,a=new jn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=un,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],_=r[8],M=r[9],m=r[10],p=r[11],A=r[12],w=r[13],S=r[14],T=r[15];if(s[0].setComponents(c-a,f-h,p-_,T-A).normalize(),s[1].setComponents(c+a,f+h,p+_,T+A).normalize(),s[2].setComponents(c+o,f+u,p+M,T+w).normalize(),s[3].setComponents(c-o,f-u,p-M,T-w).normalize(),n)s[4].setComponents(l,d,m,S).normalize(),s[5].setComponents(c-l,f-d,p-m,T-S).normalize();else if(s[4].setComponents(c-l,f-d,p-m,T-S).normalize(),t===un)s[5].setComponents(c+l,f+d,p+m,T+S).normalize();else if(t===fr)s[5].setComponents(l,d,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Zn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Zn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Zn)}intersectsSprite(e){Zn.center.set(0,0,0);const t=Ah.distanceTo(e.center);return Zn.radius=.7071067811865476+t,Zn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Zn)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Fs.x=s.normal.x>0?e.max.x:e.min.x,Fs.y=s.normal.y>0?e.max.y:e.min.y,Fs.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Fs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ei extends Gi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Be(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const mr=new N,gr=new N,xl=new ht,$i=new To,Os=new ki,ea=new N,vl=new N;class Rc extends Nt{constructor(e=new bt,t=new ei){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)mr.fromBufferAttribute(t,s-1),gr.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=mr.distanceTo(gr);e.setAttribute("lineDistance",new sn(n,1))}else Pe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Os.copy(n.boundingSphere),Os.applyMatrix4(s),Os.radius+=r,e.ray.intersectsSphere(Os)===!1)return;xl.copy(s).invert(),$i.copy(e.ray).applyMatrix4(xl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),_=Math.min(h.count,a.start+a.count);for(let M=f,m=_-1;M<m;M+=c){const p=h.getX(M),A=h.getX(M+1),w=Bs(this,e,$i,l,p,A,M);w&&t.push(w)}if(this.isLineLoop){const M=h.getX(_-1),m=h.getX(f),p=Bs(this,e,$i,l,M,m,_-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),_=Math.min(d.count,a.start+a.count);for(let M=f,m=_-1;M<m;M+=c){const p=Bs(this,e,$i,l,M,M+1,M);p&&t.push(p)}if(this.isLineLoop){const M=Bs(this,e,$i,l,_-1,f,_-1);M&&t.push(M)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Bs(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(mr.fromBufferAttribute(o,s),gr.fromBufferAttribute(o,r),t.distanceSqToSegment(mr,gr,ea,vl)>n)return;ea.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(ea);if(!(c<e.near||c>e.far))return{distance:c,point:vl.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Ml=new N,Sl=new N;class Ki extends Rc{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Ml.fromBufferAttribute(t,s),Sl.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Ml.distanceTo(Sl);e.setAttribute("lineDistance",new sn(n,1))}else Pe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Cc extends Gi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Be(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const yl=new ht,so=new To,zs=new ki,ks=new N;class wh extends Nt{constructor(e=new bt,t=new Cc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),zs.copy(n.boundingSphere),zs.applyMatrix4(s),zs.radius+=r,e.ray.intersectsSphere(zs)===!1)return;yl.copy(s).invert(),so.copy(e.ray).applyMatrix4(yl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let _=d,M=f;_<M;_++){const m=c.getX(_);ks.fromBufferAttribute(u,m),El(ks,m,l,s,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let _=d,M=f;_<M;_++)ks.fromBufferAttribute(u,_),El(ks,_,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function El(i,e,t,n,s,r,a){const o=so.distanceSqToPoint(i);if(o<t){const l=new N;so.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Pc extends Ut{constructor(e=[],t=ai,n,s,r,a,o,l,c,h){super(e,t,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Oi extends Ut{constructor(e,t,n=mn,s,r,a,o=Rt,l=Rt,c,h=wn,u=1){if(h!==wn&&h!==si)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new bo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Rh extends Oi{constructor(e,t=mn,n=ai,s,r,a=Rt,o=Rt,l,c=wn){const h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Lc extends Ut{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ls extends bt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,f=0;_("z","y","x",-1,-1,n,t,e,a,r,0),_("z","y","x",1,-1,n,t,-e,a,r,1),_("x","z","y",1,1,e,n,t,s,a,2),_("x","z","y",1,-1,e,n,-t,s,a,3),_("x","y","z",1,-1,e,t,n,s,r,4),_("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new sn(c,3)),this.setAttribute("normal",new sn(h,3)),this.setAttribute("uv",new sn(u,2));function _(M,m,p,A,w,S,T,E,R,x,b){const D=S/R,P=T/x,B=S/2,$=T/2,Q=E/2,z=R+1,K=x+1;let G=0,J=0;const ee=new N;for(let he=0;he<K;he++){const ge=he*P-$;for(let Me=0;Me<z;Me++){const Xe=Me*D-B;ee[M]=Xe*A,ee[m]=ge*w,ee[p]=Q,c.push(ee.x,ee.y,ee.z),ee[M]=0,ee[m]=0,ee[p]=E>0?1:-1,h.push(ee.x,ee.y,ee.z),u.push(Me/R),u.push(1-he/x),G+=1}}for(let he=0;he<x;he++)for(let ge=0;ge<R;ge++){const Me=d+ge+z*he,Xe=d+ge+z*(he+1),st=d+(ge+1)+z*(he+1),Ye=d+(ge+1)+z*he;l.push(Me,Xe,Ye),l.push(Xe,st,Ye),J+=6}o.addGroup(f,J,b),f+=J,d+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ls(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class vr extends bt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,u=e/o,d=t/l,f=[],_=[],M=[],m=[];for(let p=0;p<h;p++){const A=p*d-a;for(let w=0;w<c;w++){const S=w*u-r;_.push(S,-A,0),M.push(0,0,1),m.push(w/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let A=0;A<o;A++){const w=A+c*p,S=A+c*(p+1),T=A+1+c*(p+1),E=A+1+c*p;f.push(w,S,E),f.push(S,T,E)}this.setIndex(f),this.setAttribute("position",new sn(_,3)),this.setAttribute("normal",new sn(M,3)),this.setAttribute("uv",new sn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vr(e.width,e.height,e.widthSegments,e.heightSegments)}}function Bi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(bl(s))s.isRenderTargetTexture?(Pe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(bl(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Dt(i){const e={};for(let t=0;t<i.length;t++){const n=Bi(i[t]);for(const s in n)e[s]=n[s]}return e}function bl(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Ch(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Ic(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ke.workingColorSpace}const Ph={clone:Bi,merge:Dt};var Lh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ih=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class gn extends Gi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Lh,this.fragmentShader=Ih,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Bi(e.uniforms),this.uniformsGroups=Ch(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Be().setHex(s.value);break;case"v2":this.uniforms[n].value=new $e().fromArray(s.value);break;case"v3":this.uniforms[n].value=new N().fromArray(s.value);break;case"v4":this.uniforms[n].value=new dt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ie().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ht().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Dh extends gn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Uh extends Gi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Xd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Nh extends Gi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Gs=new N,Hs=new zi,ln=new N;class Dc extends Nt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ht,this.projectionMatrix=new ht,this.projectionMatrixInverse=new ht,this.coordinateSystem=un,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Gs,Hs,ln),ln.x===1&&ln.y===1&&ln.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Gs,Hs,ln.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Gs,Hs,ln),ln.x===1&&ln.y===1&&ln.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Gs,Hs,ln.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const On=new N,Tl=new $e,Al=new $e;class Zt extends Dc{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=io*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Pr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return io*2*Math.atan(Math.tan(Pr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){On.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(On.x,On.y).multiplyScalar(-e/On.z),On.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(On.x,On.y).multiplyScalar(-e/On.z)}getViewSize(e,t){return this.getViewBounds(e,Tl,Al),t.subVectors(Al,Tl)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Pr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Uc extends Dc{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const bi=-90,Ti=1;class Fh extends Nt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Zt(bi,Ti,e,t);s.layers=this.layers,this.add(s);const r=new Zt(bi,Ti,e,t);r.layers=this.layers,this.add(r);const a=new Zt(bi,Ti,e,t);a.layers=this.layers,this.add(a);const o=new Zt(bi,Ti,e,t);o.layers=this.layers,this.add(o);const l=new Zt(bi,Ti,e,t);l.layers=this.layers,this.add(l);const c=new Zt(bi,Ti,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===un)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===fr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const M=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=M,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Oh extends Zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Po=class Po{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};Po.prototype.isMatrix2=!0;let wl=Po;function Rl(i,e,t,n){const s=Bh(n);switch(t){case _c:return i*e;case vc:return i*e/s.components*s.byteLength;case vo:return i*e/s.components*s.byteLength;case oi:return i*e*2/s.components*s.byteLength;case Mo:return i*e*2/s.components*s.byteLength;case xc:return i*e*3/s.components*s.byteLength;case nn:return i*e*4/s.components*s.byteLength;case So:return i*e*4/s.components*s.byteLength;case Zs:case Js:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Qs:case js:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ra:case Pa:return Math.max(i,16)*Math.max(e,8)/4;case wa:case Ca:return Math.max(i,8)*Math.max(e,8)/2;case La:case Ia:case Ua:case Na:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Da:case cr:case Fa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Oa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ba:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case za:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ka:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Ga:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ha:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Va:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Wa:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Xa:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ya:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case qa:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case $a:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ka:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Za:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ja:case Qa:case ja:return Math.ceil(i/4)*Math.ceil(e/4)*16;case eo:case to:return Math.ceil(i/4)*Math.ceil(e/4)*8;case dr:case no:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Bh(i){switch(i){case Jt:case fc:return{byteLength:1,components:1};case ss:case pc:case An:return{byteLength:2,components:1};case _o:case xo:return{byteLength:2,components:4};case mn:case go:case hn:return{byteLength:4,components:1};case mc:case gc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:mo}}));typeof window<"u"&&(window.__THREE__?Pe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=mo);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Nc(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function zh(i){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,_)=>f.start-_.start);let d=0;for(let f=1;f<u.length;f++){const _=u[d],M=u[f];M.start<=_.start+_.count+1?_.count=Math.max(_.count,M.start+M.count-_.start):(++d,u[d]=M)}u.length=d+1;for(let f=0,_=u.length;f<_;f++){const M=u[f];i.bufferSubData(c,M.start*h.BYTES_PER_ELEMENT,h,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var kh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Gh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Hh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Vh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Xh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Yh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,qh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,$h=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Kh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Zh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Jh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Qh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,jh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,eu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,tu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,nu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,iu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,su=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ru=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,au=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,ou=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,lu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,cu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,du=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,hu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,uu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,fu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,pu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,mu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,gu="gl_FragColor = linearToOutputTexel( gl_FragColor );",_u=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,xu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,vu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Mu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Su=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,yu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Eu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,bu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Tu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Au=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,wu=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ru=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Cu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Pu=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Lu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Iu=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Du=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Uu=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Nu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Fu=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ou=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Bu=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,zu=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ku=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Gu=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Hu=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Vu=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Wu=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Xu=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yu=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,qu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,$u=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ku=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Zu=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ju=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Qu=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ju=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ef=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,tf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,sf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,af=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,of=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,df=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,hf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,uf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ff=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,pf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,mf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,gf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,_f=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,xf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,vf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Mf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Sf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,yf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ef=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,bf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Tf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Af=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,wf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Rf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Cf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Pf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Lf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,If=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Df=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Uf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Nf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ff=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Of=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Bf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,zf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,kf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Gf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Hf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,$f=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Kf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Zf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Jf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Qf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ep=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,np=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ip=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ap=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,op=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,lp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,cp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,up=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,gp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_p=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Mp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Fe={alphahash_fragment:kh,alphahash_pars_fragment:Gh,alphamap_fragment:Hh,alphamap_pars_fragment:Vh,alphatest_fragment:Wh,alphatest_pars_fragment:Xh,aomap_fragment:Yh,aomap_pars_fragment:qh,batching_pars_vertex:$h,batching_vertex:Kh,begin_vertex:Zh,beginnormal_vertex:Jh,bsdfs:Qh,iridescence_fragment:jh,bumpmap_pars_fragment:eu,clipping_planes_fragment:tu,clipping_planes_pars_fragment:nu,clipping_planes_pars_vertex:iu,clipping_planes_vertex:su,color_fragment:ru,color_pars_fragment:au,color_pars_vertex:ou,color_vertex:lu,common:cu,cube_uv_reflection_fragment:du,defaultnormal_vertex:hu,displacementmap_pars_vertex:uu,displacementmap_vertex:fu,emissivemap_fragment:pu,emissivemap_pars_fragment:mu,colorspace_fragment:gu,colorspace_pars_fragment:_u,envmap_fragment:xu,envmap_common_pars_fragment:vu,envmap_pars_fragment:Mu,envmap_pars_vertex:Su,envmap_physical_pars_fragment:Iu,envmap_vertex:yu,fog_vertex:Eu,fog_pars_vertex:bu,fog_fragment:Tu,fog_pars_fragment:Au,gradientmap_pars_fragment:wu,lightmap_pars_fragment:Ru,lights_lambert_fragment:Cu,lights_lambert_pars_fragment:Pu,lights_pars_begin:Lu,lights_toon_fragment:Du,lights_toon_pars_fragment:Uu,lights_phong_fragment:Nu,lights_phong_pars_fragment:Fu,lights_physical_fragment:Ou,lights_physical_pars_fragment:Bu,lights_fragment_begin:zu,lights_fragment_maps:ku,lights_fragment_end:Gu,lightprobes_pars_fragment:Hu,logdepthbuf_fragment:Vu,logdepthbuf_pars_fragment:Wu,logdepthbuf_pars_vertex:Xu,logdepthbuf_vertex:Yu,map_fragment:qu,map_pars_fragment:$u,map_particle_fragment:Ku,map_particle_pars_fragment:Zu,metalnessmap_fragment:Ju,metalnessmap_pars_fragment:Qu,morphinstance_vertex:ju,morphcolor_vertex:ef,morphnormal_vertex:tf,morphtarget_pars_vertex:nf,morphtarget_vertex:sf,normal_fragment_begin:rf,normal_fragment_maps:af,normal_pars_fragment:of,normal_pars_vertex:lf,normal_vertex:cf,normalmap_pars_fragment:df,clearcoat_normal_fragment_begin:hf,clearcoat_normal_fragment_maps:uf,clearcoat_pars_fragment:ff,iridescence_pars_fragment:pf,opaque_fragment:mf,packing:gf,premultiplied_alpha_fragment:_f,project_vertex:xf,dithering_fragment:vf,dithering_pars_fragment:Mf,roughnessmap_fragment:Sf,roughnessmap_pars_fragment:yf,shadowmap_pars_fragment:Ef,shadowmap_pars_vertex:bf,shadowmap_vertex:Tf,shadowmask_pars_fragment:Af,skinbase_vertex:wf,skinning_pars_vertex:Rf,skinning_vertex:Cf,skinnormal_vertex:Pf,specularmap_fragment:Lf,specularmap_pars_fragment:If,tonemapping_fragment:Df,tonemapping_pars_fragment:Uf,transmission_fragment:Nf,transmission_pars_fragment:Ff,uv_pars_fragment:Of,uv_pars_vertex:Bf,uv_vertex:zf,worldpos_vertex:kf,background_vert:Gf,background_frag:Hf,backgroundCube_vert:Vf,backgroundCube_frag:Wf,cube_vert:Xf,cube_frag:Yf,depth_vert:qf,depth_frag:$f,distance_vert:Kf,distance_frag:Zf,equirect_vert:Jf,equirect_frag:Qf,linedashed_vert:jf,linedashed_frag:ep,meshbasic_vert:tp,meshbasic_frag:np,meshlambert_vert:ip,meshlambert_frag:sp,meshmatcap_vert:rp,meshmatcap_frag:ap,meshnormal_vert:op,meshnormal_frag:lp,meshphong_vert:cp,meshphong_frag:dp,meshphysical_vert:hp,meshphysical_frag:up,meshtoon_vert:fp,meshtoon_frag:pp,points_vert:mp,points_frag:gp,shadow_vert:_p,shadow_frag:xp,sprite_vert:vp,sprite_frag:Mp},de={common:{diffuse:{value:new Be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ie},alphaMap:{value:null},alphaMapTransform:{value:new Ie},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ie}},envmap:{envMap:{value:null},envMapRotation:{value:new Ie},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ie}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ie}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ie},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ie},normalScale:{value:new $e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ie},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ie}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ie}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ie}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new N},probesMax:{value:new N},probesResolution:{value:new N}},points:{diffuse:{value:new Be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ie},alphaTest:{value:0},uvTransform:{value:new Ie}},sprite:{diffuse:{value:new Be(16777215)},opacity:{value:1},center:{value:new $e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ie},alphaMap:{value:null},alphaMapTransform:{value:new Ie},alphaTest:{value:0}}},dn={basic:{uniforms:Dt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:Fe.meshbasic_vert,fragmentShader:Fe.meshbasic_frag},lambert:{uniforms:Dt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Be(0)},envMapIntensity:{value:1}}]),vertexShader:Fe.meshlambert_vert,fragmentShader:Fe.meshlambert_frag},phong:{uniforms:Dt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Be(0)},specular:{value:new Be(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphong_vert,fragmentShader:Fe.meshphong_frag},standard:{uniforms:Dt([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new Be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag},toon:{uniforms:Dt([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new Be(0)}}]),vertexShader:Fe.meshtoon_vert,fragmentShader:Fe.meshtoon_frag},matcap:{uniforms:Dt([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:Fe.meshmatcap_vert,fragmentShader:Fe.meshmatcap_frag},points:{uniforms:Dt([de.points,de.fog]),vertexShader:Fe.points_vert,fragmentShader:Fe.points_frag},dashed:{uniforms:Dt([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Fe.linedashed_vert,fragmentShader:Fe.linedashed_frag},depth:{uniforms:Dt([de.common,de.displacementmap]),vertexShader:Fe.depth_vert,fragmentShader:Fe.depth_frag},normal:{uniforms:Dt([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:Fe.meshnormal_vert,fragmentShader:Fe.meshnormal_frag},sprite:{uniforms:Dt([de.sprite,de.fog]),vertexShader:Fe.sprite_vert,fragmentShader:Fe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ie},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Fe.background_vert,fragmentShader:Fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ie}},vertexShader:Fe.backgroundCube_vert,fragmentShader:Fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Fe.cube_vert,fragmentShader:Fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Fe.equirect_vert,fragmentShader:Fe.equirect_frag},distance:{uniforms:Dt([de.common,de.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Fe.distance_vert,fragmentShader:Fe.distance_frag},shadow:{uniforms:Dt([de.lights,de.fog,{color:{value:new Be(0)},opacity:{value:1}}]),vertexShader:Fe.shadow_vert,fragmentShader:Fe.shadow_frag}};dn.physical={uniforms:Dt([dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ie},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ie},clearcoatNormalScale:{value:new $e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ie},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ie},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ie},sheen:{value:0},sheenColor:{value:new Be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ie},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ie},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ie},transmissionSamplerSize:{value:new $e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ie},attenuationDistance:{value:0},attenuationColor:{value:new Be(0)},specularColor:{value:new Be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ie},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ie},anisotropyVector:{value:new $e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ie}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag};const Vs={r:0,b:0,g:0},Sp=new ht,Fc=new Ie;Fc.set(-1,0,0,0,1,0,0,0,1);function yp(i,e,t,n,s,r){const a=new Be(0);let o=s===!0?0:1,l,c,h=null,u=0,d=null;function f(A){let w=A.isScene===!0?A.background:null;if(w&&w.isTexture){const S=A.backgroundBlurriness>0;w=e.get(w,S)}return w}function _(A){let w=!1;const S=f(A);S===null?m(a,o):S&&S.isColor&&(m(S,1),w=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function M(A,w){const S=f(w);S&&(S.isCubeTexture||S.mapping===xr)?(c===void 0&&(c=new Rn(new ls(1,1,1),new gn({name:"BackgroundCubeMaterial",uniforms:Bi(dn.backgroundCube.uniforms),vertexShader:dn.backgroundCube.vertexShader,fragmentShader:dn.backgroundCube.fragmentShader,side:kt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,E,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Sp.makeRotationFromEuler(w.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Fc),c.material.toneMapped=ke.getTransfer(S.colorSpace)!==Ze,(h!==S||u!==S.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=S,u=S.version,d=i.toneMapping),c.layers.enableAll(),A.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new Rn(new vr(2,2),new gn({name:"BackgroundMaterial",uniforms:Bi(dn.background.uniforms),vertexShader:dn.background.vertexShader,fragmentShader:dn.background.fragmentShader,side:Gn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=ke.getTransfer(S.colorSpace)!==Ze,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(h!==S||u!==S.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=S,u=S.version,d=i.toneMapping),l.layers.enableAll(),A.unshift(l,l.geometry,l.material,0,0,null))}function m(A,w){A.getRGB(Vs,Ic(i)),t.buffers.color.setClear(Vs.r,Vs.g,Vs.b,w,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(A,w=1){a.set(A),o=w,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(A){o=A,m(a,o)},render:_,addToRenderList:M,dispose:p}}function Ep(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(P,B,$,Q,z){let K=!1;const G=u(P,Q,$,B);r!==G&&(r=G,c(r.object)),K=f(P,Q,$,z),K&&_(P,Q,$,z),z!==null&&e.update(z,i.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,S(P,B,$,Q),z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function l(){return i.createVertexArray()}function c(P){return i.bindVertexArray(P)}function h(P){return i.deleteVertexArray(P)}function u(P,B,$,Q){const z=Q.wireframe===!0;let K=n[B.id];K===void 0&&(K={},n[B.id]=K);const G=P.isInstancedMesh===!0?P.id:0;let J=K[G];J===void 0&&(J={},K[G]=J);let ee=J[$.id];ee===void 0&&(ee={},J[$.id]=ee);let he=ee[z];return he===void 0&&(he=d(l()),ee[z]=he),he}function d(P){const B=[],$=[],Q=[];for(let z=0;z<t;z++)B[z]=0,$[z]=0,Q[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:$,attributeDivisors:Q,object:P,attributes:{},index:null}}function f(P,B,$,Q){const z=r.attributes,K=B.attributes;let G=0;const J=$.getAttributes();for(const ee in J)if(J[ee].location>=0){const ge=z[ee];let Me=K[ee];if(Me===void 0&&(ee==="instanceMatrix"&&P.instanceMatrix&&(Me=P.instanceMatrix),ee==="instanceColor"&&P.instanceColor&&(Me=P.instanceColor)),ge===void 0||ge.attribute!==Me||Me&&ge.data!==Me.data)return!0;G++}return r.attributesNum!==G||r.index!==Q}function _(P,B,$,Q){const z={},K=B.attributes;let G=0;const J=$.getAttributes();for(const ee in J)if(J[ee].location>=0){let ge=K[ee];ge===void 0&&(ee==="instanceMatrix"&&P.instanceMatrix&&(ge=P.instanceMatrix),ee==="instanceColor"&&P.instanceColor&&(ge=P.instanceColor));const Me={};Me.attribute=ge,ge&&ge.data&&(Me.data=ge.data),z[ee]=Me,G++}r.attributes=z,r.attributesNum=G,r.index=Q}function M(){const P=r.newAttributes;for(let B=0,$=P.length;B<$;B++)P[B]=0}function m(P){p(P,0)}function p(P,B){const $=r.newAttributes,Q=r.enabledAttributes,z=r.attributeDivisors;$[P]=1,Q[P]===0&&(i.enableVertexAttribArray(P),Q[P]=1),z[P]!==B&&(i.vertexAttribDivisor(P,B),z[P]=B)}function A(){const P=r.newAttributes,B=r.enabledAttributes;for(let $=0,Q=B.length;$<Q;$++)B[$]!==P[$]&&(i.disableVertexAttribArray($),B[$]=0)}function w(P,B,$,Q,z,K,G){G===!0?i.vertexAttribIPointer(P,B,$,z,K):i.vertexAttribPointer(P,B,$,Q,z,K)}function S(P,B,$,Q){M();const z=Q.attributes,K=$.getAttributes(),G=B.defaultAttributeValues;for(const J in K){const ee=K[J];if(ee.location>=0){let he=z[J];if(he===void 0&&(J==="instanceMatrix"&&P.instanceMatrix&&(he=P.instanceMatrix),J==="instanceColor"&&P.instanceColor&&(he=P.instanceColor)),he!==void 0){const ge=he.normalized,Me=he.itemSize,Xe=e.get(he);if(Xe===void 0)continue;const st=Xe.buffer,Ye=Xe.type,Z=Xe.bytesPerElement,se=Ye===i.INT||Ye===i.UNSIGNED_INT||he.gpuType===go;if(he.isInterleavedBufferAttribute){const te=he.data,Le=te.stride,De=he.offset;if(te.isInstancedInterleavedBuffer){for(let Re=0;Re<ee.locationSize;Re++)p(ee.location+Re,te.meshPerAttribute);P.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Re=0;Re<ee.locationSize;Re++)m(ee.location+Re);i.bindBuffer(i.ARRAY_BUFFER,st);for(let Re=0;Re<ee.locationSize;Re++)w(ee.location+Re,Me/ee.locationSize,Ye,ge,Le*Z,(De+Me/ee.locationSize*Re)*Z,se)}else{if(he.isInstancedBufferAttribute){for(let te=0;te<ee.locationSize;te++)p(ee.location+te,he.meshPerAttribute);P.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let te=0;te<ee.locationSize;te++)m(ee.location+te);i.bindBuffer(i.ARRAY_BUFFER,st);for(let te=0;te<ee.locationSize;te++)w(ee.location+te,Me/ee.locationSize,Ye,ge,Me*Z,Me/ee.locationSize*te*Z,se)}}else if(G!==void 0){const ge=G[J];if(ge!==void 0)switch(ge.length){case 2:i.vertexAttrib2fv(ee.location,ge);break;case 3:i.vertexAttrib3fv(ee.location,ge);break;case 4:i.vertexAttrib4fv(ee.location,ge);break;default:i.vertexAttrib1fv(ee.location,ge)}}}}A()}function T(){b();for(const P in n){const B=n[P];for(const $ in B){const Q=B[$];for(const z in Q){const K=Q[z];for(const G in K)h(K[G].object),delete K[G];delete Q[z]}}delete n[P]}}function E(P){if(n[P.id]===void 0)return;const B=n[P.id];for(const $ in B){const Q=B[$];for(const z in Q){const K=Q[z];for(const G in K)h(K[G].object),delete K[G];delete Q[z]}}delete n[P.id]}function R(P){for(const B in n){const $=n[B];for(const Q in $){const z=$[Q];if(z[P.id]===void 0)continue;const K=z[P.id];for(const G in K)h(K[G].object),delete K[G];delete z[P.id]}}}function x(P){for(const B in n){const $=n[B],Q=P.isInstancedMesh===!0?P.id:0,z=$[Q];if(z!==void 0){for(const K in z){const G=z[K];for(const J in G)h(G[J].object),delete G[J];delete z[K]}delete $[Q],Object.keys($).length===0&&delete n[B]}}}function b(){D(),a=!0,r!==s&&(r=s,c(r.object))}function D(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:b,resetDefaultState:D,dispose:T,releaseStatesOfGeometry:E,releaseStatesOfObject:x,releaseStatesOfProgram:R,initAttributes:M,enableAttribute:m,disableUnusedAttributes:A}}function bp(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let d=0;for(let f=0;f<h;f++)d+=c[f];t.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Tp(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==nn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const x=R===An&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Jt&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==hn&&!x)}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(Pe("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Pe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),A=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:_,maxTextureSize:M,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:A,maxVaryings:w,maxFragmentUniforms:S,maxSamples:T,samples:E}}function Ap(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new jn,o=new Ie,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const _=u.clippingPlanes,M=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||_===null||_.length===0||r&&!m)r?h(null):c();else{const A=r?0:n,w=A*4;let S=p.clippingState||null;l.value=S,S=h(_,d,w,f);for(let T=0;T!==w;++T)S[T]=t[T];p.clippingState=S,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,_){const M=u!==null?u.length:0;let m=null;if(M!==0){if(m=l.value,_!==!0||m===null){const p=f+M*4,A=d.matrixWorldInverse;o.getNormalMatrix(A),(m===null||m.length<p)&&(m=new Float32Array(p));for(let w=0,S=f;w!==M;++w,S+=4)a.copy(u[w]).applyMatrix4(A,o),a.normal.toArray(m,S),m[S+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,m}}const zn=4,Cl=[.125,.215,.35,.446,.526,.582],ni=20,wp=256,Zi=new Uc,Pl=new Be;let ta=null,na=0,ia=0,sa=!1;const Rp=new N;class Ll{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=Rp}=r;ta=this._renderer.getRenderTarget(),na=this._renderer.getActiveCubeFace(),ia=this._renderer.getActiveMipmapLevel(),sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ul(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Dl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ta,na,ia),this._renderer.xr.enabled=sa,e.scissorTest=!1,Ai(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ai||e.mapping===Fi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ta=this._renderer.getRenderTarget(),na=this._renderer.getActiveCubeFace(),ia=this._renderer.getActiveMipmapLevel(),sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:It,minFilter:It,generateMipmaps:!1,type:An,format:nn,colorSpace:hr,depthBuffer:!1},s=Il(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Il(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Cp(r)),this._blurMaterial=Lp(r,e,t),this._ggxMaterial=Pp(r,e,t)}return s}_compileMaterial(e){const t=new Rn(new bt,e);this._renderer.compile(t,Zi)}_sceneToCubeUV(e,t,n,s,r){const l=new Zt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Pl),u.toneMapping=fn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Rn(new ls,new Ac({name:"PMREM.Background",side:kt,depthWrite:!1,depthTest:!1})));const M=this._backgroundBox,m=M.material;let p=!1;const A=e.background;A?A.isColor&&(m.color.copy(A),e.background=null,p=!0):(m.color.copy(Pl),p=!0);for(let w=0;w<6;w++){const S=w%3;S===0?(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[w],r.y,r.z)):S===1?(l.up.set(0,0,c[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[w],r.z)):(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[w]));const T=this._cubeSize;Ai(s,S*T,w>2?T:0,T,T),u.setRenderTarget(s),p&&u.render(M,l),u.render(e,l)}u.toneMapping=f,u.autoClear=d,e.background=A}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===ai||e.mapping===Fi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ul()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Dl());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Ai(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Zi)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),d=0+c*1.25,f=u*d,{_lodMax:_}=this,M=this._sizeLods[n],m=3*M*(n>_-zn?n-_+zn:0),p=4*(this._cubeSize-M);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=_-t,Ai(r,m,p,3*M,2*M),s.setRenderTarget(r),s.render(o,Zi),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=_-n,Ai(e,m,p,3*M,2*M),s.setRenderTarget(e),s.render(o,Zi)}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&We("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[s];u.material=c;const d=c.uniforms,f=this._sizeLods[n]-1,_=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ni-1),M=r/_,m=isFinite(r)?1+Math.floor(h*M):ni;m>ni&&Pe(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ni}`);const p=[];let A=0;for(let R=0;R<ni;++R){const x=R/M,b=Math.exp(-x*x/2);p.push(b),R===0?A+=b:R<m&&(A+=2*b)}for(let R=0;R<p.length;R++)p[R]=p[R]/A;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:w}=this;d.dTheta.value=_,d.mipInt.value=w-n;const S=this._sizeLods[s],T=3*S*(s>w-zn?s-w+zn:0),E=4*(this._cubeSize-S);Ai(t,T,E,3*S,2*S),l.setRenderTarget(t),l.render(u,Zi)}}function Cp(i){const e=[],t=[],n=[];let s=i;const r=i-zn+1+Cl.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-zn?l=Cl[a-i+zn-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,_=6,M=3,m=2,p=1,A=new Float32Array(M*_*f),w=new Float32Array(m*_*f),S=new Float32Array(p*_*f);for(let E=0;E<f;E++){const R=E%3*2/3-1,x=E>2?0:-1,b=[R,x,0,R+2/3,x,0,R+2/3,x+1,0,R,x,0,R+2/3,x+1,0,R,x+1,0];A.set(b,M*_*E),w.set(d,m*_*E);const D=[E,E,E,E,E,E];S.set(D,p*_*E)}const T=new bt;T.setAttribute("position",new xt(A,M)),T.setAttribute("uv",new xt(w,m)),T.setAttribute("faceIndex",new xt(S,p)),n.push(new Rn(T,null)),s>zn&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Il(i,e,t){const n=new pn(i,e,t);return n.texture.mapping=xr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ai(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Pp(i,e,t){return new gn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:wp,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Mr(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function Lp(i,e,t){const n=new Float32Array(ni),s=new N(0,1,0);return new gn({name:"SphericalGaussianBlur",defines:{n:ni,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Mr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function Dl(){return new gn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Mr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function Ul(){return new gn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Mr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function Mr(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Oc extends pn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Pc(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new ls(5,5,5),r=new gn({name:"CubemapFromEquirect",uniforms:Bi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:kt,blending:bn});r.uniforms.tEquirect.value=t;const a=new Rn(s,r),o=t.minFilter;return t.minFilter===ii&&(t.minFilter=It),new Fh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}function Ip(i){let e=new WeakMap,t=new WeakMap,n=null;function s(d,f=!1){return d==null?null:f?a(d):r(d)}function r(d){if(d&&d.isTexture){const f=d.mapping;if(f===wr||f===Rr)if(e.has(d)){const _=e.get(d).texture;return o(_,d.mapping)}else{const _=d.image;if(_&&_.height>0){const M=new Oc(_.height);return M.fromEquirectangularTexture(i,d),e.set(d,M),d.addEventListener("dispose",c),o(M.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const f=d.mapping,_=f===wr||f===Rr,M=f===ai||f===Fi;if(_||M){let m=t.get(d);const p=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return n===null&&(n=new Ll(i)),m=_?n.fromEquirectangular(d,m):n.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{const A=d.image;return _&&A&&A.height>0||M&&A&&l(A)?(n===null&&(n=new Ll(i)),m=_?n.fromEquirectangular(d):n.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",h),m.texture):null}}}return d}function o(d,f){return f===wr?d.mapping=ai:f===Rr&&(d.mapping=Fi),d}function l(d){let f=0;const _=6;for(let M=0;M<_;M++)d[M]!==void 0&&f++;return f===_}function c(d){const f=d.target;f.removeEventListener("dispose",c);const _=e.get(f);_!==void 0&&(e.delete(f),_.dispose())}function h(d){const f=d.target;f.removeEventListener("dispose",h);const _=t.get(f);_!==void 0&&(t.delete(f),_.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function Dp(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Pi("WebGLRenderer: "+n+" extension not supported."),s}}}function Up(i,e,t,n){const s={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const _ in d.attributes)e.remove(d.attributes[_]);d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)e.update(d[f],i.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,_=u.attributes.position;let M=0;if(_===void 0)return;if(f!==null){const A=f.array;M=f.version;for(let w=0,S=A.length;w<S;w+=3){const T=A[w+0],E=A[w+1],R=A[w+2];d.push(T,E,E,R,R,T)}}else{const A=_.array;M=_.version;for(let w=0,S=A.length/3-1;w<S;w+=3){const T=w+0,E=w+1,R=w+2;d.push(T,E,E,R,R,T)}}const m=new(_.count>=65535?Tc:bc)(d,1);m.version=M;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Np(i,e,t){let n;function s(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,d){i.drawElements(n,d,r,u*a),t.update(d,n,1)}function c(u,d,f){f!==0&&(i.drawElementsInstanced(n,d,r,u*a,f),t.update(d,n,f))}function h(u,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,u,0,f);let M=0;for(let m=0;m<f;m++)M+=d[m];t.update(M,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Fp(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:We("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Op(i,e,t){const n=new WeakMap,s=new dt;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let D=function(){x.dispose(),n.delete(o),o.removeEventListener("dispose",D)};var f=D;d!==void 0&&d.texture.dispose();const _=o.morphAttributes.position!==void 0,M=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],A=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let S=0;_===!0&&(S=1),M===!0&&(S=2),m===!0&&(S=3);let T=o.attributes.position.count*S,E=1;T>e.maxTextureSize&&(E=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const R=new Float32Array(T*E*4*u),x=new Sc(R,T,E,u);x.type=hn,x.needsUpdate=!0;const b=S*4;for(let P=0;P<u;P++){const B=p[P],$=A[P],Q=w[P],z=T*E*4*P;for(let K=0;K<B.count;K++){const G=K*b;_===!0&&(s.fromBufferAttribute(B,K),R[z+G+0]=s.x,R[z+G+1]=s.y,R[z+G+2]=s.z,R[z+G+3]=0),M===!0&&(s.fromBufferAttribute($,K),R[z+G+4]=s.x,R[z+G+5]=s.y,R[z+G+6]=s.z,R[z+G+7]=0),m===!0&&(s.fromBufferAttribute(Q,K),R[z+G+8]=s.x,R[z+G+9]=s.y,R[z+G+10]=s.z,R[z+G+11]=Q.itemSize===4?s.w:1)}}d={count:u,texture:x,size:new $e(T,E)},n.set(o,d),o.addEventListener("dispose",D)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const M=o.morphTargetsRelative?1:1-_;l.getUniforms().setValue(i,"morphTargetBaseInfluence",M),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Bp(i,e,t,n,s){let r=new WeakMap;function a(c){const h=s.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==h&&(e.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function o(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const zp={[rc]:"LINEAR_TONE_MAPPING",[ac]:"REINHARD_TONE_MAPPING",[oc]:"CINEON_TONE_MAPPING",[lc]:"ACES_FILMIC_TONE_MAPPING",[dc]:"AGX_TONE_MAPPING",[hc]:"NEUTRAL_TONE_MAPPING",[cc]:"CUSTOM_TONE_MAPPING"};function kp(i,e,t,n,s,r){const a=new pn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new Oi(e,t):void 0}),o=new pn(e,t,{type:An,depthBuffer:!1,stencilBuffer:!1}),l=new bt;l.setAttribute("position",new sn([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new sn([0,2,0,0,2,0],2));const c=new Dh({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new Rn(l,c),u=new Uc(-1,1,1,-1,0,1);let d=null,f=null,_=!1,M,m=null,p=[],A=!1;this.setSize=function(w,S){a.setSize(w,S),o.setSize(w,S);for(let T=0;T<p.length;T++){const E=p[T];E.setSize&&E.setSize(w,S)}},this.setEffects=function(w){p=w,A=p.length>0&&p[0].isRenderPass===!0;const S=a.width,T=a.height;for(let E=0;E<p.length;E++){const R=p[E];R.setSize&&R.setSize(S,T)}},this.begin=function(w,S){if(_||w.toneMapping===fn&&p.length===0)return!1;if(m=S,S!==null){const T=S.width,E=S.height;(a.width!==T||a.height!==E)&&this.setSize(T,E)}return A===!1&&w.setRenderTarget(a),M=w.toneMapping,w.toneMapping=fn,!0},this.hasRenderPass=function(){return A},this.end=function(w,S){w.toneMapping=M,_=!0;let T=a,E=o;for(let R=0;R<p.length;R++){const x=p[R];if(x.enabled!==!1&&(x.render(w,E,T,S),x.needsSwap!==!1)){const b=T;T=E,E=b}}if(d!==w.outputColorSpace||f!==w.toneMapping){d=w.outputColorSpace,f=w.toneMapping,c.defines={},ke.getTransfer(d)===Ze&&(c.defines.SRGB_TRANSFER="");const R=zp[f];R&&(c.defines[R]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=T.texture,w.setRenderTarget(m),w.render(h,u),m=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}const Bc=new Ut,ro=new Oi(1,1),zc=new Sc,kc=new ch,Gc=new Pc,Nl=[],Fl=[],Ol=new Float32Array(16),Bl=new Float32Array(9),zl=new Float32Array(4);function Hi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Nl[s];if(r===void 0&&(r=new Float32Array(s),Nl[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Mt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function St(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Sr(i,e){let t=Fl[e];t===void 0&&(t=new Int32Array(e),Fl[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Gp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Hp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;i.uniform2fv(this.addr,e),St(t,e)}}function Vp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Mt(t,e))return;i.uniform3fv(this.addr,e),St(t,e)}}function Wp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;i.uniform4fv(this.addr,e),St(t,e)}}function Xp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,n))return;zl.set(n),i.uniformMatrix2fv(this.addr,!1,zl),St(t,n)}}function Yp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,n))return;Bl.set(n),i.uniformMatrix3fv(this.addr,!1,Bl),St(t,n)}}function qp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,n))return;Ol.set(n),i.uniformMatrix4fv(this.addr,!1,Ol),St(t,n)}}function $p(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Kp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;i.uniform2iv(this.addr,e),St(t,e)}}function Zp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;i.uniform3iv(this.addr,e),St(t,e)}}function Jp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;i.uniform4iv(this.addr,e),St(t,e)}}function Qp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function jp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;i.uniform2uiv(this.addr,e),St(t,e)}}function em(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;i.uniform3uiv(this.addr,e),St(t,e)}}function tm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;i.uniform4uiv(this.addr,e),St(t,e)}}function nm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ro.compareFunction=t.isReversedDepthBuffer()?Eo:yo,r=ro):r=Bc,t.setTexture2D(e||r,s)}function im(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||kc,s)}function sm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Gc,s)}function rm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||zc,s)}function am(i){switch(i){case 5126:return Gp;case 35664:return Hp;case 35665:return Vp;case 35666:return Wp;case 35674:return Xp;case 35675:return Yp;case 35676:return qp;case 5124:case 35670:return $p;case 35667:case 35671:return Kp;case 35668:case 35672:return Zp;case 35669:case 35673:return Jp;case 5125:return Qp;case 36294:return jp;case 36295:return em;case 36296:return tm;case 35678:case 36198:case 36298:case 36306:case 35682:return nm;case 35679:case 36299:case 36307:return im;case 35680:case 36300:case 36308:case 36293:return sm;case 36289:case 36303:case 36311:case 36292:return rm}}function om(i,e){i.uniform1fv(this.addr,e)}function lm(i,e){const t=Hi(e,this.size,2);i.uniform2fv(this.addr,t)}function cm(i,e){const t=Hi(e,this.size,3);i.uniform3fv(this.addr,t)}function dm(i,e){const t=Hi(e,this.size,4);i.uniform4fv(this.addr,t)}function hm(i,e){const t=Hi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function um(i,e){const t=Hi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function fm(i,e){const t=Hi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function pm(i,e){i.uniform1iv(this.addr,e)}function mm(i,e){i.uniform2iv(this.addr,e)}function gm(i,e){i.uniform3iv(this.addr,e)}function _m(i,e){i.uniform4iv(this.addr,e)}function xm(i,e){i.uniform1uiv(this.addr,e)}function vm(i,e){i.uniform2uiv(this.addr,e)}function Mm(i,e){i.uniform3uiv(this.addr,e)}function Sm(i,e){i.uniform4uiv(this.addr,e)}function ym(i,e,t){const n=this.cache,s=e.length,r=Sr(t,s);Mt(n,r)||(i.uniform1iv(this.addr,r),St(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=ro:a=Bc;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Em(i,e,t){const n=this.cache,s=e.length,r=Sr(t,s);Mt(n,r)||(i.uniform1iv(this.addr,r),St(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||kc,r[a])}function bm(i,e,t){const n=this.cache,s=e.length,r=Sr(t,s);Mt(n,r)||(i.uniform1iv(this.addr,r),St(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Gc,r[a])}function Tm(i,e,t){const n=this.cache,s=e.length,r=Sr(t,s);Mt(n,r)||(i.uniform1iv(this.addr,r),St(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||zc,r[a])}function Am(i){switch(i){case 5126:return om;case 35664:return lm;case 35665:return cm;case 35666:return dm;case 35674:return hm;case 35675:return um;case 35676:return fm;case 5124:case 35670:return pm;case 35667:case 35671:return mm;case 35668:case 35672:return gm;case 35669:case 35673:return _m;case 5125:return xm;case 36294:return vm;case 36295:return Mm;case 36296:return Sm;case 35678:case 36198:case 36298:case 36306:case 35682:return ym;case 35679:case 36299:case 36307:return Em;case 35680:case 36300:case 36308:case 36293:return bm;case 36289:case 36303:case 36311:case 36292:return Tm}}class wm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=am(t.type)}}class Rm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Am(t.type)}}class Cm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const ra=/(\w+)(\])?(\[|\.)?/g;function kl(i,e){i.seq.push(e),i.map[e.id]=e}function Pm(i,e,t){const n=i.name,s=n.length;for(ra.lastIndex=0;;){const r=ra.exec(n),a=ra.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){kl(t,c===void 0?new wm(o,i,e):new Rm(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new Cm(o),kl(t,u)),t=u}}}class er{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Pm(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Gl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Lm=37297;let Im=0;function Dm(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Hl=new Ie;function Um(i){ke._getMatrix(Hl,ke.workingColorSpace,i);const e=`mat3( ${Hl.elements.map(t=>t.toFixed(4))} )`;switch(ke.getTransfer(i)){case ur:return[e,"LinearTransferOETF"];case Ze:return[e,"sRGBTransferOETF"];default:return Pe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Vl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Dm(i.getShaderSource(e),o)}else return r}function Nm(i,e){const t=Um(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Fm={[rc]:"Linear",[ac]:"Reinhard",[oc]:"Cineon",[lc]:"ACESFilmic",[dc]:"AgX",[hc]:"Neutral",[cc]:"Custom"};function Om(i,e){const t=Fm[e];return t===void 0?(Pe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ws=new N;function Bm(){ke.getLuminanceCoefficients(Ws);const i=Ws.x.toFixed(4),e=Ws.y.toFixed(4),t=Ws.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function zm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ji).join(`
`)}function km(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Gm(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function ji(i){return i!==""}function Wl(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Xl(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Hm=/^[ \t]*#include +<([\w\d./]+)>/gm;function ao(i){return i.replace(Hm,Wm)}const Vm=new Map;function Wm(i,e){let t=Fe[e];if(t===void 0){const n=Vm.get(e);if(n!==void 0)t=Fe[n],Pe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return ao(t)}const Xm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Yl(i){return i.replace(Xm,Ym)}function Ym(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ql(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const qm={[Ks]:"SHADOWMAP_TYPE_PCF",[Qi]:"SHADOWMAP_TYPE_VSM"};function $m(i){return qm[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Km={[ai]:"ENVMAP_TYPE_CUBE",[Fi]:"ENVMAP_TYPE_CUBE",[xr]:"ENVMAP_TYPE_CUBE_UV"};function Zm(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Km[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const Jm={[Fi]:"ENVMAP_MODE_REFRACTION"};function Qm(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Jm[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const jm={[sc]:"ENVMAP_BLENDING_MULTIPLY",[Hd]:"ENVMAP_BLENDING_MIX",[Vd]:"ENVMAP_BLENDING_ADD"};function e0(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":jm[i.combine]||"ENVMAP_BLENDING_NONE"}function t0(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function n0(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=$m(t),c=Zm(t),h=Qm(t),u=e0(t),d=t0(t),f=zm(t),_=km(r),M=s.createProgram();let m,p,A=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ji).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ji).join(`
`),p.length>0&&(p+=`
`)):(m=[ql(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ji).join(`
`),p=[ql(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==fn?"#define TONE_MAPPING":"",t.toneMapping!==fn?Fe.tonemapping_pars_fragment:"",t.toneMapping!==fn?Om("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Fe.colorspace_pars_fragment,Nm("linearToOutputTexel",t.outputColorSpace),Bm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ji).join(`
`)),a=ao(a),a=Wl(a,t),a=Xl(a,t),o=ao(o),o=Wl(o,t),o=Xl(o,t),a=Yl(a),o=Yl(o),t.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===tl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===tl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const w=A+m+a,S=A+p+o,T=Gl(s,s.VERTEX_SHADER,w),E=Gl(s,s.FRAGMENT_SHADER,S);s.attachShader(M,T),s.attachShader(M,E),t.index0AttributeName!==void 0?s.bindAttribLocation(M,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function R(P){if(i.debug.checkShaderErrors){const B=s.getProgramInfoLog(M)||"",$=s.getShaderInfoLog(T)||"",Q=s.getShaderInfoLog(E)||"",z=B.trim(),K=$.trim(),G=Q.trim();let J=!0,ee=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(J=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,M,T,E);else{const he=Vl(s,T,"vertex"),ge=Vl(s,E,"fragment");We("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+z+`
`+he+`
`+ge)}else z!==""?Pe("WebGLProgram: Program Info Log:",z):(K===""||G==="")&&(ee=!1);ee&&(P.diagnostics={runnable:J,programLog:z,vertexShader:{log:K,prefix:m},fragmentShader:{log:G,prefix:p}})}s.deleteShader(T),s.deleteShader(E),x=new er(s,M),b=Gm(s,M)}let x;this.getUniforms=function(){return x===void 0&&R(this),x};let b;this.getAttributes=function(){return b===void 0&&R(this),b};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=s.getProgramParameter(M,Lm)),D},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Im++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=T,this.fragmentShader=E,this}let i0=0;class s0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new r0(e),t.set(e,n)),n}}class r0{constructor(e){this.id=i0++,this.code=e,this.usedTimes=0}}function a0(i){return i===oi||i===cr||i===dr}function o0(i,e,t,n,s,r){const a=new yc,o=new s0,l=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer;let d=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return l.add(x),x===0?"uv":`uv${x}`}function M(x,b,D,P,B,$){const Q=P.fog,z=B.geometry,K=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?P.environment:null,G=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,J=e.get(x.envMap||K,G),ee=J&&J.mapping===xr?J.image.height:null,he=f[x.type];x.precision!==null&&(d=n.getMaxPrecision(x.precision),d!==x.precision&&Pe("WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));const ge=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Me=ge!==void 0?ge.length:0;let Xe=0;z.morphAttributes.position!==void 0&&(Xe=1),z.morphAttributes.normal!==void 0&&(Xe=2),z.morphAttributes.color!==void 0&&(Xe=3);let st,Ye,Z,se;if(he){const Se=dn[he];st=Se.vertexShader,Ye=Se.fragmentShader}else{st=x.vertexShader,Ye=x.fragmentShader;const Se=o.getVertexShaderStage(x),at=o.getFragmentShaderStage(x);o.update(x,Se,at),Z=Se.id,se=at.id}const te=i.getRenderTarget(),Le=i.state.buffers.depth.getReversed(),De=B.isInstancedMesh===!0,Re=B.isBatchedMesh===!0,ut=!!x.map,ze=!!x.matcap,Qe=!!J,qe=!!x.aoMap,He=!!x.lightMap,mt=!!x.bumpMap&&x.wireframe===!1,vt=!!x.normalMap,yt=!!x.displacementMap,Tt=!!x.emissiveMap,rt=!!x.metalnessMap,gt=!!x.roughnessMap,L=x.anisotropy>0,Ot=x.clearcoat>0,Ke=x.dispersion>0,y=x.iridescence>0,g=x.sheen>0,U=x.transmission>0,k=L&&!!x.anisotropyMap,W=Ot&&!!x.clearcoatMap,ne=Ot&&!!x.clearcoatNormalMap,re=Ot&&!!x.clearcoatRoughnessMap,X=y&&!!x.iridescenceMap,q=y&&!!x.iridescenceThicknessMap,ae=g&&!!x.sheenColorMap,be=g&&!!x.sheenRoughnessMap,ce=!!x.specularMap,oe=!!x.specularColorMap,we=!!x.specularIntensityMap,Ce=U&&!!x.transmissionMap,Ue=U&&!!x.thicknessMap,C=!!x.gradientMap,ie=!!x.alphaMap,Y=x.alphaTest>0,le=!!x.alphaHash,me=!!x.extensions;let j=fn;x.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(j=i.toneMapping);const Ee={shaderID:he,shaderType:x.type,shaderName:x.name,vertexShader:st,fragmentShader:Ye,defines:x.defines,customVertexShaderID:Z,customFragmentShaderID:se,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,batching:Re,batchingColor:Re&&B._colorsTexture!==null,instancing:De,instancingColor:De&&B.instanceColor!==null,instancingMorph:De&&B.morphTexture!==null,outputColorSpace:te===null?i.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:ke.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:ut,matcap:ze,envMap:Qe,envMapMode:Qe&&J.mapping,envMapCubeUVHeight:ee,aoMap:qe,lightMap:He,bumpMap:mt,normalMap:vt,displacementMap:yt,emissiveMap:Tt,normalMapObjectSpace:vt&&x.normalMapType===Yd,normalMapTangentSpace:vt&&x.normalMapType===Qo,packedNormalMap:vt&&x.normalMapType===Qo&&a0(x.normalMap.format),metalnessMap:rt,roughnessMap:gt,anisotropy:L,anisotropyMap:k,clearcoat:Ot,clearcoatMap:W,clearcoatNormalMap:ne,clearcoatRoughnessMap:re,dispersion:Ke,iridescence:y,iridescenceMap:X,iridescenceThicknessMap:q,sheen:g,sheenColorMap:ae,sheenRoughnessMap:be,specularMap:ce,specularColorMap:oe,specularIntensityMap:we,transmission:U,transmissionMap:Ce,thicknessMap:Ue,gradientMap:C,opaque:x.transparent===!1&&x.blending===Ci&&x.alphaToCoverage===!1,alphaMap:ie,alphaTest:Y,alphaHash:le,combine:x.combine,mapUv:ut&&_(x.map.channel),aoMapUv:qe&&_(x.aoMap.channel),lightMapUv:He&&_(x.lightMap.channel),bumpMapUv:mt&&_(x.bumpMap.channel),normalMapUv:vt&&_(x.normalMap.channel),displacementMapUv:yt&&_(x.displacementMap.channel),emissiveMapUv:Tt&&_(x.emissiveMap.channel),metalnessMapUv:rt&&_(x.metalnessMap.channel),roughnessMapUv:gt&&_(x.roughnessMap.channel),anisotropyMapUv:k&&_(x.anisotropyMap.channel),clearcoatMapUv:W&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:ne&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:re&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:X&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:q&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:ae&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:be&&_(x.sheenRoughnessMap.channel),specularMapUv:ce&&_(x.specularMap.channel),specularColorMapUv:oe&&_(x.specularColorMap.channel),specularIntensityMapUv:we&&_(x.specularIntensityMap.channel),transmissionMapUv:Ce&&_(x.transmissionMap.channel),thicknessMapUv:Ue&&_(x.thicknessMap.channel),alphaMapUv:ie&&_(x.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(vt||L),vertexNormals:!!z.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!z.attributes.uv&&(ut||ie),fog:!!Q,useFog:x.fog===!0,fogExp2:!!Q&&Q.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||z.attributes.normal===void 0&&vt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Le,skinning:B.isSkinnedMesh===!0,hasPositionAttribute:z.attributes.position!==void 0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:Me,morphTextureStride:Xe,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:$.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:j,decodeVideoTexture:ut&&x.map.isVideoTexture===!0&&ke.getTransfer(x.map.colorSpace)===Ze,decodeVideoTextureEmissive:Tt&&x.emissiveMap.isVideoTexture===!0&&ke.getTransfer(x.emissiveMap.colorSpace)===Ze,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===yn,flipSided:x.side===kt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:me&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(me&&x.extensions.multiDraw===!0||Re)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ee.vertexUv1s=l.has(1),Ee.vertexUv2s=l.has(2),Ee.vertexUv3s=l.has(3),l.clear(),Ee}function m(x){const b=[];if(x.shaderID?b.push(x.shaderID):(b.push(x.customVertexShaderID),b.push(x.customFragmentShaderID)),x.defines!==void 0)for(const D in x.defines)b.push(D),b.push(x.defines[D]);return x.isRawShaderMaterial===!1&&(p(b,x),A(b,x),b.push(i.outputColorSpace)),b.push(x.customProgramCacheKey),b.join()}function p(x,b){x.push(b.precision),x.push(b.outputColorSpace),x.push(b.envMapMode),x.push(b.envMapCubeUVHeight),x.push(b.mapUv),x.push(b.alphaMapUv),x.push(b.lightMapUv),x.push(b.aoMapUv),x.push(b.bumpMapUv),x.push(b.normalMapUv),x.push(b.displacementMapUv),x.push(b.emissiveMapUv),x.push(b.metalnessMapUv),x.push(b.roughnessMapUv),x.push(b.anisotropyMapUv),x.push(b.clearcoatMapUv),x.push(b.clearcoatNormalMapUv),x.push(b.clearcoatRoughnessMapUv),x.push(b.iridescenceMapUv),x.push(b.iridescenceThicknessMapUv),x.push(b.sheenColorMapUv),x.push(b.sheenRoughnessMapUv),x.push(b.specularMapUv),x.push(b.specularColorMapUv),x.push(b.specularIntensityMapUv),x.push(b.transmissionMapUv),x.push(b.thicknessMapUv),x.push(b.combine),x.push(b.fogExp2),x.push(b.sizeAttenuation),x.push(b.morphTargetsCount),x.push(b.morphAttributeCount),x.push(b.numDirLights),x.push(b.numPointLights),x.push(b.numSpotLights),x.push(b.numSpotLightMaps),x.push(b.numHemiLights),x.push(b.numRectAreaLights),x.push(b.numDirLightShadows),x.push(b.numPointLightShadows),x.push(b.numSpotLightShadows),x.push(b.numSpotLightShadowsWithMaps),x.push(b.numLightProbes),x.push(b.shadowMapType),x.push(b.toneMapping),x.push(b.numClippingPlanes),x.push(b.numClipIntersection),x.push(b.depthPacking)}function A(x,b){a.disableAll(),b.instancing&&a.enable(0),b.instancingColor&&a.enable(1),b.instancingMorph&&a.enable(2),b.matcap&&a.enable(3),b.envMap&&a.enable(4),b.normalMapObjectSpace&&a.enable(5),b.normalMapTangentSpace&&a.enable(6),b.clearcoat&&a.enable(7),b.iridescence&&a.enable(8),b.alphaTest&&a.enable(9),b.vertexColors&&a.enable(10),b.vertexAlphas&&a.enable(11),b.vertexUv1s&&a.enable(12),b.vertexUv2s&&a.enable(13),b.vertexUv3s&&a.enable(14),b.vertexTangents&&a.enable(15),b.anisotropy&&a.enable(16),b.alphaHash&&a.enable(17),b.batching&&a.enable(18),b.dispersion&&a.enable(19),b.batchingColor&&a.enable(20),b.gradientMap&&a.enable(21),b.packedNormalMap&&a.enable(22),b.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),b.numLightProbeGrids>0&&a.enable(22),b.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function w(x){const b=f[x.type];let D;if(b){const P=dn[b];D=Ph.clone(P.uniforms)}else D=x.uniforms;return D}function S(x,b){let D=h.get(b);return D!==void 0?++D.usedTimes:(D=new n0(i,b,x,s),c.push(D),h.set(b,D)),D}function T(x){if(--x.usedTimes===0){const b=c.indexOf(x);c[b]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function E(x){o.remove(x)}function R(){o.dispose()}return{getParameters:M,getProgramCacheKey:m,getUniforms:w,acquireProgram:S,releaseProgram:T,releaseShaderCache:E,programs:c,dispose:R}}function l0(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function c0(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function $l(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Kl(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function o(d,f,_,M,m,p){let A=i[e];return A===void 0?(A={id:d.id,object:d,geometry:f,material:_,materialVariant:a(d),groupOrder:M,renderOrder:d.renderOrder,z:m,group:p},i[e]=A):(A.id=d.id,A.object=d,A.geometry=f,A.material=_,A.materialVariant=a(d),A.groupOrder=M,A.renderOrder=d.renderOrder,A.z=m,A.group=p),e++,A}function l(d,f,_,M,m,p){const A=o(d,f,_,M,m,p);_.transmission>0?n.push(A):_.transparent===!0?s.push(A):t.push(A)}function c(d,f,_,M,m,p){const A=o(d,f,_,M,m,p);_.transmission>0?n.unshift(A):_.transparent===!0?s.unshift(A):t.unshift(A)}function h(d,f,_){t.length>1&&t.sort(d||c0),n.length>1&&n.sort(f||$l),s.length>1&&s.sort(f||$l),_&&(t.reverse(),n.reverse(),s.reverse())}function u(){for(let d=e,f=i.length;d<f;d++){const _=i[d];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:u,sort:h}}function d0(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Kl,i.set(n,[a])):s>=r.length?(a=new Kl,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function h0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new Be};break;case"SpotLight":t={position:new N,direction:new N,color:new Be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new Be,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new Be,groundColor:new Be};break;case"RectAreaLight":t={color:new Be,position:new N,halfWidth:new N,halfHeight:new N};break}return i[e.id]=t,t}}}function u0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let f0=0;function p0(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function m0(i){const e=new h0,t=u0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new N);const s=new N,r=new ht,a=new ht;function o(c){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,_=0,M=0,m=0,p=0,A=0,w=0,S=0,T=0,E=0,R=0;c.sort(p0);for(let b=0,D=c.length;b<D;b++){const P=c[b],B=P.color,$=P.intensity,Q=P.distance;let z=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===oi?z=P.shadow.map.texture:z=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=B.r*$,u+=B.g*$,d+=B.b*$;else if(P.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(P.sh.coefficients[K],$);R++}else if(P.isDirectionalLight){const K=e.get(P);if(K.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const G=P.shadow,J=t.get(P);J.shadowIntensity=G.intensity,J.shadowBias=G.bias,J.shadowNormalBias=G.normalBias,J.shadowRadius=G.radius,J.shadowMapSize=G.mapSize,n.directionalShadow[f]=J,n.directionalShadowMap[f]=z,n.directionalShadowMatrix[f]=P.shadow.matrix,A++}n.directional[f]=K,f++}else if(P.isSpotLight){const K=e.get(P);K.position.setFromMatrixPosition(P.matrixWorld),K.color.copy(B).multiplyScalar($),K.distance=Q,K.coneCos=Math.cos(P.angle),K.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),K.decay=P.decay,n.spot[M]=K;const G=P.shadow;if(P.map&&(n.spotLightMap[T]=P.map,T++,G.updateMatrices(P),P.castShadow&&E++),n.spotLightMatrix[M]=G.matrix,P.castShadow){const J=t.get(P);J.shadowIntensity=G.intensity,J.shadowBias=G.bias,J.shadowNormalBias=G.normalBias,J.shadowRadius=G.radius,J.shadowMapSize=G.mapSize,n.spotShadow[M]=J,n.spotShadowMap[M]=z,S++}M++}else if(P.isRectAreaLight){const K=e.get(P);K.color.copy(B).multiplyScalar($),K.halfWidth.set(P.width*.5,0,0),K.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=K,m++}else if(P.isPointLight){const K=e.get(P);if(K.color.copy(P.color).multiplyScalar(P.intensity),K.distance=P.distance,K.decay=P.decay,P.castShadow){const G=P.shadow,J=t.get(P);J.shadowIntensity=G.intensity,J.shadowBias=G.bias,J.shadowNormalBias=G.normalBias,J.shadowRadius=G.radius,J.shadowMapSize=G.mapSize,J.shadowCameraNear=G.camera.near,J.shadowCameraFar=G.camera.far,n.pointShadow[_]=J,n.pointShadowMap[_]=z,n.pointShadowMatrix[_]=P.shadow.matrix,w++}n.point[_]=K,_++}else if(P.isHemisphereLight){const K=e.get(P);K.skyColor.copy(P.color).multiplyScalar($),K.groundColor.copy(P.groundColor).multiplyScalar($),n.hemi[p]=K,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=de.LTC_FLOAT_1,n.rectAreaLTC2=de.LTC_FLOAT_2):(n.rectAreaLTC1=de.LTC_HALF_1,n.rectAreaLTC2=de.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const x=n.hash;(x.directionalLength!==f||x.pointLength!==_||x.spotLength!==M||x.rectAreaLength!==m||x.hemiLength!==p||x.numDirectionalShadows!==A||x.numPointShadows!==w||x.numSpotShadows!==S||x.numSpotMaps!==T||x.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=M,n.rectArea.length=m,n.point.length=_,n.hemi.length=p,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=A,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=S+T-E,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=R,x.directionalLength=f,x.pointLength=_,x.spotLength=M,x.rectAreaLength=m,x.hemiLength=p,x.numDirectionalShadows=A,x.numPointShadows=w,x.numSpotShadows=S,x.numSpotMaps=T,x.numLightProbes=R,n.version=f0++)}function l(c,h){let u=0,d=0,f=0,_=0,M=0;const m=h.matrixWorldInverse;for(let p=0,A=c.length;p<A;p++){const w=c[p];if(w.isDirectionalLight){const S=n.directional[u];S.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),u++}else if(w.isSpotLight){const S=n.spot[f];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),f++}else if(w.isRectAreaLight){const S=n.rectArea[_];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(m),a.identity(),r.copy(w.matrixWorld),r.premultiply(m),a.extractRotation(r),S.halfWidth.set(w.width*.5,0,0),S.halfHeight.set(0,w.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),_++}else if(w.isPointLight){const S=n.point[d];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(m),d++}else if(w.isHemisphereLight){const S=n.hemi[M];S.direction.setFromMatrixPosition(w.matrixWorld),S.direction.transformDirection(m),M++}}}return{setup:o,setupView:l,state:n}}function Zl(i){const e=new m0(i),t=[],n=[],s=[];function r(d){u.camera=d,t.length=0,n.length=0,s.length=0}function a(d){t.push(d)}function o(d){n.push(d)}function l(d){s.push(d)}function c(){e.setup(t)}function h(d){e.setupView(t,d)}const u={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function g0(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Zl(i),e.set(s,[o])):r>=a.length?(o=new Zl(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const _0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,x0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,v0=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],M0=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],Jl=new ht,Ji=new N,aa=new N;function S0(i,e,t){let n=new wc;const s=new $e,r=new $e,a=new dt,o=new Uh,l=new Nh,c={},h=t.maxTextureSize,u={[Gn]:kt,[kt]:Gn,[yn]:yn},d=new gn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $e},radius:{value:4}},vertexShader:_0,fragmentShader:x0}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const _=new bt;_.setAttribute("position",new xt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new Rn(_,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ks;let p=this.type;this.render=function(E,R,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===Ed&&(Pe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ks);const b=i.getRenderTarget(),D=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),B=i.state;B.setBlending(bn),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const $=p!==this.type;$&&R.traverse(function(Q){Q.material&&(Array.isArray(Q.material)?Q.material.forEach(z=>z.needsUpdate=!0):Q.material.needsUpdate=!0)});for(let Q=0,z=E.length;Q<z;Q++){const K=E[Q],G=K.shadow;if(G===void 0){Pe("WebGLShadowMap:",K,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const J=G.getFrameExtents();s.multiply(J),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/J.x),s.x=r.x*J.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/J.y),s.y=r.y*J.y,G.mapSize.y=r.y));const ee=i.state.buffers.depth.getReversed();if(G.camera._reversedDepth=ee,G.map===null||$===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===Qi){if(K.isPointLight){Pe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new pn(s.x,s.y,{format:oi,type:An,minFilter:It,magFilter:It,generateMipmaps:!1}),G.map.texture.name=K.name+".shadowMap",G.map.depthTexture=new Oi(s.x,s.y,hn),G.map.depthTexture.name=K.name+".shadowMapDepth",G.map.depthTexture.format=wn,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Rt,G.map.depthTexture.magFilter=Rt}else K.isPointLight?(G.map=new Oc(s.x),G.map.depthTexture=new Rh(s.x,mn)):(G.map=new pn(s.x,s.y),G.map.depthTexture=new Oi(s.x,s.y,mn)),G.map.depthTexture.name=K.name+".shadowMap",G.map.depthTexture.format=wn,this.type===Ks?(G.map.depthTexture.compareFunction=ee?Eo:yo,G.map.depthTexture.minFilter=It,G.map.depthTexture.magFilter=It):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Rt,G.map.depthTexture.magFilter=Rt);G.camera.updateProjectionMatrix()}const he=G.map.isWebGLCubeRenderTarget?6:1;for(let ge=0;ge<he;ge++){if(G.map.isWebGLCubeRenderTarget)i.setRenderTarget(G.map,ge),i.clear();else{ge===0&&(i.setRenderTarget(G.map),i.clear());const Me=G.getViewport(ge);a.set(r.x*Me.x,r.y*Me.y,r.x*Me.z,r.y*Me.w),B.viewport(a)}if(K.isPointLight){const Me=G.camera,Xe=G.matrix,st=K.distance||Me.far;st!==Me.far&&(Me.far=st,Me.updateProjectionMatrix()),Ji.setFromMatrixPosition(K.matrixWorld),Me.position.copy(Ji),aa.copy(Me.position),aa.add(v0[ge]),Me.up.copy(M0[ge]),Me.lookAt(aa),Me.updateMatrixWorld(),Xe.makeTranslation(-Ji.x,-Ji.y,-Ji.z),Jl.multiplyMatrices(Me.projectionMatrix,Me.matrixWorldInverse),G._frustum.setFromProjectionMatrix(Jl,Me.coordinateSystem,Me.reversedDepth)}else G.updateMatrices(K);n=G.getFrustum(),S(R,x,G.camera,K,this.type)}G.isPointLightShadow!==!0&&this.type===Qi&&A(G,x),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(b,D,P)};function A(E,R){const x=e.update(M);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new pn(s.x,s.y,{format:oi,type:An})),d.uniforms.shadow_pass.value=E.map.depthTexture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(R,null,x,d,M,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(R,null,x,f,M,null)}function w(E,R,x,b){let D=null;const P=x.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(P!==void 0)D=P;else if(D=x.isPointLight===!0?l:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const B=D.uuid,$=R.uuid;let Q=c[B];Q===void 0&&(Q={},c[B]=Q);let z=Q[$];z===void 0&&(z=D.clone(),Q[$]=z,R.addEventListener("dispose",T)),D=z}if(D.visible=R.visible,D.wireframe=R.wireframe,b===Qi?D.side=R.shadowSide!==null?R.shadowSide:R.side:D.side=R.shadowSide!==null?R.shadowSide:u[R.side],D.alphaMap=R.alphaMap,D.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,D.map=R.map,D.clipShadows=R.clipShadows,D.clippingPlanes=R.clippingPlanes,D.clipIntersection=R.clipIntersection,D.displacementMap=R.displacementMap,D.displacementScale=R.displacementScale,D.displacementBias=R.displacementBias,D.wireframeLinewidth=R.wireframeLinewidth,D.linewidth=R.linewidth,x.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const B=i.properties.get(D);B.light=x}return D}function S(E,R,x,b,D){if(E.visible===!1)return;if(E.layers.test(R.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&D===Qi)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,E.matrixWorld);const $=e.update(E),Q=E.material;if(Array.isArray(Q)){const z=$.groups;for(let K=0,G=z.length;K<G;K++){const J=z[K],ee=Q[J.materialIndex];if(ee&&ee.visible){const he=w(E,ee,b,D);E.onBeforeShadow(i,E,R,x,$,he,J),i.renderBufferDirect(x,null,$,he,E,J),E.onAfterShadow(i,E,R,x,$,he,J)}}}else if(Q.visible){const z=w(E,Q,b,D);E.onBeforeShadow(i,E,R,x,$,z,null),i.renderBufferDirect(x,null,$,z,E,null),E.onAfterShadow(i,E,R,x,$,z,null)}}const B=E.children;for(let $=0,Q=B.length;$<Q;$++)S(B[$],R,x,b,D)}function T(E){E.target.removeEventListener("dispose",T);for(const x in c){const b=c[x],D=E.target.uuid;D in b&&(b[D].dispose(),delete b[D])}}}function y0(i,e){function t(){let C=!1;const ie=new dt;let Y=null;const le=new dt(0,0,0,0);return{setMask:function(me){Y!==me&&!C&&(i.colorMask(me,me,me,me),Y=me)},setLocked:function(me){C=me},setClear:function(me,j,Ee,Se,at){at===!0&&(me*=Se,j*=Se,Ee*=Se),ie.set(me,j,Ee,Se),le.equals(ie)===!1&&(i.clearColor(me,j,Ee,Se),le.copy(ie))},reset:function(){C=!1,Y=null,le.set(-1,0,0,0)}}}function n(){let C=!1,ie=!1,Y=null,le=null,me=null;return{setReversed:function(j){if(ie!==j){const Ee=e.get("EXT_clip_control");j?Ee.clipControlEXT(Ee.LOWER_LEFT_EXT,Ee.ZERO_TO_ONE_EXT):Ee.clipControlEXT(Ee.LOWER_LEFT_EXT,Ee.NEGATIVE_ONE_TO_ONE_EXT),ie=j;const Se=me;me=null,this.setClear(Se)}},getReversed:function(){return ie},setTest:function(j){j?te(i.DEPTH_TEST):Le(i.DEPTH_TEST)},setMask:function(j){Y!==j&&!C&&(i.depthMask(j),Y=j)},setFunc:function(j){if(ie&&(j=nh[j]),le!==j){switch(j){case xa:i.depthFunc(i.NEVER);break;case va:i.depthFunc(i.ALWAYS);break;case Ma:i.depthFunc(i.LESS);break;case Ni:i.depthFunc(i.LEQUAL);break;case Sa:i.depthFunc(i.EQUAL);break;case ya:i.depthFunc(i.GEQUAL);break;case Ea:i.depthFunc(i.GREATER);break;case ba:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}le=j}},setLocked:function(j){C=j},setClear:function(j){me!==j&&(me=j,ie&&(j=1-j),i.clearDepth(j))},reset:function(){C=!1,Y=null,le=null,me=null,ie=!1}}}function s(){let C=!1,ie=null,Y=null,le=null,me=null,j=null,Ee=null,Se=null,at=null;return{setTest:function(tt){C||(tt?te(i.STENCIL_TEST):Le(i.STENCIL_TEST))},setMask:function(tt){ie!==tt&&!C&&(i.stencilMask(tt),ie=tt)},setFunc:function(tt,rn,an){(Y!==tt||le!==rn||me!==an)&&(i.stencilFunc(tt,rn,an),Y=tt,le=rn,me=an)},setOp:function(tt,rn,an){(j!==tt||Ee!==rn||Se!==an)&&(i.stencilOp(tt,rn,an),j=tt,Ee=rn,Se=an)},setLocked:function(tt){C=tt},setClear:function(tt){at!==tt&&(i.clearStencil(tt),at=tt)},reset:function(){C=!1,ie=null,Y=null,le=null,me=null,j=null,Ee=null,Se=null,at=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let h={},u={},d={},f=new WeakMap,_=[],M=null,m=!1,p=null,A=null,w=null,S=null,T=null,E=null,R=null,x=new Be(0,0,0),b=0,D=!1,P=null,B=null,$=null,Q=null,z=null;const K=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,J=0;const ee=i.getParameter(i.VERSION);ee.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(ee)[1]),G=J>=1):ee.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),G=J>=2);let he=null,ge={};const Me=i.getParameter(i.SCISSOR_BOX),Xe=i.getParameter(i.VIEWPORT),st=new dt().fromArray(Me),Ye=new dt().fromArray(Xe);function Z(C,ie,Y,le){const me=new Uint8Array(4),j=i.createTexture();i.bindTexture(C,j),i.texParameteri(C,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(C,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ee=0;Ee<Y;Ee++)C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY?i.texImage3D(ie,0,i.RGBA,1,1,le,0,i.RGBA,i.UNSIGNED_BYTE,me):i.texImage2D(ie+Ee,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,me);return j}const se={};se[i.TEXTURE_2D]=Z(i.TEXTURE_2D,i.TEXTURE_2D,1),se[i.TEXTURE_CUBE_MAP]=Z(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[i.TEXTURE_2D_ARRAY]=Z(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),se[i.TEXTURE_3D]=Z(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),te(i.DEPTH_TEST),a.setFunc(Ni),mt(!1),vt($o),te(i.CULL_FACE),qe(bn);function te(C){h[C]!==!0&&(i.enable(C),h[C]=!0)}function Le(C){h[C]!==!1&&(i.disable(C),h[C]=!1)}function De(C,ie){return d[C]!==ie?(i.bindFramebuffer(C,ie),d[C]=ie,C===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=ie),C===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=ie),!0):!1}function Re(C,ie){let Y=_,le=!1;if(C){Y=f.get(ie),Y===void 0&&(Y=[],f.set(ie,Y));const me=C.textures;if(Y.length!==me.length||Y[0]!==i.COLOR_ATTACHMENT0){for(let j=0,Ee=me.length;j<Ee;j++)Y[j]=i.COLOR_ATTACHMENT0+j;Y.length=me.length,le=!0}}else Y[0]!==i.BACK&&(Y[0]=i.BACK,le=!0);le&&i.drawBuffers(Y)}function ut(C){return M!==C?(i.useProgram(C),M=C,!0):!1}const ze={[ti]:i.FUNC_ADD,[Td]:i.FUNC_SUBTRACT,[Ad]:i.FUNC_REVERSE_SUBTRACT};ze[wd]=i.MIN,ze[Rd]=i.MAX;const Qe={[Cd]:i.ZERO,[Pd]:i.ONE,[Ld]:i.SRC_COLOR,[ga]:i.SRC_ALPHA,[Od]:i.SRC_ALPHA_SATURATE,[Nd]:i.DST_COLOR,[Dd]:i.DST_ALPHA,[Id]:i.ONE_MINUS_SRC_COLOR,[_a]:i.ONE_MINUS_SRC_ALPHA,[Fd]:i.ONE_MINUS_DST_COLOR,[Ud]:i.ONE_MINUS_DST_ALPHA,[Bd]:i.CONSTANT_COLOR,[zd]:i.ONE_MINUS_CONSTANT_COLOR,[kd]:i.CONSTANT_ALPHA,[Gd]:i.ONE_MINUS_CONSTANT_ALPHA};function qe(C,ie,Y,le,me,j,Ee,Se,at,tt){if(C===bn){m===!0&&(Le(i.BLEND),m=!1);return}if(m===!1&&(te(i.BLEND),m=!0),C!==bd){if(C!==p||tt!==D){if((A!==ti||T!==ti)&&(i.blendEquation(i.FUNC_ADD),A=ti,T=ti),tt)switch(C){case Ci:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ko:i.blendFunc(i.ONE,i.ONE);break;case Zo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Jo:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:We("WebGLState: Invalid blending: ",C);break}else switch(C){case Ci:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ko:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Zo:We("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Jo:We("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:We("WebGLState: Invalid blending: ",C);break}w=null,S=null,E=null,R=null,x.set(0,0,0),b=0,p=C,D=tt}return}me=me||ie,j=j||Y,Ee=Ee||le,(ie!==A||me!==T)&&(i.blendEquationSeparate(ze[ie],ze[me]),A=ie,T=me),(Y!==w||le!==S||j!==E||Ee!==R)&&(i.blendFuncSeparate(Qe[Y],Qe[le],Qe[j],Qe[Ee]),w=Y,S=le,E=j,R=Ee),(Se.equals(x)===!1||at!==b)&&(i.blendColor(Se.r,Se.g,Se.b,at),x.copy(Se),b=at),p=C,D=!1}function He(C,ie){C.side===yn?Le(i.CULL_FACE):te(i.CULL_FACE);let Y=C.side===kt;ie&&(Y=!Y),mt(Y),C.blending===Ci&&C.transparent===!1?qe(bn):qe(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),a.setFunc(C.depthFunc),a.setTest(C.depthTest),a.setMask(C.depthWrite),r.setMask(C.colorWrite);const le=C.stencilWrite;o.setTest(le),le&&(o.setMask(C.stencilWriteMask),o.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),o.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),Tt(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?te(i.SAMPLE_ALPHA_TO_COVERAGE):Le(i.SAMPLE_ALPHA_TO_COVERAGE)}function mt(C){P!==C&&(C?i.frontFace(i.CW):i.frontFace(i.CCW),P=C)}function vt(C){C!==Sd?(te(i.CULL_FACE),C!==B&&(C===$o?i.cullFace(i.BACK):C===yd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Le(i.CULL_FACE),B=C}function yt(C){C!==$&&(G&&i.lineWidth(C),$=C)}function Tt(C,ie,Y){C?(te(i.POLYGON_OFFSET_FILL),(Q!==ie||z!==Y)&&(Q=ie,z=Y,a.getReversed()&&(ie=-ie),i.polygonOffset(ie,Y))):Le(i.POLYGON_OFFSET_FILL)}function rt(C){C?te(i.SCISSOR_TEST):Le(i.SCISSOR_TEST)}function gt(C){C===void 0&&(C=i.TEXTURE0+K-1),he!==C&&(i.activeTexture(C),he=C)}function L(C,ie,Y){Y===void 0&&(he===null?Y=i.TEXTURE0+K-1:Y=he);let le=ge[Y];le===void 0&&(le={type:void 0,texture:void 0},ge[Y]=le),(le.type!==C||le.texture!==ie)&&(he!==Y&&(i.activeTexture(Y),he=Y),i.bindTexture(C,ie||se[C]),le.type=C,le.texture=ie)}function Ot(){const C=ge[he];C!==void 0&&C.type!==void 0&&(i.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function Ke(){try{i.compressedTexImage2D(...arguments)}catch(C){We("WebGLState:",C)}}function y(){try{i.compressedTexImage3D(...arguments)}catch(C){We("WebGLState:",C)}}function g(){try{i.texSubImage2D(...arguments)}catch(C){We("WebGLState:",C)}}function U(){try{i.texSubImage3D(...arguments)}catch(C){We("WebGLState:",C)}}function k(){try{i.compressedTexSubImage2D(...arguments)}catch(C){We("WebGLState:",C)}}function W(){try{i.compressedTexSubImage3D(...arguments)}catch(C){We("WebGLState:",C)}}function ne(){try{i.texStorage2D(...arguments)}catch(C){We("WebGLState:",C)}}function re(){try{i.texStorage3D(...arguments)}catch(C){We("WebGLState:",C)}}function X(){try{i.texImage2D(...arguments)}catch(C){We("WebGLState:",C)}}function q(){try{i.texImage3D(...arguments)}catch(C){We("WebGLState:",C)}}function ae(C){return u[C]!==void 0?u[C]:i.getParameter(C)}function be(C,ie){u[C]!==ie&&(i.pixelStorei(C,ie),u[C]=ie)}function ce(C){st.equals(C)===!1&&(i.scissor(C.x,C.y,C.z,C.w),st.copy(C))}function oe(C){Ye.equals(C)===!1&&(i.viewport(C.x,C.y,C.z,C.w),Ye.copy(C))}function we(C,ie){let Y=c.get(ie);Y===void 0&&(Y=new WeakMap,c.set(ie,Y));let le=Y.get(C);le===void 0&&(le=i.getUniformBlockIndex(ie,C.name),Y.set(C,le))}function Ce(C,ie){const le=c.get(ie).get(C);l.get(ie)!==le&&(i.uniformBlockBinding(ie,le,C.__bindingPointIndex),l.set(ie,le))}function Ue(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},he=null,ge={},d={},f=new WeakMap,_=[],M=null,m=!1,p=null,A=null,w=null,S=null,T=null,E=null,R=null,x=new Be(0,0,0),b=0,D=!1,P=null,B=null,$=null,Q=null,z=null,st.set(0,0,i.canvas.width,i.canvas.height),Ye.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:te,disable:Le,bindFramebuffer:De,drawBuffers:Re,useProgram:ut,setBlending:qe,setMaterial:He,setFlipSided:mt,setCullFace:vt,setLineWidth:yt,setPolygonOffset:Tt,setScissorTest:rt,activeTexture:gt,bindTexture:L,unbindTexture:Ot,compressedTexImage2D:Ke,compressedTexImage3D:y,texImage2D:X,texImage3D:q,pixelStorei:be,getParameter:ae,updateUBOMapping:we,uniformBlockBinding:Ce,texStorage2D:ne,texStorage3D:re,texSubImage2D:g,texSubImage3D:U,compressedTexSubImage2D:k,compressedTexSubImage3D:W,scissor:ce,viewport:oe,reset:Ue}}function E0(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new $e,h=new WeakMap,u=new Set;let d;const f=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(y,g){return _?new OffscreenCanvas(y,g):pr("canvas")}function m(y,g,U){let k=1;const W=Ke(y);if((W.width>U||W.height>U)&&(k=U/Math.max(W.width,W.height)),k<1)if(typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&y instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&y instanceof ImageBitmap||typeof VideoFrame<"u"&&y instanceof VideoFrame){const ne=Math.floor(k*W.width),re=Math.floor(k*W.height);d===void 0&&(d=M(ne,re));const X=g?M(ne,re):d;return X.width=ne,X.height=re,X.getContext("2d").drawImage(y,0,0,ne,re),Pe("WebGLRenderer: Texture has been resized from ("+W.width+"x"+W.height+") to ("+ne+"x"+re+")."),X}else return"data"in y&&Pe("WebGLRenderer: Image in DataTexture is too big ("+W.width+"x"+W.height+")."),y;return y}function p(y){return y.generateMipmaps}function A(y){i.generateMipmap(y)}function w(y){return y.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:y.isWebGL3DRenderTarget?i.TEXTURE_3D:y.isWebGLArrayRenderTarget||y.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(y,g,U,k,W,ne=!1){if(y!==null){if(i[y]!==void 0)return i[y];Pe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let re;k&&(re=e.get("EXT_texture_norm16"),re||Pe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let X=g;if(g===i.RED&&(U===i.FLOAT&&(X=i.R32F),U===i.HALF_FLOAT&&(X=i.R16F),U===i.UNSIGNED_BYTE&&(X=i.R8),U===i.UNSIGNED_SHORT&&re&&(X=re.R16_EXT),U===i.SHORT&&re&&(X=re.R16_SNORM_EXT)),g===i.RED_INTEGER&&(U===i.UNSIGNED_BYTE&&(X=i.R8UI),U===i.UNSIGNED_SHORT&&(X=i.R16UI),U===i.UNSIGNED_INT&&(X=i.R32UI),U===i.BYTE&&(X=i.R8I),U===i.SHORT&&(X=i.R16I),U===i.INT&&(X=i.R32I)),g===i.RG&&(U===i.FLOAT&&(X=i.RG32F),U===i.HALF_FLOAT&&(X=i.RG16F),U===i.UNSIGNED_BYTE&&(X=i.RG8),U===i.UNSIGNED_SHORT&&re&&(X=re.RG16_EXT),U===i.SHORT&&re&&(X=re.RG16_SNORM_EXT)),g===i.RG_INTEGER&&(U===i.UNSIGNED_BYTE&&(X=i.RG8UI),U===i.UNSIGNED_SHORT&&(X=i.RG16UI),U===i.UNSIGNED_INT&&(X=i.RG32UI),U===i.BYTE&&(X=i.RG8I),U===i.SHORT&&(X=i.RG16I),U===i.INT&&(X=i.RG32I)),g===i.RGB_INTEGER&&(U===i.UNSIGNED_BYTE&&(X=i.RGB8UI),U===i.UNSIGNED_SHORT&&(X=i.RGB16UI),U===i.UNSIGNED_INT&&(X=i.RGB32UI),U===i.BYTE&&(X=i.RGB8I),U===i.SHORT&&(X=i.RGB16I),U===i.INT&&(X=i.RGB32I)),g===i.RGBA_INTEGER&&(U===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),U===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),U===i.UNSIGNED_INT&&(X=i.RGBA32UI),U===i.BYTE&&(X=i.RGBA8I),U===i.SHORT&&(X=i.RGBA16I),U===i.INT&&(X=i.RGBA32I)),g===i.RGB&&(U===i.UNSIGNED_SHORT&&re&&(X=re.RGB16_EXT),U===i.SHORT&&re&&(X=re.RGB16_SNORM_EXT),U===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),U===i.UNSIGNED_INT_10F_11F_11F_REV&&(X=i.R11F_G11F_B10F)),g===i.RGBA){const q=ne?ur:ke.getTransfer(W);U===i.FLOAT&&(X=i.RGBA32F),U===i.HALF_FLOAT&&(X=i.RGBA16F),U===i.UNSIGNED_BYTE&&(X=q===Ze?i.SRGB8_ALPHA8:i.RGBA8),U===i.UNSIGNED_SHORT&&re&&(X=re.RGBA16_EXT),U===i.SHORT&&re&&(X=re.RGBA16_SNORM_EXT),U===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),U===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function T(y,g){let U;return y?g===null||g===mn||g===rs?U=i.DEPTH24_STENCIL8:g===hn?U=i.DEPTH32F_STENCIL8:g===ss&&(U=i.DEPTH24_STENCIL8,Pe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===mn||g===rs?U=i.DEPTH_COMPONENT24:g===hn?U=i.DEPTH_COMPONENT32F:g===ss&&(U=i.DEPTH_COMPONENT16),U}function E(y,g){return p(y)===!0||y.isFramebufferTexture&&y.minFilter!==Rt&&y.minFilter!==It?Math.log2(Math.max(g.width,g.height))+1:y.mipmaps!==void 0&&y.mipmaps.length>0?y.mipmaps.length:y.isCompressedTexture&&Array.isArray(y.image)?g.mipmaps.length:1}function R(y){const g=y.target;g.removeEventListener("dispose",R),b(g),g.isVideoTexture&&h.delete(g),g.isHTMLTexture&&u.delete(g)}function x(y){const g=y.target;g.removeEventListener("dispose",x),P(g)}function b(y){const g=n.get(y);if(g.__webglInit===void 0)return;const U=y.source,k=f.get(U);if(k){const W=k[g.__cacheKey];W.usedTimes--,W.usedTimes===0&&D(y),Object.keys(k).length===0&&f.delete(U)}n.remove(y)}function D(y){const g=n.get(y);i.deleteTexture(g.__webglTexture);const U=y.source,k=f.get(U);delete k[g.__cacheKey],a.memory.textures--}function P(y){const g=n.get(y);if(y.depthTexture&&(y.depthTexture.dispose(),n.remove(y.depthTexture)),y.isWebGLCubeRenderTarget)for(let k=0;k<6;k++){if(Array.isArray(g.__webglFramebuffer[k]))for(let W=0;W<g.__webglFramebuffer[k].length;W++)i.deleteFramebuffer(g.__webglFramebuffer[k][W]);else i.deleteFramebuffer(g.__webglFramebuffer[k]);g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer[k])}else{if(Array.isArray(g.__webglFramebuffer))for(let k=0;k<g.__webglFramebuffer.length;k++)i.deleteFramebuffer(g.__webglFramebuffer[k]);else i.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&i.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let k=0;k<g.__webglColorRenderbuffer.length;k++)g.__webglColorRenderbuffer[k]&&i.deleteRenderbuffer(g.__webglColorRenderbuffer[k]);g.__webglDepthRenderbuffer&&i.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const U=y.textures;for(let k=0,W=U.length;k<W;k++){const ne=n.get(U[k]);ne.__webglTexture&&(i.deleteTexture(ne.__webglTexture),a.memory.textures--),n.remove(U[k])}n.remove(y)}let B=0;function $(){B=0}function Q(){return B}function z(y){B=y}function K(){const y=B;return y>=s.maxTextures&&Pe("WebGLTextures: Trying to use "+y+" texture units while this GPU supports only "+s.maxTextures),B+=1,y}function G(y){const g=[];return g.push(y.wrapS),g.push(y.wrapT),g.push(y.wrapR||0),g.push(y.magFilter),g.push(y.minFilter),g.push(y.anisotropy),g.push(y.internalFormat),g.push(y.format),g.push(y.type),g.push(y.generateMipmaps),g.push(y.premultiplyAlpha),g.push(y.flipY),g.push(y.unpackAlignment),g.push(y.colorSpace),g.join()}function J(y,g){const U=n.get(y);if(y.isVideoTexture&&L(y),y.isRenderTargetTexture===!1&&y.isExternalTexture!==!0&&y.version>0&&U.__version!==y.version){const k=y.image;if(k===null)Pe("WebGLRenderer: Texture marked for update but no image data found.");else if(k.complete===!1)Pe("WebGLRenderer: Texture marked for update but image is incomplete");else{Le(U,y,g);return}}else y.isExternalTexture&&(U.__webglTexture=y.sourceTexture?y.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,U.__webglTexture,i.TEXTURE0+g)}function ee(y,g){const U=n.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&U.__version!==y.version){Le(U,y,g);return}else y.isExternalTexture&&(U.__webglTexture=y.sourceTexture?y.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,U.__webglTexture,i.TEXTURE0+g)}function he(y,g){const U=n.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&U.__version!==y.version){Le(U,y,g);return}t.bindTexture(i.TEXTURE_3D,U.__webglTexture,i.TEXTURE0+g)}function ge(y,g){const U=n.get(y);if(y.isCubeDepthTexture!==!0&&y.version>0&&U.__version!==y.version){De(U,y,g);return}t.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture,i.TEXTURE0+g)}const Me={[Ta]:i.REPEAT,[En]:i.CLAMP_TO_EDGE,[Aa]:i.MIRRORED_REPEAT},Xe={[Rt]:i.NEAREST,[Wd]:i.NEAREST_MIPMAP_NEAREST,[xs]:i.NEAREST_MIPMAP_LINEAR,[It]:i.LINEAR,[Cr]:i.LINEAR_MIPMAP_NEAREST,[ii]:i.LINEAR_MIPMAP_LINEAR},st={[qd]:i.NEVER,[Qd]:i.ALWAYS,[$d]:i.LESS,[yo]:i.LEQUAL,[Kd]:i.EQUAL,[Eo]:i.GEQUAL,[Zd]:i.GREATER,[Jd]:i.NOTEQUAL};function Ye(y,g){if(g.type===hn&&e.has("OES_texture_float_linear")===!1&&(g.magFilter===It||g.magFilter===Cr||g.magFilter===xs||g.magFilter===ii||g.minFilter===It||g.minFilter===Cr||g.minFilter===xs||g.minFilter===ii)&&Pe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(y,i.TEXTURE_WRAP_S,Me[g.wrapS]),i.texParameteri(y,i.TEXTURE_WRAP_T,Me[g.wrapT]),(y===i.TEXTURE_3D||y===i.TEXTURE_2D_ARRAY)&&i.texParameteri(y,i.TEXTURE_WRAP_R,Me[g.wrapR]),i.texParameteri(y,i.TEXTURE_MAG_FILTER,Xe[g.magFilter]),i.texParameteri(y,i.TEXTURE_MIN_FILTER,Xe[g.minFilter]),g.compareFunction&&(i.texParameteri(y,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(y,i.TEXTURE_COMPARE_FUNC,st[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Rt||g.minFilter!==xs&&g.minFilter!==ii||g.type===hn&&e.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||n.get(g).__currentAnisotropy){const U=e.get("EXT_texture_filter_anisotropic");i.texParameterf(y,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,s.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy}}}function Z(y,g){let U=!1;y.__webglInit===void 0&&(y.__webglInit=!0,g.addEventListener("dispose",R));const k=g.source;let W=f.get(k);W===void 0&&(W={},f.set(k,W));const ne=G(g);if(ne!==y.__cacheKey){W[ne]===void 0&&(W[ne]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,U=!0),W[ne].usedTimes++;const re=W[y.__cacheKey];re!==void 0&&(W[y.__cacheKey].usedTimes--,re.usedTimes===0&&D(g)),y.__cacheKey=ne,y.__webglTexture=W[ne].texture}return U}function se(y,g,U){return Math.floor(Math.floor(y/U)/g)}function te(y,g,U,k){const ne=y.updateRanges;if(ne.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,g.width,g.height,U,k,g.data);else{ne.sort((be,ce)=>be.start-ce.start);let re=0;for(let be=1;be<ne.length;be++){const ce=ne[re],oe=ne[be],we=ce.start+ce.count,Ce=se(oe.start,g.width,4),Ue=se(ce.start,g.width,4);oe.start<=we+1&&Ce===Ue&&se(oe.start+oe.count-1,g.width,4)===Ce?ce.count=Math.max(ce.count,oe.start+oe.count-ce.start):(++re,ne[re]=oe)}ne.length=re+1;const X=t.getParameter(i.UNPACK_ROW_LENGTH),q=t.getParameter(i.UNPACK_SKIP_PIXELS),ae=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,g.width);for(let be=0,ce=ne.length;be<ce;be++){const oe=ne[be],we=Math.floor(oe.start/4),Ce=Math.ceil(oe.count/4),Ue=we%g.width,C=Math.floor(we/g.width),ie=Ce,Y=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ue),t.pixelStorei(i.UNPACK_SKIP_ROWS,C),t.texSubImage2D(i.TEXTURE_2D,0,Ue,C,ie,Y,U,k,g.data)}y.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,X),t.pixelStorei(i.UNPACK_SKIP_PIXELS,q),t.pixelStorei(i.UNPACK_SKIP_ROWS,ae)}}function Le(y,g,U){let k=i.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(k=i.TEXTURE_2D_ARRAY),g.isData3DTexture&&(k=i.TEXTURE_3D);const W=Z(y,g),ne=g.source;t.bindTexture(k,y.__webglTexture,i.TEXTURE0+U);const re=n.get(ne);if(ne.version!==re.__version||W===!0){if(t.activeTexture(i.TEXTURE0+U),(typeof ImageBitmap<"u"&&g.image instanceof ImageBitmap)===!1){const Y=ke.getPrimaries(ke.workingColorSpace),le=g.colorSpace===Bn?null:ke.getPrimaries(g.colorSpace),me=g.colorSpace===Bn||Y===le?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,me)}t.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment);let q=m(g.image,!1,s.maxTextureSize);q=Ot(g,q);const ae=r.convert(g.format,g.colorSpace),be=r.convert(g.type);let ce=S(g.internalFormat,ae,be,g.normalized,g.colorSpace,g.isVideoTexture);Ye(k,g);let oe;const we=g.mipmaps,Ce=g.isVideoTexture!==!0,Ue=re.__version===void 0||W===!0,C=ne.dataReady,ie=E(g,q);if(g.isDepthTexture)ce=T(g.format===si,g.type),Ue&&(Ce?t.texStorage2D(i.TEXTURE_2D,1,ce,q.width,q.height):t.texImage2D(i.TEXTURE_2D,0,ce,q.width,q.height,0,ae,be,null));else if(g.isDataTexture)if(we.length>0){Ce&&Ue&&t.texStorage2D(i.TEXTURE_2D,ie,ce,we[0].width,we[0].height);for(let Y=0,le=we.length;Y<le;Y++)oe=we[Y],Ce?C&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,oe.width,oe.height,ae,be,oe.data):t.texImage2D(i.TEXTURE_2D,Y,ce,oe.width,oe.height,0,ae,be,oe.data);g.generateMipmaps=!1}else Ce?(Ue&&t.texStorage2D(i.TEXTURE_2D,ie,ce,q.width,q.height),C&&te(g,q,ae,be)):t.texImage2D(i.TEXTURE_2D,0,ce,q.width,q.height,0,ae,be,q.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){Ce&&Ue&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ie,ce,we[0].width,we[0].height,q.depth);for(let Y=0,le=we.length;Y<le;Y++)if(oe=we[Y],g.format!==nn)if(ae!==null)if(Ce){if(C)if(g.layerUpdates.size>0){const me=Rl(oe.width,oe.height,g.format,g.type);for(const j of g.layerUpdates){const Ee=oe.data.subarray(j*me/oe.data.BYTES_PER_ELEMENT,(j+1)*me/oe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,j,oe.width,oe.height,1,ae,Ee)}g.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,oe.width,oe.height,q.depth,ae,oe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Y,ce,oe.width,oe.height,q.depth,0,oe.data,0,0);else Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ce?C&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,oe.width,oe.height,q.depth,ae,be,oe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Y,ce,oe.width,oe.height,q.depth,0,ae,be,oe.data)}else{Ce&&Ue&&t.texStorage2D(i.TEXTURE_2D,ie,ce,we[0].width,we[0].height);for(let Y=0,le=we.length;Y<le;Y++)oe=we[Y],g.format!==nn?ae!==null?Ce?C&&t.compressedTexSubImage2D(i.TEXTURE_2D,Y,0,0,oe.width,oe.height,ae,oe.data):t.compressedTexImage2D(i.TEXTURE_2D,Y,ce,oe.width,oe.height,0,oe.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ce?C&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,oe.width,oe.height,ae,be,oe.data):t.texImage2D(i.TEXTURE_2D,Y,ce,oe.width,oe.height,0,ae,be,oe.data)}else if(g.isDataArrayTexture)if(Ce){if(Ue&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ie,ce,q.width,q.height,q.depth),C)if(g.layerUpdates.size>0){const Y=Rl(q.width,q.height,g.format,g.type);for(const le of g.layerUpdates){const me=q.data.subarray(le*Y/q.data.BYTES_PER_ELEMENT,(le+1)*Y/q.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,le,q.width,q.height,1,ae,be,me)}g.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,q.width,q.height,q.depth,ae,be,q.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ce,q.width,q.height,q.depth,0,ae,be,q.data);else if(g.isData3DTexture)Ce?(Ue&&t.texStorage3D(i.TEXTURE_3D,ie,ce,q.width,q.height,q.depth),C&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,q.width,q.height,q.depth,ae,be,q.data)):t.texImage3D(i.TEXTURE_3D,0,ce,q.width,q.height,q.depth,0,ae,be,q.data);else if(g.isFramebufferTexture){if(Ue)if(Ce)t.texStorage2D(i.TEXTURE_2D,ie,ce,q.width,q.height);else{let Y=q.width,le=q.height;for(let me=0;me<ie;me++)t.texImage2D(i.TEXTURE_2D,me,ce,Y,le,0,ae,be,null),Y>>=1,le>>=1}}else if(g.isHTMLTexture){if("texElementImage2D"in i){const Y=i.canvas;if(Y.hasAttribute("layoutsubtree")||Y.setAttribute("layoutsubtree","true"),q.parentNode!==Y){Y.appendChild(q),u.add(g),Y.onpaint=le=>{const me=le.changedElements;for(const j of u)me.includes(j.image)&&(j.needsUpdate=!0)},Y.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,q);else{const me=i.RGBA,j=i.RGBA,Ee=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,me,j,Ee,q)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(we.length>0){if(Ce&&Ue){const Y=Ke(we[0]);t.texStorage2D(i.TEXTURE_2D,ie,ce,Y.width,Y.height)}for(let Y=0,le=we.length;Y<le;Y++)oe=we[Y],Ce?C&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,ae,be,oe):t.texImage2D(i.TEXTURE_2D,Y,ce,ae,be,oe);g.generateMipmaps=!1}else if(Ce){if(Ue){const Y=Ke(q);t.texStorage2D(i.TEXTURE_2D,ie,ce,Y.width,Y.height)}C&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ae,be,q)}else t.texImage2D(i.TEXTURE_2D,0,ce,ae,be,q);p(g)&&A(k),re.__version=ne.version,g.onUpdate&&g.onUpdate(g)}y.__version=g.version}function De(y,g,U){if(g.image.length!==6)return;const k=Z(y,g),W=g.source;t.bindTexture(i.TEXTURE_CUBE_MAP,y.__webglTexture,i.TEXTURE0+U);const ne=n.get(W);if(W.version!==ne.__version||k===!0){t.activeTexture(i.TEXTURE0+U);const re=ke.getPrimaries(ke.workingColorSpace),X=g.colorSpace===Bn?null:ke.getPrimaries(g.colorSpace),q=g.colorSpace===Bn||re===X?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,q);const ae=g.isCompressedTexture||g.image[0].isCompressedTexture,be=g.image[0]&&g.image[0].isDataTexture,ce=[];for(let j=0;j<6;j++)!ae&&!be?ce[j]=m(g.image[j],!0,s.maxCubemapSize):ce[j]=be?g.image[j].image:g.image[j],ce[j]=Ot(g,ce[j]);const oe=ce[0],we=r.convert(g.format,g.colorSpace),Ce=r.convert(g.type),Ue=S(g.internalFormat,we,Ce,g.normalized,g.colorSpace),C=g.isVideoTexture!==!0,ie=ne.__version===void 0||k===!0,Y=W.dataReady;let le=E(g,oe);Ye(i.TEXTURE_CUBE_MAP,g);let me;if(ae){C&&ie&&t.texStorage2D(i.TEXTURE_CUBE_MAP,le,Ue,oe.width,oe.height);for(let j=0;j<6;j++){me=ce[j].mipmaps;for(let Ee=0;Ee<me.length;Ee++){const Se=me[Ee];g.format!==nn?we!==null?C?Y&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ee,0,0,Se.width,Se.height,we,Se.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ee,Ue,Se.width,Se.height,0,Se.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):C?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ee,0,0,Se.width,Se.height,we,Ce,Se.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ee,Ue,Se.width,Se.height,0,we,Ce,Se.data)}}}else{if(me=g.mipmaps,C&&ie){me.length>0&&le++;const j=Ke(ce[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,le,Ue,j.width,j.height)}for(let j=0;j<6;j++)if(be){C?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,ce[j].width,ce[j].height,we,Ce,ce[j].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Ue,ce[j].width,ce[j].height,0,we,Ce,ce[j].data);for(let Ee=0;Ee<me.length;Ee++){const at=me[Ee].image[j].image;C?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ee+1,0,0,at.width,at.height,we,Ce,at.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ee+1,Ue,at.width,at.height,0,we,Ce,at.data)}}else{C?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,we,Ce,ce[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Ue,we,Ce,ce[j]);for(let Ee=0;Ee<me.length;Ee++){const Se=me[Ee];C?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ee+1,0,0,we,Ce,Se.image[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ee+1,Ue,we,Ce,Se.image[j])}}}p(g)&&A(i.TEXTURE_CUBE_MAP),ne.__version=W.version,g.onUpdate&&g.onUpdate(g)}y.__version=g.version}function Re(y,g,U,k,W,ne){const re=r.convert(U.format,U.colorSpace),X=r.convert(U.type),q=S(U.internalFormat,re,X,U.normalized,U.colorSpace),ae=n.get(g),be=n.get(U);if(be.__renderTarget=g,!ae.__hasExternalTextures){const ce=Math.max(1,g.width>>ne),oe=Math.max(1,g.height>>ne);W===i.TEXTURE_3D||W===i.TEXTURE_2D_ARRAY?t.texImage3D(W,ne,q,ce,oe,g.depth,0,re,X,null):t.texImage2D(W,ne,q,ce,oe,0,re,X,null)}t.bindFramebuffer(i.FRAMEBUFFER,y),gt(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,k,W,be.__webglTexture,0,rt(g)):(W===i.TEXTURE_2D||W>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&W<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,k,W,be.__webglTexture,ne),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ut(y,g,U){if(i.bindRenderbuffer(i.RENDERBUFFER,y),g.depthBuffer){const k=g.depthTexture,W=k&&k.isDepthTexture?k.type:null,ne=T(g.stencilBuffer,W),re=g.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;gt(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,rt(g),ne,g.width,g.height):U?i.renderbufferStorageMultisample(i.RENDERBUFFER,rt(g),ne,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,ne,g.width,g.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,re,i.RENDERBUFFER,y)}else{const k=g.textures;for(let W=0;W<k.length;W++){const ne=k[W],re=r.convert(ne.format,ne.colorSpace),X=r.convert(ne.type),q=S(ne.internalFormat,re,X,ne.normalized,ne.colorSpace);gt(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,rt(g),q,g.width,g.height):U?i.renderbufferStorageMultisample(i.RENDERBUFFER,rt(g),q,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,q,g.width,g.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ze(y,g,U){const k=g.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,y),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const W=n.get(g.depthTexture);if(W.__renderTarget=g,(!W.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),k){if(W.__webglInit===void 0&&(W.__webglInit=!0,g.depthTexture.addEventListener("dispose",R)),W.__webglTexture===void 0){W.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture),Ye(i.TEXTURE_CUBE_MAP,g.depthTexture);const ae=r.convert(g.depthTexture.format),be=r.convert(g.depthTexture.type);let ce;g.depthTexture.format===wn?ce=i.DEPTH_COMPONENT24:g.depthTexture.format===si&&(ce=i.DEPTH24_STENCIL8);for(let oe=0;oe<6;oe++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,ce,g.width,g.height,0,ae,be,null)}}else J(g.depthTexture,0);const ne=W.__webglTexture,re=rt(g),X=k?i.TEXTURE_CUBE_MAP_POSITIVE_X+U:i.TEXTURE_2D,q=g.depthTexture.format===si?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(g.depthTexture.format===wn)gt(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,X,ne,0,re):i.framebufferTexture2D(i.FRAMEBUFFER,q,X,ne,0);else if(g.depthTexture.format===si)gt(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,X,ne,0,re):i.framebufferTexture2D(i.FRAMEBUFFER,q,X,ne,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Qe(y){const g=n.get(y),U=y.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==y.depthTexture){const k=y.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),k){const W=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,k.removeEventListener("dispose",W)};k.addEventListener("dispose",W),g.__depthDisposeCallback=W}g.__boundDepthTexture=k}if(y.depthTexture&&!g.__autoAllocateDepthBuffer)if(U)for(let k=0;k<6;k++)ze(g.__webglFramebuffer[k],y,k);else{const k=y.texture.mipmaps;k&&k.length>0?ze(g.__webglFramebuffer[0],y,0):ze(g.__webglFramebuffer,y,0)}else if(U){g.__webglDepthbuffer=[];for(let k=0;k<6;k++)if(t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[k]),g.__webglDepthbuffer[k]===void 0)g.__webglDepthbuffer[k]=i.createRenderbuffer(),ut(g.__webglDepthbuffer[k],y,!1);else{const W=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=g.__webglDepthbuffer[k];i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,W,i.RENDERBUFFER,ne)}}else{const k=y.texture.mipmaps;if(k&&k.length>0?t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=i.createRenderbuffer(),ut(g.__webglDepthbuffer,y,!1);else{const W=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=g.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,W,i.RENDERBUFFER,ne)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function qe(y,g,U){const k=n.get(y);g!==void 0&&Re(k.__webglFramebuffer,y,y.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),U!==void 0&&Qe(y)}function He(y){const g=y.texture,U=n.get(y),k=n.get(g);y.addEventListener("dispose",x);const W=y.textures,ne=y.isWebGLCubeRenderTarget===!0,re=W.length>1;if(re||(k.__webglTexture===void 0&&(k.__webglTexture=i.createTexture()),k.__version=g.version,a.memory.textures++),ne){U.__webglFramebuffer=[];for(let X=0;X<6;X++)if(g.mipmaps&&g.mipmaps.length>0){U.__webglFramebuffer[X]=[];for(let q=0;q<g.mipmaps.length;q++)U.__webglFramebuffer[X][q]=i.createFramebuffer()}else U.__webglFramebuffer[X]=i.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){U.__webglFramebuffer=[];for(let X=0;X<g.mipmaps.length;X++)U.__webglFramebuffer[X]=i.createFramebuffer()}else U.__webglFramebuffer=i.createFramebuffer();if(re)for(let X=0,q=W.length;X<q;X++){const ae=n.get(W[X]);ae.__webglTexture===void 0&&(ae.__webglTexture=i.createTexture(),a.memory.textures++)}if(y.samples>0&&gt(y)===!1){U.__webglMultisampledFramebuffer=i.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let X=0;X<W.length;X++){const q=W[X];U.__webglColorRenderbuffer[X]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,U.__webglColorRenderbuffer[X]);const ae=r.convert(q.format,q.colorSpace),be=r.convert(q.type),ce=S(q.internalFormat,ae,be,q.normalized,q.colorSpace,y.isXRRenderTarget===!0),oe=rt(y);i.renderbufferStorageMultisample(i.RENDERBUFFER,oe,ce,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+X,i.RENDERBUFFER,U.__webglColorRenderbuffer[X])}i.bindRenderbuffer(i.RENDERBUFFER,null),y.depthBuffer&&(U.__webglDepthRenderbuffer=i.createRenderbuffer(),ut(U.__webglDepthRenderbuffer,y,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ne){t.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture),Ye(i.TEXTURE_CUBE_MAP,g);for(let X=0;X<6;X++)if(g.mipmaps&&g.mipmaps.length>0)for(let q=0;q<g.mipmaps.length;q++)Re(U.__webglFramebuffer[X][q],y,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+X,q);else Re(U.__webglFramebuffer[X],y,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0);p(g)&&A(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(re){for(let X=0,q=W.length;X<q;X++){const ae=W[X],be=n.get(ae);let ce=i.TEXTURE_2D;(y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(ce=y.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ce,be.__webglTexture),Ye(ce,ae),Re(U.__webglFramebuffer,y,ae,i.COLOR_ATTACHMENT0+X,ce,0),p(ae)&&A(ce)}t.unbindTexture()}else{let X=i.TEXTURE_2D;if((y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(X=y.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(X,k.__webglTexture),Ye(X,g),g.mipmaps&&g.mipmaps.length>0)for(let q=0;q<g.mipmaps.length;q++)Re(U.__webglFramebuffer[q],y,g,i.COLOR_ATTACHMENT0,X,q);else Re(U.__webglFramebuffer,y,g,i.COLOR_ATTACHMENT0,X,0);p(g)&&A(X),t.unbindTexture()}y.depthBuffer&&Qe(y)}function mt(y){const g=y.textures;for(let U=0,k=g.length;U<k;U++){const W=g[U];if(p(W)){const ne=w(y),re=n.get(W).__webglTexture;t.bindTexture(ne,re),A(ne),t.unbindTexture()}}}const vt=[],yt=[];function Tt(y){if(y.samples>0){if(gt(y)===!1){const g=y.textures,U=y.width,k=y.height;let W=i.COLOR_BUFFER_BIT;const ne=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=n.get(y),X=g.length>1;if(X)for(let ae=0;ae<g.length;ae++)t.bindFramebuffer(i.FRAMEBUFFER,re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,re.__webglMultisampledFramebuffer);const q=y.texture.mipmaps;q&&q.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,re.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,re.__webglFramebuffer);for(let ae=0;ae<g.length;ae++){if(y.resolveDepthBuffer&&(y.depthBuffer&&(W|=i.DEPTH_BUFFER_BIT),y.stencilBuffer&&y.resolveStencilBuffer&&(W|=i.STENCIL_BUFFER_BIT)),X){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,re.__webglColorRenderbuffer[ae]);const be=n.get(g[ae]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,be,0)}i.blitFramebuffer(0,0,U,k,0,0,U,k,W,i.NEAREST),l===!0&&(vt.length=0,yt.length=0,vt.push(i.COLOR_ATTACHMENT0+ae),y.depthBuffer&&y.resolveDepthBuffer===!1&&(vt.push(ne),yt.push(ne),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,yt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,vt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),X)for(let ae=0;ae<g.length;ae++){t.bindFramebuffer(i.FRAMEBUFFER,re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.RENDERBUFFER,re.__webglColorRenderbuffer[ae]);const be=n.get(g[ae]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.TEXTURE_2D,be,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,re.__webglMultisampledFramebuffer)}else if(y.depthBuffer&&y.resolveDepthBuffer===!1&&l){const g=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[g])}}}function rt(y){return Math.min(s.maxSamples,y.samples)}function gt(y){const g=n.get(y);return y.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function L(y){const g=a.render.frame;h.get(y)!==g&&(h.set(y,g),y.update())}function Ot(y,g){const U=y.colorSpace,k=y.format,W=y.type;return y.isCompressedTexture===!0||y.isVideoTexture===!0||U!==hr&&U!==Bn&&(ke.getTransfer(U)===Ze?(k!==nn||W!==Jt)&&Pe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):We("WebGLTextures: Unsupported texture color space:",U)),g}function Ke(y){return typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement?(c.width=y.naturalWidth||y.width,c.height=y.naturalHeight||y.height):typeof VideoFrame<"u"&&y instanceof VideoFrame?(c.width=y.displayWidth,c.height=y.displayHeight):(c.width=y.width,c.height=y.height),c}this.allocateTextureUnit=K,this.resetTextureUnits=$,this.getTextureUnits=Q,this.setTextureUnits=z,this.setTexture2D=J,this.setTexture2DArray=ee,this.setTexture3D=he,this.setTextureCube=ge,this.rebindTextures=qe,this.setupRenderTarget=He,this.updateRenderTargetMipmap=mt,this.updateMultisampleRenderTarget=Tt,this.setupDepthRenderbuffer=Qe,this.setupFrameBufferTexture=Re,this.useMultisampledRTT=gt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function b0(i,e){function t(n,s=Bn){let r;const a=ke.getTransfer(s);if(n===Jt)return i.UNSIGNED_BYTE;if(n===_o)return i.UNSIGNED_SHORT_4_4_4_4;if(n===xo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===mc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===gc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===fc)return i.BYTE;if(n===pc)return i.SHORT;if(n===ss)return i.UNSIGNED_SHORT;if(n===go)return i.INT;if(n===mn)return i.UNSIGNED_INT;if(n===hn)return i.FLOAT;if(n===An)return i.HALF_FLOAT;if(n===_c)return i.ALPHA;if(n===xc)return i.RGB;if(n===nn)return i.RGBA;if(n===wn)return i.DEPTH_COMPONENT;if(n===si)return i.DEPTH_STENCIL;if(n===vc)return i.RED;if(n===vo)return i.RED_INTEGER;if(n===oi)return i.RG;if(n===Mo)return i.RG_INTEGER;if(n===So)return i.RGBA_INTEGER;if(n===Zs||n===Js||n===Qs||n===js)if(a===Ze)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Zs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Js)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Qs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===js)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Zs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Js)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Qs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===js)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===wa||n===Ra||n===Ca||n===Pa)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===wa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ra)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ca)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Pa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===La||n===Ia||n===Da||n===Ua||n===Na||n===cr||n===Fa)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===La||n===Ia)return a===Ze?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Da)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ua)return r.COMPRESSED_R11_EAC;if(n===Na)return r.COMPRESSED_SIGNED_R11_EAC;if(n===cr)return r.COMPRESSED_RG11_EAC;if(n===Fa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Oa||n===Ba||n===za||n===ka||n===Ga||n===Ha||n===Va||n===Wa||n===Xa||n===Ya||n===qa||n===$a||n===Ka||n===Za)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Oa)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ba)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===za)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ka)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ga)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ha)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Va)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Wa)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Xa)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ya)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===qa)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===$a)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ka)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Za)return a===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ja||n===Qa||n===ja)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ja)return a===Ze?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Qa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ja)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===eo||n===to||n===dr||n===no)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===eo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===to)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===dr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===no)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===rs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const T0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,A0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class w0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Lc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new gn({vertexShader:T0,fragmentShader:A0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Rn(new vr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class R0 extends ci{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,_=null;const M=typeof XRWebGLBinding<"u",m=new w0,p={},A=t.getContextAttributes();let w=null,S=null;const T=[],E=[],R=new $e;let x=null;const b=new Zt;b.viewport=new dt;const D=new Zt;D.viewport=new dt;const P=[b,D],B=new Oh;let $=null,Q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let se=T[Z];return se===void 0&&(se=new Or,T[Z]=se),se.getTargetRaySpace()},this.getControllerGrip=function(Z){let se=T[Z];return se===void 0&&(se=new Or,T[Z]=se),se.getGripSpace()},this.getHand=function(Z){let se=T[Z];return se===void 0&&(se=new Or,T[Z]=se),se.getHandSpace()};function z(Z){const se=E.indexOf(Z.inputSource);if(se===-1)return;const te=T[se];te!==void 0&&(te.update(Z.inputSource,Z.frame,c||a),te.dispatchEvent({type:Z.type,data:Z.inputSource}))}function K(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",K),s.removeEventListener("inputsourceschange",G);for(let Z=0;Z<T.length;Z++){const se=E[Z];se!==null&&(E[Z]=null,T[Z].disconnect(se))}$=null,Q=null,m.reset();for(const Z in p)delete p[Z];e.setRenderTarget(w),f=null,d=null,u=null,s=null,S=null,Ye.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&Pe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&Pe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&M&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",K),s.addEventListener("inputsourceschange",G),A.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(R),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let te=null,Le=null,De=null;A.depth&&(De=A.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=A.stencil?si:wn,Le=A.stencil?rs:mn);const Re={colorFormat:t.RGBA8,depthFormat:De,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Re),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),S=new pn(d.textureWidth,d.textureHeight,{format:nn,type:Jt,depthTexture:new Oi(d.textureWidth,d.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:A.stencil,colorSpace:e.outputColorSpace,samples:A.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const te={antialias:A.antialias,alpha:!0,depth:A.depth,stencil:A.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,te),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new pn(f.framebufferWidth,f.framebufferHeight,{format:nn,type:Jt,colorSpace:e.outputColorSpace,stencilBuffer:A.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Ye.setContext(s),Ye.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function G(Z){for(let se=0;se<Z.removed.length;se++){const te=Z.removed[se],Le=E.indexOf(te);Le>=0&&(E[Le]=null,T[Le].disconnect(te))}for(let se=0;se<Z.added.length;se++){const te=Z.added[se];let Le=E.indexOf(te);if(Le===-1){for(let Re=0;Re<T.length;Re++)if(Re>=E.length){E.push(te),Le=Re;break}else if(E[Re]===null){E[Re]=te,Le=Re;break}if(Le===-1)break}const De=T[Le];De&&De.connect(te)}}const J=new N,ee=new N;function he(Z,se,te){J.setFromMatrixPosition(se.matrixWorld),ee.setFromMatrixPosition(te.matrixWorld);const Le=J.distanceTo(ee),De=se.projectionMatrix.elements,Re=te.projectionMatrix.elements,ut=De[14]/(De[10]-1),ze=De[14]/(De[10]+1),Qe=(De[9]+1)/De[5],qe=(De[9]-1)/De[5],He=(De[8]-1)/De[0],mt=(Re[8]+1)/Re[0],vt=ut*He,yt=ut*mt,Tt=Le/(-He+mt),rt=Tt*-He;if(se.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(rt),Z.translateZ(Tt),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),De[10]===-1)Z.projectionMatrix.copy(se.projectionMatrix),Z.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const gt=ut+Tt,L=ze+Tt,Ot=vt-rt,Ke=yt+(Le-rt),y=Qe*ze/L*gt,g=qe*ze/L*gt;Z.projectionMatrix.makePerspective(Ot,Ke,y,g,gt,L),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function ge(Z,se){se===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(se.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let se=Z.near,te=Z.far;m.texture!==null&&(m.depthNear>0&&(se=m.depthNear),m.depthFar>0&&(te=m.depthFar)),B.near=D.near=b.near=se,B.far=D.far=b.far=te,($!==B.near||Q!==B.far)&&(s.updateRenderState({depthNear:B.near,depthFar:B.far}),$=B.near,Q=B.far),B.layers.mask=Z.layers.mask|6,b.layers.mask=B.layers.mask&-5,D.layers.mask=B.layers.mask&-3;const Le=Z.parent,De=B.cameras;ge(B,Le);for(let Re=0;Re<De.length;Re++)ge(De[Re],Le);De.length===2?he(B,b,D):B.projectionMatrix.copy(b.projectionMatrix),Me(Z,B,Le)};function Me(Z,se,te){te===null?Z.matrix.copy(se.matrixWorld):(Z.matrix.copy(te.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(se.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(se.projectionMatrix),Z.projectionMatrixInverse.copy(se.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=io*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(Z){l=Z,d!==null&&(d.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(B)},this.getCameraTexture=function(Z){return p[Z]};let Xe=null;function st(Z,se){if(h=se.getViewerPose(c||a),_=se,h!==null){const te=h.views;f!==null&&(e.setRenderTargetFramebuffer(S,f.framebuffer),e.setRenderTarget(S));let Le=!1;te.length!==B.cameras.length&&(B.cameras.length=0,Le=!0);for(let ze=0;ze<te.length;ze++){const Qe=te[ze];let qe=null;if(f!==null)qe=f.getViewport(Qe);else{const mt=u.getViewSubImage(d,Qe);qe=mt.viewport,ze===0&&(e.setRenderTargetTextures(S,mt.colorTexture,mt.depthStencilTexture),e.setRenderTarget(S))}let He=P[ze];He===void 0&&(He=new Zt,He.layers.enable(ze),He.viewport=new dt,P[ze]=He),He.matrix.fromArray(Qe.transform.matrix),He.matrix.decompose(He.position,He.quaternion,He.scale),He.projectionMatrix.fromArray(Qe.projectionMatrix),He.projectionMatrixInverse.copy(He.projectionMatrix).invert(),He.viewport.set(qe.x,qe.y,qe.width,qe.height),ze===0&&(B.matrix.copy(He.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Le===!0&&B.cameras.push(He)}const De=s.enabledFeatures;if(De&&De.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){u=n.getBinding();const ze=u.getDepthInformation(te[0]);ze&&ze.isValid&&ze.texture&&m.init(ze,s.renderState)}if(De&&De.includes("camera-access")&&M){e.state.unbindTexture(),u=n.getBinding();for(let ze=0;ze<te.length;ze++){const Qe=te[ze].camera;if(Qe){let qe=p[Qe];qe||(qe=new Lc,p[Qe]=qe);const He=u.getCameraImage(Qe);qe.sourceTexture=He}}}}for(let te=0;te<T.length;te++){const Le=E[te],De=T[te];Le!==null&&De!==void 0&&De.update(Le,se,c||a)}Xe&&Xe(Z,se),se.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:se}),_=null}const Ye=new Nc;Ye.setAnimationLoop(st),this.setAnimationLoop=function(Z){Xe=Z},this.dispose=function(){}}}const C0=new ht,Hc=new Ie;Hc.set(-1,0,0,0,1,0,0,0,1);function P0(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Ic(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,A,w,S){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,S)):p.isMeshMatcapMaterial?(r(m,p),_(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),M(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,A,w):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===kt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===kt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const A=e.get(p),w=A.envMap,S=A.envMapRotation;w&&(m.envMap.value=w,m.envMapRotation.value.setFromMatrix4(C0.makeRotationFromEuler(S)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Hc),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,A,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*A,m.scale.value=w*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,A){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===kt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=A.texture,m.transmissionSamplerSize.value.set(A.width,A.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function M(m,p){const A=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(A.matrixWorld),m.nearDistance.value=A.shadow.camera.near,m.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function L0(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,T){const E=T.program;n.uniformBlockBinding(S,E)}function c(S,T){let E=s[S.id];E===void 0&&(m(S),E=h(S),s[S.id]=E,S.addEventListener("dispose",A));const R=T.program;n.updateUBOMapping(S,R);const x=e.render.frame;r[S.id]!==x&&(d(S),r[S.id]=x)}function h(S){const T=u();S.__bindingPointIndex=T;const E=i.createBuffer(),R=S.__size,x=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,R,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,E),E}function u(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return We("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const T=s[S.id],E=S.uniforms,R=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let x=0,b=E.length;x<b;x++){const D=E[x];if(Array.isArray(D))for(let P=0,B=D.length;P<B;P++)f(D[P],x,P,R);else f(D,x,0,R)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(S,T,E,R){if(M(S,T,E,R)===!0){const x=S.__offset,b=S.value;if(Array.isArray(b)){let D=0;for(let P=0;P<b.length;P++){const B=b[P],$=p(B);_(B,S.__data,D),typeof B!="number"&&typeof B!="boolean"&&!B.isMatrix3&&!ArrayBuffer.isView(B)&&(D+=$.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(b,S.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,S.__data)}}function _(S,T,E){typeof S=="number"||typeof S=="boolean"?T[0]=S:S.isMatrix3?(T[0]=S.elements[0],T[1]=S.elements[1],T[2]=S.elements[2],T[3]=0,T[4]=S.elements[3],T[5]=S.elements[4],T[6]=S.elements[5],T[7]=0,T[8]=S.elements[6],T[9]=S.elements[7],T[10]=S.elements[8],T[11]=0):ArrayBuffer.isView(S)?T.set(new S.constructor(S.buffer,S.byteOffset,T.length)):S.toArray(T,E)}function M(S,T,E,R){const x=S.value,b=T+"_"+E;if(R[b]===void 0)return typeof x=="number"||typeof x=="boolean"?R[b]=x:ArrayBuffer.isView(x)?R[b]=x.slice():R[b]=x.clone(),!0;{const D=R[b];if(typeof x=="number"||typeof x=="boolean"){if(D!==x)return R[b]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(D.equals(x)===!1)return D.copy(x),!0}}return!1}function m(S){const T=S.uniforms;let E=0;const R=16;for(let b=0,D=T.length;b<D;b++){const P=Array.isArray(T[b])?T[b]:[T[b]];for(let B=0,$=P.length;B<$;B++){const Q=P[B],z=Array.isArray(Q.value)?Q.value:[Q.value];for(let K=0,G=z.length;K<G;K++){const J=z[K],ee=p(J),he=E%R,ge=he%ee.boundary,Me=he+ge;E+=ge,Me!==0&&R-Me<ee.storage&&(E+=R-Me),Q.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),Q.__offset=E,E+=ee.storage}}}const x=E%R;return x>0&&(E+=R-x),S.__size=E,S.__cache={},this}function p(S){const T={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(T.boundary=4,T.storage=4):S.isVector2?(T.boundary=8,T.storage=8):S.isVector3||S.isColor?(T.boundary=16,T.storage=12):S.isVector4?(T.boundary=16,T.storage=16):S.isMatrix3?(T.boundary=48,T.storage=48):S.isMatrix4?(T.boundary=64,T.storage=64):S.isTexture?Pe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(T.boundary=16,T.storage=S.byteLength):Pe("WebGLRenderer: Unsupported uniform value type.",S),T}function A(S){const T=S.target;T.removeEventListener("dispose",A);const E=a.indexOf(T.__bindingPointIndex);a.splice(E,1),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function w(){for(const S in s)i.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:l,update:c,dispose:w}}const I0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let cn=null;function D0(){return cn===null&&(cn=new Eh(I0,16,16,oi,An),cn.name="DFG_LUT",cn.minFilter=It,cn.magFilter=It,cn.wrapS=En,cn.wrapT=En,cn.generateMipmaps=!1,cn.needsUpdate=!0),cn}class U0{constructor(e={}){const{canvas:t=eh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=Jt}=e;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=a;const M=f,m=new Set([So,Mo,vo]),p=new Set([Jt,mn,ss,rs,_o,xo]),A=new Uint32Array(4),w=new Int32Array(4),S=new N;let T=null,E=null;const R=[],x=[];let b=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=fn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const D=this;let P=!1,B=null,$=null,Q=null,z=null;this._outputColorSpace=Kt;let K=0,G=0,J=null,ee=-1,he=null;const ge=new dt,Me=new dt;let Xe=null;const st=new Be(0);let Ye=0,Z=t.width,se=t.height,te=1,Le=null,De=null;const Re=new dt(0,0,Z,se),ut=new dt(0,0,Z,se);let ze=!1;const Qe=new wc;let qe=!1,He=!1;const mt=new ht,vt=new N,yt=new dt,Tt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let rt=!1;function gt(){return J===null?te:1}let L=n;function Ot(v,I){return t.getContext(v,I)}try{const v={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${mo}`),t.addEventListener("webglcontextlost",at,!1),t.addEventListener("webglcontextrestored",tt,!1),t.addEventListener("webglcontextcreationerror",rn,!1),L===null){const I="webgl2";if(L=Ot(I,v),L===null)throw Ot(I)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(v){throw We("WebGLRenderer: "+v.message),v}let Ke,y,g,U,k,W,ne,re,X,q,ae,be,ce,oe,we,Ce,Ue,C,ie,Y,le,me,j;function Ee(){Ke=new Dp(L),Ke.init(),le=new b0(L,Ke),y=new Tp(L,Ke,e,le),g=new y0(L,Ke),y.reversedDepthBuffer&&d&&g.buffers.depth.setReversed(!0),$=L.createFramebuffer(),Q=L.createFramebuffer(),z=L.createFramebuffer(),U=new Fp(L),k=new l0,W=new E0(L,Ke,g,k,y,le,U),ne=new Ip(D),re=new zh(L),me=new Ep(L,re),X=new Up(L,re,U,me),q=new Bp(L,X,re,me,U),C=new Op(L,y,W),we=new Ap(k),ae=new o0(D,ne,Ke,y,me,we),be=new P0(D,k),ce=new d0,oe=new g0(Ke),Ue=new yp(D,ne,g,q,_,l),Ce=new S0(D,q,y),j=new L0(L,U,y,g),ie=new bp(L,Ke,U),Y=new Np(L,Ke,U),U.programs=ae.programs,D.capabilities=y,D.extensions=Ke,D.properties=k,D.renderLists=ce,D.shadowMap=Ce,D.state=g,D.info=U}Ee(),M!==Jt&&(b=new kp(M,t.width,t.height,o,s,r));const Se=new R0(D,L);this.xr=Se,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const v=Ke.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){const v=Ke.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return te},this.setPixelRatio=function(v){v!==void 0&&(te=v,this.setSize(Z,se,!1))},this.getSize=function(v){return v.set(Z,se)},this.setSize=function(v,I,H=!0){if(Se.isPresenting){Pe("WebGLRenderer: Can't change size while VR device is presenting.");return}Z=v,se=I,t.width=Math.floor(v*te),t.height=Math.floor(I*te),H===!0&&(t.style.width=v+"px",t.style.height=I+"px"),b!==null&&b.setSize(t.width,t.height),this.setViewport(0,0,v,I)},this.getDrawingBufferSize=function(v){return v.set(Z*te,se*te).floor()},this.setDrawingBufferSize=function(v,I,H){Z=v,se=I,te=H,t.width=Math.floor(v*H),t.height=Math.floor(I*H),this.setViewport(0,0,v,I)},this.setEffects=function(v){if(M===Jt){We("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let I=0;I<v.length;I++)if(v[I].isOutputPass===!0){Pe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}b.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(ge)},this.getViewport=function(v){return v.copy(Re)},this.setViewport=function(v,I,H,F){v.isVector4?Re.set(v.x,v.y,v.z,v.w):Re.set(v,I,H,F),g.viewport(ge.copy(Re).multiplyScalar(te).round())},this.getScissor=function(v){return v.copy(ut)},this.setScissor=function(v,I,H,F){v.isVector4?ut.set(v.x,v.y,v.z,v.w):ut.set(v,I,H,F),g.scissor(Me.copy(ut).multiplyScalar(te).round())},this.getScissorTest=function(){return ze},this.setScissorTest=function(v){g.setScissorTest(ze=v)},this.setOpaqueSort=function(v){Le=v},this.setTransparentSort=function(v){De=v},this.getClearColor=function(v){return v.copy(Ue.getClearColor())},this.setClearColor=function(){Ue.setClearColor(...arguments)},this.getClearAlpha=function(){return Ue.getClearAlpha()},this.setClearAlpha=function(){Ue.setClearAlpha(...arguments)},this.clear=function(v=!0,I=!0,H=!0){let F=0;if(v){let O=!1;if(J!==null){const pe=J.texture.format;O=m.has(pe)}if(O){const pe=J.texture.type,ve=p.has(pe),ue=Ue.getClearColor(),ye=Ue.getClearAlpha(),Te=ue.r,Ne=ue.g,Oe=ue.b;ve?(A[0]=Te,A[1]=Ne,A[2]=Oe,A[3]=ye,L.clearBufferuiv(L.COLOR,0,A)):(w[0]=Te,w[1]=Ne,w[2]=Oe,w[3]=ye,L.clearBufferiv(L.COLOR,0,w))}else F|=L.COLOR_BUFFER_BIT}I&&(F|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),H&&(F|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F!==0&&L.clear(F)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),B=v},this.dispose=function(){t.removeEventListener("webglcontextlost",at,!1),t.removeEventListener("webglcontextrestored",tt,!1),t.removeEventListener("webglcontextcreationerror",rn,!1),Ue.dispose(),ce.dispose(),oe.dispose(),k.dispose(),ne.dispose(),q.dispose(),me.dispose(),j.dispose(),ae.dispose(),Se.dispose(),Se.removeEventListener("sessionstart",Io),Se.removeEventListener("sessionend",Do),Vn.stop()};function at(v){v.preventDefault(),il("WebGLRenderer: Context Lost."),P=!0}function tt(){il("WebGLRenderer: Context Restored."),P=!1;const v=U.autoReset,I=Ce.enabled,H=Ce.autoUpdate,F=Ce.needsUpdate,O=Ce.type;Ee(),U.autoReset=v,Ce.enabled=I,Ce.autoUpdate=H,Ce.needsUpdate=F,Ce.type=O}function rn(v){We("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function an(v){const I=v.target;I.removeEventListener("dispose",an),Wc(I)}function Wc(v){Xc(v),k.remove(v)}function Xc(v){const I=k.get(v).programs;I!==void 0&&(I.forEach(function(H){ae.releaseProgram(H)}),v.isShaderMaterial&&ae.releaseShaderCache(v))}this.renderBufferDirect=function(v,I,H,F,O,pe){I===null&&(I=Tt);const ve=O.isMesh&&O.matrixWorld.determinantAffine()<0,ue=$c(v,I,H,F,O);g.setMaterial(F,ve);let ye=H.index,Te=1;if(F.wireframe===!0){if(ye=X.getWireframeAttribute(H),ye===void 0)return;Te=2}const Ne=H.drawRange,Oe=H.attributes.position;let Ae=Ne.start*Te,Je=(Ne.start+Ne.count)*Te;pe!==null&&(Ae=Math.max(Ae,pe.start*Te),Je=Math.min(Je,(pe.start+pe.count)*Te)),ye!==null?(Ae=Math.max(Ae,0),Je=Math.min(Je,ye.count)):Oe!=null&&(Ae=Math.max(Ae,0),Je=Math.min(Je,Oe.count));const ft=Je-Ae;if(ft<0||ft===1/0)return;me.setup(O,F,ue,H,ye);let ot,je=ie;if(ye!==null&&(ot=re.get(ye),je=Y,je.setIndex(ot)),O.isMesh)F.wireframe===!0?(g.setLineWidth(F.wireframeLinewidth*gt()),je.setMode(L.LINES)):je.setMode(L.TRIANGLES);else if(O.isLine){let Ct=F.linewidth;Ct===void 0&&(Ct=1),g.setLineWidth(Ct*gt()),O.isLineSegments?je.setMode(L.LINES):O.isLineLoop?je.setMode(L.LINE_LOOP):je.setMode(L.LINE_STRIP)}else O.isPoints?je.setMode(L.POINTS):O.isSprite&&je.setMode(L.TRIANGLES);if(O.isBatchedMesh)if(Ke.get("WEBGL_multi_draw"))je.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Ct=O._multiDrawStarts,xe=O._multiDrawCounts,Gt=O._multiDrawCount,Ve=ye?re.get(ye).bytesPerElement:1,qt=k.get(F).currentProgram.getUniforms();for(let on=0;on<Gt;on++)qt.setValue(L,"_gl_DrawID",on),je.render(Ct[on]/Ve,xe[on])}else if(O.isInstancedMesh)je.renderInstances(Ae,ft,O.count);else if(H.isInstancedBufferGeometry){const Ct=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,xe=Math.min(H.instanceCount,Ct);je.renderInstances(Ae,ft,xe)}else je.render(Ae,ft)};function Lo(v,I,H){v.transparent===!0&&v.side===yn&&v.forceSinglePass===!1?(v.side=kt,v.needsUpdate=!0,ds(v,I,H),v.side=Gn,v.needsUpdate=!0,ds(v,I,H),v.side=yn):ds(v,I,H)}this.compile=function(v,I,H=null){H===null&&(H=v),E=oe.get(H),E.init(I),x.push(E),H.traverseVisible(function(O){O.isLight&&O.layers.test(I.layers)&&(E.pushLight(O),O.castShadow&&E.pushShadow(O))}),v!==H&&v.traverseVisible(function(O){O.isLight&&O.layers.test(I.layers)&&(E.pushLight(O),O.castShadow&&E.pushShadow(O))}),E.setupLights();const F=new Set;return v.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const pe=O.material;if(pe)if(Array.isArray(pe))for(let ve=0;ve<pe.length;ve++){const ue=pe[ve];Lo(ue,H,O),F.add(ue)}else Lo(pe,H,O),F.add(pe)}),E=x.pop(),F},this.compileAsync=function(v,I,H=null){const F=this.compile(v,I,H);return new Promise(O=>{function pe(){if(F.forEach(function(ve){k.get(ve).currentProgram.isReady()&&F.delete(ve)}),F.size===0){O(v);return}setTimeout(pe,10)}Ke.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let yr=null;function Yc(v){yr&&yr(v)}function Io(){Vn.stop()}function Do(){Vn.start()}const Vn=new Nc;Vn.setAnimationLoop(Yc),typeof self<"u"&&Vn.setContext(self),this.setAnimationLoop=function(v){yr=v,Se.setAnimationLoop(v),v===null?Vn.stop():Vn.start()},Se.addEventListener("sessionstart",Io),Se.addEventListener("sessionend",Do),this.render=function(v,I){if(I!==void 0&&I.isCamera!==!0){We("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;B!==null&&B.renderStart(v,I);const H=Se.enabled===!0&&Se.isPresenting===!0,F=b!==null&&(J===null||H)&&b.begin(D,J);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),Se.enabled===!0&&Se.isPresenting===!0&&(b===null||b.isCompositing()===!1)&&(Se.cameraAutoUpdate===!0&&Se.updateCamera(I),I=Se.getCamera()),v.isScene===!0&&v.onBeforeRender(D,v,I,J),E=oe.get(v,x.length),E.init(I),E.state.textureUnits=W.getTextureUnits(),x.push(E),mt.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),Qe.setFromProjectionMatrix(mt,un,I.reversedDepth),He=this.localClippingEnabled,qe=we.init(this.clippingPlanes,He),T=ce.get(v,R.length),T.init(),R.push(T),Se.enabled===!0&&Se.isPresenting===!0){const ve=D.xr.getDepthSensingMesh();ve!==null&&Er(ve,I,-1/0,D.sortObjects)}Er(v,I,0,D.sortObjects),T.finish(),D.sortObjects===!0&&T.sort(Le,De,I.reversedDepth),rt=Se.enabled===!1||Se.isPresenting===!1||Se.hasDepthSensing()===!1,rt&&Ue.addToRenderList(T,v),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),qe===!0&&we.beginShadows();const O=E.state.shadowsArray;if(Ce.render(O,v,I),qe===!0&&we.endShadows(),(F&&b.hasRenderPass())===!1){const ve=T.opaque,ue=T.transmissive;if(E.setupLights(),I.isArrayCamera){const ye=I.cameras;if(ue.length>0)for(let Te=0,Ne=ye.length;Te<Ne;Te++){const Oe=ye[Te];No(ve,ue,v,Oe)}rt&&Ue.render(v);for(let Te=0,Ne=ye.length;Te<Ne;Te++){const Oe=ye[Te];Uo(T,v,Oe,Oe.viewport)}}else ue.length>0&&No(ve,ue,v,I),rt&&Ue.render(v),Uo(T,v,I)}J!==null&&G===0&&(W.updateMultisampleRenderTarget(J),W.updateRenderTargetMipmap(J)),F&&b.end(D),v.isScene===!0&&v.onAfterRender(D,v,I),me.resetDefaultState(),ee=-1,he=null,x.pop(),x.length>0?(E=x[x.length-1],W.setTextureUnits(E.state.textureUnits),qe===!0&&we.setGlobalState(D.clippingPlanes,E.state.camera)):E=null,R.pop(),R.length>0?T=R[R.length-1]:T=null,B!==null&&B.renderEnd()};function Er(v,I,H,F){if(v.visible===!1)return;if(v.layers.test(I.layers)){if(v.isGroup)H=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(I);else if(v.isLightProbeGrid)E.pushLightProbeGrid(v);else if(v.isLight)E.pushLight(v),v.castShadow&&E.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||Qe.intersectsSprite(v)){F&&yt.setFromMatrixPosition(v.matrixWorld).applyMatrix4(mt);const ve=q.update(v),ue=v.material;ue.visible&&T.push(v,ve,ue,H,yt.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||Qe.intersectsObject(v))){const ve=q.update(v),ue=v.material;if(F&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),yt.copy(v.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),yt.copy(ve.boundingSphere.center)),yt.applyMatrix4(v.matrixWorld).applyMatrix4(mt)),Array.isArray(ue)){const ye=ve.groups;for(let Te=0,Ne=ye.length;Te<Ne;Te++){const Oe=ye[Te],Ae=ue[Oe.materialIndex];Ae&&Ae.visible&&T.push(v,ve,Ae,H,yt.z,Oe)}}else ue.visible&&T.push(v,ve,ue,H,yt.z,null)}}const pe=v.children;for(let ve=0,ue=pe.length;ve<ue;ve++)Er(pe[ve],I,H,F)}function Uo(v,I,H,F){const{opaque:O,transmissive:pe,transparent:ve}=v;E.setupLightsView(H),qe===!0&&we.setGlobalState(D.clippingPlanes,H),F&&g.viewport(ge.copy(F)),O.length>0&&cs(O,I,H),pe.length>0&&cs(pe,I,H),ve.length>0&&cs(ve,I,H),g.buffers.depth.setTest(!0),g.buffers.depth.setMask(!0),g.buffers.color.setMask(!0),g.setPolygonOffset(!1)}function No(v,I,H,F){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[F.id]===void 0){const Ae=Ke.has("EXT_color_buffer_half_float")||Ke.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[F.id]=new pn(1,1,{generateMipmaps:!0,type:Ae?An:Jt,minFilter:ii,samples:Math.max(4,y.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ke.workingColorSpace})}const pe=E.state.transmissionRenderTarget[F.id],ve=F.viewport||ge;pe.setSize(ve.z*D.transmissionResolutionScale,ve.w*D.transmissionResolutionScale);const ue=D.getRenderTarget(),ye=D.getActiveCubeFace(),Te=D.getActiveMipmapLevel();D.setRenderTarget(pe),D.getClearColor(st),Ye=D.getClearAlpha(),Ye<1&&D.setClearColor(16777215,.5),D.clear(),rt&&Ue.render(H);const Ne=D.toneMapping;D.toneMapping=fn;const Oe=F.viewport;if(F.viewport!==void 0&&(F.viewport=void 0),E.setupLightsView(F),qe===!0&&we.setGlobalState(D.clippingPlanes,F),cs(v,H,F),W.updateMultisampleRenderTarget(pe),W.updateRenderTargetMipmap(pe),Ke.has("WEBGL_multisampled_render_to_texture")===!1){let Ae=!1;for(let Je=0,ft=I.length;Je<ft;Je++){const ot=I[Je],{object:je,geometry:Ct,material:xe,group:Gt}=ot;if(xe.side===yn&&je.layers.test(F.layers)){const Ve=xe.side;xe.side=kt,xe.needsUpdate=!0,Fo(je,H,F,Ct,xe,Gt),xe.side=Ve,xe.needsUpdate=!0,Ae=!0}}Ae===!0&&(W.updateMultisampleRenderTarget(pe),W.updateRenderTargetMipmap(pe))}D.setRenderTarget(ue,ye,Te),D.setClearColor(st,Ye),Oe!==void 0&&(F.viewport=Oe),D.toneMapping=Ne}function cs(v,I,H){const F=I.isScene===!0?I.overrideMaterial:null;for(let O=0,pe=v.length;O<pe;O++){const ve=v[O],{object:ue,geometry:ye,group:Te}=ve;let Ne=ve.material;Ne.allowOverride===!0&&F!==null&&(Ne=F),ue.layers.test(H.layers)&&Fo(ue,I,H,ye,Ne,Te)}}function Fo(v,I,H,F,O,pe){v.onBeforeRender(D,I,H,F,O,pe),v.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),O.onBeforeRender(D,I,H,F,v,pe),O.transparent===!0&&O.side===yn&&O.forceSinglePass===!1?(O.side=kt,O.needsUpdate=!0,D.renderBufferDirect(H,I,F,O,v,pe),O.side=Gn,O.needsUpdate=!0,D.renderBufferDirect(H,I,F,O,v,pe),O.side=yn):D.renderBufferDirect(H,I,F,O,v,pe),v.onAfterRender(D,I,H,F,O,pe)}function ds(v,I,H){I.isScene!==!0&&(I=Tt);const F=k.get(v),O=E.state.lights,pe=E.state.shadowsArray,ve=O.state.version,ue=ae.getParameters(v,O.state,pe,I,H,E.state.lightProbeGridArray),ye=ae.getProgramCacheKey(ue);let Te=F.programs;F.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?I.environment:null,F.fog=I.fog;const Ne=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;F.envMap=ne.get(v.envMap||F.environment,Ne),F.envMapRotation=F.environment!==null&&v.envMap===null?I.environmentRotation:v.envMapRotation,Te===void 0&&(v.addEventListener("dispose",an),Te=new Map,F.programs=Te);let Oe=Te.get(ye);if(Oe!==void 0){if(F.currentProgram===Oe&&F.lightsStateVersion===ve)return Bo(v,ue),Oe}else ue.uniforms=ae.getUniforms(v),B!==null&&v.isNodeMaterial&&B.build(v,H,ue),v.onBeforeCompile(ue,D),Oe=ae.acquireProgram(ue,ye),Te.set(ye,Oe),F.uniforms=ue.uniforms;const Ae=F.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Ae.clippingPlanes=we.uniform),Bo(v,ue),F.needsLights=Zc(v),F.lightsStateVersion=ve,F.needsLights&&(Ae.ambientLightColor.value=O.state.ambient,Ae.lightProbe.value=O.state.probe,Ae.directionalLights.value=O.state.directional,Ae.directionalLightShadows.value=O.state.directionalShadow,Ae.spotLights.value=O.state.spot,Ae.spotLightShadows.value=O.state.spotShadow,Ae.rectAreaLights.value=O.state.rectArea,Ae.ltc_1.value=O.state.rectAreaLTC1,Ae.ltc_2.value=O.state.rectAreaLTC2,Ae.pointLights.value=O.state.point,Ae.pointLightShadows.value=O.state.pointShadow,Ae.hemisphereLights.value=O.state.hemi,Ae.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Ae.spotLightMatrix.value=O.state.spotLightMatrix,Ae.spotLightMap.value=O.state.spotLightMap,Ae.pointShadowMatrix.value=O.state.pointShadowMatrix),F.lightProbeGrid=E.state.lightProbeGridArray.length>0,F.currentProgram=Oe,F.uniformsList=null,Oe}function Oo(v){if(v.uniformsList===null){const I=v.currentProgram.getUniforms();v.uniformsList=er.seqWithValue(I.seq,v.uniforms)}return v.uniformsList}function Bo(v,I){const H=k.get(v);H.outputColorSpace=I.outputColorSpace,H.batching=I.batching,H.batchingColor=I.batchingColor,H.instancing=I.instancing,H.instancingColor=I.instancingColor,H.instancingMorph=I.instancingMorph,H.skinning=I.skinning,H.morphTargets=I.morphTargets,H.morphNormals=I.morphNormals,H.morphColors=I.morphColors,H.morphTargetsCount=I.morphTargetsCount,H.numClippingPlanes=I.numClippingPlanes,H.numIntersection=I.numClipIntersection,H.vertexAlphas=I.vertexAlphas,H.vertexTangents=I.vertexTangents,H.toneMapping=I.toneMapping}function qc(v,I){if(v.length===0)return null;if(v.length===1)return v[0].texture!==null?v[0]:null;S.setFromMatrixPosition(I.matrixWorld);for(let H=0,F=v.length;H<F;H++){const O=v[H];if(O.texture!==null&&O.boundingBox.containsPoint(S))return O}return null}function $c(v,I,H,F,O){I.isScene!==!0&&(I=Tt),W.resetTextureUnits();const pe=I.fog,ve=F.isMeshStandardMaterial||F.isMeshLambertMaterial||F.isMeshPhongMaterial?I.environment:null,ue=J===null?D.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:ke.workingColorSpace,ye=F.isMeshStandardMaterial||F.isMeshLambertMaterial&&!F.envMap||F.isMeshPhongMaterial&&!F.envMap,Te=ne.get(F.envMap||ve,ye),Ne=F.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Oe=!!H.attributes.tangent&&(!!F.normalMap||F.anisotropy>0),Ae=!!H.morphAttributes.position,Je=!!H.morphAttributes.normal,ft=!!H.morphAttributes.color;let ot=fn;F.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(ot=D.toneMapping);const je=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Ct=je!==void 0?je.length:0,xe=k.get(F),Gt=E.state.lights;if(qe===!0&&(He===!0||v!==he)){const nt=v===he&&F.id===ee;we.setState(F,v,nt)}let Ve=!1;F.version===xe.__version?(xe.needsLights&&xe.lightsStateVersion!==Gt.state.version||xe.outputColorSpace!==ue||O.isBatchedMesh&&xe.batching===!1||!O.isBatchedMesh&&xe.batching===!0||O.isBatchedMesh&&xe.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&xe.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&xe.instancing===!1||!O.isInstancedMesh&&xe.instancing===!0||O.isSkinnedMesh&&xe.skinning===!1||!O.isSkinnedMesh&&xe.skinning===!0||O.isInstancedMesh&&xe.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&xe.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&xe.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&xe.instancingMorph===!1&&O.morphTexture!==null||xe.envMap!==Te||F.fog===!0&&xe.fog!==pe||xe.numClippingPlanes!==void 0&&(xe.numClippingPlanes!==we.numPlanes||xe.numIntersection!==we.numIntersection)||xe.vertexAlphas!==Ne||xe.vertexTangents!==Oe||xe.morphTargets!==Ae||xe.morphNormals!==Je||xe.morphColors!==ft||xe.toneMapping!==ot||xe.morphTargetsCount!==Ct||!!xe.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(Ve=!0):(Ve=!0,xe.__version=F.version);let qt=xe.currentProgram;Ve===!0&&(qt=ds(F,I,O),B&&F.isNodeMaterial&&B.onUpdateProgram(F,qt,xe));let on=!1,Cn=!1,di=!1;const et=qt.getUniforms(),pt=xe.uniforms;if(g.useProgram(qt.program)&&(on=!0,Cn=!0,di=!0),F.id!==ee&&(ee=F.id,Cn=!0),xe.needsLights){const nt=qc(E.state.lightProbeGridArray,O);xe.lightProbeGrid!==nt&&(xe.lightProbeGrid=nt,Cn=!0)}if(on||he!==v){g.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),et.setValue(L,"projectionMatrix",v.projectionMatrix),et.setValue(L,"viewMatrix",v.matrixWorldInverse);const Ln=et.map.cameraPosition;Ln!==void 0&&Ln.setValue(L,vt.setFromMatrixPosition(v.matrixWorld)),y.logarithmicDepthBuffer&&et.setValue(L,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&et.setValue(L,"isOrthographic",v.isOrthographicCamera===!0),he!==v&&(he=v,Cn=!0,di=!0)}if(xe.needsLights&&(Gt.state.directionalShadowMap.length>0&&et.setValue(L,"directionalShadowMap",Gt.state.directionalShadowMap,W),Gt.state.spotShadowMap.length>0&&et.setValue(L,"spotShadowMap",Gt.state.spotShadowMap,W),Gt.state.pointShadowMap.length>0&&et.setValue(L,"pointShadowMap",Gt.state.pointShadowMap,W)),O.isSkinnedMesh){et.setOptional(L,O,"bindMatrix"),et.setOptional(L,O,"bindMatrixInverse");const nt=O.skeleton;nt&&(nt.boneTexture===null&&nt.computeBoneTexture(),et.setValue(L,"boneTexture",nt.boneTexture,W))}O.isBatchedMesh&&(et.setOptional(L,O,"batchingTexture"),et.setValue(L,"batchingTexture",O._matricesTexture,W),et.setOptional(L,O,"batchingIdTexture"),et.setValue(L,"batchingIdTexture",O._indirectTexture,W),et.setOptional(L,O,"batchingColorTexture"),O._colorsTexture!==null&&et.setValue(L,"batchingColorTexture",O._colorsTexture,W));const Pn=H.morphAttributes;if((Pn.position!==void 0||Pn.normal!==void 0||Pn.color!==void 0)&&C.update(O,H,qt),(Cn||xe.receiveShadow!==O.receiveShadow)&&(xe.receiveShadow=O.receiveShadow,et.setValue(L,"receiveShadow",O.receiveShadow)),(F.isMeshStandardMaterial||F.isMeshLambertMaterial||F.isMeshPhongMaterial)&&F.envMap===null&&I.environment!==null&&(pt.envMapIntensity.value=I.environmentIntensity),pt.dfgLUT!==void 0&&(pt.dfgLUT.value=D0()),Cn){if(et.setValue(L,"toneMappingExposure",D.toneMappingExposure),xe.needsLights&&Kc(pt,di),pe&&F.fog===!0&&be.refreshFogUniforms(pt,pe),be.refreshMaterialUniforms(pt,F,te,se,E.state.transmissionRenderTarget[v.id]),xe.needsLights&&xe.lightProbeGrid){const nt=xe.lightProbeGrid;pt.probesSH.value=nt.texture,pt.probesMin.value.copy(nt.boundingBox.min),pt.probesMax.value.copy(nt.boundingBox.max),pt.probesResolution.value.copy(nt.resolution)}er.upload(L,Oo(xe),pt,W)}if(F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(er.upload(L,Oo(xe),pt,W),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&et.setValue(L,"center",O.center),et.setValue(L,"modelViewMatrix",O.modelViewMatrix),et.setValue(L,"normalMatrix",O.normalMatrix),et.setValue(L,"modelMatrix",O.matrixWorld),F.uniformsGroups!==void 0){const nt=F.uniformsGroups;for(let Ln=0,hi=nt.length;Ln<hi;Ln++){const zo=nt[Ln];j.update(zo,qt),j.bind(zo,qt)}}return qt}function Kc(v,I){v.ambientLightColor.needsUpdate=I,v.lightProbe.needsUpdate=I,v.directionalLights.needsUpdate=I,v.directionalLightShadows.needsUpdate=I,v.pointLights.needsUpdate=I,v.pointLightShadows.needsUpdate=I,v.spotLights.needsUpdate=I,v.spotLightShadows.needsUpdate=I,v.rectAreaLights.needsUpdate=I,v.hemisphereLights.needsUpdate=I}function Zc(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return K},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return J},this.setRenderTargetTextures=function(v,I,H){const F=k.get(v);F.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,F.__autoAllocateDepthBuffer===!1&&(F.__useRenderToTexture=!1),k.get(v.texture).__webglTexture=I,k.get(v.depthTexture).__webglTexture=F.__autoAllocateDepthBuffer?void 0:H,F.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,I){const H=k.get(v);H.__webglFramebuffer=I,H.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(v,I=0,H=0){J=v,K=I,G=H;let F=null,O=!1,pe=!1;if(v){const ue=k.get(v);if(ue.__useDefaultFramebuffer!==void 0){g.bindFramebuffer(L.FRAMEBUFFER,ue.__webglFramebuffer),ge.copy(v.viewport),Me.copy(v.scissor),Xe=v.scissorTest,g.viewport(ge),g.scissor(Me),g.setScissorTest(Xe),ee=-1;return}else if(ue.__webglFramebuffer===void 0)W.setupRenderTarget(v);else if(ue.__hasExternalTextures)W.rebindTextures(v,k.get(v.texture).__webglTexture,k.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){const Ne=v.depthTexture;if(ue.__boundDepthTexture!==Ne){if(Ne!==null&&k.has(Ne)&&(v.width!==Ne.image.width||v.height!==Ne.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");W.setupDepthRenderbuffer(v)}}const ye=v.texture;(ye.isData3DTexture||ye.isDataArrayTexture||ye.isCompressedArrayTexture)&&(pe=!0);const Te=k.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Te[I])?F=Te[I][H]:F=Te[I],O=!0):v.samples>0&&W.useMultisampledRTT(v)===!1?F=k.get(v).__webglMultisampledFramebuffer:Array.isArray(Te)?F=Te[H]:F=Te,ge.copy(v.viewport),Me.copy(v.scissor),Xe=v.scissorTest}else ge.copy(Re).multiplyScalar(te).floor(),Me.copy(ut).multiplyScalar(te).floor(),Xe=ze;if(H!==0&&(F=$),g.bindFramebuffer(L.FRAMEBUFFER,F)&&g.drawBuffers(v,F),g.viewport(ge),g.scissor(Me),g.setScissorTest(Xe),O){const ue=k.get(v.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+I,ue.__webglTexture,H)}else if(pe){const ue=I;for(let ye=0;ye<v.textures.length;ye++){const Te=k.get(v.textures[ye]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+ye,Te.__webglTexture,H,ue)}}else if(v!==null&&H!==0){const ue=k.get(v.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ue.__webglTexture,H)}ee=-1},this.readRenderTargetPixels=function(v,I,H,F,O,pe,ve,ue=0){if(!(v&&v.isWebGLRenderTarget)){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ye=k.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ve!==void 0&&(ye=ye[ve]),ye){g.bindFramebuffer(L.FRAMEBUFFER,ye);try{const Te=v.textures[ue],Ne=Te.format,Oe=Te.type;if(v.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ue),!y.textureFormatReadable(Ne)){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!y.textureTypeReadable(Oe)){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=v.width-F&&H>=0&&H<=v.height-O&&L.readPixels(I,H,F,O,le.convert(Ne),le.convert(Oe),pe)}finally{const Te=J!==null?k.get(J).__webglFramebuffer:null;g.bindFramebuffer(L.FRAMEBUFFER,Te)}}},this.readRenderTargetPixelsAsync=async function(v,I,H,F,O,pe,ve,ue=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ye=k.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ve!==void 0&&(ye=ye[ve]),ye)if(I>=0&&I<=v.width-F&&H>=0&&H<=v.height-O){g.bindFramebuffer(L.FRAMEBUFFER,ye);const Te=v.textures[ue],Ne=Te.format,Oe=Te.type;if(v.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ue),!y.textureFormatReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!y.textureTypeReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ae=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Ae),L.bufferData(L.PIXEL_PACK_BUFFER,pe.byteLength,L.STREAM_READ),L.readPixels(I,H,F,O,le.convert(Ne),le.convert(Oe),0);const Je=J!==null?k.get(J).__webglFramebuffer:null;g.bindFramebuffer(L.FRAMEBUFFER,Je);const ft=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await th(L,ft,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Ae),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,pe),L.deleteBuffer(Ae),L.deleteSync(ft),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,I=null,H=0){const F=Math.pow(2,-H),O=Math.floor(v.image.width*F),pe=Math.floor(v.image.height*F),ve=I!==null?I.x:0,ue=I!==null?I.y:0;W.setTexture2D(v,0),L.copyTexSubImage2D(L.TEXTURE_2D,H,0,0,ve,ue,O,pe),g.unbindTexture()},this.copyTextureToTexture=function(v,I,H=null,F=null,O=0,pe=0){let ve,ue,ye,Te,Ne,Oe,Ae,Je,ft;const ot=v.isCompressedTexture?v.mipmaps[pe]:v.image;if(H!==null)ve=H.max.x-H.min.x,ue=H.max.y-H.min.y,ye=H.isBox3?H.max.z-H.min.z:1,Te=H.min.x,Ne=H.min.y,Oe=H.isBox3?H.min.z:0;else{const pt=Math.pow(2,-O);ve=Math.floor(ot.width*pt),ue=Math.floor(ot.height*pt),v.isDataArrayTexture?ye=ot.depth:v.isData3DTexture?ye=Math.floor(ot.depth*pt):ye=1,Te=0,Ne=0,Oe=0}F!==null?(Ae=F.x,Je=F.y,ft=F.z):(Ae=0,Je=0,ft=0);const je=le.convert(I.format),Ct=le.convert(I.type);let xe;I.isData3DTexture?(W.setTexture3D(I,0),xe=L.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(W.setTexture2DArray(I,0),xe=L.TEXTURE_2D_ARRAY):(W.setTexture2D(I,0),xe=L.TEXTURE_2D),g.activeTexture(L.TEXTURE0),g.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,I.flipY),g.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),g.pixelStorei(L.UNPACK_ALIGNMENT,I.unpackAlignment);const Gt=g.getParameter(L.UNPACK_ROW_LENGTH),Ve=g.getParameter(L.UNPACK_IMAGE_HEIGHT),qt=g.getParameter(L.UNPACK_SKIP_PIXELS),on=g.getParameter(L.UNPACK_SKIP_ROWS),Cn=g.getParameter(L.UNPACK_SKIP_IMAGES);g.pixelStorei(L.UNPACK_ROW_LENGTH,ot.width),g.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ot.height),g.pixelStorei(L.UNPACK_SKIP_PIXELS,Te),g.pixelStorei(L.UNPACK_SKIP_ROWS,Ne),g.pixelStorei(L.UNPACK_SKIP_IMAGES,Oe);const di=v.isDataArrayTexture||v.isData3DTexture,et=I.isDataArrayTexture||I.isData3DTexture;if(v.isDepthTexture){const pt=k.get(v),Pn=k.get(I),nt=k.get(pt.__renderTarget),Ln=k.get(Pn.__renderTarget);g.bindFramebuffer(L.READ_FRAMEBUFFER,nt.__webglFramebuffer),g.bindFramebuffer(L.DRAW_FRAMEBUFFER,Ln.__webglFramebuffer);for(let hi=0;hi<ye;hi++)di&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,k.get(v).__webglTexture,O,Oe+hi),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,k.get(I).__webglTexture,pe,ft+hi)),L.blitFramebuffer(Te,Ne,ve,ue,Ae,Je,ve,ue,L.DEPTH_BUFFER_BIT,L.NEAREST);g.bindFramebuffer(L.READ_FRAMEBUFFER,null),g.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(O!==0||v.isRenderTargetTexture||k.has(v)){const pt=k.get(v),Pn=k.get(I);g.bindFramebuffer(L.READ_FRAMEBUFFER,Q),g.bindFramebuffer(L.DRAW_FRAMEBUFFER,z);for(let nt=0;nt<ye;nt++)di?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,pt.__webglTexture,O,Oe+nt):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,pt.__webglTexture,O),et?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Pn.__webglTexture,pe,ft+nt):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Pn.__webglTexture,pe),O!==0?L.blitFramebuffer(Te,Ne,ve,ue,Ae,Je,ve,ue,L.COLOR_BUFFER_BIT,L.NEAREST):et?L.copyTexSubImage3D(xe,pe,Ae,Je,ft+nt,Te,Ne,ve,ue):L.copyTexSubImage2D(xe,pe,Ae,Je,Te,Ne,ve,ue);g.bindFramebuffer(L.READ_FRAMEBUFFER,null),g.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else et?v.isDataTexture||v.isData3DTexture?L.texSubImage3D(xe,pe,Ae,Je,ft,ve,ue,ye,je,Ct,ot.data):I.isCompressedArrayTexture?L.compressedTexSubImage3D(xe,pe,Ae,Je,ft,ve,ue,ye,je,ot.data):L.texSubImage3D(xe,pe,Ae,Je,ft,ve,ue,ye,je,Ct,ot):v.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,pe,Ae,Je,ve,ue,je,Ct,ot.data):v.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,pe,Ae,Je,ot.width,ot.height,je,ot.data):L.texSubImage2D(L.TEXTURE_2D,pe,Ae,Je,ve,ue,je,Ct,ot);g.pixelStorei(L.UNPACK_ROW_LENGTH,Gt),g.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Ve),g.pixelStorei(L.UNPACK_SKIP_PIXELS,qt),g.pixelStorei(L.UNPACK_SKIP_ROWS,on),g.pixelStorei(L.UNPACK_SKIP_IMAGES,Cn),pe===0&&I.generateMipmaps&&L.generateMipmap(xe),g.unbindTexture()},this.initRenderTarget=function(v){k.get(v).__webglFramebuffer===void 0&&W.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?W.setTextureCube(v,0):v.isData3DTexture?W.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?W.setTexture2DArray(v,0):W.setTexture2D(v,0),g.unbindTexture()},this.resetState=function(){K=0,G=0,J=null,g.reset(),me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return un}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=ke._getDrawingBufferColorSpace(e),t.unpackColorSpace=ke._getUnpackColorSpace()}}const oo=[[{x:.06,y:.16},{x:.16,y:.1},{x:.27,y:.12},{x:.3,y:.22},{x:.24,y:.3},{x:.26,y:.38},{x:.18,y:.42},{x:.1,y:.34},{x:.05,y:.24}],[{x:.22,y:.5},{x:.3,y:.48},{x:.33,y:.58},{x:.3,y:.72},{x:.25,y:.82},{x:.21,y:.72},{x:.2,y:.58}],[{x:.42,y:.14},{x:.5,y:.1},{x:.57,y:.14},{x:.55,y:.24},{x:.48,y:.28},{x:.42,y:.24}],[{x:.44,y:.34},{x:.54,y:.32},{x:.59,y:.42},{x:.56,y:.56},{x:.5,y:.66},{x:.44,y:.56},{x:.42,y:.44}],[{x:.58,y:.12},{x:.72,y:.08},{x:.86,y:.14},{x:.92,y:.24},{x:.86,y:.36},{x:.76,y:.42},{x:.66,y:.38},{x:.6,y:.28},{x:.56,y:.2}],[{x:.78,y:.6},{x:.88,y:.58},{x:.93,y:.66},{x:.88,y:.76},{x:.79,y:.74},{x:.76,y:.66}]],Ql={"ck-research":"#6fa6e0","ck-media":"#e8945c","ck-culture":"#a79fc9","ck-infrastructure":"#8f9384","ck-governance":"#e07668","ck-markets":"#dbc152","ck-communities":"#8fd14f","ck-data":"#9c998f","ck-terminal":"#e8e6df"},wi={data:"#6fa6e0",attention:"#e8945c",resource:"#dbc152",decision:"#e8e6df",responsibility:"#e07668",enables:"#8fd14f",informs:"#6fa6e0",delegates:"#6fa6e0",constrains:"#e8e6df",evaluates:"#a79fc9",overrides:"#e8945c",records:"#9c998f",accountable:"#e07668",desired:"#8fd14f",automated:"#6fa6e0",delegated:"#dbc152",override:"#e8945c",feedback:"#a79fc9"},N0="#4d5545",Jn=(()=>{const i=Hn(31337),e=new Map;for(const t of Xt)e.set(t.id,(i()-.5)*2);for(const[t]of ri){const n=co[t];e.set(t,n?(n.x-.5)*2:(i()-.5)*1.2)}return e})(),oa=10,la=7;function Qn(i){return i.boundingSphere=new ki(new N(0,0,0),1e4),i}class F0{constructor(){V(this,"renderer");V(this,"scene",new _h);V(this,"camera",new Zt(40,1,.5,200));V(this,"canvas");V(this,"planeW",10);V(this,"planeH",6);V(this,"depthScale",0);V(this,"camDist",13);V(this,"ctx");V(this,"dots");V(this,"dotPos");V(this,"dotCol");V(this,"mesh");V(this,"meshPos");V(this,"meshCol");V(this,"continents",[]);V(this,"flows",[]);V(this,"rels",[]);V(this,"routes",[]);V(this,"conflicts");V(this,"grid");V(this,"gridPos");V(this,"stems");V(this,"stemPos");V(this,"depthNote");V(this,"tendrils");V(this,"tendrilPos");V(this,"tendrilCol");V(this,"tendrilSpec",[]);V(this,"tiltX",0);V(this,"tiltY",0);V(this,"curX",0);V(this,"curY",0)}mount(e,t){this.ctx=t,this.canvas=document.createElement("canvas"),this.canvas.className="gl-canvas",this.canvas.setAttribute("aria-hidden","true"),e.stage.insertBefore(this.canvas,e.stage.firstChild),this.renderer=new U0({canvas:this.canvas,antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setClearAlpha(0),this.renderer.setPixelRatio(Math.min(2,window.devicePixelRatio||1));const n=Xt.length;this.dotPos=new Float32Array(n*3),this.dotCol=new Float32Array(n*3);const s=new bt;s.setAttribute("position",new xt(this.dotPos,3)),s.setAttribute("color",new xt(this.dotCol,3)),Qn(s),this.dots=new wh(s,new Cc({size:.075,vertexColors:!0,transparent:!0,sizeAttenuation:!0})),this.dots.frustumCulled=!1,this.scene.add(this.dots);const r=da.length;this.meshPos=new Float32Array(r*6),this.meshCol=new Float32Array(r*6);const a=new bt;a.setAttribute("position",new xt(this.meshPos,3)),a.setAttribute("color",new xt(this.meshCol,3)),Qn(a),this.mesh=new Ki(a,new ei({vertexColors:!0,transparent:!0,opacity:.85})),this.mesh.frustumCulled=!1,this.scene.add(this.mesh);for(const f of oo){const _=[...f,f[0]];this.continents.push(this.makeLine(_,"#4d5545",0,0))}for(const f of ha){const _=es(zt(f.a,2),zt(f.b,2),f.curv,40);this.flows.push(this.makeLine(_,wi[f.type],Jn.get(f.a)??0,Jn.get(f.b)??0))}for(const f of ir){const _=es(zt(f.a,3),zt(f.b,3),f.curv,40);this.rels.push(this.makeLine(_,wi[f.type],Jn.get(f.a)??0,Jn.get(f.b)??0))}for(const f of ua){const _=f.anchors.map(m=>typeof m=="string"?zt(m,4):m),M=f.type==="responsibility"?"#e07668":wi[f.type];this.routes.push(this.makeLine(fo(_,72),M,0,0))}const o=new bt,l=new Float32Array(nr.length*12);o.setAttribute("position",new xt(l,3)),Qn(o),this.conflicts=new Ki(o,new ei({color:new Be("#e07668"),transparent:!0})),this.conflicts.frustumCulled=!1,this.scene.add(this.conflicts),this.gridPos=new Float32Array((oa+1+la+1)*6);const c=new bt;c.setAttribute("position",new xt(this.gridPos,3)),Qn(c),this.grid=new Ki(c,new ei({color:new Be("#2f3728"),transparent:!0,opacity:0})),this.grid.frustumCulled=!1,this.scene.add(this.grid),this.stemPos=new Float32Array(tr.length*6);const h=new bt;h.setAttribute("position",new xt(this.stemPos,3)),Qn(h),this.stems=new Ki(h,new ei({color:new Be("#5c6650"),transparent:!0,opacity:0})),this.stems.frustumCulled=!1,this.scene.add(this.stems);const u=Hn(8123);Xt.forEach((f,_)=>{const M=2+Math.floor(u()*3);for(let m=0;m<M;m++){const p=u()*Math.PI*2,A=.012+u()*.022,w={x:Math.cos(p)*A,y:Math.sin(p)*A*.8};this.tendrilSpec.push({node:_,a:{x:0,y:0},b:w});const S=p+(u()-.5)*1.6,T=A*(.5+u()*.6);this.tendrilSpec.push({node:_,a:w,b:{x:w.x+Math.cos(S)*T,y:w.y+Math.sin(S)*T*.8}})}}),this.tendrilPos=new Float32Array(this.tendrilSpec.length*6),this.tendrilCol=new Float32Array(this.tendrilSpec.length*6);const d=new bt;d.setAttribute("position",new xt(this.tendrilPos,3)),d.setAttribute("color",new xt(this.tendrilCol,3)),Qn(d),this.tendrils=new Ki(d,new ei({vertexColors:!0,transparent:!0,opacity:.7})),this.tendrils.frustumCulled=!1,this.scene.add(this.tendrils),this.depthNote=document.createElement("div"),this.depthNote.className="depth-note",this.depthNote.textContent="격자로부터의 높이 = 요청 없이 실행되는 정도",e.textLayer.appendChild(this.depthNote),e.stage.addEventListener("pointermove",f=>{f.pointerType!=="mouse"||t.reduced||(this.tiltY=(f.clientX/Math.max(1,t.w)-.5)*.34,this.tiltX=(.5-f.clientY/Math.max(1,t.h))*.22)}),e.stage.addEventListener("pointerleave",()=>{this.tiltX=0,this.tiltY=0})}makeLine(e,t,n,s){const r=new bt,a=new Float32Array(e.length*3);r.setAttribute("position",new xt(a,3)),r.setDrawRange(0,0),Qn(r);const o=new ei({color:new Be(t),transparent:!0,opacity:0}),l=new Rc(r,o);return l.frustumCulled=!1,l.visible=!1,this.scene.add(l),{line:l,pts:e,depthA:n,depthB:s,mat:o,n:e.length}}world(e,t=0){return new N((e.x-.5)*this.planeW,(.5-e.y)*this.planeH,t*this.depthScale)}project(e,t=0){const n=this.world(e,t).project(this.camera),s=this.ctx.rect;return{x:s.l+(n.x*.5+.5)*s.iw,y:s.t+(.5-n.y*.5)*s.ih}}depthOf(e){return Jn.get(e)??0}setLine(e,t,n,s,r=!1){if(s<=.01||n-t<=.004){e.line.visible&&(e.line.visible=!1);return}e.line.visible=!0,e.mat.opacity=s,r!==(e.line.userData.latent===!0)&&(e.line.userData.latent=r,e.mat.color.set(r?N0:e.line.userData.base));const a=e.line.geometry.getAttribute("position"),o=a.array,l=e.n;for(let c=0;c<l;c++){const h=t+(n-t)*c/(l-1),u=h*(l-1),d=Math.min(l-2,Math.floor(u)),f=u-d,_=e.pts[d],M=e.pts[d+1],m={x:Yt(_.x,M.x,f),y:Yt(_.y,M.y,f)},p=Yt(e.depthA,e.depthB,h),A=this.world(m,p);o[c*3]=A.x,o[c*3+1]=A.y,o[c*3+2]=A.z}e.line.geometry.setDrawRange(0,l),a.needsUpdate=!0}update(e){this.ctx=e;const t=e.p,n=e.rect;this.renderer.setSize(e.w,e.h,!1),this.renderer.setViewport(n.l,e.h-n.t-n.ih,n.iw,n.ih),this.renderer.setScissor(n.l,e.h-n.t-n.ih,n.iw,n.ih),this.renderer.setScissorTest(!0),this.camera.aspect=n.iw/Math.max(1,n.ih);const s=fe(t,.2,.34)*(1-.9*Ri(t))*(1-.55*fe(t,.78,.86));this.depthScale=e.reduced?0:1.35*s;const r=Ri(t);this.curX+=(this.tiltX-this.curX)*.07,this.curY+=(this.tiltY-this.curY)*.07;const a=ct(fe(t,.24,.66))*.26*(1-r),o=(.06+a*.55+this.curX*(1-r))*(e.reduced?0:1),l=(a*.5+this.curY*(1-r))*(e.reduced?0:1);this.camDist=13.2+1.4*Math.sin(t*Math.PI)*(1-r),this.camera.position.set(Math.sin(l)*this.camDist,Math.sin(o)*this.camDist,Math.cos(l)*Math.cos(o)*this.camDist),this.camera.lookAt(0,0,0),this.camera.updateProjectionMatrix();const c=2*this.camDist*Math.tan(this.camera.fov*Math.PI/360);this.planeH=c*.84,this.planeW=c*this.camera.aspect*.84,this.updateBase(e),this.updateDots(e),this.updateTendrils(e),this.updateMesh(e),this.updateContinents(e),this.updateFlows(e),this.updateRels(e),this.updateRoutes(e),this.updateConflicts(e),this.renderer.render(this.scene,this.camera)}ambient(e){this.update(e)}livePos(e,t){const n=Ys(e,t.p);if(t.reduced||t.p>=.27)return n;const s=Jn.get(e.id)??0,r=1-fe(t.p,.19,.25);return{x:n.x+Math.cos(t.t*(.5+Math.abs(s))+s*6)*.004*r,y:n.y+Math.sin(t.t*(.6+Math.abs(s))+s*4)*.004*r}}updateDots(e){const t=new Be;let n=!1;Xt.forEach((s,r)=>{let a=ar(s,e.p);if(a>.01&&!e.reduced&&e.p<.27){const c=Math.abs(Jn.get(s.id)??.5),h=5+c*6,u=((e.t/h+c)%1+1)%1;a*=.1+.9*Math.min(fe(u,0,.16),1-fe(u,.78,1))}const o=this.livePos(s,e),l=this.world(o,this.depthOf(s.id));this.dotPos[r*3]=l.x,this.dotPos[r*3+1]=l.y,this.dotPos[r*3+2]=a>.01?l.z:1e4,t.set(Ql[s.cls]??"#8f9384"),this.dotCol[r*3]=t.r,this.dotCol[r*3+1]=t.g,this.dotCol[r*3+2]=t.b,a>.01&&(n=!0)}),this.dots.visible=n,this.dots.geometry.getAttribute("position").needsUpdate=!0,this.dots.geometry.getAttribute("color").needsUpdate=!0,this.dots.material.opacity=kn(1-fe(e.p,.5,.6))*.95}updateBase(e){const t=e.p,n=wt(t,.3,.4,.63,.685)*(1-Ri(t))*(e.reduced?0:1),s=this.grid.material,r=this.stems.material;if(s.opacity=n*.85,r.opacity=n*.7,this.grid.visible=n>.01,this.stems.visible=n>.01,lt(this.depthNote,n),n>.01){const u=this.project({x:.42,y:1.2},-1.15);this.depthNote.style.transform=`translate(${u.x.toFixed(1)}px, ${u.y.toFixed(1)}px)`}if(n<=.01)return;const a=-1.15*this.depthScale,o=this.planeW/2,l=this.planeH/2;let c=0;const h=(u,d,f,_)=>{this.gridPos[c++]=u,this.gridPos[c++]=d,this.gridPos[c++]=a,this.gridPos[c++]=f,this.gridPos[c++]=_,this.gridPos[c++]=a};for(let u=0;u<=oa;u++){const d=-o+this.planeW*u/oa;h(d,-l,d,l)}for(let u=0;u<=la;u++){const d=-l+this.planeH*u/la;h(-o,d,o,d)}this.grid.geometry.getAttribute("position").needsUpdate=!0,tr.forEach((u,d)=>{const f=ns(u,t),_=d*6;if(!f){for(let m=0;m<6;m++)this.stemPos[_+m]=1e4;return}const M=this.world(f.pos,this.depthOf(u.id));this.stemPos[_]=M.x,this.stemPos[_+1]=M.y,this.stemPos[_+2]=M.z,this.stemPos[_+3]=M.x,this.stemPos[_+4]=M.y,this.stemPos[_+5]=a}),this.stems.geometry.getAttribute("position").needsUpdate=!0}updateTendrils(e){const t=e.p,n=e.reduced?0:wt(t,.26,.32,.44,.5);if(this.tendrils.visible=n>.01,this.tendrils.material.opacity=n*.75,n<=.01)return;const s=new Be;this.tendrilSpec.forEach((r,a)=>{const o=Xt[r.node],l=ar(o,t),c=a*6;if(l<=.02){for(let _=0;_<6;_++)this.tendrilPos[c+_]=1e4;return}const h=this.livePos(o,e),u=this.depthOf(o.id),d=this.world({x:h.x+r.a.x,y:h.y+r.a.y},u),f=this.world({x:h.x+r.b.x,y:h.y+r.b.y},u);this.tendrilPos[c]=d.x,this.tendrilPos[c+1]=d.y,this.tendrilPos[c+2]=d.z,this.tendrilPos[c+3]=f.x,this.tendrilPos[c+4]=f.y,this.tendrilPos[c+5]=f.z,s.set(Ql[o.cls]??"#8f9384");for(let _=0;_<2;_++)this.tendrilCol[c+_*3]=s.r*l,this.tendrilCol[c+_*3+1]=s.g*l,this.tendrilCol[c+_*3+2]=s.b*l}),this.tendrils.geometry.getAttribute("position").needsUpdate=!0,this.tendrils.geometry.getAttribute("color").needsUpdate=!0}endpoint(e,t){const n=jl.get(e);if(n)return{v:this.livePos(n,t),d:this.depthOf(e)};const s=ri.get(e);if(!s)return null;const r=ns(s,t.p);return r?{v:r.pos,d:this.depthOf(e)}:null}updateMesh(e){const t=e.p,n=t<.27;if(this.mesh.visible=n,!n)return;const s=new Be;da.forEach((r,a)=>{const o=fe(t,r.appear,r.appear+.045),l=fe(t,.195,.25),c=o*(1-l)*(r.kind==="intra"?.5:.75),h=this.endpoint(r.from,e),u=this.endpoint(r.to,e),d=a*6;if(!h||!u||c<=.01){for(let p=0;p<6;p++)this.meshPos[d+p]=1e4;return}const f=this.world(h.v,h.d),_=this.world(u.v,u.d),M=f.clone().lerp(_,l),m=f.clone().lerp(_,o);this.meshPos[d]=M.x,this.meshPos[d+1]=M.y,this.meshPos[d+2]=M.z,this.meshPos[d+3]=m.x,this.meshPos[d+4]=m.y,this.meshPos[d+5]=m.z,s.set(r.kind==="intra"?"#414a3a":"#8f9384");for(let p=0;p<2;p++)this.meshCol[d+p*3]=s.r*c+(1-c),this.meshCol[d+p*3+1]=s.g*c+(1-c),this.meshCol[d+p*3+2]=s.b*c+(1-c)}),this.mesh.geometry.getAttribute("position").needsUpdate=!0,this.mesh.geometry.getAttribute("color").needsUpdate=!0}updateContinents(e){var n;const t=wt(e.p,.21,.29,.44,.52)*.9;for(const s of this.continents)(n=s.line.userData).base??(n.base="#4d5545"),this.setLine(s,0,1,t)}updateFlows(e){const t=e.p,n=t>.18&&t<.56;ha.forEach((s,r)=>{var h;const a=this.flows[r];if((h=a.line.userData).base??(h.base=wi[s.type]),!n)return this.setLine(a,0,0,0);const o=uo(fe(t,s.w[0],s.w[1])),l=ct(fe(t,.452,.518));let c=o>0?.9:0;e.selection&&s.a!==e.selection&&s.b!==e.selection&&(c*=.22),this.setLine(a,l,o,c)})}updateRels(e){const t=e.p,n=t>.5&&t<.82;ir.forEach((s,r)=>{var _;const a=this.rels[r];if((_=a.line.userData).base??(_.base=wi[s.type]),!n)return this.setLine(a,0,0,0);const o=ho[s.group],l=ct(fe(t,.535+s.group*.008,.575+s.group*.008)),c=ct(fe(t,.72,.785)),h=t>=o[0]&&t<=o[1]+.012,u=e.selection===s.a||e.selection===s.b,d=e.selection?u:h;let f=l>0?d?.95:.4:0;f*=1-fe(t,.74,.79),f*=1-.85*Ri(t),e.selection&&!u&&(f*=.5),this.setLine(a,c,l,f,!d)})}updateRoutes(e){const t=e.p,n=t>.74;ua.forEach((s,r)=>{var d;const a=this.routes[r];if((d=a.line.userData).base??(d.base=s.type==="responsibility"?"#e07668":wi[s.type]),!n)return this.setLine(a,0,0,0);const o=ct(fe(t,s.w[0],s.w[1])),l=s.reverse?1-o:0,c=s.reverse?1:o;let h=o>0?.92:0;h*=1-fe(t,s.type==="responsibility"?.932:.925,.965);const u=s.anchors.some(f=>typeof f=="string"&&f===e.selection);e.selection&&!u&&(h*=.25),this.setLine(a,l,c,h)})}updateConflicts(e){const t=e.p,n=this.conflicts.material,s=this.conflicts.geometry.getAttribute("position").array;let r=0;nr.forEach((a,o)=>{const l=wt(t,.36+o*.012,.395+o*.012,.445,.5);r=Math.max(r,l);const c=.08*(.6+.4*l),h=this.world(a,0),u=o*12,d=[[-c,-c],[c,c],[-c,c],[c,-c]];for(let f=0;f<4;f++)s[u+f*3]=l>.01?h.x+d[f][0]:1e4,s[u+f*3+1]=h.y+d[f][1],s[u+f*3+2]=h.z}),n.opacity=r,this.conflicts.visible=r>.01,this.conflicts.geometry.getAttribute("position").needsUpdate=!0}}function O0(i){return{top:i.getBoundingClientRect().top+window.scrollY,range:Math.max(1,i.offsetHeight-window.innerHeight)}}function B0(i){return kn((window.scrollY-i.top)/i.range)}class z0{constructor(e){V(this,"host");V(this,"components",[]);V(this,"metrics",{top:0,range:1});V(this,"w",0);V(this,"h",0);V(this,"rect",{l:0,t:0,iw:1,ih:1});V(this,"ctx");V(this,"lastP",-1);V(this,"lastSel",null);V(this,"dirty",!0);V(this,"reduced",!1);V(this,"resizeTimer");V(this,"scrollRoot");V(this,"scheduled",!1);V(this,"looping",!1);V(this,"tiltBack");V(this,"tiltFront");V(this,"tiltTgtX",0);V(this,"tiltTgtY",0);V(this,"tiltCurX",0);V(this,"tiltCurY",0);V(this,"lastTilt","");V(this,"projector",null);V(this,"depthLookup",null);V(this,"readyHooks",[]);V(this,"onResize",()=>{window.clearTimeout(this.resizeTimer),this.resizeTimer=window.setTimeout(()=>{this.measure(),this.dirty=!0,this.schedule()},120)});V(this,"schedule",()=>{if(document.visibilityState==="visible"){this.ensureLoop();return}this.scheduled||(this.scheduled=!0,window.setTimeout(()=>{this.scheduled=!1,this.frame()},32))});V(this,"loop",()=>{var e;if(document.visibilityState!=="visible"){this.looping=!1;return}if(this.frame(),!this.reduced){this.ctx.t=performance.now()/1e3;for(const t of this.components)(e=t.ambient)==null||e.call(t,this.ctx);this.applyTilt()}requestAnimationFrame(this.loop)});V(this,"frame",()=>{let e=B0(this.metrics);this.reduced&&(e=this.snap(e));const t=this.ctx.w!==this.w||this.ctx.h!==this.h;if(this.dirty||e!==this.lastP||t||this.ctx.selection!==this.lastSel){this.lastP=e,this.lastSel=this.ctx.selection,this.dirty=!1;const n=nc(e),s=this.pads(n);this.rect={l:s.l,t:s.t,iw:Math.max(40,this.w-s.l-s.r),ih:Math.max(40,this.h-s.t-s.b)},this.ctx.p=e,this.ctx.mix=n,this.ctx.w=this.w,this.ctx.h=this.h,this.ctx.mobile=this.w<Vo,this.ctx.reduced=this.reduced,this.ctx.rectKey=`${this.w}x${this.h}:${this.rect.l.toFixed(1)}:${this.rect.t.toFixed(1)}:${this.rect.iw.toFixed(1)}:${this.rect.ih.toFixed(1)}`,this.ctx.rect=this.rect;for(const r of this.components)r.update(this.ctx);this.reduced||this.applyTilt()}});this.scrollRoot=_e("div","scroll-root"),this.scrollRoot.style.height=`${rd}vh`;const t=_e("div","stage");t.setAttribute("aria-label","가상공간의 지도제작자들에서 행위성의 지도제작자들로 — 스크롤 포스터");const n=_e("div","visually-hidden",At.srSummary);t.appendChild(n);const s=it("svg","map-svg");s.setAttribute("aria-hidden","true");const r=it("g","g-continents"),a=it("g","g-edges1"),o=it("g","g-flows"),l=it("g","g-rels"),c=it("g","g-routes"),h=it("g","g-field");s.append(r,a,o,l,c,h);const u=_e("div","layer text-layer"),d=_e("div","layer html-layer"),f=_e("div","layer annot-layer");this.tiltBack=_e("div","layer scene3d"),this.tiltBack.appendChild(s),this.tiltFront=_e("div","layer scene3d"),this.tiltFront.append(d,f),t.append(this.tiltBack,u,this.tiltFront),this.scrollRoot.appendChild(t),e.appendChild(this.scrollRoot),t.addEventListener("pointermove",M=>{M.pointerType!=="mouse"||this.reduced||(this.tiltTgtY=(M.clientX/this.w-.5)*7,this.tiltTgtX=(.5-M.clientY/this.h)*5)}),t.addEventListener("pointerleave",()=>{this.tiltTgtX=0,this.tiltTgtY=0}),this.host={stage:t,svg:s,gContinents:r,gEdges1:a,gFlows:o,gRels:l,gRoutes:c,gField:h,htmlLayer:d,textLayer:u,annotLayer:f};const _=window.matchMedia("(prefers-reduced-motion: reduce)");this.reduced=_.matches,_.addEventListener("change",M=>{this.reduced=M.matches,t.classList.toggle("reduced",this.reduced),this.dirty=!0,this.schedule()}),t.classList.toggle("reduced",this.reduced),this.ctx={p:0,mix:[1,0,0,0],w:0,h:0,mobile:!1,reduced:this.reduced,selection:null,t:0,rectKey:"",proj:(M,m=0)=>this.projector?this.projector(M,m):{x:this.rect.l+M.x*this.rect.iw,y:this.rect.t+M.y*this.rect.ih},webgl:!1,rect:{l:0,t:0,iw:1,ih:1},depthOf:M=>{var m;return((m=this.depthLookup)==null?void 0:m.call(this,M))??0},setSelection:M=>{this.ctx.selection!==M&&(this.ctx.selection=M,this.dirty=!0,this.schedule())}},window.addEventListener("scroll",this.schedule,{passive:!0}),window.addEventListener("resize",this.onResize),document.addEventListener("visibilitychange",this.schedule)}useProjector(e,t){this.projector=e,this.depthLookup=t,this.ctx.webgl=!0,this.host.svg.classList.add("is-geometry-offloaded")}add(e){this.components.push(e)}onReady(e){this.readyHooks.push(e)}start(){this.measure();for(const e of this.components)e.mount(this.host,this.ctx);for(const e of this.readyHooks)e();this.frame(),this.ensureLoop()}ensureLoop(){this.looping||(this.looping=!0,requestAnimationFrame(this.loop))}applyTilt(){if(this.tiltCurX+=(this.tiltTgtX-this.tiltCurX)*.06,this.tiltCurY+=(this.tiltTgtY-this.tiltCurY)*.06,this.ctx.webgl){this.lastTilt!=="none"&&(this.lastTilt="none",this.tiltBack.style.transform="",this.tiltFront.style.transform="");return}const e=this.ctx.p,t=fe(e,.5,.585)*(1-fe(e,.63,.672)),n=fe(e,.63,.672)*(1-fe(e,.76,.83)),s=3.5+13*t-3.5*n,r=1-n,a=s+this.tiltCurX*r,o=this.tiltCurY*r*(1+1.4*t),l=`perspective(1500px) rotateX(${a.toFixed(2)}deg) rotateY(${o.toFixed(2)}deg)`;l!==this.lastTilt&&(this.lastTilt=l,this.tiltBack.style.transform=l,this.tiltFront.style.transform=l)}measure(){this.metrics=O0(this.scrollRoot),this.w=this.host.stage.clientWidth,this.h=this.host.stage.clientHeight}pads(e){const n=this.w<Vo?[{l:26,t:this.h*.42,r:26,b:138},{l:22,t:168,r:22,b:110},{l:30,t:196,r:30,b:172},{l:22,t:178,r:22,b:190}]:[{l:96,t:this.h*.38,r:76,b:176},{l:420,t:116,r:96,b:124},{l:196,t:108,r:420,b:104},{l:150,t:150,r:160,b:140}],s={l:0,t:0,r:0,b:0};for(let a=0;a<4;a++)s.l+=n[a].l*e[a],s.t+=n[a].t*e[a],s.r+=n[a].r*e[a],s.b+=n[a].b*e[a];const r=(a,o,l,c)=>{const h=l-a-o,u=l*c;if(h>=u)return[a,o];const d=a+o||1,f=u-h;return[a-f*(a/d),o-f*(o/d)]};return[s.t,s.b]=r(s.t,s.b,this.h,.46),[s.l,s.r]=r(s.l,s.r,this.w,.42),s}snap(e){for(let t=0;t<Ho.length;t++)if(e<Ho[t])return Tr[t];return Tr[Tr.length-1]}}class k0{constructor(){V(this,"meta");V(this,"titleBlock");V(this,"hint");V(this,"statements",[]);V(this,"timeline");V(this,"tlItems",[]);V(this,"legendVariants",[]);V(this,"finalBlock");V(this,"finalQScr",[]);V(this,"finalRest")}statement(e,t,n,s,r,a,o,l){const c=_e("div",t),h=n.map((u,d)=>{const f=_e("div","");return c.appendChild(f),new Ui(f,s+d)});e.appendChild(c),this.statements.push({box:c,lines:h,texts:n,a:r,b:a,c:o,d:l})}mount(e,t){const n=e.textLayer;this.meta=_e("header","meta"),this.meta.appendChild(_e("div","meta-left",At.metaLeft)),this.meta.appendChild(_e("div","meta-right",At.metaRight)),n.appendChild(this.meta),this.titleBlock=_e("div","title-block");const s=_e("h1","title-main");At.subtitle.forEach(l=>s.appendChild(_e("div","",l))),this.titleBlock.appendChild(s),this.titleBlock.appendChild(_e("div","title-ko",At.subtitleKo)),n.appendChild(this.titleBlock),this.statement(n,"pivot",At.pivot,11,.215,.248,.275,.303),this.statement(n,"statement s2-text",At.s2text,21,.3,.345,.44,.475),this.statement(n,"statement s3-text",At.s3text,31,.56,.6,.618,.648),this.statement(n,"statement s4-text",At.s4text,41,.8,.845,.925,.952),this.hint=_e("div","hint"),this.hint.appendChild(_e("span","hint-inner",At.hint)),n.appendChild(this.hint),this.timeline=_e("div","timeline"),At.timeline.forEach(l=>{const c=_e("div","tl-item");c.appendChild(_e("span","tl-year",l.year)),c.appendChild(_e("span","tl-label",l.label)),this.timeline.appendChild(c),this.tlItems.push(c)}),n.appendChild(this.timeline);const r=_e("div","legend");jc.forEach((l,c)=>{const h=_e("div","legend-variant");h.dataset.scene=String(c),h.appendChild(_e("div","lg-title",l.title));const u=_e("div",l.rows.length>6?"lg-cols":"");l.rows.forEach(d=>{const f=_e("div","lg-row"),_=it("svg");if(_.setAttribute("width","26"),_.setAttribute("height","10"),d.kind==="dot"){const M=it("circle",`fnode ${d.cls}`);M.setAttribute("cx","13"),M.setAttribute("cy","5"),M.setAttribute("r","2.5"),_.appendChild(M)}else if(d.kind==="x"){const M=it("path","conflict-x");M.setAttribute("d","M9 1 L17 9 M9 9 L17 1"),M.setAttribute("fill","none"),_.appendChild(M)}else{const M=it("path",d.cls);M.setAttribute("d","M1 5 L25 5"),M.setAttribute("fill","none"),d.cls==="lg-neutral"&&M.setAttribute("style","stroke:#7d8274;stroke-width:1"),d.cls==="lg-drift"&&M.setAttribute("style","stroke:#7d8274;stroke-width:1;stroke-dasharray:1 4"),_.appendChild(M)}f.appendChild(_),f.appendChild(_e("span","",d.text)),u.appendChild(f)}),h.appendChild(u),r.appendChild(h),this.legendVariants.push(h)}),n.appendChild(r),this.finalBlock=_e("div","final-block");const a=_e("div","final-q",At.finalQuestion);this.finalBlock.appendChild(a),this.finalQScr.push(new Ui(a,71)),this.finalRest=_e("div",""),this.finalRest.appendChild(_e("div","final-rule"));const o=_e("div","final-footer");At.finalFooter.forEach(l=>o.appendChild(_e("div","",l))),this.finalRest.appendChild(o),this.finalRest.appendChild(_e("div","final-credit",At.credit)),this.finalBlock.appendChild(this.finalRest),n.appendChild(this.finalBlock)}renderTexts(e,t){var n;for(const s of this.statements)s.lines.forEach((r,a)=>{r.window(s.texts[a],e,s.a+a*.012,s.b+a*.012,s.c,s.d,t)});(n=this.finalQScr[0])==null||n.window(At.finalQuestion,e,.952,.972,2,3,t)}update(e){const{p:t}=e,n=ct(fe(t,.1,.195));this.meta.style.transform=`translateY(${(-112*n).toFixed(1)}%)`,lt(this.titleBlock,1-fe(t,.19,.265)),this.titleBlock.style.transformOrigin=`50% ${(e.h/2-(e.mobile?76:108)).toFixed(0)}px`,this.titleBlock.style.transform=ic(t,e.h,!0),lt(this.hint,1-fe(t,.015,.045));for(const r of this.statements)lt(r.box,wt(t,r.a,r.b,r.c,r.d));lt(this.timeline,wt(t,.045,.075,.2,.255)),this.tlItems.forEach((r,a)=>{lt(r,fe(t,.05+a*.02,.07+a*.02))});const s=e.mobile?wt(t,.49,.53,.75,.77):0;this.legendVariants.forEach((r,a)=>{let o=e.mix[a]*(1-s);a===0&&(o*=fe(t,.05,.09)),a===3&&(o*=1-fe(t,.92,.955)),lt(r,o)}),lt(this.finalBlock,fe(t,.952,.972)),lt(this.finalRest,fe(t,.978,.995)),this.renderTexts(t,is(t,e.t))}ambient(e){this.renderTexts(e.p,is(e.p,e.t))}}class G0{constructor(){V(this,"continents",[]);V(this,"flows",[]);V(this,"conflicts",[]);V(this,"callouts",[]);V(this,"coTitles",[]);V(this,"particles",[]);V(this,"gContinents")}mount(e,t){this.gContinents=e.gContinents;for(let n=0;n<oo.length;n++){const s=it("path","continent");this.gContinents.appendChild(s),this.continents.push({el:s,lastKey:""})}ha.forEach((n,s)=>{const r=es(zt(n.a,2),zt(n.b,2),n.curv,28),a=po(e.gFlows,`ek-${n.type}`,r);this.flows.push({handle:a,def:n}),this.particles.push(ec(e.gFlows,`ek-${n.type}`,s*.37%1,.05+s%3*.012,1.8))});for(let n=0;n<nr.length;n++){const s=it("path","conflict-x");s.setAttribute("d","M-5 -5 L5 5 M-5 5 L5 -5"),e.gFlows.appendChild(s),this.conflicts.push({el:s,lastKey:""})}ko.forEach((n,s)=>{const r=_e("div","callout"),a=_e("div","co-title",n.t);r.appendChild(a),e.htmlLayer.appendChild(r),this.callouts.push(r),this.coTitles.push(new Ui(a,61+s))})}update(e){const{p:t}=e,n=t>.18&&t<.56;if(e.webgl){this.gContinents.style.display="none",this.updateCallouts(e,n);return}const s=n?wt(t,.21,.29,.44,.52):0;this.gContinents.style.opacity=s.toFixed(2),this.gContinents.style.display=s<=.01?"none":"",s>.01&&oo.forEach((r,a)=>{const o=this.continents[a];if(o.lastKey===e.rectKey)return;o.lastKey=e.rectKey;const c=fo([...r,r[0]],r.length*6).map((h,u)=>{const d=e.proj(h);return`${u===0?"M":"L"} ${d.x.toFixed(1)} ${d.y.toFixed(1)}`}).join(" ")+" Z";o.el.setAttribute("d",c)});for(const{handle:r,def:a}of this.flows){if(!n){Ii(r,{t0:0,t1:0,opacity:0,rectKey:e.rectKey},e.proj);continue}const o=uo(fe(t,a.w[0],a.w[1])),l=ct(fe(t,.452,.518));let c=o>0?.9:0;e.selection&&a.a!==e.selection&&a.b!==e.selection&&(c*=.22),Ii(r,{t0:l,t1:o,opacity:c,rectKey:e.rectKey},e.proj)}nr.forEach((r,a)=>{const o=this.conflicts[a],l=n?wt(t,.36+a*.012,.395+a*.012,.445,.5):0;if(l<=.01){o.el.style.display="none";return}o.el.style.display="",o.el.style.opacity=l.toFixed(2);const c=e.proj(r),h=.6+.4*l,u=`${c.x.toFixed(1)},${c.y.toFixed(1)},${h.toFixed(2)}`;u!==o.lastKey&&(o.lastKey=u,o.el.setAttribute("transform",`translate(${c.x.toFixed(1)} ${c.y.toFixed(1)}) scale(${h.toFixed(2)})`))}),this.updateCallouts(e,n)}updateCallouts(e,t){const{p:n}=e,s=is(n,e.t);ko.forEach((r,a)=>{const o=this.callouts[a],l=.3+a*.022,h=(e.mobile&&a%2===1?0:1)*(t?wt(n,l,l+.008,.44,.495):0);if(lt(o,h),this.coTitles[a].window(r.t,t?n:0,l,l+.026,.442,.472,s),h>.01){const u=e.proj(r.pos),d=Math.min(e.w-160,Math.max(10,u.x)),f=Math.min(e.h-70,Math.max(64,u.y));o.style.transform=`translate(${d.toFixed(1)}px, ${f.toFixed(1)}px)`}})}ambient(e){const t=e.p>.18&&e.p<.56;if(!e.webgl){const n=`${(-(e.p*260+e.t*9)).toFixed(1)}px`;this.flows.forEach(({handle:s},r)=>{s.hidden||(s.path.style.strokeDashoffset=n),tc(this.particles[r],s,e.t,e.proj)})}this.updateCallouts(e,t)}}const Vc=document.getElementById("poster-root");if(!Vc)throw new Error("poster-root element missing");const Ft=new z0(Vc),lo=new F0;Ft.add(lo);Ft.onReady(()=>Ft.useProjector((i,e)=>lo.project(i,e),i=>lo.depthOf(i)));Ft.add(new pd);Ft.add(new G0);Ft.add(new od);Ft.add(new cd);Ft.add(new ud);Ft.add(new Md);Ft.add(new id);Ft.add(new _d);Ft.add(new fd);Ft.add(new k0);Ft.add(new ld);Ft.start();
