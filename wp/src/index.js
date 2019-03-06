import _ from "lodash"
import './style.css'
import imgUrl from './img.png'
import data from './data.xml'

function component() {
  var element = document.createElement('div');
   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
   element.classList.add('hello');

   var img = new Image();
   img.src = imgUrl;
   console.log(data);
   element.appendChild(img);

   return element;
}

document.body.appendChild(component());
