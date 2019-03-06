import { cube } from './math.js';
import _ from 'lodash'

function component() {
  var element = document.createElement('pre');
  element.innerHTML = [
    'Hello webpack!',
    '5 cubed is equal to ' + cube(4)
  ].join('\n\n');
  return element;
}

console.log(_);

document.body.appendChild(component());








// import _ from "lodash"
// import printMe from './print'
// import './styles.css'

// function component() {
//   var element = document.createElement('div');
//   var btn = document.createElement('button');

//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//   btn.onclick = printMe;

//   element.appendChild(btn);

//    return element;
// }

// let element = component();

// document.body.appendChild(element);

// if (module.hot) {
//   module.hot.accept('./print.js', function () {
//     console.log('Accepting the updated printMe module!');
//     // printMe();
//     document.body.removeChild(element);
//     element = component();
//     document.body.appendChild(element);
//   })
// }
