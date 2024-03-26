:root {
  box-sizing: border-box;
}

body {
  padding: 30px;
  background-color: #C4B7CB;
}

h1 {
  text-align: center;
  font-family: "Trebuchet MS", Helvetica, sans-serif;
}

h3,
ul,
p {
  font-family: "Trebuchet MS", Helvetica, sans-serif;
}

ul,
p {
  font-size: 16px;
}

#main {
  display: flex;
  background-color: #ffffff;
  width: 1000px;
  height: 500px;
}

.tower {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  flex-grow: 1;
  border: 1px solid black;
}

.disc {
  height: 100px;
  border: 1px solid black;
}

.disc:hover {
  cursor: pointer;
}

#disc1 {
  width: 45%;
  height: 85px;
  background-color: #F6AA1C;
}

#disc2 {
  width: 60%;
  height: 90px;
  background-color: #517664;
}

#disc3 {
  width: 75%;
  height: 95px;
  background-color: #59344F;
}

#disc4 {
  width: 90%;
  height: 100px;
  background-color: #084B83;
}

.disc {
  height: 100px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
}



