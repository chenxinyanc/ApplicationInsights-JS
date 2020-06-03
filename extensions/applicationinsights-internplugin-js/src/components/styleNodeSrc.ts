export const tempStyle = `
  .my-logger {
    width: 80%;
    min-width: 200px;
    height: 1000px;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    font-family: monospace;
    font-size: 16px;
  }

  .my-logger div div:hover::before {
    content: '';
    position: absolute;
    background-color: black;
    left: -1em;
    height: 100%;
    width: 2px;
  }

  .my-logger > div {
    display: block;
    position: relative;
  }

  .my-logger > div div {
    display: block;
    position: relative;
    margin-left: 1em;
  }

  .my-logger .obj-key:hover {
    text-decoration: underline;
  }

  .my-logger :not(div span.obj-key) {
    font-weight: bold;
    pointer-events: none;
  }
  .my-logger .object {pointer-events: auto;}
  .my-logger .function {color: #881391;}
  .my-logger .string {color: #CB3632;}
  .my-logger .number {color: #1C00CF;}
  .my-logger .key {#1C00CF; font-weight: bold;}
`;

export const permStyle = `
  .debug-bin-container {
    position: fixed;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
  }

  .debug-bin {
    position: fixed;
    right: 20px;
    margin: auto;
    padding: 10px;
    border-radius: 20px;
    height: 20px;
    min-width: 20px;
    animation: 1s ease-in-out 1 forwards notify;
    pointer-events: auto;
    text-align: center;
    font-family: 'Courier New', Courier, monospace;
  }

  .debug-bin > span {
    text-align: right;
    color: white;
  }

  .debug-bin:hover > span::before {
    content: attr(data-name) ": ";
  }

  @keyframes notify {
    0% {transform: scale(1);}
    50% {transform: scale(1.5);}
    100% {transform: scale(1);}
  }
`