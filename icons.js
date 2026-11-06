/* Locally vendored Coolicons Line / Regular; see assets/icons/LICENSE-coolicons.txt. */
(() => {
  const names={'↗':'arrow-up-right','←':'arrow-left','→':'arrow-right','↑':'arrow-up','▷':'play','Ⅱ':'pause','✳':'sparkles','×':'close','+':'plus','−':'minus'};
  const symbols=/[↗←→↑▷Ⅱ✳×+−]/;
  function icon(name){
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('class','ui-icon');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');svg.setAttribute('fill','none');
    const use=document.createElementNS('http://www.w3.org/2000/svg','use');use.setAttribute('href','assets/icons/coolicons.svg#'+name);svg.append(use);return svg;
  }
  function replaceSymbols(root){
    if(root.querySelectorAll)for(const summary of root.querySelectorAll('summary'))if(!summary.querySelector('.disclosure-icon')){const svg=icon('chevron-down');svg.classList.add('disclosure-icon');summary.append(svg);}

    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[];
    while(walker.nextNode()){
      const node=walker.currentNode;
      if(symbols.test(node.data)&&!node.parentElement?.closest('svg,script,style,title,textarea,code,pre'))nodes.push(node);
    }
    for(const node of nodes){
      const fragment=document.createDocumentFragment();let text='';
      for(const character of node.data){
        if(!names[character]){text+=character;continue;}
        if(text){fragment.append(document.createTextNode(text));text='';}
        fragment.append(icon(names[character]));
      }
      if(text)fragment.append(document.createTextNode(text));node.replaceWith(fragment);
    }
  }
  replaceSymbols(document.body);
  const observer=new MutationObserver(records=>{
    observer.disconnect();
    const roots=new Set(records.map(r=>r.target.nodeType===Node.TEXT_NODE?r.target.parentElement:r.target));
    for(const root of roots)if(root?.isConnected)replaceSymbols(root);
    observer.observe(document.body,{subtree:true,childList:true,characterData:true});
  });
  observer.observe(document.body,{subtree:true,childList:true,characterData:true});
})();
