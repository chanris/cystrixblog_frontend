import{e as R,f as j,g as E,a as W}from"./tag-oFrp3rdu.js";import{_ as A}from"./_plugin-vue_export-helper-x3n3nnut.js";import{o as G,r as n,w as H,b as u,q as J,c as x,d as K,f as m,e as t,h as l,s as O,k as S,y as Q,g as r,t as X,E as k}from"./index-svAZxImQ.js";import"./request-Kvlrod8x.js";const Y={class:"box"},Z={style:{height:"50px","background-color":"#fff","margin-bottom":"20px",display:"flex","align-items":"center","padding-left":"10px"}},ee={style:{"background-color":"#fff",display:"flex","flex-direction":"column","justify-content":"center"}},ae={class:"page"},te={class:"dialog-footer"},le={class:"dialog-footer"},oe={__name:"index",setup(ne){G(()=>{p({...i.value})});const y=n(!1),_=n([]),i=n({pageNum:1,pageSize:10,total:0}),b=n({pageNum:1,pageSize:10}),p=o=>{y.value=!0,R(o).then(({result:e})=>{_.value=e.list,b.value.pageNum=e.pageNum,b.value.pageSize=e.pageSize,i.value.pageNum=e.pageNum,i.value.pageSize=e.pageSize,i.value.total=e.total}).finally(()=>{y.value=!1})};H(i.value,(o,e)=>{p({...i.value})});const g=n(!1),f=n({name:""}),h=o=>{j({id:o.id}).then(()=>{p({}),k({type:"success",message:"删除成功"})})},s=n({name:"",id:""}),V=n(),v=n(!1),$=n({name:[{required:!0,message:"请输入标签名称",trigger:"blur"},{min:2,max:20,message:"名称长度不小于2不大于20",trigger:"blur"}]}),F=o=>{v.value=!0,s.value.id=o.id,s.value.name=o.name},U=o=>{o&&o.validate(e=>{e&&E(s.value).then(()=>{k({type:"success",message:"更新成功"}),p({})}).finally(()=>{s.value.name="",s.value.id="",v.value=!1})})},w=n(),D=n({name:[{required:!0,message:"请输入标签名称",trigger:"blur"},{min:2,max:20,message:"名称长度不小于2不大于20",trigger:"blur"}]}),B=o=>{o&&o.validate(e=>{e&&W({name:f.value.name}).then(()=>{k({type:"success",message:"添加成功"}),p({})}).finally(()=>{f.value.name="",g.value=!1})})};return(o,e)=>{const d=u("el-button"),c=u("el-table-column"),M=u("el-popconfirm"),q=u("el-table"),I=u("el-pagination"),z=u("el-input"),C=u("el-form-item"),N=u("el-form"),T=u("el-dialog"),L=J("loading");return x(),K("div",Y,[m("div",Z,[t(d,{type:"primary",onClick:e[0]||(e[0]=a=>g.value=!0)},{default:l(()=>[r("新增")]),_:1})]),m("div",ee,[O((x(),S(q,{data:_.value,style:{width:"100%"}},{default:l(()=>[t(c,{fixed:"",prop:"index",label:"序号","min-width":"80"},{default:l(a=>[m("div",null,X((b.value.pageNum-1)*b.value.pageSize+a.$index+1),1)]),_:1}),t(c,{prop:"name",label:"标签名称","min-width":"120"}),t(c,{prop:"createTime",label:"创建日期","min-width":"120"}),t(c,{prop:"updateTime",label:"更新日期","min-width":"120"}),t(c,{fixed:"right",label:"操作","min-width":"120"},{default:l(a=>[t(M,{title:"确定要删除该文标签？",onConfirm:P=>h(a.row),"cancel-button-text":"取消","confirm-button-text":"删除","confirm-button-type":"danger"},{reference:l(()=>[t(d,{link:"",type:"danger",size:"small"},{default:l(()=>[r("删除")]),_:1})]),_:2},1032,["onConfirm"]),t(d,{link:"",type:"primary",size:"small",onClick:P=>F(a.row)},{default:l(()=>[r("修改")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])),[[L,y.value]]),m("div",ae,[_.value&&_.value.length>0?(x(),S(I,{key:0,background:"",layout:"prev, pager, next",total:i.value.total,"page-size":i.value.pageSize,"onUpdate:pageSize":e[1]||(e[1]=a=>i.value.pageSize=a),"current-page":i.value.pageNum,"onUpdate:currentPage":e[2]||(e[2]=a=>i.value.pageNum=a),"hide-on-single-page":""},null,8,["total","page-size","current-page"])):Q("",!0)])]),t(T,{modelValue:g.value,"onUpdate:modelValue":e[6]||(e[6]=a=>g.value=a),title:"添加标签",style:{width:"600px"}},{footer:l(()=>[m("span",te,[t(d,{onClick:e[4]||(e[4]=a=>g.value=!1)},{default:l(()=>[r("取消")]),_:1}),t(d,{type:"primary",onClick:e[5]||(e[5]=a=>B(w.value))},{default:l(()=>[r("添加")]),_:1})])]),default:l(()=>[t(N,{ref_key:"addFrom",ref:w,model:f.value,rules:D.value},{default:l(()=>[t(C,{label:"标签名称","label-width":"120",prop:"name"},{default:l(()=>[t(z,{modelValue:f.value.name,"onUpdate:modelValue":e[3]||(e[3]=a=>f.value.name=a),modelModifiers:{trim:!0},autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["modelValue"]),t(T,{modelValue:v.value,"onUpdate:modelValue":e[10]||(e[10]=a=>v.value=a),title:"更新标签",style:{width:"600px"}},{footer:l(()=>[m("span",le,[t(d,{onClick:e[8]||(e[8]=a=>v.value=!1)},{default:l(()=>[r("取消")]),_:1}),t(d,{type:"primary",onClick:e[9]||(e[9]=a=>U(V.value))},{default:l(()=>[r("更新")]),_:1})])]),default:l(()=>[t(N,{ref_key:"updateForm",ref:V,model:s.value,rules:$.value},{default:l(()=>[t(C,{label:"标签名称","label-width":"120",prop:"name"},{default:l(()=>[t(z,{modelValue:s.value.name,"onUpdate:modelValue":e[7]||(e[7]=a=>s.value.name=a),modelModifiers:{trim:!0}},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["modelValue"])])}}},re=A(oe,[["__scopeId","data-v-d288193b"]]);export{re as default};