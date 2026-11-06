/* Locally vendored Lucide icons; see assets/icons/LICENSE-lucide.txt. */
(() => {
  const names={'↗':'arrow-up-right','←':'arrow-left','→':'arrow-right','↑':'arrow-up','▷':'play','Ⅱ':'pause','✳':'sparkles','×':'x','+':'plus','−':'minus'};
  const symbols=/[↗←→↑▷Ⅱ✳×+−]/;
  function replaceSymbols(root){
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
        const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
        svg.setAttribute('class','ui-icon');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');
        svg.setAttribute('fill','none');svg.setAttribute('stroke','currentColor');svg.setAttribute('stroke-width','2');svg.setAttribute('stroke-linecap','round');svg.setAttribute('stroke-linejoin','round');
        const use=document.createElementNS('http://www.w3.org/2000/svg','use');use.setAttribute('href','assets/icons/lucide.svg#'+names[character]);svg.append(use);fragment.append(svg);
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
