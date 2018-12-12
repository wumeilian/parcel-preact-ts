import {h, render, Component } from 'preact';
/** @jsx h */

render((
    <div id="foo">
        <p>Hello, world!</p>
        <button onClick={ e => alert("hi!") }>Test Button</button>
    </div>
),  document.getElementById('root'));