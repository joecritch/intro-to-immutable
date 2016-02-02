var I = require('immutable');

var obj1 = I.Map({
  firstName: 'Paul',
  lastName: 'Daniels'
});

var obj2 = obj1.set('firstName', 'Jeff');

// ==> (obj1 === obj2) ==> false
// ==> (obj1.get('firstName')) ==> "Paul"
