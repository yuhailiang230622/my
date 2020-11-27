var countent = document.querySelector('.countent')
var tab_list = document.querySelector('.tab_list')
var li = tab_list.querySelectorAll('li')
var ul = tab_list.querySelector('ul')
var li1 = ul.querySelectorAll('li')
// console.log(li1);
var list = document.querySelector('.list')
var tbbody = list.querySelectorAll('.tbbody')
// console.log(tbbody);



for (var i = 0; i < li1.length; i++) {
    li1[i].index = i
    li1[i].onclick = function () {
        console.log(1);
        for (var j = 0; j < li1.length; j++) {
            li1[j].className = ''
            tbbody[j].className = ''
        }
        this.className = 'active'
        tbbody[this.index].className = 'show'

    }

}





