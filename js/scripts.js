window.addEventListener('DOMContentLoaded', function(){
    Pattern.init();
})

const Pattern = {
    svg: document.getElementById('svg-pattern'),
    testPattern: document.getElementById('test-pattern'),
    selectSize: document.getElementById('size'),
    color: document.getElementById('color'),
    colorValue: this.color.value,
    tiles: document.getElementById('tiles'),
    selectSize: document.getElementById('size'),
    btnColorAll: document.getElementById('color-all'),
    save: document.getElementById('save'),
    init: function(){
        this.selectSize.addEventListener('change', Pattern.setBackground);
        this.color.addEventListener('change', Pattern.setColor);
        this.tiles.addEventListener('change', Pattern.setSvg);
        this.btnColorAll.addEventListener('click', Pattern.colorAllTiles);
        this.save.addEventListener('click', Pattern.saveImg);
        this.setSvg();
    },
    setBackground: function(){
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
        Pattern.setBackground();
    },
    sizeOptionsSet: function(){
        Pattern.selectSize.innerHTML = '';
        const fragment = document.createDocumentFragment();
        let step = Number(Pattern.tiles.value);
        for(let i=step; i<=250;i+=step){
            let option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            if(i == step*2) option.selected = 'selected';
            fragment.appendChild(option);
        }
        Pattern.selectSize.appendChild(fragment);
    },
    colorAllTiles: function(){
        Pattern.svgFragment = document.querySelectorAll('.svg-fragment');
        Pattern.svgFragment.forEach(el=>{
            el.setAttribute('fill', Pattern.color.value);
        })
        Pattern.setBackground();
    },
    setSvg: function(){
        let tiles = Pattern.tiles.value;
        let allTiles = tiles*tiles;
        let percStep = 100/tiles;
        let perc = [];
        let percStart = 0;
        for(let i=0;i<tiles;i++){
            perc.push(percStart);
            percStart += percStep;
        }
        let mySet = new Set();
        let tries = 0;
        let percLength = perc.length;
        while(mySet.size < allTiles){
            let x = Math.floor(Math.random()*percLength);
            let y = Math.floor(Math.random()*percLength);
            mySet.add(perc[x]+'_'+perc[y]);
            tries++;
        }
        const xy = [...mySet].sort();
        const svgns = "http://www.w3.org/2000/svg";
        let svg = document.getElementById('svg-pattern');
        let fragment = document.createDocumentFragment();
        for(let i=1; i<= allTiles; i++){
            let rect = document.createElementNS(svgns, 'rect');
            rect.classList.add('svg-fragment');
            (i % 2 == 0)? rect.setAttribute('fill', '#3A2E40') : rect.setAttribute('fill', '#735B7F');
            rect.setAttribute('width', percStep+'%');
            rect.setAttribute('height', percStep+'%');
            let xyArray = xy[i-1].split('_');
            rect.setAttribute('x',xyArray[0]+'%');
            rect.setAttribute('y',xyArray[1]+'%');
            fragment.appendChild(rect);
        }
        Pattern.svg.innerHTML = '';
        Pattern.svg.appendChild(fragment);

        this.svgFragment = document.querySelectorAll('.svg-fragment');
        this.svgFragment.forEach(el=>{
            el.addEventListener('click', Pattern.changeColor);
        })
        Pattern.sizeOptionsSet();
        Pattern.setBackground();
    },
    saveImg: function(){
        let svgData = Pattern.clone.outerHTML;
        let svgBlob = new Blob([svgData], {type:"image/svg+xml;charset=utf-8"});
        let svgUrl = URL.createObjectURL(svgBlob);
        let downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = "pattern.svg";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
}
