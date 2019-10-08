# stickyfy.js
Handle sticky state change in js for elements with position:sticky

Assigns an observer to elements and toggles class and callback functions for stick and unstick

`<div class="stickyfy"></div>`

```
var options = {

  onStick : function(el),
  //onStick is called when an element sticks. Passes stuck DOMElement
  
  onUnStick : function(el),
  //onUnStick is called when an element unsticks. Passes unstuck DOMElement
  
  toggleClass : "stuck",
  //toggleClass is the name of the class that will be assigned to and removed from stuck elements
  
  selector : ".stickyfy"
  //css style selector for the elements to be observed. pass null to scan entire document
  
}

new Stickyfy(options).init();
``` 
