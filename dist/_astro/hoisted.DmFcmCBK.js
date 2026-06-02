const u=["page-welcome","page-whoami","page-growth","page-experience","page-map","page-projects-space","page-projects-experience","page-competitions","page-skills","page-contact"],a=document.getElementById("path-char"),T=document.getElementById("nav-progress-fill"),m=document.querySelector(".nav-progress-track"),g=u.length;let o=0,d=!1,p=0,v=0,w=0,c=200,f=200;function l(e,t=!0){o=e;const n=e/(g-1)*c;a.style.transition=t?"left 0.3s ease-out":"none",a.style.left=8+n+"px",T.style.width=e/(g-1)*100+"%"}function O(){m?(f=m.offsetWidth,c=f,console.log("[INIT] Track width:",f,"maxOffset:",c)):console.log("[INIT] navTrack not found!"),l(0,!1)}O();window.addEventListener("resize",()=>{m&&(f=m.offsetWidth,c=f,console.log("[RESIZE] Track width updated:",f))});a.addEventListener("mousedown",e=>{d=!0,p=e.clientX,a.classList.add("dragging"),console.log("[MOUSE DOWN] startX:",p),e.preventDefault()});document.addEventListener("mousemove",e=>{if(!d)return;v=e.clientX;const t=v-p,n=o/(g-1)*c,s=Math.max(0,Math.min(c,n+t));a.style.left=8+s+"px",T.style.width=s/c*100+"%"});document.addEventListener("mouseup",()=>{if(!d)return;d=!1,a.classList.remove("dragging");const e=v-p,t=30;if(e>t&&o<g-1){const n=o+1;l(n),window.navigateTo&&window.navigateTo(u[n])}else if(e<-t&&o>0){const n=o-1;l(n),window.navigateTo&&window.navigateTo(u[n])}else l(o)});let D=0,x=0;a.addEventListener("touchstart",e=>{d=!0,e.touches[0].clientX,D=e.touches[0].clientY,p=e.touches[0].clientX,x=parseInt(a.style.left)||8,console.log("[TOUCH START] x:",e.touches[0].clientX,"y:",e.touches[0].clientY,"charLeft:",x),a.classList.add("dragging"),e.preventDefault()},{passive:!1});a.addEventListener("touchmove",e=>{if(!d)return;v=e.touches[0].clientX,w=e.touches[0].clientY;const t=v-p,n=Math.abs(w-D);console.log("[TOUCH MOVE] deltaX:",t,"deltaY:",n),e.preventDefault(),a.style.transition="none";const s=o/(g-1)*c,i=Math.max(0,Math.min(c,s+t));a.style.left=8+i+"px",T.style.width=i/c*100+"%"},{passive:!1});let h=null;function E(e){const t=document.createElement("div");t.id="nav-confirm-popup",t.innerHTML=`
        <div class="nav-confirm-box">
          <div class="nav-confirm-text">${e==="next"?"▶ 下一页?":"◀ 上一页?"}</div>
          <div class="nav-confirm-buttons">
            <button class="nav-confirm-btn confirm-yes" data-action="${e}">✓ 确定</button>
            <button class="nav-confirm-btn confirm-no">✗ 取消</button>
          </div>
        </div>
      `,t.style.cssText=`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
      `;const n=t.querySelector(".nav-confirm-box");n.style.cssText=`
        background: linear-gradient(135deg, #1a2f1a, #0f1f0f);
        border: 3px solid #00ff88;
        border-radius: 12px;
        padding: 30px 40px;
        text-align: center;
        box-shadow: 0 0 30px rgba(0,255,136,0.3);
      `;const s=t.querySelector(".nav-confirm-text");s.style.cssText=`
        font-family: var(--font-game);
        font-size: 1.5rem;
        color: #00ff88;
        margin-bottom: 20px;
        text-shadow: 0 0 10px rgba(0,255,136,0.5);
      `;const i=t.querySelector(".nav-confirm-buttons");i.style.cssText=`
        display: flex;
        gap: 15px;
        justify-content: center;
      `,document.body.appendChild(t),t.querySelector(".confirm-yes")?.addEventListener("click",()=>{t.remove(),h&&(h(),h=null)}),t.querySelector(".confirm-no")?.addEventListener("click",()=>{t.remove(),h=null,l(o)})}a.addEventListener("touchend",e=>{if(console.log("[TOUCH END] isDragging:",d,"currentX:",v,"startX:",p),!d){console.log("[TOUCH END] Returning early - isDragging is false");return}d=!1,a.classList.remove("dragging");const t=v-p,n=parseFloat(a.style.left)||8,s=8+c,i=8;if(console.log("[TOUCH END] deltaX:",t),console.log("[TOUCH END] charLeft:",n,"| rightEdge:",s,"| leftEdge:",i),console.log("[TOUCH END] maxOffset:",c,"| trackWidth:",f),console.log("[TOUCH END] currentDragIndex:",o,"| totalNavPages:",g),n>=s-10&&o<g-1)console.log("[TOUCH END] At RIGHT edge - showing confirm popup"),h=()=>{const r=o+1;l(r),window.navigateTo&&window.navigateTo(u[r])},E("next");else if(n<=i+10&&o>0)console.log("[TOUCH END] At LEFT edge - showing confirm popup"),h=()=>{const r=o-1;l(r),window.navigateTo&&window.navigateTo(u[r])},E("prev");else if(t>30&&o<g-1){console.log("[TOUCH END] DeltaX positive, going to next page");const r=o+1;l(r),window.navigateTo&&window.navigateTo(u[r])}else if(t<-30&&o>0){console.log("[TOUCH END] DeltaX negative, going to previous page");const r=o-1;l(r),window.navigateTo&&window.navigateTo(u[r])}else console.log("[TOUCH END] Snapping back - no condition matched"),console.log("[TOUCH END] Conditions:"),console.log("  charLeft >= rightEdge - 10:",n>=s-10),console.log("  currentDragIndex < totalNavPages - 1:",o<g-1),console.log("  charLeft <= leftEdge + 10:",n<=i+10),console.log("  currentDragIndex > 0:",o>0),console.log("  deltaX > 30:",t>30),console.log("  deltaX < -30:",t<-30),l(o);e.preventDefault()},{passive:!1});a.addEventListener("touchcancel",()=>{d=!1,a.classList.remove("dragging"),l(o)});let I=0,L=0;document.addEventListener("touchstart",e=>{e.target.closest("#path-char")||(I=e.touches[0].clientX,L=e.touches[0].clientY)},{passive:!0});document.addEventListener("touchend",e=>{if(e.target.closest("#path-char")||d)return;const t=e.changedTouches[0].clientX,n=e.changedTouches[0].clientY,s=t-I,i=Math.abs(n-L);console.log("[SWIPE END] deltaX:",s,"deltaY:",i,"threshold check:",Math.abs(s)>50&&Math.abs(s)>i),Math.abs(s)>50&&Math.abs(s)>i&&(s<0?(console.log("[SWIPE END] Going to next page via swipe"),navigator.next()):(console.log("[SWIPE END] Going to previous page via swipe"),navigator.prev()))},{passive:!0});const y=window.navigateTo;window.navigateTo=function(e){console.log("[DEBUG] navigateTo called with:",e),y?y(e):(console.log("[DEBUG] originalNavigateTo is undefined, calling navigator.goTo directly"),navigator.goTo(e));const t=u.indexOf(e);console.log("[DEBUG] pageIndex:",t),t!==-1&&setTimeout(()=>{console.log("[DEBUG] Updating drag position to:",t),l(t,!0)},400)};const j=document.getElementById("copy-email"),k=document.getElementById("copy-toast");j?.addEventListener("click",async()=>{try{await navigator.clipboard.writeText("2806427544@qq.com"),k?.classList.add("show"),setTimeout(()=>{k?.classList.remove("show")},2e3)}catch(e){console.error("Failed to copy:",e)}});const C=[{id:"bytedance",icon:"🌐",title:"字节跳动 TikTok",subtitle:"印尼电商策略",period:"2026.01 - 2026.04",brief:"主导斋月大促，Fashion GMV +52%",projects:[{name:"斋月大促策略",background:"负责印尼斋月大促 Fashion 品类运营，需要在有限时间内实现 GMV 突破",challenge:"商家分散、用户需求多样、如何筛选优质商家并制定差异化策略",solution:"搭建商家准入机制 + 直播/短视频梯度补贴，筛选800+优质商家，产出选品报告",result:"Fashion GMV 环比增长 52%，商家 GMV 提升 2.8 倍，超 78% 商家提前完成目标"},{name:"精细预算优化",background:"电子设备与 Fashion 品类流量逻辑不同，需要差异化投放策略",challenge:"预算有限，如何在类目间合理分配达到最优 ROI",solution:"Fashion 以自播为核心、电子设备以达人+短视频为核心，制定差异化运营策略",result:"优化后 Fashion GMV 同比增长 36%，广告预算降低 13%"},{name:"头达撮合策略",background:"达人资源丰富但商家不知如何对接，需要搭建撮合机制",challenge:"如何精准匹配达人与商家，提升合作效率",solution:"搭建达人筛选机制，筛选200+优质达人，完成300+商家调研",result:"合作商家 GMV 平均提升 41%，ROI 提升至 1:3.3，覆盖率提升 23%"}]},{id:"xiaohongshu",icon:"📕",title:"小红书",subtitle:"商业产品实习生",period:"2025.09 - 2025.12",brief:"AIGC笔记内测，ROI +176%",projects:[{name:"AIGC 笔记内测",background:"白牌、品牌商家笔记供给不足、信息流转化弱",challenge:"如何用 AI 辅助内容生产，提升笔记质量和消耗",solution:"调整北极星指标从生产笔记数到 ADVV 消耗价值，优化创编流程，筛选内测人群",result:"800+客户参与，70%反馈质量提升，笔记生产数量提升 40%，点击曝光提升 18%"},{name:"大促单品优化",background:"年货节&三八节大促，需要为商家提供精准投放指南",challenge:"单 SKU 跑量不足问题普遍存在",solution:"拆解7大行业流量趋势，联动技术进行创编优化，提出多 SKU 组合投放策略",result:"70% 达标客户主动增投，3C 家电 ROI 提升 176%，推动产品全量上线"},{name:"新商投放冷启",background:"商家掉量、ROI 下滑、空耗等高频问题缺乏系统解决方案",challenge:"新商冷启动失败率高，急需方法论指导",solution:"构建冷启动 235 方法论，明确基建标准、出价策略、定向规则与5节点监控体系",result:"新商 30 天 ROI 达标率提升至 74%，有消耗客户数增长 12%"}]},{id:"meituan",icon:"🚴",title:"美团",subtitle:"运动健身品类产品运营",period:"2025.05 - 2025.09",brief:"活动GTV +85%，达人曝光1.76亿",projects:[{name:"新商冷启落地",background:"原商家成长体系粗放、新供给接入慢、促活低效",challenge:"如何让新商家快速上手并获得流量",solution:"按健身房/私教/团操三级类目拆分任务，搭建流量激励闭环，推出 CPC 券+搜索加权组合权益",result:"连续包月供给覆盖率提升 40%，商家上线周期缩至 T+2，核心供给从 10% 升至 60%"},{name:"活动与品牌营销",background:"运动品类商家分散、用户心智不统一",challenge:"如何整合多方资源实现活动爆发",solution:"筛选 2.2 万家高潜力商户，协调小红书、微博等多平台 KOL/KOC 资源，联动跨界品牌",result:"活动 GTV 同比增长 85%，商家目标达成率 220%，达人曝光 1.76 亿"}]},{id:"hallo",icon:"🚲",title:"哈啰",subtitle:"产品经理实习生",period:"2025.02 - 2025.05",brief:"游历中国DAU 35万，ARPPU 25→38元",projects:[{name:"游历中国",background:"App 曝光过低，需要提升用户粘性并赋能各业务导流",challenge:"如何在游戏中心基础上从 0 开发创新玩法",solution:"设计省份解锁+体力值打卡玩法，撰写 PRD，协调供应链资源特产实物奖励接入",result:"上线首月 DAU 35 万，ARPPU 25元→38元"}]},{id:"medtronic",icon:"🏥",title:"美敦力 Medtronic",subtitle:"战略实习生",period:"2024.09 - 2024.11",brief:"医疗器械行业研究，产出10+篇报告",projects:[{name:"行业研究",background:"深度分析医疗器械行业国内与海外顶级公司的业务板块与主要产品线",challenge:"需要全面了解高/低值耗材、IVD 等多产品线",solution:"进行宏观（VBP带量采购）与微观分析、竞品分析、进博会产品亮点整理",result:"产出10+篇年报、月报，为战略决策提供支持"},{name:"财报数据分析",background:"需要对比分析医疗器械行业代表性企业的财务表现",challenge:"数据量大，指标多，如何高效呈现",solution:"运用 thinkcell、PowerBI 产出20+slides图表，进行差异拆解",result:"完成迈瑞、鱼跃、强生、爱德华等公司财务对比分析"}]},{id:"merck",icon:"💊",title:"默克集团 Merck",subtitle:"风险合规实习生",period:"2024.05 - 2024.09",brief:"合规风险评估，节省$25,000成本",projects:[{name:"合规风险评估工具",background:"需要识别和优先处理医药化工产品的合规问题",challenge:"国际出口法规复杂，人工审单效率低",solution:"开发风险评估工具辅助审单，自动化识别合规问题",result:"为公司节省约$25,000的不必要的合规成本"},{name:"关税豁免数据处理",background:"中美贸易战下，需要为产品申请关税豁免",challenge:"数据处理量大，需要自动化",solution:"运行 BOT 编程程序自动化处理化学与生物产品数据",result:"成功为产品申请关税豁免，成本降低 20%"}]},{id:"ey",icon:"📊",title:"安永华明 TCE 高科技组",subtitle:"审计实习生",period:"2023.12 - 2024.03",brief:"紫光股份年审项目，参与16家子公司审计",projects:[{name:"审计底稿编制",background:"参与紫光股份集团年审项目，涵盖16家子公司",challenge:"工作量大，需要高效处理",solution:"运用数据透视表、X-lookup等函数，进行JE Testing、收入确认测试",result:"完成16家子公司审计底稿编制"},{name:"数据抽样分析",background:"需要随机抽样代表性样本进行审计测试",challenge:"抽样代表性不足，可能遗漏关键问题",solution:"编写和优化 Python 代码随机抽样，与客户IT部门合作识别代码错误",result:"成功识别并修正2处代码不合理错误"}]}],X=new URLSearchParams(window.location.search),U=X.get("experience"),b=document.getElementById("detail-content");if(b){const e=C.find(t=>t.id===U);e?b.innerHTML=`
        <div class="company-header">
          <div class="company-icon">${e.icon}</div>
          <h2 class="company-title">${e.title}</h2>
          <p class="company-subtitle">${e.subtitle}</p>
          <p class="company-period">${e.period}</p>
          <span class="company-brief">${e.brief}</span>
        </div>

        <div class="projects-section">
          <h3 class="projects-title">📂 项目详情</h3>
          ${e.projects.map(t=>`
            <div class="project-card">
              <h4 class="project-name">${t.name}</h4>

              <div class="project-block">
                <div class="project-label">📌 背景</div>
                <div class="project-text">${t.background}</div>
              </div>

              <div class="project-block">
                <div class="project-label">⚡ 挑战</div>
                <div class="project-text">${t.challenge}</div>
              </div>

              <div class="project-block">
                <div class="project-label">💡 解决方案</div>
                <div class="project-text">${t.solution}</div>
              </div>

              <div class="result-block">
                <div class="project-label">🎯 成果</div>
                <div class="project-text">${t.result}</div>
              </div>
            </div>
          `).join("")}
        </div>
      `:b.innerHTML='<p style="text-align:center;color:#8B4513;">未找到公司信息</p>'}document.querySelector(".back-btn")?.addEventListener("click",()=>{window.navigateTo&&window.navigateTo("page-growth")});
