window.addEventListener('DOMContentLoaded', function(){
    sizeOptionsSet();
    Pattern.init();
})

const Pattern = {
    svg: document.getElementById('svg-pattern'),
    testPattern: document.getElementById('test-pattern'),
    selectSize: document.getElementById('size'),
    color: document.getElementById('color'),
    colorValue: this.color.value,
    init: function(){
        this.selectSize.addEventListener('change', Pattern.set);
        this.color.addEventListener('change', Pattern.setColor);
        this.setSvg();

    },
    set: function(){
        let size = Pattern.selectSize.value;
        Pattern.clone = Pattern.svg.cloneNode(true);
        Pattern.clone.setAttribute('width', size);
        Pattern.clone.setAttribute('height', size);
        Pattern.testPattern.style.backgroundImage = 'url(data:image/svg+xml;base64,'+btoa(Pattern.clone.outerHTML)+')';
    },
    setColor: function(){
        Pattern.colorValue = Pattern.color.value;
    },
    changeColor: function(e){
        e.target.setAttribute('fill', Pattern.colorValue);
        Pattern.set();
    },
    setSvg: function(){
        


        this.svgFragment = document.querySelectorAll('.svg-fragment');
        this.svgFragment.forEach(el=>{
            el.addEventListener('click', Pattern.changeColor);
        })
        this.set();
    }
}











function sizeOptionsSet(){
    const select = document.getElementById('size');
    const fragment = document.createDocumentFragment();
    for(let i=2; i<=250;i+=2){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        if(i == 80) option.selected = 'selected';
        fragment.appendChild(option);
    }
    select.appendChild(fragment);
}
