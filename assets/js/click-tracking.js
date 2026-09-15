/* Dönermap: aggregate action counts, without cookies or visitor identifiers. */
(function(){
 "use strict";
 if(window.__dmClicksInstalled)return;window.__dmClicksInstalled=true;
 var flags=new URLSearchParams(location.search),test=flags.get("dm_test")==="1";
 if(flags.get("dm_tracking")==="off")return;
 if(!test&&!['xn--dnermap-90a.hamburg','www.xn--dnermap-90a.hamburg'].includes(location.hostname))return;
 var path=location.pathname.replace(/index\.html$/,'').replace(/\/+$/,'')+'/';
 if(path!=='/'&&!/^\/laden\/[a-z0-9-]+\/$/.test(path))return;
 var endpoint='https://rollerkompass-klickstatistik.martin-dehn1.chatgpt.site/api/doenermap/collect';
 function clicked(event){
  if(!event.isTrusted||event.button>1)return;
  var element=event.target instanceof Element?event.target.closest('[data-dm-kind]'):null;
  if(!element)return;
  var anchor=element.closest('a');
  if(event.type==='auxclick'&&(!anchor||event.button!==1))return;
  if(event.type==='click'&&event.button!==0)return;
  if(anchor&&anchor.hasAttribute('download'))return;
  var source=element.closest('[data-dm-shop]'),shop=source&&source.getAttribute('data-dm-shop'),kind=element.getAttribute('data-dm-kind');
  if(!shop||!/^[a-z0-9][a-z0-9-]{0,119}$/.test(shop)||!['marker','profile','maps','video'].includes(kind))return;
  if(event.type==='keypress'&&(kind!=='marker'||event.repeat||!['Enter',' '].includes(event.key)))return;
  var body={shop:shop,path:path,kind:kind};if(test)body.test=true;
  try{fetch(endpoint,{method:'POST',headers:{'Content-Type':'text/plain;charset=UTF-8'},body:JSON.stringify(body),credentials:'omit',referrerPolicy:'no-referrer',mode:'cors',cache:'no-store',keepalive:true}).catch(function(){});}catch(_){}
 }
 // Capture sees marker clicks even when the map stops bubbling them.
 document.addEventListener('click',clicked,true);
 document.addEventListener('auxclick',clicked,true);
 document.addEventListener('keypress',clicked,true);
})();
